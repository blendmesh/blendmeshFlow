export default function Separator({label}) {
    return (
        <div className="separator">
            {label && <p>{label}</p>}
        </div>
    )
}