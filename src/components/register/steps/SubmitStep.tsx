import PolicyCheckbox from "@/components/forms/PolicyCheckbox";
import type { UseFormSetValue, UseFormWatch } from "react-hook-form";
import type { ReservationFormData } from "@/types/reservation";

export default function SubmitStep({
    // tipo, adultos, ninos, bebes, watch, aceptaReglas, setValue, policiesUrl, uxError, renderActions = true,
    tipo, adultos, ninos, bebes, watch, aceptaReglas, setValue, uxError, renderActions = true,
}: {
    tipo: "PARTICULAR" | "INSTITUCION_EDUCATIVA" | null;
    adultos: number | undefined;
    ninos: number | undefined;
    bebes: number | undefined;
    watch: UseFormWatch<ReservationFormData>;
    aceptaReglas: boolean;
    setValue: UseFormSetValue<ReservationFormData>;
    policiesUrl: string;
    uxError: string | null;
    submitting: boolean;
    renderActions?: boolean;
}) {
    return (
        <div className="space-y-4">
            {uxError && (
                <div className="rounded-md bg-red-600/20 border border-red-600 px-3 py-2 text-sm">
                    {uxError}
                </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">

                {/* <div className="grid gap-4 grid-cols-1"> */}
                <div className="rounded-xl bg-white/5 border border-secondary p-4 min-w-0">
                    <div className="text-sm text-black font-bold mb-2">Reserva</div>
                    <div className="space-y-1 text-sm">
                        <div>Tipo: {tipo === "INSTITUCION_EDUCATIVA" ? "Institución educativa" : "Particular"}</div>
                        <div>Fecha: {watch("fechaISO") || "—"}</div>
                        <div>Total: {(adultos ?? 0) + (ninos ?? 0) + (bebes ?? 0)}</div>
                    </div>
                </div>

                <div className="rounded-xl bg-white/5 border border-secondary p-4 min-w-0">
                    <div className="text-sm text-black font-bold mb-2">{tipo === "INSTITUCION_EDUCATIVA" ? "Institución" : "Contacto"}</div>
                    {tipo === "INSTITUCION_EDUCATIVA" ? (
                        <div className="space-y-1 text-sm">
                            <div>Institución: {watch("institucion") || "—"}</div>
                            <div>Localidad: {watch("institucionLocalidad") || "—"}</div>
                            <div className="break-words [overflow-wrap:anywhere] max-w-full inline-block">Email: {watch("institucionEmail") || "—"}</div>
                            <div>Teléfono: {watch("institucionTelefono") || "—"}</div>
                            <div className="pt-2">
                                Responsable: {`${watch("responsableNombre") || ""} ${watch("responsableApellido") || ""}`.trim() || "—"}
                                {" "} (DNI {watch("responsableDni") || "—"})
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-1 text-sm">
                            <div>Nombre: {`${watch("nombre") || ""} ${watch("apellido") || ""}`.trim() || "—"}</div>
                            <div>DNI: {watch("dni") || "—"}</div>
                            <div className="break-words [overflow-wrap:anywhere] max-w-full inline-block">Email: {watch("correo") || "—"}</div>
                            <div>Teléfono: {watch("telefono") || "—"}</div>
                        </div>
                    )}
                </div>
            </div>

            <PolicyCheckbox
                // href={policiesUrl}
                checked={aceptaReglas}
                onChange={(v) => setValue("aceptaReglas", v, { shouldDirty: true })}
            />

            {renderActions && (
                <div className="mt-6 flex items-center justify-between">
                    {/* aquí estaban tus botones "Volver" y "Enviar" */}
                </div>
            )}
        </div>
    );
}
