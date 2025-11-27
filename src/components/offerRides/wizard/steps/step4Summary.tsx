// import the type
import { WizardData } from "./types";

type Props = {
  data: WizardData;
  setData: (data: WizardData) => void;
};



export default function Step4Summary({ data }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="font-bold">Car Details</h2>
      <p>{data.car.brand} — {data.car.model} — {data.car.year}</p>

      <h2 className="font-bold mt-4">Driver</h2>
      <p>{data.driver.fullName} — {data.driver.phone}</p>

      <h2 className="font-bold mt-4">Payment</h2>
      <p>{data.payment.method}</p>
    </div>
  );
}
