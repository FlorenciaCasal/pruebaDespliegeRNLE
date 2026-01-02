"use client";

import { useEffect, useState } from "react";

/* ================== TIPOS ================== */

type FireRiskLevel = "BAJO" | "MODERADO" | "ALTO";

type HomeStatusResponse =
  | {
    ok: true;
    weather: {
      temperature: number;
      windSpeed: number;
    };
    indicator: {
      fireRisk: FireRiskLevel;
      methodology: string;
    };
    meta: {
      source: string;
      updatedAt: string;
    };
  }
  | { ok: false };

/* ================== GAUGE ================== */

function FireRiskGauge({ level }: { level: FireRiskLevel }) {
  const angle = {
    BAJO: -150,
    MODERADO: -90,
    ALTO: -30,
  }[level];

  return (
    <div className="flex bg-white text-black flex-col items-center">
      <svg width="160" height="90" viewBox="0 0 200 120">
        {/* fondo */}
        <path
          d="M20 100 A80 80 0 0 1 180 100"
          fill="none"
          stroke="#1f2937"
          strokeWidth="14"
        />

        {/* verde */}
        <path
          d="M20 100 A80 80 0 0 1 80 40"
          fill="none"
          stroke="#22c55e"
          strokeWidth="14"
        />
        {/* amarillo */}
        <path
          d="M80 40 A80 80 0 0 1 120 40"
          fill="none"
          stroke="#facc15"
          strokeWidth="14"
        />
        {/* rojo */}
        <path
          d="M120 40 A80 80 0 0 1 180 100"
          fill="none"
          stroke="#ef4444"
          strokeWidth="14"
        />

        {/* aguja */}
        <g transform={`translate(100 100) rotate(${angle})`}>
          <line x1="0" y1="0" x2="60" y2="0" stroke="black" strokeWidth="4" />
          <circle cx="0" cy="0" r="6" fill="black" />
        </g>
      </svg>

      <span className="mt-2 text-sm text-primary font-semibold">{level}</span>
      <span className="text-xs text-primary mt-1">
        Indicador orientativo
      </span>
    </div>
  );
}

/* ================== HOME STATUS ================== */

export default function HomeStatus() {
  const [data, setData] = useState<HomeStatusResponse | null>(null);

  useEffect(() => {
    fetch("/api/home-status")
      .then((r) => r.json() as Promise<HomeStatusResponse>)
      .then(setData)
      .catch(() => setData({ ok: false }));
  }, []);

  if (!data) return null;

  return (
    // <section className="flex flex-col items-center sm:max-w-md rounded-2xl border border-neutral-800 bg-white p-5 text-main">
    <section className="flex flex-col items-center sm:max-w-md rounded-2xl bg-primary px-5 text-white shadow-sm">

      {/* <h2 className="text-base font-semibold">
         Lago Escondido
      </h2> */}

      {!data.ok ? (
        <p className="text-sm text-white mt-3">
          Información no disponible en este momento.
        </p>
      ) : (
        <div className="flex flex-col mt-5 space-y-4">
          <div className="flex items-center gap-2">
            <div className="text-white text-sm"> Temperatura: </div>

            <div className="text-xl font-semibold">
              {data.weather.temperature}°C
            </div>
          </div>
          <div className="text-white text-sm"> Indicador de incendios: </div>
          <FireRiskGauge level={data.indicator.fireRisk} />

          <p className="text-xs text-white border-t border-white py-3">
            Indicador orientativo basado en temperatura y viento.
            No constituye una alerta oficial.
          </p>
        </div>
      )}
    </section>
  );
}

