import {
  Activity,
  Battery,
  CircuitBoard,
  GlassWater,
  HandMetal,
  Paperclip,
  PlugIcon,
} from "lucide-react";
type PriceBy = "KILO" | "UNIT";

export type Material = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  payment: string;
  priceBy: PriceBy;
};

export const MATERIALS_MOCK: Material[] = [
  {
    id: "oefwfob",
    icon: <Paperclip className="h-6 w-6" />,
    title: "Papel",
    description:
      "Recicla periódicos, revistas, papel de oficina y cartón. Aplana y agrupa los artículos para prepararlos para la recolección.",
    payment: "$0.50 por kilo",
    priceBy: "KILO",
  },
  {
    id: "inddoiwndqd",
    icon: <PlugIcon className="h-6 w-6" />,
    title: "Plástico",
    description:
      "Recicla botellas, envases y bolsas de plástico. Enjuaga y retira las tapas antes de colocarlas en el contenedor.",
    payment: "$0.30 por kilo",
    priceBy: "KILO",
  },
  {
    id: "ieifo",
    icon: <GlassWater className="h-6 w-6" />,
    title: "Vidrio",
    description:
      "Recicla botellas y frascos de vidrio. Retira las tapas y enjuaga antes de colocarlos en el contenedor.",
    payment: "$0.40 por kilo",

    priceBy: "KILO",
  },
  {
    id: "efwrwwqwqd",
    icon: <HandMetal className="h-6 w-6" />,
    title: "Metal",
    description:
      "Recicla latas de aluminio, latas de hojalata y otros envases metálicos. Enjuaga y retira las etiquetas antes de colocarlos en el contenedor.",
    payment: "$0.60 por kilo",
    priceBy: "KILO",
  },
  {
    id: "wefwefwef",
    icon: <CircuitBoard className="h-6 w-6" />,
    title: "Cartón",
    description:
      "Recicla cartón corrugado, cajas de cereales y otros embalajes a base de papel. Aplana y agrupa los artículos para prepararlos para la recolección.",
    payment: "$0.45 por kilo",
    priceBy: "KILO",
  },
  {
    id: "awdawdpoqjowqfp",
    icon: <Battery className="h-6 w-6" />,
    title: "Baterías",
    description:
      "Recicla baterías viejas, incluidas las alcalinas, recargables y de botón. Comunícate con nosotros para coordinar la recolección.",
    payment: "$0.10 por unidad",
    priceBy: "UNIT",
  },
  {
    id: "bioevwiwqfpowp",
    icon: <Activity className="h-6 w-6" />,
    title: "Orgánicos",
    description:
      "Recicla restos de comida, residuos de jardín y otros materiales orgánicos. Comunícate con nosotros para coordinar la recolección.",
    payment: "$0.15 por kilo",
    priceBy: "KILO",
  },
];
