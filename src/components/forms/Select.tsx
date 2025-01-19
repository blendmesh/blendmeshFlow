export default function Select({ children, label, isValue, onChange }) {
    return (
        <div className='element row'>
            <div className='col-50'>
                <label>{label}</label>
            </div>
            <div className='col-50'>
                <select
                    value={isValue}
                    onChange={onChange}
                >
                    {children}
                </select>
            </div>
        </div>
    )
}

export function Position() {
    return (
        <>
            <option value="top-left">top-left</option>
            <option value="top-center">top-center</option>
            <option value="top-right">top-right</option>
            <option value="bottom-left">bottom-left</option>
            <option value="bottom-center">bottom-center</option>
            <option value="bottom-right">bottom-right</option>
        </>
    )
}

export function Variant(){
    return (
        <>
            <option value="dots">dots</option>
            <option value="lines">lines</option>
            <option value="cross">cross</option>
        </>
    )
}

export function Orientation() {
    return (
        <>
            <option value="horizontal">horizontal</option>
            <option value="vertical">vertical</option>
        </>
    )
}

export function Theme() {
    return (
        <>
            <option value="system">system</option>
            <option value="light">light</option>
            <option value="dark">dark</option>
        </>
    )
}
