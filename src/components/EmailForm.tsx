// src/components/EmailForm.tsx
'use client'; // Required for components with hooks like useState, useEffect

import React, { useState, FormEvent } from 'react';


export default function EmailForm() {
  // State variables
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default page reload
    setStatus('loading');
    setMessage(''); // Clear previous messages

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Send email in request body
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle errors from the API (e.g., invalid email, already subscribed)
        setMessage(data.message || 'An unknown error occurred.');
        setStatus('error');
      } else {
        // Handle success
        setMessage(data.message || 'Subscription successful!');
        setStatus('success');
        setEmail(''); // Clear the input field on success
      }
    } catch (error) {
      // Handle network errors or other unexpected issues
      console.error('Form submission error:', error);
      setMessage('Failed to connect. Please try again.');
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      {/* Email Input Field */}
      <div className="flex items-center border-b border-teal-500 py-2 mb-4">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="email"
          placeholder="Enter your email address"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Basic HTML5 validation
          disabled={status === 'loading'} // Disable input while loading
        />
        {/* Submit Button */}
        <button
          className={`flex-shrink-0 ${
            status === 'loading'
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-teal-500 hover:bg-teal-700'
          } border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded transition duration-150 ease-in-out`}
          type="submit"
          disabled={status === 'loading'} // Disable button while loading
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>

      {/* Status Messages */}
      {message && (
        <p
          className={`text-sm mt-2 text-center ${
            status === 'success' ? 'text-green-600' : ''
          } ${status === 'error' ? 'text-red-600' : ''}`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
