import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Lerp between two numbers */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Map a value from one range to another */
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;

/** Clamp a number between min and max */
export const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/** Random float between min and max */
export const random = (min: number, max: number) =>
  Math.random() * (max - min) + min;

/** VUDU flavor definitions */
export const FLAVORS = [
  {
    id: "peach-mango",
    name: "Peach Mango",
    tagline: "Golden. Luscious. Electric.",
    description:
      "Sun-ripe peach meets tropical mango thunder. Bold, juicy, unforgettable — the flavor that started it all.",
    primary: "#E8860A",
    secondary: "#FFD000",
    accent: "#FF6B47",
    bg: "from-amber-950 via-orange-900 to-yellow-900",
    pill: "bg-gradient-to-r from-orange-400 to-yellow-400",
    glow: "rgba(232,134,10,0.55)",
    fruit: "🥭",
    image: "/drinks/peach-mango.png",
    kcal: 10,
    caffeine: 160,
  },
  {
    id: "green-apple",
    name: "Green Apple",
    tagline: "Sharp. Crisp. Alive.",
    description:
      "Ice-cold green apple with a razor-sharp bite. Sparks your senses and locks you in — refreshing, electric, relentless.",
    primary: "#3DBB00",
    secondary: "#A8FF00",
    accent: "#00AA44",
    bg: "from-green-950 via-lime-900 to-emerald-900",
    pill: "bg-gradient-to-r from-green-400 to-lime-400",
    glow: "rgba(61,187,0,0.55)",
    fruit: "🍏",
    image: "/drinks/apple.png",
    kcal: 5,
    caffeine: 160,
  },
  {
    id: "tropical-punch",
    name: "Tropical Punch",
    tagline: "Wild. Bold. Unstoppable.",
    description:
      "Pineapple, passion fruit, mango, and citrus collide in an explosive rush that hits hard and leaves you wanting more.",
    primary: "#E82200",
    secondary: "#FF6200",
    accent: "#FF9900",
    bg: "from-red-950 via-orange-900 to-rose-900",
    pill: "bg-gradient-to-r from-red-500 to-orange-500",
    glow: "rgba(232,34,0,0.55)",
    fruit: "🍍",
    image: "/drinks/tropical.png",
    kcal: 0,
    caffeine: 160,
  },
] as const;

export type FlavorId = (typeof FLAVORS)[number]["id"];
export type Flavor   = (typeof FLAVORS)[number];
