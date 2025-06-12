import { FiPhone } from "react-icons/fi";

const menuItems = [
  { title: "Accueil", href: "/" },
  {
    title: "les séances",
    href: "/soins",
  },
 
  {
    title: "rdv",
    href: "https://www.crenolibre.fr/moteur/124911_durindel-cecile",
    target: "_blank",
    rel: "noopener noreferrer",
  },

  {
    title: "Blog",
    href: "/blog",
  },
  { title: "contact", href: "/contact" },
  {
    title: "06 09 07 74 38",
    href: "tel:+33609077438",
    icon: FiPhone, // ← icône téléphonique ici
  },
];

export default menuItems;
