"use client";

import { useState } from "react";

export default function ContactSection() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    function onChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Por ahora solo UI (mock). Luego lo conectamos.
        // Podés mostrar un toast acá si ya tenés tu sistema de toast.
        console.log("Contact form submit:", form);
    }

    const inputBase =
        "w-full rounded-full border border-primary bg-transparent px-5 py-3 text-sm text-main placeholder:text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/30";
    const textareaBase =
        "w-full rounded-2xl border border-primary bg-transparent px-5 py-3 text-sm text-main placeholder:text-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/30 min-h-[140px] resize-none";

    return (
        <section className="bg-white py-12 px-6">
            <h3 className="text-center text-primary text-lg font-semibold mb-8">
                CONTACTO
            </h3>

            <form
                onSubmit={onSubmit}
                className="mx-auto w-full max-w-xl flex flex-col gap-4"
            >
                <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    placeholder="NOMBRE Y APELLIDO"
                    className={inputBase}
                    autoComplete="name"
                />

                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="EMAIL"
                    className={inputBase}
                    autoComplete="email"
                />

                <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    placeholder="TELÉFONO"
                    className={inputBase}
                    autoComplete="tel"
                />

                <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="MENSAJE"
                    className={textareaBase}
                />

                <button
                    type="submit"
                    className="mt-2 w-full rounded-full bg-primary py-3 text-white font-semibold tracking-widest hover:opacity-95 transition"
                >
                    ENVIAR
                </button>
            </form>
        </section>
    );
}
