"use client";

import { useEffect, useState } from "react";

/* ================== TIPOS ================== */

// type FireRiskLevel = "BAJO" | "MODERADO" | "ALTO";
type FireRiskLevel =
  | "BAJO"
  | "MODERADO"
  | "ALTO"
  | "MUY_ALTO"
  | "EXTREMO";


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
  // const angle = {
  //   BAJO: -150,
  //   MODERADO: -90,
  //   ALTO: -30,
  // }[level];
  const angle = {
    BAJO: -162,      // centro de -180 → -144
    MODERADO: -126,  // centro de -144 → -108
    ALTO: -90,       // centro de -108 → -72
    MUY_ALTO: -54,   // centro de -72 → -36
    EXTREMO: -18,    // centro de -36 → 0
  }[level];

  return (
    <div className="flex bg-white text-black flex-col items-center">
      <svg width="160" height="90" viewBox="0 0 200 120">
        {/* BAJO */}
        <path
          d={sectorPath(100, 100, 80, -180, -144)}
          fill="#16a34a"
        />

        {/* MODERADO */}
        <path
          d={sectorPath(100, 100, 80, -144, -108)}
          fill="#1e3a8a"
        />

        {/* ALTO */}
        <path
          d={sectorPath(100, 100, 80, -108, -72)}
          fill="#facc15"
        />

        {/* MUY ALTO */}
        <path
          d={sectorPath(100, 100, 80, -72, -36)}
          fill="#ea580c"
        />

        {/* EXTREMO */}
        <path
          d={sectorPath(100, 100, 80, -36, 0)}
          fill="#dc2626"
        />

        {/* Aguja */}
        <g
          style={{ transition: "transform 0.4s ease-out" }}
          transform={`translate(100 100) rotate(${angle})`}
        >
          <line x1="0" y1="0" x2="60" y2="0" stroke="black" strokeWidth="4" />
          <circle cx="0" cy="0" r="6" fill="black" />
        </g>
      </svg>



      {/* <span className="mt-2 text-sm text-primary font-semibold">{level}</span>
      <span className="text-xs text-primary mt-1">
        Indicador orientativo
      </span> */}
      <span className="mt-2 text-sm font-semibold text-primary">
        {level.replace("_", " ")}
      </span>
      <span className="text-xs text-primary mt-1">
        Índice diario estimado
      </span>
    </div>
  );
}

/* ================== HOME STATUS ================== */

function sectorPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const x1 = cx + r * Math.cos(toRad(startAngle));
  const y1 = cy + r * Math.sin(toRad(startAngle));
  const x2 = cx + r * Math.cos(toRad(endAngle));
  const y2 = cy + r * Math.sin(toRad(endAngle));

  return `
    M ${cx} ${cy}
    L ${x1} ${y1}
    A ${r} ${r} 0 0 1 ${x2} ${y2}
    Z
  `;
}



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

