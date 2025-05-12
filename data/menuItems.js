import { FiPhone } from 'react-icons/fi';

const menuItems = [
  { title: "Accueil", href: "/" },
  {
    title: "les soins",
    href: "/soin",
    // submenu: [
    //   {
    //     title: 'Combloux - Megeve',
    //     items: [
    //       { title: 'La ferme des Choseaux', href: '/repertoire/la-ferme-des-choseaux' },
    //       { title: 'Le Splendide', href: '/repertoire/le-splendide' },
    //       { title: 'Le Kramer', href: '/repertoire/le-kramer' },
    //     ],
    //   },
    //   {
    //     title: 'Chamonix',
    //     items: [
    //       { title: 'Chalet Sia', href: '/repertoire/chalet-sia' },
    //       { title: 'Chalet Kieppi', href: '/repertoire/chalet-kieppi' },
    //       { title: 'Chalet des Eaux Rousses', href: '/repertoire/chalet-des-eaux-rousses' },
    //       { title: 'Ecrin des Bossons', href: '/repertoire/ecrin-des-bossons' },
    //     ],
    //   },
    //   {
    //     title: 'Saint Nicolas',
    //     items: [
    //       { title: 'La ferme Picherie', href: '/repertoire/la-ferme-picherie' },
    //     ],
    //   },
    //   {
    //     title: 'Saint Gervais',
    //     items: [
    //       { title: 'Chalet Remy', href: '/repertoire/chalet-remy' },
    //       { title: 'La Ferme de Bionnassay', href: '/repertoire/la-ferme-de-bionnassay' },
    //     ],
    //   },
    // ],
  },
  { title: "à propos ", href: "/#apropros" },
  { title: "rdv", href: "https://www.crenolibre.fr/moteur/124911_durindel-cecile", target:"_blank", rel:"noopener noreferrer"},
  
  {
    title: "Blog", href: "/blog",
    // submenu: [
    //   {
    //     title: 'Sortir à Megeve',
    //     items: [
    //       { title: '7 Jours pour Explorer le Massif du Mont-Blanc', href: '/blog/7-jours-pour-explorer-le-massif-du-mont-blanc' },
    //     ],
    //   },
    //   {
    //     title: 'Sortir à Chamonix',
    //     items: [
    //       { title: '7 Jours pour Explorer le Massif du Mont-Blanc', href: '/blog/7-jours-pour-explorer-le-massif-du-mont-blanc' },
    //     ],
    //   },
    //   {
    //     title: 'Sortir à Saint Nicolas',
    //     items: [],
    //   },
    //   {
    //     title: 'Sortir à Saint Gervais',
    //     items: [
    //       { title: '7 Jours d’Aventure dans les Alpes', href: '/blog/7-jours-daventure-dans-les-alpes' },
    //       { title: 'Un Paradis pour les Amateurs de Vélo', href: '/blog/un-paradis-pour-les-amateurs-de-velo' },
    //     ],
    //   },
    // ],
  },
  { title: "contact", href: "/#contact" },
  {
    title: "06 09 07 74 38",
    href: 'tel:+33609077438',
    icon: FiPhone,          // ← icône téléphonique ici
  },
];

export default menuItems;
