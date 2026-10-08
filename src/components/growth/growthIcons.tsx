import {
  FileText,
  Headset,
  Mail,
  MapPin,
  Palette,
  Pencil,
  Rocket,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { GrowthIconName } from "@/content/growth-services";

export const growthIconMap: Record<GrowthIconName, LucideIcon> = {
  search: Search,
  wrench: Wrench,
  "shield-check": ShieldCheck,
  headset: Headset,
  pencil: Pencil,
  zap: Zap,
  "map-pin": MapPin,
  palette: Palette,
  "file-text": FileText,
  mail: Mail,
  "share-2": Share2,
  rocket: Rocket,
  sparkles: Sparkles,
};
