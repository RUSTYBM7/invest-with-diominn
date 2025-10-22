import { ReactNode } from "react";
export default function Button({ children, ...props }: { children: ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className="rounded bg-gold px-4 py-2 text-charcoal font-medium" {...props}>{children}</button>;
}
