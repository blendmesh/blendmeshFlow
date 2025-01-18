import Checkbox from "../../components/forms/Checkbox";
import Form from "../../components/forms/Forms";
import Select, { Orientation, Position } from "../../components/forms/Select";
import { useViewportStore } from "../../store/viewport";

export default function Control() {
    const { control } = useViewportStore()
    return (
        <Form>
            <Select
                label={"Position"} 
                isValue={control.position} 
                onChange={e => control.updatePosition(e.target.value)}
            >
                <Position/>
            </Select>
            <Select
                label={"Orientation"} 
                isValue={control.orientation} 
                onChange={e => control.updateOrientation(e.target.value)}
            >
                <Orientation/>
            </Select>
            <Checkbox
                isChecked={control.showZoom}
                onChange={e => control.updateShowZoom(e.target.checked)}
            >
                show zoom
            </Checkbox>
            <Checkbox
                isChecked={control.showFitView}
                onChange={e => control.updateShowFitView(e.target.checked)}
            >
                show fitview
            </Checkbox>
            <Checkbox
                isChecked={control.showInteractive}
                onChange={e => control.updateShowInteractive(e.target.checked)}
            >
                show interactive
            </Checkbox>
        </Form>
    )
}