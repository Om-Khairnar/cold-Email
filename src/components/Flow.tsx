import React, { useCallback, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Connection,
  Edge,
  Node as FlowNode,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useStore } from '../store/useStore';
import { EmailNode } from './nodes/EmailNode';
import { DelayNode } from './nodes/DelayNode';
import { SourceNode } from './nodes/SourceNode';
import { NodeModal } from './modals/NodeModal';
import { Node } from '../types/flow';

const nodeTypes = {
  email: EmailNode,
  delay: DelayNode,
  source: SourceNode,
};

export const Flow: React.FC = () => {
  const { nodes, edges, addEdge: addNewEdge, updateNode , removeNode } = useStore();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        id: `e${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
      };
      addNewEdge(newEdge);
    },
    [addNewEdge]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: FlowNode) => {
      setSelectedNode(node as Node);
    },
    []
  );

  const handleModalClose = () => {
    setSelectedNode(null);
  };

  const handleModalSave = (data: Partial<Node['data']>) => {
    if (selectedNode) {
      updateNode(selectedNode.id, data);
    }
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      removeNode(selectedNode.id);
    }
    setSelectedNode(null); // Close the modal after deletion
  };


  return (
    <div className="flex-1 h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      {selectedNode && (
        <NodeModal
          node={selectedNode}
          onClose={handleModalClose}
          onSave={handleModalSave}
          onDelete={handleDeleteNode}
        />
      )}
    </div>
  );
};