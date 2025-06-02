"use client";

import { UserCircle, Edit, Tag, PlusCircle, Trash2, Settings as SettingsIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext'; // To get user info

export default function SettingsPage() {
  const { user } = useAuth(); // Get user from AuthContext

  // Mock data for tags - in a real app, this would come from user data or a DB
  const mockTags = [
    { id: '1', name: 'Work' },
    { id: '2', name: 'Personal' },
    { id: '3', name: 'Urgent' },
    { id: '4', name: 'Study' },
    { id: '5', name: 'Finance' },
  ];

  // Mock handlers
  const handleEditProfile = () => alert("Edit Profile functionality not implemented yet.");
  const handleAddNewTag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTag = (event.currentTarget.elements.namedItem('newTagName') as HTMLInputElement).value;
    alert(`Add new tag "${newTag}" - functionality not implemented yet.`);
    (event.currentTarget.elements.namedItem('newTagName') as HTMLInputElement).value = ''; // Clear input
  };
  const handleEditTag = (tagId: string, tagName: string) => alert(`Edit tag "${tagName}" (ID: ${tagId}) - functionality not implemented yet.`);
  const handleDeleteTag = (tagId: string, tagName: string) => alert(`Delete tag "${tagName}" (ID: ${tagId}) - functionality not implemented yet.`);

  return (
    <div className="container mx-auto max-w-4xl py-8 px-4">
      <div className="flex items-center mb-10">
        <SettingsIcon size={36} className="mr-3 text-blue-600" />
        <h1 className="text-4xl font-bold text-gray-800">Application Settings</h1>
      </div>

      {/* Profile Management Section */}
      <section className="mb-12 bg-white p-8 rounded-xl shadow-xl">
        <div className="flex items-center mb-6">
          <UserCircle size={28} className="mr-3 text-blue-500" />
          <h2 className="text-2xl font-semibold text-gray-700">Profile Management</h2>
        </div>

        <div className="space-y-4">
          {(user) ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium text-gray-600">Email:</span> <span className="text-gray-800">{user.email}</span></div>
                <div><span className="font-medium text-gray-600">Grade:</span> <span className="text-gray-800">{user.grade}</span></div>
                <div><span className="font-medium text-gray-600">Gender:</span> <span className="text-gray-800">{user.gender}</span></div>
                <div><span className="font-medium text-gray-600">Dormitory:</span> <span className="text-gray-800">{user.dormitory}</span></div>
              </div>
            </>
          ) : (
             <p className="text-gray-500">Loading user information...</p>
          )}
          <div className="mt-6 text-right">
            <button
              onClick={handleEditProfile}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <Edit size={16} className="mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </section>

      {/* Tag Management Section */}
      <section className="bg-white p-8 rounded-xl shadow-xl">
        <div className="flex items-center mb-6">
          <Tag size={28} className="mr-3 text-green-500" />
          <h2 className="text-2xl font-semibold text-gray-700">Manage Tags</h2>
        </div>

        <form onSubmit={handleAddNewTag} className="mb-6 flex gap-4 items-end">
          <div className="flex-grow">
            <label htmlFor="newTagName" className="block text-sm font-medium text-gray-700 mb-1">Add New Tag</label>
            <input
              type="text"
              id="newTagName"
              name="newTagName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              placeholder="Enter tag name"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            <PlusCircle size={16} className="mr-2" />
            Add Tag
          </button>
        </form>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3">Existing Tags:</h3>
          {mockTags.length > 0 ? (
            <ul className="space-y-3">
              {mockTags.map(tag => (
                <li key={tag.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <span className="text-gray-800">{tag.name}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditTag(tag.id, tag.name)}
                      className="text-blue-500 hover:text-blue-700 transition-colors p-1"
                      title="Edit Tag"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteTag(tag.id, tag.name)}
                      className="text-red-500 hover:text-red-700 transition-colors p-1"
                      title="Delete Tag"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tags created yet. Add one above!</p>
          )}
        </div>
      </section>
    </div>
  );
}
