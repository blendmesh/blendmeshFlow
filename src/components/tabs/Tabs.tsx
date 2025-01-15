import { Children, useState } from "react";
import './Tabs.css'

export default function Tabs( {tabbed, children}){

    const [tabs, setTabs] = useState(tabbed[0]);
    const onOptionChange = (event) => {
        setTabs(event.target.value)
    }

    return (
        <>
            <div className="blendmesh-tab-component">
                {tabbed.map((tab) => (
                    <label className="tab" key={tab.toString()}>
                    <input
                        key={tab.id}
                        type="radio"
                        value={tab}
                        checked={tabs === tab}
                        onChange={onOptionChange}
                    />
                    <span className="name">{tab}</span>
                    </label>
                ))}
            </div>

            {Children.map(children, child => 
                <>
                    {tabs === child.props.content && <div>{child}</div>}
                </>
            )}
        </>
    )
}

export function TabContent({children, content}) {
    return (
        <>
        {children}
        </>
    )
}