import { Sun } from "lucide-react";

const SunIcon = ({ color, size }: { size: string; color: string }) => {
  return <Sun size={size} color={color} fill={color} />;
};
export default SunIcon;
