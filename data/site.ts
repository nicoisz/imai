import type { LucideIcon } from "lucide-react";
import {
  Code2,
  BrainCircuit,
  Cloud,
  ShieldCheck,
  Telescope,
  GaugeCircle,
  Users,
  Layers,
  ScanEye,
  LineChart,
} from "lucide-react";

export const SITE = {
  name: "Imai",
  domain: "imai.cl",
  url: "https://imai.cl",
  locale: "es_CL",
  lang: "es-CL",
  email: "hola@imai.cl",
  location: "Santiago, Chile",
  description:
    "Imai diseña y desarrolla software inteligente, soluciones con inteligencia artificial y plataformas escalables para empresas.",
  tagline: "Software inteligente para un mundo en expansión.",
} as const;

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Trabajos", href: "#trabajos" },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Convicciones", href: "#convicciones" },
];

export const SOCIAL_LINKS: NavLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://www.github.com" },
  { label: "Correo", href: "mailto:hola@imai.cl" },
];

export const HERO = {
  title: "Software inteligente para un mundo en expansión",
  subtitle:
    "Diseñamos y construimos productos donde la inteligencia artificial genera impacto real",
  primary: { label: "Hablemos", href: "#contacto" },
  secondary: { label: "Ver soluciones", href: "#soluciones" },
} as const;

export const MISSION = {
  statement: "Hacemos que la tecnología avanzada sea utilizable de verdad",
  subtitle:
    "Diseñamos y construimos productos donde la inteligencia artificial genera impacto real",
  cta: { label: "Nuestra misión", href: "#convicciones" },
} as const;

export type Service = {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export const SOLUTIONS_INTRO = {
  label: "Soluciones",
  heading: "Construimos el stack completo alrededor de tu producto",
} as const;

export const SERVICES: Service[] = [
  {
    id: "desarrollo-a-medida",
    title: "Desarrollo a medida",
    description:
      "Construimos aplicaciones que puedes inspeccionar, extender y operar en tus propios términos. Probadas con rigor y pensadas para durar.",
    href: "/soluciones/desarrollo-a-medida",
    icon: Code2,
  },
  {
    id: "ia-integrada",
    title: "Inteligencia artificial integrada",
    description:
      "Incorporamos modelos donde mueven la aguja del negocio: automatización de procesos, asistentes internos y análisis sobre tus propios datos.",
    href: "/soluciones/inteligencia-artificial",
    icon: BrainCircuit,
  },
  {
    id: "cloud-devops",
    title: "Cloud y DevOps",
    description:
      "Desplegamos en la nube, en tu infraestructura o en ambas. Entornos reproducibles, despliegues sin drama y costos que se entienden.",
    href: "/soluciones/cloud-devops",
    icon: Cloud,
  },
  {
    id: "calidad-seguridad",
    title: "Calidad y seguridad",
    description:
      "Nuestro equipo trabaja junto al tuyo desde la idea hasta producción, con pruebas automatizadas y seguridad desde la primera línea de código.",
    href: "/soluciones/calidad-seguridad",
    icon: ShieldCheck,
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
  },
];

export const HIGHLIGHT = {
  label: "Trabajo destacado",
  title: "Conoce Meridian",
  description:
    "Nuestra plataforma de inteligencia operacional, construida para equipos que deciden con datos en tiempo real.",
  primary: { label: "Ver el caso", href: "/trabajos/meridian" },
  secondary: { label: "Todos los trabajos", href: "#trabajos" },
} as const;

export const TECHNOLOGIES: string[] = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "PostgreSQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "OpenAI",
  "PyTorch",
  "Terraform",
];

export type Conviction = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const CONVICTIONS_INTRO = {
  label: "Nuestras convicciones",
  statement: "El software que importa se construye a la vista de todos",
  body: "Los sistemas que sostienen a una empresa no pueden ser una caja negra. Trabajamos con el código abierto a tu equipo, con las decisiones documentadas y con la arquitectura explicada en palabras que tu organización entiende. Así se construye algo que sobrevive a quienes lo escribimos.",
  cta: { label: "Conócenos", href: "#contacto" },
} as const;

export const CONVICTIONS: Conviction[] = [
  {
    title: "La IA se mide en producción",
    description:
      "Un modelo impresionante en una demo no es un resultado. Medimos lo que cambia en el negocio: tiempos, costos y errores evitados.",
    icon: GaugeCircle,
  },
  {
    title: "La claridad es una decisión técnica",
    description:
      "Elegimos lo simple cuando alcanza y lo complejo cuando se justifica. Cada decisión queda escrita, con sus razones y sus alternativas descartadas.",
    icon: Telescope,
  },
  {
    title: "El equipo se queda con el control",
    description:
      "Entregamos sistemas que tu gente puede operar, auditar y evolucionar sin depender de nosotros. La autonomía es parte del alcance.",
    icon: Users,
  },
];

export const CONTACT = {
  title: "Construyamos lo que viene",
  body: "Equipos que llevan la inteligencia artificial del experimento a la operación diaria. Trabajar con Imai significa construir desde los cimientos junto a ingenieros que ya lo hicieron antes.",
  cta: { label: "Hablemos", href: "mailto:hola@imai.cl" },
} as const;

export const FOOTER_COLUMNS: { title: string; links: NavLink[] }[] = [
  {
    title: "Empresa",
    links: [
      { label: "Convicciones", href: "#convicciones" },
      { label: "Trabajos", href: "#trabajos" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
  {
    title: "Soluciones",
    links: SERVICES.map((s) => ({ label: s.title, href: s.href })),
  },
  {
    title: "Conecta",
    links: SOCIAL_LINKS,
  },
];

/* ------------------------------------------------------------------ */
/* Navegación con desplegables                                         */
/* ------------------------------------------------------------------ */

export type MenuLink = {
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export type NavEntry = {
  label: string;
  href?: string;
  menu?: {
    eyebrow: string;
    links: MenuLink[];
    feature: {
      title: string;
      description: string;
      cta: { label: string; href: string };
    };
  };
};

const ICONOS_PROYECTO: Record<string, LucideIcon> = {
  meridian: Layers,
  aurora: ScanEye,
  lumen: LineChart,
};

export const NAV: NavEntry[] = [
  {
    label: "Soluciones",
    menu: {
      eyebrow: "Soluciones",
      links: SERVICES.map((service) => ({
        label: service.title,
        description: service.description,
        href: service.href,
        icon: service.icon,
      })),
      feature: {
        title: "Cuéntanos tu proyecto",
        description:
          "Una conversación de treinta minutos basta para saber si podemos ayudarte y por dónde empezaríamos.",
        cta: { label: "Hablemos", href: "#contacto" },
      },
    },
  },
  {
    label: "Trabajos",
    menu: {
      eyebrow: "Trabajos",
      links: PROJECTS.map((project) => ({
        label: project.name,
        description: project.description,
        href: project.href,
        icon: ICONOS_PROYECTO[project.id] ?? Layers,
      })),
      feature: {
        title: "Cómo trabajamos",
        description:
          "Equipos pequeños, decisiones documentadas y entregas que tu gente puede operar sin nosotros.",
        cta: { label: "Nuestras convicciones", href: "#convicciones" },
      },
    },
  },
  { label: "Tecnología", href: "#tecnologia" },
  { label: "Convicciones", href: "#convicciones" },
];
