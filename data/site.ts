import type { LucideIcon } from "lucide-react";
import {
  Code2,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

export const SITE = {
  name: "Imai",
  domain: "imai.cl",
  url: "https://imai.cl",
  locale: "es_CL",
  lang: "es-CL",
  email: "hola@imai.cl",
  location: "Santiago, Chile",
  coordinates: "-33.4489°, -70.6693°",
  description:
    "Imai diseña y desarrolla software inteligente, soluciones con inteligencia artificial y plataformas escalables para empresas.",
  tagline: "Inspirados por las estrellas, construimos el futuro.",
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Empresa", href: "#empresa" },
  { label: "Contacto", href: "#contacto" },
];

export type SocialLink = {
  label: string;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://www.github.com" },
  { label: "Correo", href: `mailto:${SITE.email}` },
];

export type Service = {
  id: string;
  index: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  code: string;
};

export const SERVICES: Service[] = [
  {
    id: "desarrollo-a-medida",
    index: "01",
    title: "Desarrollo a medida",
    description:
      "Aplicaciones robustas y escalables diseñadas para resolver problemas reales de tu negocio.",
    href: "/soluciones/desarrollo-a-medida",
    icon: Code2,
    code: "DEV / 01",
  },
  {
    id: "ia-integrada",
    index: "02",
    title: "Inteligencia artificial integrada",
    description:
      "Incorporamos inteligencia artificial donde realmente genera impacto, no donde hace ruido.",
    href: "/soluciones/inteligencia-artificial",
    icon: BrainCircuit,
    code: "AI / 02",
  },
  {
    id: "cloud-devops",
    index: "03",
    title: "Cloud y DevOps",
    description:
      "Infraestructura moderna, segura y preparada para crecer sin fricción.",
    href: "/soluciones/cloud-devops",
    icon: Cloud,
    code: "OPS / 03",
  },
  {
    id: "calidad-seguridad",
    index: "04",
    title: "Calidad y seguridad",
    description:
      "Buenas prácticas, pruebas automatizadas y seguridad desde la primera línea de código.",
    href: "/soluciones/calidad-seguridad",
    icon: ShieldCheck,
    code: "QA / 04",
  },
];

export type Project = {
  id: string;
  category: string;
  name: string;
  description: string;
  technologies: string[];
  href: string;
  year: string;
  catalog: string;
};

export const PROJECTS: Project[] = [
  {
    id: "meridian",
    category: "Plataforma SaaS",
    name: "Meridian",
    description:
      "Sistema de inteligencia operacional que procesa millones de eventos en tiempo real para la toma de decisiones.",
    technologies: ["Next.js", "Python", "PostgreSQL", "OpenAI"],
    href: "/trabajos/meridian",
    year: "2025",
    catalog: "M—01",
  },
  {
    id: "aurora",
    category: "Visión artificial",
    name: "Aurora",
    description:
      "Motor de visión por computadora para inspección industrial con precisión submilimétrica.",
    technologies: ["PyTorch", "Kubernetes", "Edge"],
    href: "/trabajos/aurora",
    year: "2024",
    catalog: "A—02",
  },
  {
    id: "lumen",
    category: "Analítica con IA",
    name: "Lumen",
    description:
      "Asistente de análisis financiero que transforma datos dispersos en respuestas claras y accionables.",
    technologies: ["TypeScript", "Node.js", "OpenAI", "AWS"],
    href: "/trabajos/lumen",
    year: "2024",
    catalog: "L—03",
  },
];

export type Technology = {
  name: string;
  category: string;
};

export const TECHNOLOGIES: Technology[] = [
  { name: "TypeScript", category: "Lenguaje" },
  { name: "React", category: "UI" },
  { name: "Next.js", category: "Framework" },
  { name: "Node.js", category: "Runtime" },
  { name: "Python", category: "Lenguaje" },
  { name: "PostgreSQL", category: "Datos" },
  { name: "AWS", category: "Cloud" },
  { name: "Docker", category: "Infra" },
  { name: "Kubernetes", category: "Orquestación" },
  { name: "OpenAI", category: "IA" },
  { name: "CI/CD", category: "DevOps" },
];

export const STELLAR_META = {
  name: "Imai",
  bayer: "Delta Crucis",
  symbol: "δ Cru",
  catalog: "HD 106490",
  temperature: "22 550 K",
  luminosity: "5 600 L☉",
  distance: "345 ly",
  ra: "12h 15m 09s",
  dec: "-58° 44′ 56″",
} as const;

export const ARROW_UP_RIGHT = ArrowUpRight;
