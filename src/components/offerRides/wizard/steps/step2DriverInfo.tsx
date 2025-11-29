// import the type
import { WizardData } from "./types";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  data: WizardData;
  setData: (data: WizardData) => void;
  currentStep: number;
  getStepTitle: () => string;
};
export default function Step2DriverInfo({ data, setData }: Props) {

  return (
    <Card className="p-6 lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Driver Information</h2>
        <p className="text-muted-foreground">Tell us about yourself</p>
      </div>

      <form className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full-name">Full Name *</Label>
            <Input
              id="full-name"
              placeholder="e.g., Ahmed Hassan"
              value={data.driver.fullName}
              onChange={(e) =>
                setData({
                  ...data,
                  driver: { ...data.driver, fullName: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              placeholder="e.g., +20 123 456 7890"
              value={data.driver.phone}
              onChange={(e) =>
                setData({
                  ...data,
                  driver: { ...data.driver, phone: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="e.g., ahmed@example.com"
              value={data.driver.email}
              onChange={(e) =>
                setData({
                  ...data,
                  driver: { ...data.driver, email: e.target.value },
                })
              }
            />
          </div>
        </div>
      </form>
    </Card>
  );
}
