"use client";

import LinkCard from '@/components/LinkCard';
import { PlusCircle } from 'lucide-react'; // For "Add New Link" button
import Link from 'next/link'; // For "Add New Link" button

// Mock Data for Links
const mockLinks = [
  {
    id: '1',
    title: 'CS70 Study Group Notes',
    link: 'https://docs.google.com/document/d/example1/edit',
    dueDate: '2024-09-01',
    tags: ['academics', 'cs70', 'study notes'],
  },
  {
    id: '2',
    title: 'Math 54 Problem Set 3',
    link: 'https://math.berkeley.edu/~course/math54/ps/ps3.pdf',
    dueDate: '2024-08-20',
    tags: ['homework', 'math54', 'urgent'],
  },
  {
    id: '3',
    title: 'Favorite Lo-fi Playlist',
    link: 'https://open.spotify.com/playlist/example3',
    tags: ['music', 'focus', 'lo-fi'],
  },
  {
    id: '4',
    title: 'Next.js Official Documentation',
    link: 'https://nextjs.org/docs',
    tags: ['development', 'nextjs', 'reference'],
  },
  {
    id: '5',
    title: 'Internship Application Portal',
    link: 'https://example.com/careers/apply',
    dueDate: '2024-07-30',
    tags: ['career', 'internship', 'application'],
  },
  {
    id: '6',
    title: 'Recipe: Overnight Oats',
    link: 'https://www.examplefoodblog.com/overnight-oats',
    tags: ['food', 'recipe', 'breakfast'],
  },
];

export default function DashboardPage() {
  // Mock handlers for card actions (optional, for future use)
  const handleDelete = (id: string) => {
    console.log(`Delete link with id: ${id}`);
    // Implement actual deletion logic here (e.g., update state, call API)
  };

  const handleEdit = (id: string) => {
    console.log(`Edit link with id: ${id}`);
    // Implement actual edit logic here (e.g., navigate to edit page, open modal)
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">My Links</h1>
        <Link href="/add-link" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out flex items-center">
          <PlusCircle size={20} className="mr-2" />
          Add New Link
        </Link>
      </div>

      {mockLinks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">You haven&apos;t added any links yet.</p>
          <p className="text-gray-500">Click the &quot;Add New Link&quot; button to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockLinks.map((link) => (
            <LinkCard
              key={link.id}
              id={link.id}
              title={link.title}
              link={link.link}
              dueDate={link.dueDate}
              tags={link.tags}
              onDelete={handleDelete} // Pass the handler
              onEdit={handleEdit}     // Pass the handler
            />
          ))}
        </div>
      )}
    </div>
  );
}
