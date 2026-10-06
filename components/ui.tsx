import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";

const TONES = {
  brand: "bg-indigo-50 text-indigo-700",
  orange: "bg-orange-50 text-orange-700",
  green: "bg-emerald-50 text-emerald-700",
  red: "bg-red-50 text-red-700",
  slate: "bg-slate-100 text-slate-600",
  blue: "bg-blue-50 text-blue-700",
};

export type Tone = keyof typeof TONES;
export const diffTone = (d: string): Tone => (d === "Easy" ? "green" : d === "Medium" ? "orange" : "red");

export const Page = ({ title, sub, children }: { title: string; sub: string; children: ReactNode }) => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
      <p className="mt-1 text-sm text-slate-500">{sub}</p>
    </div>
    {children}
  </div>
);

export const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>{children}</div>
);

export const HoverCard = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <Card className={`transition duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md ${className}`}>{children}</Card>
);

export const Badge = ({ tone = "brand", children }: { tone?: Tone; children: ReactNode }) => (
  <span className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium ${TONES[tone]}`}>{children}</span>
);

export const Progress = ({ value }: { value: number }) => (
  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
    <div className="h-full rounded-full bg-indigo-600 transition-all duration-700" style={{ width: `${value}%` }} />
  </div>
);

export const Button = ({ variant = "primary", className = "", children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" | "danger" }) => {
  const variantClasses = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-200",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-indigo-100",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-indigo-100",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-200",
  };

  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Input = ({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 ${className}`}
  />
);

export const Select = ({ className = "", ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    {...props}
    className={`w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 ${className}`}
  />
);

export const Grid = ({ children }: { children: ReactNode }) => <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{children}</div>;

export const LoadingSpinner = ({ label = "Loading..." }: { label?: string }) => (
  <div className="flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
    <span className="h-4 w-4 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
    <span>{label}</span>
  </div>
);

export const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center shadow-sm">
    <p className="text-base font-semibold text-slate-800">{title}</p>
    <p className="mt-2 text-sm text-slate-500">{description}</p>
  </div>
);

export const ErrorState = ({ title, description }: { title: string; description: string }) => (
  <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
    <p className="font-semibold">{title}</p>
    <p className="mt-1 text-sm text-red-600">{description}</p>
  </div>
);

export const Btn = ({ children, ...p }: ButtonHTMLAttributes<HTMLButtonElement>) => (
  <Button {...p}>{children}</Button>
);
