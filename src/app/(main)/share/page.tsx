"use client";

// lucide-react doesn't have a `ShareNetwork` icon; use `Share2` instead
import { Share2 as ShareNetwork, Link as LinkIcon, Users, Tag } from 'lucide-react';

export default function SharePage() {
  // Mock function for handling share
  const handleShare = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const linkToShare = formData.get('linkToShare');
    const shareWith = formData.get('shareWith');
    console.log("Sharing link:", linkToShare, "with:", shareWith);
    alert(`Sharing options for "${linkToShare}" with "${shareWith}" would be processed here. (Not implemented)`);
    // Reset form or give feedback
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Share Your Links</h1>

      <form onSubmit={handleShare} className="bg-white p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <label htmlFor="linkToShare" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <LinkIcon size={16} className="mr-2 text-gray-500" />
            Select or Search Link to Share
          </label>
          <input
            type="text"
            id="linkToShare"
            name="linkToShare"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Type to search your saved links..."
            // In a real app, this could be an auto-suggest input or a select dropdown
          />
          <p className="mt-1 text-xs text-gray-500">
            Start typing the title of the link you wish to share.
          </p>
        </div>

        <div>
          <label htmlFor="shareWith" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
            <Users size={16} className="mr-2 text-gray-500" />
            Share with (User Emails or Tags)
            <Tag size={16} className="ml-1 text-gray-500" />
          </label>
          <input
            type="text"
            id="shareWith"
            name="shareWith"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter email addresses or tags, comma-separated"
          />
          <p className="mt-1 text-xs text-gray-500">
            Separate multiple emails or tags with a comma.
          </p>
        </div>

        {/* Placeholder for additional sharing options, e.g., shareable link, QR code generation */}
        <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Or Generate a Sharable Asset:</h3>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    type="button" // Important: type="button" to not submit the form
                    onClick={() => alert("QR Code generation not implemented yet.")}
                    className="flex items-center justify-center w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-300 transition-colors"
                >
                    Generate QR Code for this Link
                </button>
                 <button
                    type="button"
                    onClick={() => alert("Creating a public share link not implemented yet.")}
                    className="flex items-center justify-center w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-md border border-gray-300 transition-colors"
                >
                    Create Public Share Link
                </button>
            </div>
        </div>


        <div>
          <button
            type="submit"
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            <ShareNetwork size={20} className="mr-2" />
            Share Link
          </button>
        </div>
      </form>

      <div className="mt-10 text-center">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Sharing Tips:</h2>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          <li>You can share links with specific users by entering their email addresses.</li>
          <li>Alternatively, share links associated with certain tags to a group of users following those tags (feature coming soon).</li>
          <li>Generating a QR code can make sharing in person easy.</li>
        </ul>
      </div>
    </div>
  );
}
