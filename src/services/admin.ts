import { CalendarMonthState } from "@/types/admin";
import { BackendReservationDTO } from "@/types/reservation";
import type { AdminReservation } from "@/types/admin";

type Page<T> = {
    content: T[];
    totalPages: number;
    totalElements: number;
    number: number;
    size: number;
};

// Detección server/client + helper para URLs
const IS_SERVER = typeof window === "undefined";
const ORIGIN = IS_SERVER ? (process.env.APP_ORIGIN ?? "http://localhost:3000") : "";
const absolute = (path: string) => (IS_SERVER ? `${ORIGIN}${path}` : path);


// ⬇⬇⬇ NUEVO: fetch interno que reenvía cookies en server
async function fetchInternal(path: string, init: RequestInit = {}) {
    const url = absolute(path);
    const headers = new Headers(init.headers ?? undefined);
    if (IS_SERVER) {
        // Import dinámico para evitar usar next/headers en el cliente
        const { cookies } = await import("next/headers");
        const cookieStore = await cookies();    // await
        const cookieHeader = cookieStore.toString();   // convierte el store a string "k=v; k2=v2"
        if (cookieHeader) headers.set("cookie", cookieHeader);
    }
    // aseguramos no cachear
    return fetch(url, { cache: "no-store", ...init, headers });
}

export type AdminStatus = "ALL" | "PENDING" | "CONFIRMED" | "CANCELLED";

// Helper de check
async function ok<T>(res: Response): Promise<T> {
    if (!res.ok) {
        let msg = `Error ${res.status}`;
        try {
            const j = await res.json();
            // if ((j as any)?.message) msg = (j as any).message;
            if (j?.message) msg = j.message;
        } catch { }
        throw new Error(msg);
    }
    return res.json() as Promise<T>;
}


export async function fetchReservations(
    status: AdminStatus = "PENDING",
    date?: string,
    dni?: string,
    name?: string,
    page = 0,
    size = 20
    // ): Promise<AdminReservation[]> {
): Promise<{
    items: AdminReservation[];
    totalPages: number;
    totalElements: number;
}> {
    const params = new URLSearchParams();
    if (status && status !== "ALL") params.append("status", status);
    if (date) params.append("date", date);
    if (dni) params.append("dni", dni);
    if (name) params.append("name", name);
    params.append("page", String(page));
    params.append("size", String(size));
    const qs = params.toString() ? `?${params}` : "";
    const res = await fetchInternal(`/api/admin/reservations${qs}`);
    const raw = await ok<Page<BackendReservationDTO>>(res);

    // Spring Boot Page<T> → usamos content
    const backendData: BackendReservationDTO[] = Array.isArray(raw?.content)
        ? raw.content
        : [];


    // return backendData.map((r) => ({
    const items: AdminReservation[] = backendData.map((r) => ({
        id: r.id,
        createdAt: r.createdAt,
        reservationDate: r.visitDate,
        circuito: r.circuit as "A" | "B" | "C" | "D",
        tipoVisitante:
            r.visitorType === "EDUCATIONAL_INSTITUTION"
                ? "INSTITUCION_EDUCATIVA"
                : r.visitorType === "EVENT"
                    ? "EVENTO"
                    : "PARTICULAR",
        nombre: r.firstName,
        apellido: r.lastName,
        telefono: r.phone,
        correo: r.email,
        vehiclePlate: r.vehiclePlate ?? "",
        personas: r.adults18Plus + r.children2To17 + r.babiesLessThan2,
        adultos: r.adults18Plus,
        ninos: r.children2To17,
        bebes: r.babiesLessThan2,
        movilidadReducida: r.reducedMobility ?? 0,
        comentarios: r.comment ?? "",
        originLocation: r.originLocation ?? "",
        status: r.status as "PENDING" | "CONFIRMED" | "CANCELLED",
        dni: (r.dni ?? "").replace(/\D+/g, ""),
        companions:
            r.visitors?.map((c) => ({
                nombre: c.firstName,
                apellido: c.lastName,
                dni: (c.dni ?? "").replace(/\D+/g, ""),
                telefono: c.phone ?? undefined,
            })) ?? [],
    }));
    return {
        items,
        totalPages: typeof raw?.totalPages === "number" ? raw.totalPages : 1,
        totalElements: typeof raw?.totalElements === "number" ? raw.totalElements : items.length,
    };
}

export async function confirmReservation(id: string): Promise<void> {

    const res = await fetchInternal(`/api/admin/reservations/${id}/confirm`, { method: "POST" });
    if (!res.ok) throw new Error("Error confirmando reserva");
}

export async function cancelReservation(id: string): Promise<void> {
    const res = await fetchInternal(`/api/admin/reservations/${id}/cancel`, { method: "POST" });
    if (!res.ok) throw new Error("Error cancelando reserva");
}

/* ============== CALENDARIO / DISPONIBILIDAD ============== */

