/** Global navigation — matches product IA (always reachable). */
export type NavItem = {
  href: string;
  label: string;
  /** Shorter label for tight mobile rows */
  shortLabel?: string;
};

export const GLOBAL_NAV: NavItem[] = [
  { href: "/", label: "Home / Dashboard", shortLabel: "Home" },
  { href: "/tests", label: "Take Tests", shortLabel: "Tests" },
  { href: "/dashboard", label: "My Profile", shortLabel: "Profile" },
  { href: "/insights", label: "Insights", shortLabel: "Insights" },
  { href: "/compare", label: "Compare", shortLabel: "Compare" },
  { href: "/history", label: "History", shortLabel: "History" },
  { href: "/explore", label: "Explore", shortLabel: "Explore" },
  { href: "/search", label: "Search", shortLabel: "Search" },
  { href: "/settings", label: "Settings", shortLabel: "Settings" },
];
