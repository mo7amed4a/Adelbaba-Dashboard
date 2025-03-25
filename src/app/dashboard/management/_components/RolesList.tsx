"use client";
import { useFetch } from "@/hooks/use-fetch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type RoleType = {
  id: number;
  name: string;
};

interface RolesListProps {
  name: string;
  onValueChange: (value: string) => void;
  onTouched: () => void;
  defaultValue?: string;
}

export default function RolesList({ name, onValueChange, onTouched, defaultValue }: RolesListProps) {
  const { data, loading } = useFetch("/admin/management/admins/roles", true);
  const roles = data as RoleType[];

  if (loading) return <div>Loading roles...</div>;

  return (
    <Select
      name={name}
      onValueChange={onValueChange}
      onOpenChange={onTouched}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="rounded-lg w-full py-4 mt-2">
        <SelectValue placeholder="Select a role" />
      </SelectTrigger>
      <SelectContent>
        {roles?.map((role) => (
          <SelectItem key={role.id} value={role.name}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}