// app/creator-studio/settings/_components/FormSection.tsx
"use client";

import { ReactNode, forwardRef } from "react";

type Props = {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
};

const gold = "#FFD700";

const FormSection = forwardRef<HTMLDivElement, Props>(function FormSection(
  { id, title, description, children },
  ref
) {
  return (
    <section
      id={id}
      ref={ref}
      className="rounded-2xl p-5 md:p-6 mb-6"
      style={{
        background: "rgba(0,0,0,0.18)",
        border: `1px solid ${gold}`,
        boxShadow:
          "0 0 0 1px rgba(255,215,0,0.45), 0 0 18px rgba(255,215,0,0.12) inset",
      }}
    >
      <header className="mb-4">
        <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
        {description ? (
          <p className="text-sm text-white/70 mt-1">{description}</p>
        ) : null}
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
});

export default FormSection;
