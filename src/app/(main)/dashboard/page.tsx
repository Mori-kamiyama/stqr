"use client";

import LinkCard from '@/components/LinkCard';
import { PlusCircle } from 'lucide-react'; // For "Add New Link" button
import Link from 'next/link'; // For "Add New Link" button
import { useLinks } from '@/contexts/LinkContext';

export default function DashboardPage() {
  const { links, removeLink } = useLinks();

  const handleDelete = (id: string) => {
    removeLink(id);
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

      {links.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">You haven&apos;t added any links yet.</p>
          <p className="text-gray-500">Click the &quot;Add New Link&quot; button to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {links.map((link) => (
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
