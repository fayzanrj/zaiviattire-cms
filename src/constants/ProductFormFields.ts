interface FormField {
  label: string;
  type: "number" | "text" | "image";
  placeHolder: string;
  id: string;
}

export const PRODUCT_FORM_FIELDS: FormField[] = [
  {
    label: "Product ID",
    type: "text",
    placeHolder: "Enter Product ID",
    id: "productId",
  },
  {
    label: "Design ID",
    type: "text",
    placeHolder: "Enter Design ID",
    id: "designId",
  },
  {
    label: "Product Title",
    type: "text",
    placeHolder: "Enter Product Title",
    id: "productTitle",
  },
  {
    label: "Product Description",
    type: "text",
    placeHolder: "Enter Product Description",
    id: "productDesc",
  },
  {
    label: "Composition",
    type: "text",
    placeHolder: "Enter Composition",
    id: "composition",
  },
  { label: "GSM", type: "text", placeHolder: "Enter GSM", id: "gsm" },
  {
    label: "Wash Care Instructions",
    type: "text",
    placeHolder: "Enter Wash Care Instructions",
    id: "washCare",
  },
  { label: "Price", type: "number", placeHolder: "Enter Price", id: "price" },
  {
    label: "Discount",
    type: "number",
    placeHolder: "Enter Discount",
    id: "discount",
  },
  // Add image fields
];
