export type ProductVariantProps = {
  color: {
    name: string;
    hexCode: string;
  };
  size: string;
  quantity: number;
};

export type ColorProps = { name: string; hexCode: string };

export interface ProductProps {
  id: string;
  productId: string;
  designId: string;
  productTitle: string;
  productDesc: string;
  category: string;
  gender: string;
  composition: string;
  gsm: string;
  washCare: string;
  price: number;
  discount?: number;
  variants?: ProductVariantProps[];
  productImages: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
