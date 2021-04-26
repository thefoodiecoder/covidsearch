import { Checkbox } from "@shopify/polaris";

export default function NeedsCheckbox({
  label,
  checked = false,
  onChange = () => {},
}) {
  return <Checkbox label={label} checked={checked} onChange={onChange} />;
}
