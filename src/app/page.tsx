// src/app/page.tsx
import Image from "next/image"; // Import Next.js Image component
// Removed: import EmailForm from '@/components/EmailForm';

export default function Home() {
  return (
    // Main container with white background and appropriate text colors
    <div className="flex flex-col min-h-screen bg-white text-gray-800 font-[family-name:var(--font-geist-sans)]">

      {/* Header with white background and subtle border */}
      <header className="w-full p-4 border-b border-gray-200 bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          {/* --- Logo Section --- */}
          <div className="flex items-center gap-4">
            {/* Ensure 'promptpolish-logo.png' is in the 'public' folder */}
            <Image
              src="/promptpolish-logo.png"
              alt="PromptPolish Logo"
              width={128}
              height={128}
              className="h-32 w-32"
            />
            <span className="text-2xl md:text-3xl font-bold text-gray-800">PromptPolish</span>
          </div>
          {/* --- End Logo Section --- */}
          <nav>
            {/* Changed href to link to the /subscribe page */}
            <a href="/subscribe" className="text-gray-600 hover:text-green-700 transition duration-150 ease-in-out font-medium">
              Get Early Access
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-12 md:py-20">

        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24 pt-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
            Stop Guessing, Start Prompting.
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            PromptPolish refines your AI prompts for clarity and impact, helping you get better results instantly. No prompt engineering degree required.
          </p>
          {/* Changed href to link to the /subscribe page */}
          <a href="/subscribe" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-150 ease-in-out shadow-md hover:shadow-lg">
            Join Waitlist
          </a>
        </section>

        {/* Demo Section Placeholder */}
        <section className="mb-16 md:mb-24 flex justify-center">
          <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-1 border border-gray-200 overflow-hidden">
            {/* --- Placeholder for GIF --- */}
            <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-500">Animated Demo Placeholder</p>
            </div>
            {/* Add your actual GIF here later using next/image */}
          </div>
        </section>

        {/* Call-to-Action Section (Now just directs to subscribe page) */}
        {/* Removed the id="subscribe", adjusted content */}
        <section className="bg-gray-50 rounded-lg shadow-lg p-8 md:p-12 border border-gray-200 max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            Ready to Polish Your Prompts?
          </h2>
          <p className="text-gray-600 mb-8">
            Be the first to know when PromptPolish launches. Click below to join the waitlist.
          </p>
          {/* Changed href to link to the /subscribe page */}
          <a href="/subscribe" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition duration-150 ease-in-out shadow-md hover:shadow-lg">
            Get Early Access
          </a>
          {/* Removed: <EmailForm /> */}
        </section>

      </main>

      {/* Footer using light gray background */}
      <footer className="w-full p-4 mt-12 border-t border-gray-200 bg-gray-100">
        <div className="container mx-auto text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} PromptPolish. All rights reserved.
        </div>
      </footer>

    </div>
  );
}