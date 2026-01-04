// app/api/home-status/route.ts
import { NextResponse } from "next/server";

// export type FireRiskLevel = "BAJO" | "MODERADO" | "ALTO";
export type FireRiskLevel =
  | "BAJO"
  | "MODERADO"
  | "ALTO"
  | "MUY_ALTO"
  | "EXTREMO";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-41.70025&longitude=-71.61758&current_weather=true&timezone=America/Argentina/Buenos_Aires",
      { cache: "no-store" }
    );

    if (!res.ok) throw new Error("weather fetch failed");

    const data = await res.json();
    const current = data.current_weather;

    if (!current) throw new Error("no current_weather");

    const temperature: number = current.temperature;
    // const windSpeed: number = current.windspeed;

    // let fireRisk: FireRiskLevel;

    /* ================== PRONÓSTICO DIARIO ================== */
    const forecastRes = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=-41.70025&longitude=-71.61758&hourly=temperature_2m,windspeed_10m&forecast_days=1&timezone=America/Argentina/Buenos_Aires",
      { cache: "no-store" }
    );

    if (!forecastRes.ok) throw new Error("forecast fetch failed");

    const forecastData = await forecastRes.json();
    const temps: number[] = forecastData.hourly.temperature_2m;
    const winds: number[] = forecastData.hourly.windspeed_10m;

    const tempMax = Math.max(...temps);
    const windMax = Math.max(...winds);

    /* ================== ÍNDICE DIARIO ================== */
    let fireRisk: FireRiskLevel;


    // // 1️⃣ Riesgo base por temperatura (verano seco)
    // if (temperature < 22) {
    //   fireRisk = "BAJO";
    // } else if (temperature < 26) {
    //   fireRisk = "MODERADO";
    // } else {
    //   fireRisk = "ALTO";
    // }

    // // 2️⃣ Ajuste por viento (solo empeora)
    // if (windSpeed >= 30) {
    //   fireRisk = "ALTO";
    // } else if (windSpeed >= 20) {
    //   if (fireRisk === "BAJO") fireRisk = "MODERADO";
    // }
    // Riesgo base por temperatura máxima (verano seco)
    if (tempMax < 20) {
      fireRisk = "BAJO";
    } else if (tempMax < 23) {
      fireRisk = "MODERADO";
    } else if (tempMax < 26) {
      fireRisk = "ALTO";
    } else if (tempMax < 30) {
      fireRisk = "MUY_ALTO";
    } else {
      fireRisk = "EXTREMO";
    }

    // Ajuste por viento máximo (solo empeora)
    if (windMax >= 35) {
      fireRisk = "EXTREMO";
    } else if (windMax >= 25) {
      if (fireRisk === "BAJO") fireRisk = "MODERADO";
      else if (fireRisk === "MODERADO") fireRisk = "ALTO";
      else if (fireRisk === "ALTO") fireRisk = "MUY_ALTO";
    }

    return NextResponse.json({
      ok: true,
      weather: {
        // temperature,
        temperature, // actual
        // windSpeed,
      },
      indicator: {
        // fireRisk,
        fireRisk, // diario
        // methodology: "heuristic-temp-wind-v1",
        methodology: "daily-max-temp-wind-5-levels",
      },
      meta: {
        source: "open-meteo.com",
        validFor: "today", // agregado
        updatedAt: current.time,
      },
    });
  } catch {
    return NextResponse.json(
      { ok: false },
      { status: 200 } // intencional: UI simple
    );
  }
}

