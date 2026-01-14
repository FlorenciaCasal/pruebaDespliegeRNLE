import Link from "next/link";

export default function NotFoundPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-background text-primary px-6">
            <h1 className="text-3xl font-bold mb-3">Página no encontrada</h1>
            <p className="text-primary mb-6 text-center max-w-md">
                La página que estás buscando no existe o fue movida.
            </p>
            <Link
                href="/"
                className="px-4 py-2 rounded-lg bg-white text-primary font-semibold hover:bg-primary hover:text-white"
            >
                Volver al inicio
            </Link>
        </main>
    );
}
