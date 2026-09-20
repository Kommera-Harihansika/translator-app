import { LANGUAGES } from '../data/languages'

export default function LanguageSelect({ value, onChange }) {
  return (
    <label className="flex items-center gap-2">
      <span className="sr-only">Translate into</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-ink/15 bg-white px-3 py-1.5 font-medium outline-none focus-visible:ring-2 focus-visible:ring-leaf"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </label>
  )
}
