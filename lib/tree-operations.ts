let mockTrees = [{ id: 'tree-1', name: 'The Montgomery Lineage', ownerId: 'mock', updatedAt: { toMillis: () => Date.now(), toDate: () => new Date() } }];
let mockNodes = [
  { id: '1', type: 'person', data: { firstName: 'James', lastName: 'Montgomery', details: '1865 — 1932' }, position: { x: 100, y: 100 } },
  { id: '2', type: 'person', data: { firstName: 'Sarah L.', lastName: 'Vance', details: '1870 — 1945' }, position: { x: 350, y: 100 } },
  { id: '3', type: 'person', data: { firstName: 'Arthur', lastName: 'Montgomery', details: '1892 — 1954', photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' }, position: { x: 225, y: 300 } }
];
let mockEdges = [
  { id: 'e1', source: '1', target: '3' },
  { id: 'e2', source: '2', target: '3' }
];

export async function createTree(name: string) { return 'tree-1'; }
export async function addNode(treeId: string, node: any) { return Date.now().toString(); }
export async function updateNode(treeId: string, nodeId: string, updates: any) {}
export async function removeNodeAndEdges(treeId: string, nodeId: string, connectedEdgeIds: string[]) {}
export async function addEdge(treeId: string, edge: any) { return Date.now().toString(); }
export async function removeEdge(treeId: string, edgeId: string) {}
export async function logAction(treeId: string, action: string) {}

export function getMockNodes() { return mockNodes; }
export function getMockEdges() { return mockEdges; }
export function getMockTrees() { return mockTrees; }
