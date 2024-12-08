import React from 'react';
import { Mail, Clock, Users } from 'lucide-react';

interface SidebarProps {
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onDragStart }) => {
  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Flow Nodes</h2>
      <div className="space-y-3">
        <div
          className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg cursor-move hover:bg-blue-100 transition-colors"
          draggable
          onDragStart={(e) => onDragStart(e, 'email')}
        >
          <Mail className="w-5 h-5 text-blue-500" />
          <span>Email</span>
        </div>
        <div
          className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg cursor-move hover:bg-yellow-100 transition-colors"
          draggable
          onDragStart={(e) => onDragStart(e, 'delay')}
        >
          <Clock className="w-5 h-5 text-yellow-500" />
          <span>Delay</span>
        </div>
        <div
          className="flex items-center gap-2 p-3 bg-green-50 rounded-lg cursor-move hover:bg-green-100 transition-colors"
          draggable
          onDragStart={(e) => onDragStart(e, 'source')}
        >
          <Users className="w-5 h-5 text-green-500" />
          <span>Lead Source</span>
        </div>
      </div>
    </div>
  );
};