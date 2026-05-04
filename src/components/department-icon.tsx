import { Building2, Heart, Microscope, Scissors, Sparkles, Stethoscope, type LucideIcon, } from "lucide-react";
const map: Record<string, LucideIcon> = {
    Building2,
    Heart,
    Microscope,
    Scissors,
    Sparkles,
    Stethoscope,
};
export function DepartmentIcon({ name, className, }: {
    name: string;
    className?: string;
}) {
    const Icon = map[name] ?? Building2;
    return <Icon className={className} aria-hidden/>;
}
