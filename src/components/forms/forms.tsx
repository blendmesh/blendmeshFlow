import { useState } from "react"
import { FormContext } from "../../context/FormContext"

import './Forms.css'

export default function Form ( {children} ){
    const [checked, setChecked] = useState(true)

    return (
        <>
            {checked ? 'true' : 'false'}

            <FormContext.Provider value={{checked, setChecked}}>
                {children}
                
            </FormContext.Provider>
        </>
    )
}


