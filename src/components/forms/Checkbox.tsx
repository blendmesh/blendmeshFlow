import './Forms.css'

export default function Checkbox({ children, isChecked, onChange }) {
  return (
    <div className='element row'>
      <div className='col-100'>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
        <label>{children}</label>
      </div>
    </div>
  )
}