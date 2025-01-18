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
import ContextMenu from './components/contextMenu/ContextMenu';
import Tabs, { TabContent } from './components/tabs/Tabs';
import Form from './components/forms/Forms';
import Grid from './modules/viewport/Grid';
import { useViewportStore } from './store/viewport';
import Separator from './components/forms/Separator';
import Control from './modules/viewport/Control';
import Minimap from './modules/viewport/Minimap';
import Select, { Position, Theme } from './components/forms/Select';
import Checkbox from './components/forms/Checkbox';

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

        <Tabs tabbed={["viewport", "debug"]}>
          <TabContent content="viewport">
            <Select
              label={"Position"}
              isValue={generalView.panelPosition}
              onChange={e => generalView.updatePanelPosition(e.target.value)}
            >
              <Position/>
            </Select>
            <Select
              label={"Theme color"}
              isValue={generalView.themeColor}
              onChange={e=>generalView.updateThemeColor(e.target.value)}
            >
              <Theme/>
            </Select>
            <Checkbox
              isChecked={generalView.snapToGrid}
              onChange={e=>generalView.updateSnapToGrid(e.target.checked)}
            >
              Snap to grid
            </Checkbox>
            <Separator/>
            <Grid />
            <Separator/>
            <Control/>
            <Separator/>
            <Minimap/>
            <Separator/>
          </TabContent>

          <TabContent content="debug" >
            <Form>

        <div className='element row'>
          <div className='col-100'>
            <input type="checkbox" checked={devtools} onChange={e => setDevtools(e.target.checked)} />
            <label>Devtools</label>
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
    minimap,
    generalView
  } = useViewportStore()



  const [devtools, setDevtools] = useState(false);

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
        colorMode={generalView.themeColor}
        snapToGrid={generalView.snapToGrid}
        snapGrid={[generalView.snapGridSize, generalView.snapGridSize]}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
      >
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}
        <Panel position={generalView.panelPosition}>
          {menuDebug()}
        </Panel>
        {devtools ? <DevTools /> : false}
        <Controls
          orientation={control.orientation}
          position={control.position} 
          showZoom={control.showZoom}
          showFitView={control.showFitView}
          showInteractive={control.showInteractive}
        />
        <MiniMap
          nodeColor={nodeColor}
          nodeStrokeWidth={minimap.nodeStrokeWidth}
          zoomable={minimap.zoomable}
          pannable={minimap.pannable} 
          position={minimap.position} 
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
