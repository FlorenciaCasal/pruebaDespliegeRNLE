// import HomeStatus from "../components/Home";

// export default function Page() {
//   return (
//     <>
//     <main className="flex flex-col p-4 items-center">
//       <h1 className="py-4">
//         La pagina se encuentra en proceso de reestructuración
//       </h1>
//       <HomeStatus />
//       </main>
//     </>
//   );
// }
import Image from "next/image";
import HomeStatus from "../components/Home";
import ProjectsGrid from "@/components/ProjectsGrid";
// import ContactSection from "@/components/ContactSection";

export default function Page() {

  return (
    <main className="flex flex-col bg-background">

      {/* ================= HERO ================= */}
      {/* <section className="relative w-full h-[60vh] overflow-hidden">
        <div className="relative mx-auto h-full max-w-[1600px]">
          <Image
            src="/img/home.jpeg" // ajustá al nombre real
            alt="Reserva Natural Lago Escondido"
            fill
            priority
            className="object-cover"
          />
        </div>
      </section> */}
      <section className="
  relative w-full overflow-hidden
  h-[45vh]
  sm:h-[55vh]
  lg:h-[65vh]
">
  <div className="relative mx-auto h-full max-w-[1600px]">
    <Image
      src="/img/home.jpeg"
      alt="Reserva Natural Lago Escondido"
      fill
      priority
      className="object-cover object-center"
    />
  </div>
</section>


      {/* ===== PROTECCIÓN ACTIVA ===== */}
      <section className="py-6">
        <h2 className="text-center text-primary text-lg font-semibold">
          PROTECCIÓN ACTIVA DE LA NATURALEZA
        </h2>
      </section>

      {/* ===== QUIÉNES SOMOS ===== */}
      <section className="bg-primary text-white py-10 px-6">
        <h3 className="text-center text-lg font-semibold mb-4">
          QUIÉNES SOMOS
        </h3>

        <p className="max-w-3xl mx-auto text-center text-justify text-sm leading-relaxed">
          Somos un espacio protegido ubicado en la localidad de El Foyel,
          Río Negro, que garantiza la continuidad ambiental para las
          generaciones presentes y futuras.
          <br /><br />
          Nuestro propósito es conservar bosques milenarios, proteger la
          fauna en riesgo y resguardar la calidad del agua a través de
          diversos proyectos.
        </p>
      </section>

      {/* ===== PROYECTOS DE CONSERVACIÓN ===== */}

      <ProjectsGrid />


      {/* ===== CLIMA ===== */}
      <section className="bg-primary py-12">
        <h3 className="text-center text-white text-lg font-semibold mb-6">
          CLIMA
        </h3>

        <div className="flex justify-center px-4">
          <HomeStatus />
        </div>
      </section>
      {/* ===== CONTACTO ===== */}
      {/* <ContactSection /> */}

    </main>
  );
}







