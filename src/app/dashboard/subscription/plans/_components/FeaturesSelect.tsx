// components/FeaturesSelect.tsx
"use client";
import { useFetch } from "@/hooks/use-fetch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type FeatureType = {
  id: number;
  name: string;
};

interface FeaturesSelectProps {
  name: string;
  onChange: (value: number[]) => void;
  onBlur: () => void;
  value: number[];
}

export default function FeaturesSelect({ name, onChange, onBlur, value }: FeaturesSelectProps) {
  const { data, loading } = useFetch("/admin/subscriptions/features");
  const features = data as FeatureType[] || [];

  const handleSelect = (featureId: string) => {
    const id = parseInt(featureId);
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  if (loading) return <div>Loading features...</div>;

  return (
    <div>
      <Select onValueChange={handleSelect} onOpenChange={onBlur}>
        <SelectTrigger className="rounded-lg w-full py-4 mt-2">
          <SelectValue placeholder="Select features" />
        </SelectTrigger>
        <SelectContent>
          {features.map((feature) => (
            <SelectItem key={feature.id} value={feature.id.toString()}>
              {feature.name} {value.includes(feature.id) && <span className="text-green-500">(Selected)</span>}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-2">
        {value.length > 0 ? (
          <div>
            Selected: {features.filter(f => value.includes(f.id)).map(f => f.name).join(", ")}
          </div>
        ) : (
          <div>No features selected</div>
        )}
      </div>
    </div>
  );
}