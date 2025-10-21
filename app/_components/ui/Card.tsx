import * as React from "react";
import clsx from "clsx";

export function Card({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("card p-4", className)}>
      {children}
    </div>
  );
}