// Carga el estado del mes (usa tu endpoint de Next que proxy al back)
export async function getCalendarState(year: number, month: number): Promise<CalendarMonthState> {
    const res = await fetchInternal(`/api/admin/availability/state?year=${year}&month=${month}`);
    return ok<CalendarMonthState>(res);
}

export async function setDayEnabled(dateISO: string, isDisabled: boolean): Promise<void> {
    let capacity = 0;

    if (isDisabled) {
        // Si lo vamos a habilitar, pedimos la capacidad real al backend
        const res = await fetchInternal("/api/admin/config/default-capacity");
        if (!res.ok) throw new Error("No se pudo obtener la capacidad por defecto");
        const data = await res.json();
        capacity = data.capacity;
    }

    const resp = await fetchInternal(`/api/admin/availability/${dateISO}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ capacity }),
        //body: JSON.stringify({ capacity: 0 }),

    });

    if (!resp.ok) throw new Error(`Error ${resp.status} al actualizar el día`);
}


// Alterna todo el mes
export async function setMonthEnabled(year: number, month: number, disabled: boolean): Promise<void> {
    const res = await fetchInternal(`/api/admin/availability/state?year=${year}&month=${month}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disabled: !disabled }),
    });
    if (!res.ok) throw new Error(`Error ${res.status} al actualizar el mes`);
}


// === Dashboard helpers ===
export type AdminSummary = {
    all: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    today: number; // reservas con fecha de visita = hoy
};

export async function getAdminSummary(): Promise<AdminSummary> {
    // const { items: all } = await fetchReservations("ALL", undefined, undefined, undefined, 0, 5000);
    const { items: all } = await fetchReservations("ALL", undefined, undefined, undefined, 0, 5000);

    const counts = all.reduce(
        (acc, r) => {
            acc.all++;
            acc[r.status]++;
            return acc;
        },
        { all: 0, PENDING: 0, CONFIRMED: 0, CANCELLED: 0 } as
        { all: number } & Record<AdminReservation["status"], number>
    );

    const todayISO = new Date().toISOString().slice(0, 10);
    const today = all.filter(r => r.reservationDate.slice(0, 10) === todayISO).length;

    // devolvemos en minúscula como pide AdminSummary
    return {
        all: counts.all,
        pending: counts.PENDING,
        confirmed: counts.CONFIRMED,
        cancelled: counts.CANCELLED,
        today,
    };
}

export async function fetchRecentReservations(limit = 10) {
    // const all = await fetchReservations("ALL");
    const { items: all } = await fetchReservations("ALL", undefined, undefined, undefined, 0, 200);
    return all
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
}

export type BookingFlags = { individualEnabled: boolean; schoolEnabled: boolean };

// PÚBLICO (sitio)
export async function getPublicBookingFlags(): Promise<BookingFlags> {
    const r = await fetch("/api/booking-flags", { cache: "no-store" });
    if (!r.ok) throw new Error("No se pudo leer flags");
    return r.json();
}


// ADMIN (panel)
export async function getAdminBookingFlags(): Promise<BookingFlags> {
    const r = await fetch("/api/admin/booking-flags", { cache: "no-store" });
    if (!r.ok) throw new Error("No se pudo leer flags (admin)");
    const j = await r.json(); // { enabled: boolean }
    return {
        individualEnabled: true,
        schoolEnabled: !!j.enabled,
    };
}

export async function setAdminBookingFlags(f: BookingFlags): Promise<void> {
    // ⚠️ el back espera { enabled: boolean }
    const r = await fetch("/api/admin/booking-flags", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !!f.schoolEnabled }),
    });
    if (!r.ok) throw new Error("No se pudo guardar flags");
}

/* ============== EXPORTACIÓN EXCEL DESDE BACKEND ============== */

export async function exportReservationsBackend(params: {
    date?: string;
    month?: string;
    year?: number;
    status?: string;
    visitorType?: string;
    dni?: string;
    name?: string;
}) {
    const query = new URLSearchParams();

    if (params.date) query.set("date", params.date);
    if (params.month) query.set("month", params.month);
    if (params.year) query.set("year", String(params.year));
    if (params.status) query.set("status", params.status);
    if (params.visitorType) query.set("visitorType", params.visitorType);
    if (params.dni) query.set("dni", params.dni);
    if (params.name) query.set("name", params.name);

    const qs = query.toString() ? `?${query.toString()}` : "";

    // IMPORTANTE: usamos fetchInternal así se reenvían cookies JWT
    const res = await fetchInternal(`/api/admin/reservations/export${qs}`, {
        method: "GET",
    });

    if (!res.ok) throw new Error("Error al exportar archivo");

    const blob = await res.blob();
    const contentDisposition = res.headers.get("content-disposition");
    const filename =
        contentDisposition?.split("filename=")[1]?.replace(/"/g, "") ||
        "reservas.xlsx";

    return { blob, filename };
}

