import { useCallback, useState, useRef } from 'react';
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
import Tabs, { TabContent } from './components/tabs/Tabs';
import Checkbox from './components/forms/Checkbox';
import Form from './components/forms/Forms';
import Color from './components/forms/Color';
import Grid from './modules/viewport/Grid';
import Select, { Position } from './components/forms/Select';
import { useViewportStore } from './store/viewport';

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

  function menuDebug() {
    return (
      <div
        className='panel-debug'
      >

        <Tabs tabbed={["viewport", "tab2", "tab3"]}>
          <TabContent content="viewport">
            <Grid />
          </TabContent>

          <TabContent content="tab2" >
            <Form>

        <div className='element row'>
          <div className='col-25'>
            <label>Panel position</label>
          </div>
          <div className='col-75'>
            <select value={panelPosition} onChange={e => setPanelPosition(e.target.value)}>
              <option value="top-left">top-left</option>
              <option value="top-center">top-center</option>
              <option value="top-right">top-right</option>
              <option value="bottom-left">bottom-left</option>
              <option value="bottom-center">bottom-center</option>
              <option value="bottom-right">bottom-right</option>
            </select>
          </div>
        </div>

        <div className='separator' />



        <div className='separator' />

        <div className='element row'>
          <div className='col-25'>
            <label>Control orientation</label>
          </div>
          <div className='col-75'>
            <select value={controlOrientation} onChange={e => setControlOrientation(e.target.value)}>
              <option value="horizontal">horizontal</option>
              <option value="vertical">vertical</option>
            </select>
          </div>
        </div>

        <div className='element row'>
          <div className='col-25'>
            <label>Control position</label>
          </div>

          <div className='col-75'>
            <select value={controlPosition} onChange={e => setControlPosition(e.target.value)}>
              <option value="top-left">top-left</option>
              <option value="top-center">top-center</option>
              <option value="top-right">top-right</option>
              <option value="bottom-left">bottom-left</option>
              <option value="bottom-center">bottom-center</option>
              <option value="bottom-right">bottom-right</option>
            </select>
          </div>
        </div>

        <div className='element row'>
          <div className='col-100'>
            <input type="checkbox" checked={controlShowZoom} onChange={e => setControlShowZoom(e.target.checked)} />
            <label>Control show zoom</label>
          </div>
        </div>

        <div className='element row'>
          <div className='col-100'>
            <input type="checkbox" checked={controlShowFitView} onChange={e => setControlShowFitView(e.target.checked)} />
            <label>Control show FitView</label>
          </div>
        </div>

        <div className='element row'>
          <div className='col-100'>
            <input type="checkbox" checked={controlShowInteractive} onChange={e => setControlShowInteractive(e.target.checked)} />
            <label>Control show Interactive</label>
          </div>
        </div>

        <div className='separator' />

        <div className='element row'>
          <div className='col-25'>
            <label>Minimap position</label>
          </div>
          <div className='col-75'>
            <select value={minimapPosition} onChange={e => setMinimapPosition(e.target.value)}>
              <option value="top-left">top-left</option>
              <option value="top-center">top-center</option>
              <option value="top-right">top-right</option>
              <option value="bottom-left">bottom-left</option>
              <option value="bottom-center">bottom-center</option>
              <option value="bottom-right">bottom-right</option>
            </select>
          </div>

        </div>

        <div className='separator' />

        <div className='element row'>
          <div className='col-100'>
            <input type="checkbox" checked={devtools} onChange={e => setDevtools(e.target.checked)} />
            <label>Devtools</label>
          </div>
        </div>
        <div className='element row'>
          <div className='col-100'>
            <input type="checkbox" checked={snapToGrid} onChange={e => setSnapToGrid(e.target.checked)} />
            <label>Snap to grid</label>
          </div>
        </div>

        <div className='element row'>
          <div className='col-25'>
            <label>color Mode</label>
          </div>

          <div className='col-75'>
            <select value={colorMode} onChange={e => setColorMode(e.target.value)}>
              <option value="system">system</option>
              <option value="light">light</option>
              <option value="dark">dark</option>
            </select>
          </div>
        </div>

            </Form>
          </TabContent>
        </Tabs>

        
      </div>
    )
  }

  const {
    background1,
    background2,
    control,
    minimap
  } = useViewportStore()



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
        snapGrid={[12, 12]}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
      >
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        <Panel position={panelPosition}>
          {menuDebug()}
        </Panel>
        {devtools ? <DevTools /> : false}
        <Controls orientation={controlOrientation}
        //  position={variant} 
         showZoom={controlShowZoom} showFitView={controlShowFitView} showInteractive={controlShowInteractive} />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={13} zoomable pannable 
        // position={position} 
        />
        {background1.enabled && 
          <Background
            id={1}
            gap={background1.gridGap} 
            size={background1.gridSize} 
            color={background1.gridColor} 
            variant={background1.variant} 
            lineWidth={background1.lineWidth}
          />
        }
        
        {background2.enabled && 
          <Background
            id={2}
            gap={background2.gridGap} 
            size={background2.gridSize} 
            color={background2.gridColor} 
            variant={background2.variant} 
            lineWidth={background2.lineWidth}
          />
        }
      </ReactFlow>
    </div>
  );
}
