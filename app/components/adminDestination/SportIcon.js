import { GrYoga } from "react-icons/gr";
import { SiAlltrails } from "react-icons/si";
import { FaSkiing, FaRunning } from "react-icons/fa";
import { MdOutlineParagliding } from "react-icons/md";
import { FaRegQuestionCircle } from "react-icons/fa"; // Icône par défaut

const sportIcons = {
  "yoga": GrYoga,
  "randonnée": SiAlltrails,
  "randonnee": SiAlltrails,
  "ski": FaSkiing,
  "trail": FaRunning,
  "parapente": MdOutlineParagliding,
};

export function SportIcon({ sport, size = 28, className = "" }) {
  if (!sport) return null;
  const key = sport.trim().toLowerCase();
  const Icon = sportIcons[key] || FaRegQuestionCircle;
  return <Icon size={size} className={className} />;
}
