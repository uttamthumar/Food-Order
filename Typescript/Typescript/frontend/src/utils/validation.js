import * as Yup from "yup";

export const productValidate = Yup.object({
  name: Yup.string().required("name is required"),
  price: Yup.number().required("rating is required"),
  description: Yup.string().required("quantity is required"),
});
