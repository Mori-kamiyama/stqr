"use client";

import { Calendar, Tag, ExternalLink, Trash2, Edit3 } from 'lucide-react'; // Added more icons

interface LinkCardProps {
  id: string;
  title: string;
  link: string;
  dueDate?: string; // Optional due date
  tags: string[];
  onDelete?: (id: string) => void; // Optional delete handler
  onEdit?: (id: string) => void;   // Optional edit handler
}

export default function LinkCard({ id, title, link, dueDate, tags, onDelete, onEdit }: LinkCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="flex space-x-2">
          {onEdit && (
            <button onClick={() => onEdit(id)} className="text-blue-500 hover:text-blue-700 transition-colors">
              <Edit3 size={18} />
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(id)} className="text-red-500 hover:text-red-700 transition-colors">
              <Trash2 size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="mb-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline transition-colors flex items-center"
        >
          {link}
          <ExternalLink size={16} className="ml-2" />
        </a>
      </div>

      {dueDate && (
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <Calendar size={16} className="mr-2 text-gray-500" />
          <span>Due Date: {new Date(dueDate).toLocaleDateString()}</span>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium flex items-center"
            >
              <Tag size={12} className="mr-1.5" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
