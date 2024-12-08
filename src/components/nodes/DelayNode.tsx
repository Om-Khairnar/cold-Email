import React from 'react';
import { Handle, Position } from 'reactflow';
import { Clock } from 'lucide-react';

interface DelayNodeProps {
  data: {
    label: string;
    delayTime?: number;
    delayUnit?: 'minutes' | 'hours' | 'days';
  };
}

export const DelayNode: React.FC<DelayNodeProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-yellow-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <Clock className="w-5 h-5 text-yellow-500" />
        <span className="font-semibold">{data.label}</span>
      </div>
      {data.delayTime && data.delayUnit && (
        <div className="text-sm text-gray-600">
          Wait for: {data.delayTime} {data.delayUnit}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};