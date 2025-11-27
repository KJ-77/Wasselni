import { WizardData } from "./types";

interface Props {
  data: WizardData;
  setData: (data: WizardData) => void;
}

export default function Step1CarDetails({ data, setData }: Props) {
  return (
    <div className="space-y-3">
      <input
        className="border p-2 rounded w-full"
        placeholder="Car brand"
        value={data.car.brand}
        onChange={(e) =>
          setData({ ...data, car: { ...data.car, brand: e.target.value } })
        }
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Car model"
        value={data.car.model}
        onChange={(e) =>
          setData({ ...data, car: { ...data.car, model: e.target.value } })
        }
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Year"
        value={data.car.year}
        onChange={(e) =>
          setData({ ...data, car: { ...data.car, year: e.target.value } })
        }
      />
    </div>
  );
}
