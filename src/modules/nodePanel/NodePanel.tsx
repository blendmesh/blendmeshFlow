import ContentBlock from "../../components/contentBlock/contentBlock";
import './NodePanel.css'
import { useDndStore } from "../../store/Dnd";


export default function NodePanel() {
    const {setNodeType} = useDndStore()

    const onDragStart = (event, nodeType) => {
        setNodeType(nodeType)
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <ContentBlock position={"top-left"}>
            
            <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
                Input Node
            </div>
            <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default')} draggable>
                Default Node
            </div>
            <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
                Output Node
            </div>
        </ContentBlock>
    )
}