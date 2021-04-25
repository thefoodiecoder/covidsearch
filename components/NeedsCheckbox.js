export default function NeedsCheckbox({ children, checked = false, onChange = () => { } }) {
    return (
        <label className="flex item-center justify-center p-3">
            <input type="checkbox" className="checked:bg-blue-600 checked:border-transparent" checked={checked} value="OXYGEN" onChange={onChange} />
            {" "}{children}
        </label>
    )
}