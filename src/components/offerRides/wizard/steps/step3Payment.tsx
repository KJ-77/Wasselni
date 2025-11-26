// import the type
import { WizardData } from "./types";

type Props = {
  data: WizardData;
  setData: (data: WizardData) => void;
};

export default function Step3Payment({ data, setData }: Props) {

  return (
    <div className="space-y-3">
      <select
        className="border p-2 rounded w-full"
        value={data.payment.method}
        onChange={(e) =>
          setData({
            ...data,
            payment: { ...data.payment, method: e.target.value },
          })
        }
      >
        <option value="">Select method</option>
        <option value="cash">Cash</option>
        <option value="card">Card</option>
      </select>

      {data.payment.method === "card" && (
        <input
          className="border p-2 rounded w-full"
          placeholder="Card Number"
          value={data.payment.cardNumber || ""}
          onChange={(e) =>
            setData({
              ...data,
              payment: { ...data.payment, cardNumber: e.target.value },
            })
          }
        />
      )}
    </div>
  );
}
