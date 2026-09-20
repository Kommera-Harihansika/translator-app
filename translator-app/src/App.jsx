import { useState } from 'react'
import LanguageSelect from './components/LanguageSelect'
import { useTranslate } from './hooks/useTranslate'

const MAX_CHARS = 1000

export default function App() {
  const [text, setText] = useState('')
  const [target, setTarget] = useState('es')
  const [copied, setCopied] = useState(false)
  const { result, loading, error, translate, reset } = useTranslate()

  const handleTranslate = () => translate(text, target)

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') handleTranslate()
  }

  const handleClear = () => {
    setText('')
    reset()
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable; ignore */
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Translate English text</h1>
      <p className="mt-2 max-w-prose text-ink/70">
        Type or paste English, pick a language, and get the translation.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {/* Input panel */}
        <section className="rounded-2xl border border-ink/10 bg-white focus-within:ring-2 focus-within:ring-leaf">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
            <h2 className="font-medium">English</h2>
            <span className="text-sm text-ink/60">
              {text.length}/{MAX_CHARS}
            </span>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            maxLength={MAX_CHARS}
            placeholder="Type something to translate…"
            aria-label="English text to translate"
            className="h-56 w-full resize-none bg-transparent p-4 text-lg outline-none placeholder:text-ink/40"
          />
        </section>

        {/* Output panel */}
        <section className="flex flex-col rounded-2xl border border-ink/10 bg-white">
          <div className="flex items-center justify-between border-b border-ink/10 px-4 py-2.5">
            <LanguageSelect value={target} onChange={setTarget} />
            <button
              onClick={handleCopy}
              disabled={!result}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-leaf outline-none hover:bg-leaf/10 focus-visible:ring-2 focus-visible:ring-leaf disabled:opacity-40 disabled:hover:bg-transparent"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div
            aria-live="polite"
            className="h-56 overflow-y-auto whitespace-pre-wrap p-4 text-lg"
          >
            {loading ? (
              <span className="text-ink/50">Translating…</span>
            ) : result ? (
              result
            ) : (
              <span className="text-ink/40">Your translation appears here.</span>
            )}
          </div>
        </section>
      </div>

      {error && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-red-800">
          {error}
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={handleTranslate}
          disabled={loading}
          className="rounded-xl bg-leaf px-6 py-2.5 font-medium text-white outline-none hover:bg-leaf-dark focus-visible:ring-2 focus-visible:ring-leaf focus-visible:ring-offset-2 disabled:opacity-50"
        >
          {loading ? 'Translating…' : 'Translate'}
        </button>
        <button
          onClick={handleClear}
          className="rounded-xl border border-ink/20 px-5 py-2.5 font-medium outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-leaf"
        >
          Clear
        </button>
        <span className="hidden text-sm text-ink/50 sm:inline">or press Ctrl + Enter</span>
      </div>
    </main>
  )
}
