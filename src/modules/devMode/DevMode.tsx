import ContentBlock from "../../components/contentBlock/contentBlock";
import Tabs, { TabContent } from "../../components/tabs/Tabs";
import Select, { Position, Theme } from "../../components/forms/Select";
import Checkbox from "../../components/forms/Checkbox";
import Grid from "./components/Grid";
import Control from "./components/Control";
import Minimap from "./components/Minimap";
import Separator from "../../components/forms/Separator";
import Form from "../../components/forms/Forms";

import { useViewportStore } from "../../store/viewport";

export default function DevMode() {
    const { generalView } = useViewportStore()
    return (
        <ContentBlock position={generalView.panelPosition}>
            <Tabs tabbed={["viewport", "debug"]}>
                <TabContent content="viewport">
                    <Select
                        label={"Position"}
                        isValue={generalView.panelPosition}
                        onChange={e => generalView.updatePanelPosition(e.target.value)}
                    >
                        <Position />
                    </Select>
                    <Select
                        label={"Theme color"}
                        isValue={generalView.themeColor}
                        onChange={e => generalView.updateThemeColor(e.target.value)}
                    >
                        <Theme />
                    </Select>
                    <Checkbox
                        isChecked={generalView.snapToGrid}
                        onChange={e => generalView.updateSnapToGrid(e.target.checked)}
                    >
                        Snap to grid
                    </Checkbox>
                    <Separator label={"backgroud grid"}/>
                    <Grid />
                    <Separator label={"Control"}/>
                    <Control />
                    <Separator label={"Minimap"}/>
                    <Minimap />
                    <Separator />
                </TabContent>

                <TabContent content="debug" >
                    <Form>
                        <Checkbox
                            isChecked={generalView.devtools}
                            onChange={e => generalView.updateDevtools(e.target.checked)}
                        >Dev Tools</Checkbox>
                    </Form>
                </TabContent>
            </Tabs>
        </ContentBlock>
    )
}