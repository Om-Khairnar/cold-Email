import React from 'react';
import { X } from 'lucide-react';
import { Node } from '../../../types/flow';

interface NodeModalProps {
  node: Node;
  onClose: () => void;
  onSave: (data: Partial<Node['data']>) => void;
  onDelete: () => void; // New prop for delete functionality
}

export const NodeModal: React.FC<NodeModalProps> = ({ node, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = React.useState(node.data);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const renderFields = () => {
    switch (node.type) {
      case 'email':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Subject</label>
              <input
                type="text"
                value={formData.emailSubject || ''}
                onChange={(e) => setFormData({ ...formData, emailSubject: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Body</label>
              <textarea
                value={formData.emailBody || ''}
                onChange={(e) => setFormData({ ...formData, emailBody: e.target.value })}
                rows={4}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </>
        );
      case 'delay':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Delay Time</label>
              <input
                type="number"
                value={formData.delayTime || ''}
                onChange={(e) => setFormData({ ...formData, delayTime: parseInt(e.target.value, 10) })}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Unit</label>
              <select
                value={formData.delayUnit || 'hours'}
                onChange={(e) => setFormData({ ...formData, delayUnit: e.target.value })}
                className="w-full p-2 border rounded-md"
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
              </select>
            </div>
          </>
        );
      case 'source':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Source Type</label>
            <select
              value={formData.sourceType || ''}
              onChange={(e) => setFormData({ ...formData, sourceType: e.target.value })}
              className="w-full p-2 border rounded-md"
            >
              <option value="website">Website Form</option>
              <option value="csv">CSV Import</option>
              <option value="api">API Integration</option>
              <option value="manual">Manual Entry</option>
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Configure {node.data.label}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {renderFields()}
          <div className="flex justify-between gap-2 mt-6">
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
            <div>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
