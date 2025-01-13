import React, { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel
} from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import DevTools from './components/devtools/Devtools';
import ContextMenu from './components/ContextMenu';
 
const initialNodes = [
  { id: '1', type: "input", position: { x: 0, y: 0 }, data: { label: '1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
  { id: '3', type: "output", position: { x: 0, y: 200 }, data: { label: '3' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeColor = (node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    default:
      return '#ff0072';
  }
};

export default function App() {

  function menuDebug (){
    return (
      <div
        style={{
          width: '200px',
          height: 'auto',
          border: '1px solid black',
          borderRadius: '5px',
          padding: '5px',
          background: '#ffffff'
        }}
      >

        <div style={{ display: "flex" }}>
          <label>Panel position:</label>
          <select value={panelPosition} onChange={e => setPanelPosition(e.target.value)}>
            <option value="top-left">top-left</option>
            <option value="top-center">top-center</option>
            <option value="top-right">top-right</option>
            <option value="bottom-left">bottom-left</option>
            <option value="bottom-center">bottom-center</option>
            <option value="bottom-right">bottom-right</option>
          </select>
        </div>

        <hr />

        <div style={{ display: "flex" }}>
          <label>variant:</label>
          <select value={variant} onChange={e => setVariant(e.target.value)}>
            <option value="dots">dots</option>
            <option value="lines">lines</option>
            <option value="cross">cross</option>
          </select>
        </div>

        <div style={{ display: "flex" }}>
          <label>grid color:</label>
          <input type="color" value={gridColor} onChange={e => setGridColor(e.target.value)} />
        </div>

        <div style={{ display: "flex" }}>
          <label>grid size:</label>
          <input type="number" value={gridSize} onChange={e => setGridSize(e.target.value)} />
        </div>

        <div style={{ display: "flex" }}>
          <label>grid gap:</label>
          <input type="number" value={gridGap} onChange={e => setGridGap(e.target.value)} />
        </div>

        <hr />

        <div style={{ display: "flex" }}>
          <label>Control orientation:</label>
          <select value={controlOrientation} onChange={e => setControlOrientation(e.target.value)}>
            <option value="horizontal">horizontal</option>
            <option value="vertical">vertical</option>
          </select>
        </div>

        <div style={{ display: "flex" }}>
          <label>Control position:</label>
          <select value={controlPosition} onChange={e => setControlPosition(e.target.value)}>
            <option value="top-left">top-left</option>
            <option value="top-center">top-center</option>
            <option value="top-right">top-right</option>
            <option value="bottom-left">bottom-left</option>
            <option value="bottom-center">bottom-center</option>
            <option value="bottom-right">bottom-right</option>
          </select>
        </div>

        <div style={{ display: "flex" }}>
          <label>Control show zoom:</label>
          <input type="checkbox" checked={controlShowZoom} onChange={e => setControlShowZoom(e.target.checked)} />
        </div>

        <div style={{ display: "flex" }}>
          <label>Control show FitView:</label>
          <input type="checkbox" checked={controlShowFitView} onChange={e => setControlShowFitView(e.target.checked)} />
        </div>

        <div style={{ display: "flex" }}>
          <label>Control show Interactive:</label>
          <input type="checkbox" checked={controlShowInteractive} onChange={e => setControlShowInteractive(e.target.checked)} />
        </div>

        <hr />

        <div style={{ display: "flex" }}>
          <label>Minimap position:</label>
          <select value={minimapPosition} onChange={e => setMinimapPosition(e.target.value)}>
            <option value="top-left">top-left</option>
            <option value="top-center">top-center</option>
            <option value="top-right">top-right</option>
            <option value="bottom-left">bottom-left</option>
            <option value="bottom-center">bottom-center</option>
            <option value="bottom-right">bottom-right</option>
          </select>
        </div>

        <hr />

        <div style={{ display: "flex" }}>
          <label>Devtools:</label>
          <input type="checkbox" checked={devtools} onChange={e => setDevtools(e.target.checked)} />
        </div>

        <div style={{ display: "flex" }}>
          <label>color Mode:</label>
          <select value={colorMode} onChange={e => setColorMode(e.target.value)}>
            <option value="system">system</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
          </select>
        </div>

        <div style={{ display: "flex" }}>
          <label>Snap to grid:</label>
          <input type="checkbox" checked={snapToGrid} onChange={e => setSnapToGrid(e.target.checked)} />
        </div>
          
      </div>
    )
  }

  const [variant, setVariant] = useState('lines');
  const [gridColor, setGridColor] = useState('#D0D0D0');
  const [gridSize, setGridSize] = useState('1');
  const [gridGap, setGridGap] = useState('10');
  const [controlOrientation, setControlOrientation] = useState('vertical');
  const [controlPosition, setControlPosition] = useState('bottom-left');
  const [minimapPosition, setMinimapPosition] = useState('bottom-right');
  const [panelPosition, setPanelPosition] = useState('top-right');
  const [controlShowZoom, setControlShowZoom] = useState(true);
  const [controlShowFitView, setControlShowFitView] = useState(true);
  const [controlShowInteractive, setControlShowInteractive] = useState(true);
  const [devtools, setDevtools] = useState(false);
  const [colorMode, setColorMode] = useState('light');
  const [snapToGrid, setSnapToGrid] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [menu, setMenu] = useState(null);
  const ref = useRef(null);
 
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  const onNodeContextMenu = useCallback(
    (event, node) => {
      // Prevent native context menu from showing
      event.preventDefault();
 
      // Calculate position of the context menu. We want to make sure it
      // doesn't get positioned off-screen.
      const pane = ref.current.getBoundingClientRect();
      setMenu({
        id: node.id,
        top: event.clientY < pane.height - 200 && event.clientY,
        left: event.clientX < pane.width - 200 && event.clientX,
        right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
        bottom:
          event.clientY >= pane.height - 200 && pane.height - event.clientY,
      });
    },
    [setMenu],
  );
 
  // Close the context menu if it's open whenever the window is clicked.
  const onPaneClick = useCallback(() => setMenu(null), [setMenu]);
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        ref={ref}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={colorMode}
        snapToGrid={snapToGrid}
        snapGrid={[25,25]}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
      >
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        <Panel position={panelPosition}>
          {menuDebug()}
        </Panel>
        {devtools ? <DevTools/> : false}
        <Controls orientation={controlOrientation} position={controlPosition} showZoom={controlShowZoom} showFitView={controlShowFitView} showInteractive={controlShowInteractive}/>
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={13} zoomable pannable position={minimapPosition}/>
        <Background id={1} gap={gridGap} size={gridSize} color={gridColor} variant={variant} lineWidth={1}/>
        {/* <Background
        id={2}
        gap={100}
        color={"#cccccc"}
        variant={variant}
      /> */}
      </ReactFlow>
    </div>
  );
}
