import { Button } from "@shopify/polaris";
import Link from "next/link";
import { useState, useCallback } from "react";
import Dropdown from "../components/Dropdown";
import NeedsCheckbox from "../components/NeedsCheckbox";
import cities from "../constants/cities";
import providings from "../constants/providings";

export default function Home() {
  const citiesOptions = cities
    .sort()
    .map((city) => ({ value: city, label: city }));
  const [needs, setNeeds] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [options, setOptions] = useState(citiesOptions);

  const updateText = useCallback(
    (value) => {
      setInputValue([value]);

      if (value === "") {
        setOptions(citiesOptions);
        return;
      }

      const filterRegex = new RegExp(value, "i");
      const resultOptions = citiesOptions.filter((option) =>
        option.label.match(filterRegex)
      );
      setOptions(resultOptions);
    },
    [citiesOptions]
  );

  const updateSelection = useCallback(
    (selected) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => {
          return option.value.match(selectedItem);
        });
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue);
    },
    [options]
  );

  const createHref = () => {
    const searchParams = new URLSearchParams();

    // Add cities in query params
    inputValue.length && searchParams.append("cities", inputValue.join(","));

    // Add providing in query params
    new Set(needs).has(providings.BED) &&
      searchParams.append(providings.BED, "1");
    new Set(needs).has(providings.OXYGEN) &&
      searchParams.append(providings.OXYGEN, "1");
    new Set(needs).has(providings.PLASMA) &&
      searchParams.append(providings.PLASMA, "1");
    new Set(needs).has(providings.FOOD) &&
      searchParams.append(providings.FOOD, "1");
    new Set(needs).has(providings.AMBULANCE) &&
      searchParams.append(providings.AMBULANCE, "1");

    return searchParams.toString();
  };

  const selectNeeds = (checked, providing) =>
    setNeeds((needs) => {
      const needSet = new Set(needs);
      if (checked) {
        needSet.add(providing);
      }
      if (!checked) {
        needSet.delete(providing);
      }
      return [...needSet];
    });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Dropdown
          value={inputValue}
          options={citiesOptions}
          selected={selectedOptions}
          onChange={updateText}
          onSelect={updateSelection}
        />
      </div>
      <div className="flex justify-evenly py-3">
        <NeedsCheckbox
          label={providings.BED}
          checked={new Set(needs).has(providings.BED)}
          onChange={(checked) => selectNeeds(checked, providings.BED)}
        />

        <NeedsCheckbox
          label={providings.OXYGEN}
          checked={new Set(needs).has(providings.OXYGEN)}
          onChange={(checked) => selectNeeds(checked, providings.OXYGEN)}
        />

        <NeedsCheckbox
          label={providings.PLASMA}
          checked={new Set(needs).has(providings.PLASMA)}
          onChange={(checked) => selectNeeds(checked, providings.PLASMA)}
        />

        <NeedsCheckbox
          label={providings.AMBULANCE}
          checked={new Set(needs).has(providings.AMBULANCE)}
          onChange={(checked) => selectNeeds(checked, providings.AMBULANCE)}
        />
        <NeedsCheckbox
          label={providings.FOOD}
          checked={new Set(needs).has(providings.FOOD)}
          onChange={(checked) => selectNeeds(checked, providings.FOOD)}
        />
      </div>
      <div className="flex justify-center">
        <Link href={`/search?${createHref()}`}>
          <Button primary>Search</Button>
        </Link>
      </div>
    </div>
  );
}
