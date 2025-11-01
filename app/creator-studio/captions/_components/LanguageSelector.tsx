"use client";

type Props = {
  value: string;
  onChange: (lang: string) => void;
};

const options = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "de", label: "German" },
];

export default function LanguageSelector({ value, onChange }: Props) {
  return (
    <select
      className="rounded-lg px-3 py-2 text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      title="Caption language"
    >
      {options.map((o) => (
        <option key={o.code} value={o.code}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
