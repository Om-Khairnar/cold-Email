import { create } from "zustand";
import { Node, Edge } from "../types/flow";

interface FlowState {
  nodes: Node[];
  edges: Edge[];
  addNode: (node: Node) => void;
  updateNode: (id: string, data: Partial<Node["data"]>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  removeEdge: (id: string) => void;
  saveFlow: () => void;
  loadFlow: () => void;
}

export const useStore = create<FlowState>((set) => ({
  nodes: [],
  edges: [],
  addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
  updateNode: (id, data) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    })),
  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter(
        (edge) => edge.source !== id && edge.target !== id
      ),
    })),
  addEdge: (edge) => set((state) => ({ edges: [...state.edges, edge] })),
  removeEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
    })),
  saveFlow: () =>
    set((state) => {
      const flowData = JSON.stringify({
        nodes: state.nodes,
        edges: state.edges,
      });
      localStorage.setItem("flowchart", flowData);
    }),
  loadFlow: () =>
    set(() => {
      const savedFlow = JSON.parse(localStorage.getItem("flowchart") || "{}");
      if (savedFlow.nodes && savedFlow.edges) {
        return { nodes: savedFlow.nodes, edges: savedFlow.edges };
      }
      return {};
    }),
}));
