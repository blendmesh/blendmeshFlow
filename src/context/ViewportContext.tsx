import { createContext } from 'react';

export const ViewportContext = createContext(["", () => {}]);


// EXAMPLE add context
// import { useContext } from "react"
// import { FormContext } from "../../context/FormContext"

// export default function Checkbox ({label}) {
//   const {checked, setChecked} = useContext(FormContext)
//     return (
//         <div className='element row'>
//           <div className='col-100'>
//             <FormContext.Provider value={{checked, setChecked}}>
//               <input
//                 type="checkbox"
//                 checked={checked}
//                 onChange={e => setChecked(e.target.checked)}
//             />
//             <label>{label}</label>
//             </FormContext.Provider>
//           </div>
//         </div>
//     )
// }


// EXAMPLE consume context
// import { useState } from "react"
// import { FormContext } from "../../context/FormContext"

// export default function Form ( {children} ){
//     const [checked, setChecked] = useState(true)
//     return (
//         <>
//             {checked ? 'true' : 'false'}
//             <FormContext.Provider value={{checked, setChecked}}>
//                 {children}
//             </FormContext.Provider>
//         </>
//     )
// }
