export default function FormGroup({children, isActive}) {
    return (
        <>
            {isActive && children}
        </>
    )
}