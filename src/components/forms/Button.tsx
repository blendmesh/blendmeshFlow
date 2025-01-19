export default function Button({children, onClick}) {
    return (
        <div className='element row'>
            <div className='col-100'>
                <button onClick={onClick}>{children}</button>
            </div>
        </div>
    )
}