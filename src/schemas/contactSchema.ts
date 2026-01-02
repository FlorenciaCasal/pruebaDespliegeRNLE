// // src/schemas/contactSchema.ts
// import * as yup from "yup";

// export const NAME_RE =
//   /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:[ ''-][A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)*$/;

// export const LETTERS_LEN = (s: string) =>
//   s.replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g, "").length;

// export const contactSchema = yup.object({
//   name: yup
//     .string()
//     .transform(v => String(v ?? "").trim())
//     .required("Completá tu nombre y apellido.")
//     .matches(
//       NAME_RE,
//       "Nombre inválido: no se aceptan números ni caracteres especiales."
//     )
//     .test(
//       "min-letters",
//       "Nombre inválido: mínimo 3 letras.",
//       v => LETTERS_LEN(v || "") >= 3
//     ),

//   email: yup
//     .string()
//     .transform(v => String(v ?? "").trim())
//     .required("Completá tu email.")
//     .email("Email inválido."),

//   phone: yup
//     .string()
//     .transform(v => String(v ?? "").replace(/\D+/g, ""))
//     .required("Completá tu teléfono.")
//     .matches(/^\d{10}$/, "Teléfono inválido: deben ser exactamente 10 dígitos."),

//   message: yup
//     .string()
//     .transform(v => String(v ?? "").trim())
//     .required("Escribí tu mensaje.")
//     .min(10, "Tu mensaje es muy corto (mínimo 10 caracteres).")
//     .max(1000, "Tu mensaje es muy largo (máximo 1000 caracteres)."),
// }).required();

// export type ContactFormData = yup.InferType<typeof contactSchema>;

