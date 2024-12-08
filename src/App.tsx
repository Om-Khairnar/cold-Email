import React, { useCallback } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { Sidebar } from './components/Sidebar';
import { Flow } from './components/Flow';
import { useStore } from './store/useStore';

function App() {
  const addNode = useStore((state) => state.addNode);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      const position = { x: event.clientX - 300, y: event.clientY - 100 };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { label: type.charAt(0).toUpperCase() + type.slice(1) },
      };

      addNode(newNode);
    },
    [addNode]
  );

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar onDragStart={onDragStart} />
      <div className="flex-1" onDrop={onDrop} onDragOver={onDragOver}>
        <ReactFlowProvider>
          <Flow />
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default App;