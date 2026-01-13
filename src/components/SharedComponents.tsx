import React from "react";

interface FormInputProps {
  label: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  type?: string;
  disabled?: boolean;
}

export const FormInput = ({
  label,
  value,
  onChange,
  name,
  type = "text",
  disabled = false,
}: FormInputProps) => (
  <div className="flex flex-col gap-1.5 mb-3">
    <label className="text-sm text-slate-500 font-light">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white disabled:bg-slate-50"
    />
  </div>
);

export const InfoItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1 mb-4">
    <label className="text-sm text-slate-400 font-light">{label}</label>
    <p className="text-slate-900 font-medium text-base">{value || "-"}</p>
  </div>
);
