export default function MaintenancePage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center px-6 text-center bg-white">
      <h1 className="text-3xl sm:text-4xl font-semibold text-primary mb-4">
        Estamos realizando tareas de mantenimiento
      </h1>

      <p className="text-neutral-600 max-w-md mb-6">
        En este momento el sitio no se encuentra disponible.
        <br />
        Estamos trabajando para restablecer el servicio lo antes posible.
      </p>

      <p className="text-sm text-neutral-500">
        Gracias por tu paciencia 💚
      </p>
    </main>
  );
}
