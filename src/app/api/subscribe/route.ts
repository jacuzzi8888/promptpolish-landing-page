import { NextRequest, NextResponse } from 'next/server';
// Note: We are not importing 'Airtable' library in this version

// Read environment variables
const apiKey = process.env.AIRTABLE_API_KEY; // Your Personal Access Token
const baseId = process.env.AIRTABLE_BASE_ID;
const tableName = process.env.AIRTABLE_TABLE_NAME;

/**
 * POST handler for /api/subscribe using fetch
 * Expects { email: string } in the request body.
 * Adds the email to the Airtable base via direct API call.
 */
export async function POST(request: NextRequest) {
  // --- Check if environment variables are loaded ---
  if (!apiKey || !baseId || !tableName) {
    console.error("Server configuration error: Airtable environment variables missing.");
    return NextResponse.json(
      { message: 'Server configuration error: Airtable connection details missing.' },
      { status: 500 }
    );
  }

  // --- DEBUG LOG ---
  console.log('Attempting direct fetch with API Key (PAT):', apiKey ? `${apiKey.substring(0, 6)}...${apiKey.substring(apiKey.length - 4)}` : 'Not Found!');
  // --- END DEBUG LOG ---

  try {
    // 1. Parse the request body to get the email
    const body = await request.json();
    const email = body.email;

    // 2. Validate the email
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.warn('Invalid email received:', email);
      return NextResponse.json(
        { message: 'Invalid email address provided.' },
        { status: 400 } // Bad Request
      );
    }

    // 3. Construct the Airtable API request using fetch
    const airtableApiUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;
    console.log(`Attempting fetch POST to: ${airtableApiUrl}`);

    const response = await fetch(airtableApiUrl, {
      method: 'POST',
      headers: {
        // Use the Personal Access Token as a Bearer token
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Structure the body according to Airtable's API requirements
        // https://airtable.com/developers/web/api/create-records
        records: [
          {
            fields: {
              // Ensure the field name 'Email' matches your Airtable column name exactly
              'Email': email,
              // Add other fields here if needed
            },
          },
        ],
        // Optional: typecastRecords=true can help ensure data types match Airtable fields
        // typecast: true
      }),
    });

    // 4. Handle the response from Airtable
    const responseData = await response.json();

    if (!response.ok) {
      // If response status is not 2xx, throw an error to be caught below
      console.error(`Airtable API fetch failed with status ${response.status}:`, responseData);
      // Throw a structured error including details from Airtable if possible
      const error = new Error(responseData.error?.message || `Airtable API Error: Status ${response.status}`);
      // @ts-ignore - attaching extra info to the error object
      error.statusCode = response.status;
      // @ts-ignore
      error.airtableError = responseData.error; // Store the original Airtable error object
      throw error;
    }

    // 5. Send success response (if fetch was ok)
    console.log(`Successfully added email via fetch: ${email}`, responseData);
    return NextResponse.json(
      { message: 'Subscription successful! Thank you.' },
      { status: 201 } // Created
    );

  } catch (error: any) {
    // Log the detailed error
    console.error('API Route Error:', error);

    // Check for specific error types passed from the fetch block or other errors
    const statusCode = error.statusCode || 500; // Default to 500 if status code isn't set
    let message = 'Subscription failed. Please try again later.'; // Default message

    if (statusCode === 403) {
        message = 'Authorization failed. Check API token permissions.';
    } else if (statusCode === 401) {
        message = 'Authentication failed. Check API token.';
    } else if (statusCode === 422 && error.airtableError?.type?.includes('INVALID_VALUE_FOR_COLUMN')) {
        // Example of handling specific Airtable validation errors
        message = `Invalid data for field: ${error.airtableError.message}`;
    } else if (error.message?.includes('DUPLICATE_VALUE')) { // Check if Airtable error message indicates duplicate
        message = 'This email address is already subscribed.';
        // Note: Airtable might return 422 for duplicates depending on setup, adjust status code if needed
        return NextResponse.json({ message }, { status: 409 }); // Conflict
    }
     else if (error.message) {
         // Use the error message if available and not handled above
         message = error.message;
     }


    return NextResponse.json(
      { message: message },
      { status: statusCode }
    );
  }
}
