import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Vehicle } from "./wizard/steps/types";
import { Upload, X } from "lucide-react";

interface AddVehicleModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onVehicleAdd: (vehicle: Omit<Vehicle, 'id' | 'verified'>) => void;
}

const vehicleTypes = [
  { type: "sedan", emoji: "🚗", name: "Sedan" },
  { type: "suv", emoji: "🚙", name: "SUV" },
  { type: "van", emoji: "🚐", name: "Van" },
  { type: "hatchback", emoji: "🚘", name: "Hatchback" },
];

export default function AddVehicleModal({ isOpen, onOpenChange, onVehicleAdd }: AddVehicleModalProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [plate, setPlate] = useState("");
  const [color, setColor] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!make || !model || !year || !plate || !color || !capacity || !selectedType || !photoPreview) {
        // Basic validation
        alert("Please fill all required fields.");
        return;
    }
    
    onVehicleAdd({
        make,
        model,
        year: Number(year),
        plate,
        color,
        capacity: Number(capacity),
        type: selectedType,
        photo: photoPreview,
    });
    onOpenChange(false); // Close modal on submit
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Vehicle</DialogTitle>
          <DialogDescription>Register your vehicle to start offering rides.</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Make *</Label><Input value={make} onChange={e => setMake(e.target.value)} placeholder="e.g., BMW" /></div>
                <div className="space-y-2"><Label>Model *</Label><Input value={model} onChange={e => setModel(e.target.value)} placeholder="e.g., X3" /></div>
                <div className="space-y-2"><Label>Year *</Label><Input type="number" value={year} onChange={e => setYear(Number(e.target.value))} placeholder="e.g., 2020" /></div>
                <div className="space-y-2"><Label>License Plate *</Label><Input value={plate} onChange={e => setPlate(e.target.value)} placeholder="e.g., B 1234" /></div>
                <div className="space-y-2"><Label>Color *</Label><Input value={color} onChange={e => setColor(e.target.value)} placeholder="e.g., Black" /></div>
                <div className="space-y-2">
                    <Label>Seating Capacity *</Label>
                    <Select onValueChange={(val) => setCapacity(Number(val))}>
                        <SelectTrigger><SelectValue placeholder="Select capacity" /></SelectTrigger>
                        <SelectContent>
                            {[...Array(7).keys()].map(i => <SelectItem key={i+1} value={(i + 2).toString()}>{i + 2} seats</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Vehicle Type */}
            <div className="space-y-2">
                <Label>Vehicle Type *</Label>
                <div className="grid grid-cols-4 gap-3">
                    {vehicleTypes.map(({type, emoji, name}) => (
                        <Card key={type} onClick={() => setSelectedType(type)} className={`p-4 text-center cursor-pointer transition-all ${selectedType === type ? 'border-primary bg-primary/10' : ''}`}>
                            <div className="text-3xl mb-2">{emoji}</div>
                            <div className="font-medium text-sm">{name}</div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
                <Label>Vehicle Photo *</Label>
                <Card className="p-4 text-center border-2 border-dashed hover:border-primary transition-all">
                    <label htmlFor="photo-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="font-medium mt-2">Click to upload vehicle photo</p>
                        <p className="text-xs text-muted-foreground mt-1">JPG, PNG or WEBP</p>
                    </label>
                    <Input id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handlePhotoChange} />
                </Card>
                {photoPreview && (
                    <div className="relative w-full h-32 mt-2">
                        <img src={photoPreview} alt="Preview" className="rounded-md w-full h-full object-cover" />
                        <Button variant="destructive" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={() => { setPhotoPreview(null); }}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
            {/* Document Uploads */}
             <div className="space-y-2">
                <Label>Registration Document *</Label>
                 <Card className="p-4 text-center border-2 border-dashed hover:border-primary transition-all">
                    <label htmlFor="reg-doc-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="font-medium mt-2">Click to upload registration</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG</p>
                    </label>
                    <Input id="reg-doc-upload" type="file" className="hidden" accept="image/*,application/pdf" />
                </Card>
            </div>
             <div className="space-y-2">
                <Label>Insurance Document *</Label>
                 <Card className="p-4 text-center border-2 border-dashed hover:border-primary transition-all">
                    <label htmlFor="ins-doc-upload" className="cursor-pointer">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="font-medium mt-2">Click to upload insurance</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG</p>
                    </label>
                    <Input id="ins-doc-upload" type="file" className="hidden" accept="image/*,application/pdf" />
                </Card>
            </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Register Vehicle</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
