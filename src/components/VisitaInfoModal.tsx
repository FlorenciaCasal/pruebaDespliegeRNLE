"use client";

import { motion, AnimatePresence } from "framer-motion";

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function VisitaInfoModal({ open, onClose }: Props) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {/* Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative bg-white rounded-xl shadow-lg max-w-md w-[90vw] p-6 z-10"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <h2 className="text-[21px] font-bold text-primary mb-4">
                            ¿En qué consiste la visita?
                        </h2>

                        <div className="text-[12px] md:text-[14px] text-main leading-relaxed space-y-3">
                            <p>
                                Las visitas se realizan por la mañana, con inicio a las{" "}
                                <strong>9:30h.</strong>
                            </p>

                            <p>
                                Haremos una caminata de, aproximadamente,{" "}
                                <strong>40 minutos</strong> hasta llegar a una playa en el
                                Lago Escondido.
                            </p>

                            <p>
                                Descansaremos unos <strong>15 minutos</strong> para luego
                                emprender la vuelta por el mismo camino.
                            </p>

                            <p>
                                Se estima una duración total de{" "}
                                <strong>dos horas</strong> por un terreno irregular en
                                montaña, con una dificultad <strong>baja–media</strong>.
                            </p>
                        </div>

                        <button
                            onClick={onClose}
                            className="
                mt-6 w-full
                px-4 py-2
                rounded-lg
                border-2 border-primary
                bg-white
                text-primary
                font-medium
                transition
                hover:bg-primary hover:text-white
              "
                        >
                            Entendido
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

