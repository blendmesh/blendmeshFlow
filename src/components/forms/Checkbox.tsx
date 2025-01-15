import { useContext } from "react"
import { FormContext } from "../../context/FormContext"

export default function Checkbox ({label}) {
  const {checked, setChecked} = useContext(FormContext)
    return (
        <div className='element row'>
          <div className='col-100'>
            <FormContext.Provider value={{checked, setChecked}}>
              <input
                type="checkbox"
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
            />
            {checked ? 'true' : 'false'}
            <label>{label}</label>
            </FormContext.Provider>
          </div>
        </div>
    )
}