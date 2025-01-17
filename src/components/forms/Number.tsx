export default function Number({ children, isValue, onChange }) {
    return (
        <div className='element row'>
            <div className='col-25'>
                <label>{children}</label>
            </div>
            <div className='col-75'>
                <input
                    type="number"
                    value={isValue}
                    onChange={onChange}
                    min={1}
                />
            </div>
        </div>
    )
}