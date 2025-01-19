import { Panel } from "@xyflow/react";
import './contentBlock.css'

export default function ContentBlock( {children, position} ){

    return (
        <Panel
            position={position}
            className={"blendmesh-content-block"}
        >
            {children}
        </Panel>
    )
}