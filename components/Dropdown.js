import { Autocomplete, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";

export default function Dropdown({
  options,
  value,
  selected,
  onChange,
  onSelect,
}) {
  const textField = (
    <Autocomplete.TextField
      onChange={onChange}
      label="Cities"
      value={value}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search City for Help"
    />
  );

  return (
    <div>
      <Autocomplete
        options={options}
        selected={selected}
        onSelect={onSelect}
        textField={textField}
      />
    </div>
  );
}
