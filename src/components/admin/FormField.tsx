import { cn } from "@/lib/utils";
import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

export function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="mb-1.5 flex items-end justify-between gap-3">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-purple-deep">
        {children}
      </label>
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </div>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs text-red-600">{message}</p>;
}

const controlClass =
  "w-full rounded-2xl border border-border-soft bg-white px-3.5 py-2.5 text-sm text-[#171717] outline-none transition focus:border-purple-electric focus:ring-4 focus:ring-purple-primary/10 disabled:opacity-60";

export function TextInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClass, className)} {...props} />;
}

export function TextTextarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(controlClass, "min-h-[110px] resize-y leading-relaxed", className)}
      {...props}
    />
  );
}

export function TextSelect({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select className={cn(controlClass, className)} {...props}>
      {children}
    </select>
  );
}

export function CheckboxField({
  id,
  name,
  label,
  defaultChecked,
}: {
  id: string;
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label htmlFor={id} className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-purple-deep">
      <input
        id={id}
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        value="true"
        className="h-4 w-4 rounded border-border-soft text-purple-primary focus:ring-purple-primary/30"
      />
      <span className="font-medium">{label}</span>
    </label>
  );
}

export function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border-soft bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-purple-deep">{title}</h2>
        {description ? <p className="mt-1 text-sm text-muted">{description}</p> : null}
      </div>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}
