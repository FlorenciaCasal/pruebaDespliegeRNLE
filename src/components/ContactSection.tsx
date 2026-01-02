"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  contactSchema,
  type ContactFormData,
} from "@/schemas/contactSchema";

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
    mode: "onBlur", // 👈 valida al salir del campo
  });

  async function onSubmit(data: ContactFormData) {
    // Por ahora solo UI
    console.log("Contact form submit:", data);

    // opcional: resetear
    reset();
  }

  const inputBase =
    "w-full rounded-full border border-primary bg-transparent px-5 py-3 text-sm text-main placeholder:text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/30";
  const textareaBase =
    "w-full rounded-2xl border border-primary bg-transparent px-5 py-3 text-sm text-main placeholder:text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[140px] resize-none";
  const errorText = "text-sm text-red-600 px-2";

  return (
    <section className="bg-white py-12 px-6">
      <h3 className="text-center text-primary text-lg font-semibold mb-8">
        CONTACTO
      </h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-xl flex flex-col gap-4"
      >
        {/* NOMBRE */}
        <div className="flex flex-col gap-1">
          <input
            {...register("name")}
            placeholder="NOMBRE Y APELLIDO"
            className={inputBase}
            autoComplete="name"
          />
          {errors.name && (
            <p className={errorText}>{errors.name.message}</p>
          )}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <input
            {...register("email")}
            type="email"
            placeholder="EMAIL"
            className={inputBase}
            autoComplete="email"
          />
          {errors.email && (
            <p className={errorText}>{errors.email.message}</p>
          )}
        </div>

        {/* TELÉFONO */}
        <div className="flex flex-col gap-1">
          <input
            {...register("phone")}
            placeholder="TELÉFONO"
            className={inputBase}
            autoComplete="tel"
          />
          {errors.phone && (
            <p className={errorText}>{errors.phone.message}</p>
          )}
        </div>

        {/* MENSAJE */}
        <div className="flex flex-col gap-1">
          <textarea
            {...register("message")}
            placeholder="MENSAJE"
            className={textareaBase}
          />
          {errors.message && (
            <p className={errorText}>{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-full bg-primary py-3 text-white font-semibold tracking-widest hover:opacity-95 transition disabled:opacity-60"
        >
          {isSubmitting ? "ENVIANDO..." : "ENVIAR"}
        </button>
      </form>
    </section>
  );
}
