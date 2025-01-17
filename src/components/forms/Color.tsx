import './Forms.css'

export default function Color({children, isValue, onChange}){
    return (
        <div className='element row'>
            <div className='col-25'>
                <label>{children}</label>
            </div>
            <div className='col-75'>
                <input
                    type="color"
                    value={isValue}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

