import { StaticImageData } from "next/image";
import image1 from "../../public/k100.webp";
import image2 from "../../public/k200.webp";
import stan1 from "../../public/stan1.webp";
import stan2 from "../../public/stan2.webp";
import stan3 from "../../public/stan3.webp";
import cover1 from "../../public/cover1.webp";
import cover2 from "../../public/cover2.webp";
import cover3 from "../../public/cover3.webp";
interface ProductData {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: StaticImageData;
  additionalImages: StaticImageData[];
}

export const ProductDatas: ProductData[] = [
  {
    id: 1,
    title: "Kalaamatu - hat Ivory",
    price: "53.00",
    description: "Y-UC Mixer",
    category: "Electronic",
    image: image1,
    additionalImages: [image2],
  },
  {
    id: 2,
    title: "Kalaamatu - hat Mulberry",
    price: "24.00",
    description: "Y-UC Mixer",
    category: "Electronic",
    image: stan2,
    additionalImages: [cover2],
  },
  {
    id: 3,
    title: "Kalaamatu - hat Kinky",
    price: "59.00",
    description: "Y-UC Mixer",
    category: "Electronic",
    image: stan1,
    additionalImages: [cover1],
  },
  {
    id: 4,
    title: "Kalaamatu - hat Mulberry",
    price: "18.00",
    description: "Y-UC Mixer",
    category: "Electronic",

    image: stan3,
    additionalImages: [cover3],
  },
];
