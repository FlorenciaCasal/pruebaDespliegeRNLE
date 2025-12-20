// "use client";
// import { checkboxBox, textSoft } from "@/styles/ui";

// export default function PolicyCheckbox({
//   href, checked, onChange,
// }: { href: string; checked: boolean; onChange: (v: boolean) => void; }) {
//   return (
//     <label className={`flex items-start gap-3 text-xs ${textSoft} cursor-pointer select-none`}>
//       <input
//         id="acepta"
//         type="checkbox"
//         checked={checked}
//         onChange={(e) => onChange(e.target.checked)}
//         className={checkboxBox}
//       />
//       <span>
//         Acepto las{" "}
//         <a href={href}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="underline hover:opacity-90 text-gray-700">
//           políticas de visita
//         </a>{" "}
//         (derecho de admisión y manejo de datos).
//       </span>
//     </label>
//   );
// }
"use client";
import { useState } from "react";
import PoliciesModal from "./PoliciesModal";
import PoliciesContent from "./PoliciesContent";

export default function PolicyCheckbox({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1"
        />
        <span className="text-sm">
          Acepto las{" "}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="underline text-button"
          >
            políticas de visita
          </button>
        </span>
      </label>

      <PoliciesModal open={open} onClose={() => setOpen(false)}>
        <PoliciesContent />
      </PoliciesModal>
    </>
  );
}

