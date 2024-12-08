import React from 'react';
import { Handle, Position } from 'reactflow';
import { Users } from 'lucide-react';

interface SourceNodeProps {
  data: {
    label: string;
    sourceType?: string;
  };
}

export const SourceNode: React.FC<SourceNodeProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-green-500 min-w-[200px]">
      <div className="flex items-center gap-2 mb-2">
        <Users className="w-5 h-5 text-green-500" />
        <span className="font-semibold">{data.label}</span>
      </div>
      {data.sourceType && (
        <div className="text-sm text-gray-600">
          Type: {data.sourceType}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};