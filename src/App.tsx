import { useCallback, useState, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
import DevTools from './components/devtools/Devtools';
import DevMode from './modules/devMode/devMode';
import ContextMenu from './components/contextMenu/ContextMenu';
import { useViewportStore } from './store/viewport';
import { useDndStore } from './store/Dnd';
import { Panel } from '@xyflow/react';
import NodePanel from './modules/nodePanel/NodePanel';


const initialNodes = [
  { id: '1', type: "input", position: { x: 0, y: 0 }, data: { label: '1', colorMap: "#6ede87"  } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: '2', colorMap: "#ff0072"  }},
  { id: '3', type: "output", position: { x: 0, y: 200 }, data: { label: '3', colorMap: "#6865A5" } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeColor = (node) => {
  return node.data.colorMap
};

const flowKey = 'example-flow';

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function App() {
  const {
    background1,
    background2,
    control,
    minimap,
    generalView
  } = useViewportStore()

  const {nodeType} = useDndStore()

  const {screenToFlowPosition} = useReactFlow()
 
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // save and restore
  const [ rfInstance, setRfInstance] = useState(null);
  const { setViewport } = useReactFlow();

  const fileRef = useRef()

  // context menu
  const [menu, setMenu] = useState(null);
  const ref = useRef(null);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  // save and restore
  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem(flowKey, JSON.stringify(flow));
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = JSON.parse(localStorage.getItem(flowKey));

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport]);

  const exportData = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();

      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(flow)
      )}`;
      const link = document.createElement("a");
      link.href = jsonString;
      link.download = "data.json";
  
      link.click();
    }
  }, [rfInstance]);

  const onChangeFile = useCallback((e) => {
    const restoreFlow = async (e) => {
      if (e.target.files && e.target.files[0]) {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
          const target = e.target;
          const flow = JSON.parse(target?.result);

          console.log(flow)
          const { x = 0, y = 0, zoom = 1 } = flow.viewport;
          setNodes(flow.nodes || []);
          setEdges(flow.edges || []);
          setViewport({ x, y, zoom });
        }
      }
    };

    restoreFlow(e);
  }, [setNodes]);

  // context menu
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

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    // console.log(nodeType)
    (event) => {
      event.preventDefault();
 
      // check if the dropped element is valid
      if (!nodeType) {
        return;
      }
 
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        nodeType,
        position,
        data: { label: `${nodeType} node` },
      };
 
      setNodes((nds) => nds.concat(newNode));
    },
    [nodeType],
  );

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
        fitView
        fitViewOptions={{ padding: 2 }}
        style={{ backgroundColor: generalView.backgroundColor }}
        onInit={setRfInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}

        { generalView.devtools && <DevTools />}
        { generalView.devtools && 
          <Panel position="top-center">
            <button onClick={onSave}>save</button>
            <button onClick={onRestore}>restore</button>
            <button onClick={exportData}>download</button>
            <input
              type="file"
              id="input_json"
              ref={fileRef}
              onChange={onChangeFile}
            />
          </Panel>
        }

        <DevMode />
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
        <NodePanel/>
      </ReactFlow>
    </div>
  );
}