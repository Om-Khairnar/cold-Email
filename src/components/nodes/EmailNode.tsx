import React from 'react';
import { Handle, Position } from 'reactflow';
import { Mail } from 'lucide-react';

interface EmailNodeProps {
  data: {
    label: string;
    emailSubject?: string;
    emailBody?: string;
  };
}

export const EmailNode: React.FC<EmailNodeProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 border-2 border-blue-500 min-w-[200px]">
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-5 h-5 text-blue-500" />
        <span className="font-semibold">{data.label}</span>
      </div>
      {data.emailSubject && (
        <div className="text-sm text-gray-600 mb-1">
          Subject: {data.emailSubject}
        </div>
      )}
      {data.emailBody && (
        <div className="text-sm text-gray-600 truncate">
          Body: {data.emailBody.substring(0, 50)}...
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};