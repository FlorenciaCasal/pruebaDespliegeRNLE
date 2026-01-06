
import { NextRequest, NextResponse } from "next/server";
import { publicFetch } from "@/app/api/_backend";
// import { adminFetch } from "@/app/api/_backend";
import { backendFetch } from "@/app/api/_backend";

// const DEFAULT_CAPACITY = Number(process.env.NEXT_PUBLIC_DEFAULT_CAPACITY ?? 30);

type DayDTO = {
  availableDate: string;              // "YYYY-MM-DD"
  totalCapacity: number | null;
  remainingCapacity: number | null;
};

function allDateISOsOfMonth(y: number, m: number): string[] {
  const last = new Date(y, m, 0).getDate(); // m = 1..12
  const mm = String(m).padStart(2, "0");
  const out: string[] = [];
  for (let d = 1; d <= last; d++) {
    out.push(`${y}-${mm}-${String(d).padStart(2, "0")}`);
  }
  return out;
}

// ───────────────────────────────── GET (leer estado del mes)
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const year = Number(url.searchParams.get("year"));
  const month = Number(url.searchParams.get("month"));
  if (!year || !month) {
    return NextResponse.json(
      { message: "Parámetros 'year' y 'month' requeridos" },
      { status: 400 }
    );
  }

  const mm = String(month).padStart(2, "0");
  // Leemos el month público del backend
  const upstream = await publicFetch(`/api/availability?month=${year}-${mm}`);
  const text = await upstream.text();
  if (!upstream.ok) {
    return NextResponse.json(
      { message: "No se pudo obtener disponibilidad del mes", upstream: text || null },
      { status: 502 }
    );
  }

  let data: DayDTO[] = [];
  try { data = JSON.parse(text); } catch { /* vacío → array */ }

  // Deshabilitado = capacidad total 0
  const disabledDays = data
    .filter(d => (d.totalCapacity ?? 0) <= 0)
    .map(d => d.availableDate);

  // “Mes deshabilitado” si TODOS los días del mes tienen capacidad 0
  const expectedDays = allDateISOsOfMonth(year, month);
  const disabledSet = new Set(disabledDays);
  const monthDisabled = expectedDays.length > 0 && expectedDays.every(d => disabledSet.has(d));

  // Devolvemos el “state” que tu UI espera
  return NextResponse.json({
    year,
    month,
    disabled: monthDisabled,
    disabledDays,
  });
}

// ───────────────────────────────── PUT (habilitar/deshabilitar mes completo)
export async function PUT(req: NextRequest) {
  const url = new URL(req.url);
  const year = Number(url.searchParams.get("year"));
  const month = Number(url.searchParams.get("month"));
  if (!year || !month) {
    return NextResponse.json({ message: "Parámetros 'year' y 'month' requeridos" }, { status: 400 });
  }

  // Body esperado: { disabled: boolean }
  let disabled = false;
  try {
    const j = await req.json();
    disabled = !!j?.disabled;
  } catch { /* vacío = habilitar */ }

  // const targetCapacity = disabled ? 0 : DEFAULT_CAPACITY;
  let targetCapacity = 0;

  if (!disabled) {
    const capRes = await backendFetch("/api/admin/config/default-capacity");
    if (!capRes.ok) {
      return NextResponse.json(
        { message: "No se pudo obtener la capacidad por defecto" },
        { status: 502 }
      );
    }
    const data = await capRes.json();
    targetCapacity = data.capacity;
  }
  const days = allDateISOsOfMonth(year, month);
  for (const iso of days) {
    const resp = await backendFetch(`/api/admin/availability/${iso}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ capacity: targetCapacity }),
    });
    if (!resp.ok) {
      const txt = await resp.text().catch(() => "");
      return NextResponse.json(
        { message: `Fallo al actualizar ${iso}`, upstream: txt || null },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({ ok: true, year, month, capacity: targetCapacity });
}


