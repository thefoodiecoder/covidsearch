import Link from 'next/link'
import { useEffect, useState } from 'react'
import Dropdown from "../components/Dropdown";
import NeedsCheckbox from '../components/NeedsCheckbox';
import providings from "../constants/providings";

export default function Home() {
  const [cities, setCities] = useState([])
  const [selected, setSelected] = useState("Select your city")
  const [needs, setNeeds] = useState([]);

  useEffect(() => {
    fetch("/api/cities").then((res) => res.json()).then(data => setCities(data.cities))
  }, [])

  const createHref = () => {
    const searchParams = new URLSearchParams()

    new Set(needs).has(providings.BED) && searchParams.append(providings.BED, "1")
    new Set(needs).has(providings.OXYGEN) && searchParams.append(providings.OXYGEN, "1")
    new Set(needs).has(providings.ICU_BED) && searchParams.append(providings.ICU_BED, "1")
    new Set(needs).has(providings.PLASMA) && searchParams.append(providings.PLASMA, "1")
    new Set(needs).has(providings.FOOD) && searchParams.append(providings.FOOD, "1")
    new Set(needs).has(providings.AMBULANCE) && searchParams.append(providings.AMBULANCE, "1")

    return searchParams.toString()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Dropdown items={cities} selected={selected} setSelected={setSelected} />
      </div>
      <div className="flex justify-evenly py-3">
        <NeedsCheckbox checked={new Set(needs).has(providings.BED)} onChange={(event) => setNeeds(needs => {
          const needSet = new Set(needs)
          if (event.target.checked) {
            needSet.add(providings.BED)
          }
          if (!event.target.checked) {
            needSet.delete(providings.BED)
          }
          return [...needSet]
        })}>
          {providings.BED}
        </NeedsCheckbox>

        <NeedsCheckbox checked={new Set(needs).has(providings.OXYGEN)} onChange={(event) => setNeeds(needs => {
          const needSet = new Set(needs)
          if (event.target.checked) {
            needSet.add(providings.OXYGEN)
          }
          if (!event.target.checked) {
            needSet.delete(providings.OXYGEN)
          }
          return [...needSet]
        })}>
          {providings.OXYGEN}
        </NeedsCheckbox>

        <NeedsCheckbox checked={new Set(needs).has(providings.PLASMA)} onChange={(event) => setNeeds(needs => {
          const needSet = new Set(needs)
          if (event.target.checked) {
            needSet.add(providings.PLASMA)
          }
          if (!event.target.checked) {
            needSet.delete(providings.PLASMA)
          }
          return [...needSet]
        })}>
          {providings.PLASMA}
        </NeedsCheckbox>

        <NeedsCheckbox checked={new Set(needs).has(providings.ICU_BED)} onChange={(event) => setNeeds(needs => {
          const needSet = new Set(needs)
          if (event.target.checked) {
            needSet.add(providings.ICU_BED)
          }
          if (!event.target.checked) {
            needSet.delete(providings.ICU_BED)
          }
          return [...needSet]
        })}>
          {providings.ICU_BED}
        </NeedsCheckbox>

        <NeedsCheckbox checked={new Set(needs).has(providings.AMBULANCE)} onChange={(event) => setNeeds(needs => {
          const needSet = new Set(needs)
          if (event.target.checked) {
            needSet.add(providings.AMBULANCE)
          }
          if (!event.target.checked) {
            needSet.delete(providings.AMBULANCE)
          }
          return [...needSet]
        })}>
          {providings.AMBULANCE}
        </NeedsCheckbox>

        <NeedsCheckbox checked={new Set(needs).has(providings.FOOD)} onChange={(event) => setNeeds(needs => {
          const needSet = new Set(needs)
          if (event.target.checked) {
            needSet.add(providings.FOOD)
          }
          if (!event.target.checked) {
            needSet.delete(providings.FOOD)
          }
          return [...needSet]
        })}>
          {providings.FOOD}
        </NeedsCheckbox>
      </div>
      <div className="flex justify-center">
        <Link href={`/search?${createHref()}`} >
          <button className="py-2 px-4 bg-pink-600 text-white font-semibold rounded-lg shadow-md focus:outline-none">Search</button>
        </Link>
      </div>
    </div>
  )
}
