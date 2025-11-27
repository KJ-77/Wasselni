// import the type
import { WizardData } from "./types";

type Props = {
  data: WizardData;
  setData: (data: WizardData) => void;
};

export default function Step2DriverInfo({ data, setData }: Props) {

  return (
    <div className="space-y-3">
      <input
        className="border p-2 rounded w-full"
        placeholder="Full Name"
        value={data.driver.fullName}
        onChange={(e) =>
          setData({ ...data, driver: { ...data.driver, fullName: e.target.value } })
        }
      />
      <input
        className="border p-2 rounded w-full"
        placeholder="Phone"
        value={data.driver.phone}
        onChange={(e) =>
          setData({ ...data, driver: { ...data.driver, phone: e.target.value } })
        }
      />
    </div>
  );
}
