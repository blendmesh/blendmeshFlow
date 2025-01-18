import Checkbox from "../../components/forms/Checkbox"
import Form from "../../components/forms/Forms"
import Number from "../../components/forms/Number"
import Select, { Position } from "../../components/forms/Select"
import { useViewportStore } from "../../store/viewport"

export default function Minimap() {
    const { minimap } = useViewportStore()
    return (
        <Form>
            <Select
                label={"Position"}
                isValue={minimap.position}
                onChange={e=>minimap.updatePosition(e.target.value)}
            >
                <Position/>
            </Select>
            <Number
                isValue={minimap.nodeStrokeWidth}
                onChange={e => minimap.updateStrokeWidth(e.target.value)}
            >
                node stroke width
            </Number>
            <Checkbox
                isChecked={minimap.pannable}
                onChange={e => minimap.updatePannable(e.target.checked)}
            >
                Pannable
            </Checkbox>
            <Checkbox
                isChecked={minimap.zoomable}
                onChange={e => minimap.updateZoomable(e.target.checked)}
            >
                Zoomable
            </Checkbox>
        </Form>
    )
}