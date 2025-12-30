// "use client";
// import { usePathname } from "next/navigation";
// // import Link from "next/link";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faSquareFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";


// export default function Footer() {
//   const pathname = usePathname();
//   const HIDE_ON: string[] = ["/politicas-de-visita"];
//   const hide = HIDE_ON.includes(pathname);

//   if (hide) return null; // ⟵ no se renderiza nada

//   return (
//     // <footer className="w-full bg-[#D3B04D] text-white py-6 mt-10">
//     // <footer className="w-full bg-[#E9E4DA] text-white py-4 sm:py-6">
//     <footer className="w-full bg-[#fff] text-black py-4">
//       {/* <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4"> */}
//       {/* <div className="mx-auto max-w-6xl px-4 flex flex-col items-center justify-between gap-4"> */}
//       <div
//         className="
//           mx-auto max-w-6xl px-4
//           flex flex-col sm:flex-row
//           items-center sm:items-center
//           justify-between
//           gap-4
//           w-full
//         "
//       >
//         {/* COPYRIGHT */}
//         <span className="text-sm opacity-90">
//           © {new Date().getFullYear()} Reserva Natural Lago Escondido
//         </span>

//         {/* ENLACES (opcionales) */}
//         {/* <div className="flex items-center gap-6 text-sm opacity-90"> */}




//         {/*          Actualizar con face e instagram de la reserva!!!!

//         <div className="flex items-center gap-6">
//           <Link
//             href="https://www.facebook.com/lagoescondido.ok"
//             target="_blank"
//           >
//             <FontAwesomeIcon
//               icon={faSquareFacebook}
//               size="lg"
//               className="hover:opacity-80 transition"
//             />

//           </Link>
//           <Link href="https://www.instagram.com/lagoescondido.ok" target="_blank">
//             <FontAwesomeIcon
//               icon={faInstagram}
//               size="lg"
//               className="hover:opacity-80 transition"
//             />
//           </Link>
//         </div> */}
//       </div>
//     </footer>
//   );
// }

"use client";

import { usePathname } from "next/navigation";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10zm0 1.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7zm4.75-.88a.88.88 0 1 0 0 1.76a.88.88 0 0 0 0-1.76z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.5 9.95v-7.04H7.9V12h2.6V9.8c0-2.57 1.53-4 3.88-4 1.12 0 2.3.2 2.3.2v2.5h-1.3c-1.28 0-1.68.8-1.68 1.62V12h2.86l-.46 2.9h-2.4v7.04A10 10 0 0 0 22 12z" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.48 2.48 0 1 0 0 4.96a2.48 2.48 0 0 0 0-4.96zM3 8.98h3.96V21H3zM9.98 8.98H13.8v1.64h.05c.53-1 1.84-2.05 3.8-2.05c4.06 0 4.8 2.67 4.8 6.14V21h-3.96v-5.3c0-1.26-.02-2.88-1.76-2.88c-1.76 0-2.03 1.37-2.03 2.78V21H9.98z" />
    </svg>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const HIDE_ON: string[] = ["/politicas-de-visita"];
  if (HIDE_ON.includes(pathname)) return null;

  return (
    <footer className="w-full bg-primary text-white">
      <div className="px-6 py-6">
        <div className="flex justify-center">
          {/* <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 w-full max-w-5xl">
       */}
          <div className="flex flex-col gap-6 sm:flex-row md:gap-20 lg:gap-44 xl:gap-86">
            {/* VISÍTANOS */}
            <div>
              <h4 className="text-sm tracking-wide opacity-90 mb-2">
                VISÍTANOS
              </h4>
              <p className="text-sm opacity-80 leading-relaxed">
                Ruta 40 kilómetro 1948, El Foyel,
                <br />
                Río Negro, Argentina
              </p>
            </div>

            {/* CONTACTO */}
            <div>
              <h4 className="text-sm tracking-wide opacity-90 mb-2">
                CONTACTO
              </h4>
              <p className="text-sm opacity-80 break-all">
                <a href="mailto:info@reservalagoescondido.com.ar" className="hover:underline">
                  info@reservalagoescondido.com.ar
                </a>
              </p>
            </div>

            {/* SEGUINOS */}
            <div>
              <h4 className="text-sm tracking-wide opacity-90 mb-2">
                SEGUINOS
              </h4>
              <div className="flex items-center gap-4">
                <InstagramIcon className="w-5 h-5 opacity-80 hover:opacity-100" />
                <FacebookIcon className="w-5 h-5 opacity-80 hover:opacity-100" />
                <LinkedinIcon className="w-5 h-5 opacity-80 hover:opacity-100" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>


  );
}
