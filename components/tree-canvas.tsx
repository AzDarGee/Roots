"use client";

import { useEffect, useState, useCallback } from "react";
import { 
  ReactFlow, 
  Controls, 
  applyNodeChanges, 
  applyEdgeChanges, 
  Connection,
  addEdge as reactFlowAddEdge
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CustomPersonNode } from "./person-node";
import { NodeEditor } from "./node-editor";
import { Plus } from "lucide-react";
import { getMockNodes, getMockEdges } from "@/lib/tree-operations";

const nodeTypes = {
  person: CustomPersonNode
};

export function TreeCanvas({ treeId }: { treeId: string }) {
  const [nodes, setNodes] = useState<any[]>(getMockNodes());
  const [edges, setEdges] = useState<any[]>(getMockEdges());
  const [selectedNode, setSelectedNode] = useState<any | null>(null);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => applyNodeChanges(changes, nds));
  }, []);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => reactFlowAddEdge(connection, eds));
  }, []);

  const handleAddPerson = () => {
    setNodes(prev => [...prev, {
      id: Date.now().toString(),
      type: 'person',
      position: { x: Math.random() * 200, y: Math.random() * 200 },
      data: { firstName: 'New', lastName: 'Record' }
    }]);
  };

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={(params) => {
          if (params.nodes.length > 0) setSelectedNode(params.nodes[0]);
          else setSelectedNode(null);
        }}
        fitView
      >
        {/* We use our own custom background in the wrapper div */}
        <Controls showInteractive={false} className="!bg-[#141416] !border-[#2D2D30] [&>button]:!border-[#2D2D30] [&>button]:!bg-[#141416] [&>button]:!fill-[#E0E0E0] [&>button:hover]:!bg-[#242426]" />
      </ReactFlow>

      {/* Editor Overlay replaces the bottom toolbox */}
      {selectedNode && (
        <NodeEditor 
          treeId={treeId}
          node={selectedNode}
          edges={edges}
          onClose={() => setSelectedNode(null)}
        />
      )}
      
      {!selectedNode && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <button 
            onClick={handleAddPerson}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#C5A059] text-[#0A0A0B] font-bold tracking-wide hover:bg-[#a38346] transition-colors shadow-2xl"
          >
            <Plus className="h-5 w-5" />
            Add Relative
          </button>
        </div>
      )}
    </>
  );
}
