import { useState } from "react";
import Color from "../../components/forms/Color";
import Form from "../../components/forms/Forms";
import Select, { Variant } from "../../components/forms/Select";
import Number from "../../components/forms/Number";
import { useViewportStore } from "../../store/viewport";
import FormGroup from "../../components/forms/formGroup";
import Checkbox from "../../components/forms/Checkbox";
import Text from "../../components/forms/Text";

export default function Grid() {
    const { 
        background1,
        background2
    } = useViewportStore()

    return (
        <>
            <Form>
                <Checkbox
                    isChecked={background1.enabled}
                    onChange={e => background1.updateEnabled(e.target.checked)}
                >
                    Primary grid
                </Checkbox>
                <FormGroup isActive={background1.enabled}>
                    <Select
                        label="grid"
                        isValue={background1.variant}
                        onChange={e => background1.updateVariant(e.target.value)}
                    >
                        <Variant />
                    </Select>
                    <Color
                        isValue={background1.gridColor}
                        onChange={e => background1.updateGridColor(e.target.value)}
                    >
                        grid color
                    </Color>
                    <Number
                        isValue={background1.lineWidth}
                        onChange={e => background1.updateLineWidth(e.target.value)}
                    >
                        line width
                    </Number>
                </FormGroup>

                <Checkbox
                    isChecked={background2.enabled}
                    onChange={e => background2.updateEnabled(e.target.checked)}
                >
                    Secundary grid
                </Checkbox>
                <FormGroup isActive={background2.enabled}>
                    <Select
                        label="grid"
                        isValue={background2.variant}
                        onChange={e => background2.updateVariant(e.target.value)}
                    >
                        <Variant />
                    </Select>
                    <Color
                        isValue={background2.gridColor}
                        onChange={e => background2.updateGridColor(e.target.value)}
                    >
                        grid color
                    </Color>
                    <Number
                        isValue={background2.lineWidth}
                        onChange={e => background2.updateLineWidth(e.target.value)}
                    >
                        line width
                    </Number>
                </FormGroup>
            </Form>
        </>
    )
}