"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // For back button
import Link from 'next/link'; // For back button
import { useLinks } from '@/contexts/LinkContext';

interface FormData {
  title: string;
  link: string;
  tags: string; // Comma-separated tags
  dueDate?: string; // Optional
}

export default function AddLinkPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const router = useRouter();
  const { addLink } = useLinks();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const processedData = {
      ...data,
      id: Date.now().toString(), // Simple unique ID
      tags: data.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''), // Process tags
      dueDate: data.dueDate || undefined,
    };
    console.log("Form Data Submitted:", processedData);
    addLink(processedData);
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto max-w-2xl py-8 px-4">
      <div className="mb-6">
        <Link href="/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Link</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-xl space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register('title', { required: 'Title is required' })}
            className={`mt-1 block w-full px-4 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
            Link URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="link"
            {...register('link', {
              required: 'Link URL is required',
              pattern: {
                value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                message: 'Please enter a valid URL (e.g., http://example.com)'
              }
            })}
            className={`mt-1 block w-full px-4 py-2 border ${errors.link ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            placeholder="https://example.com"
          />
          {errors.link && <p className="mt-1 text-xs text-red-600">{errors.link.message}</p>}
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            {...register('tags')}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="e.g., work, personal, important"
          />
          <p className="mt-1 text-xs text-gray-500">Separate tags with a comma.</p>
        </div>

        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date (Optional)
          </label>
          <input
            type="date"
            id="dueDate"
            {...register('dueDate')}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          >
            Save Link
          </button>
        </div>
      </form>
    </div>
  );
}
