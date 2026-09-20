import { useCallback, useState } from 'react'
import { translateText } from '../services/translateApi'

export function useTranslate() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const translate = useCallback(async (text, target) => {
    if (!text.trim()) {
      setError('Enter some English text to translate.')
      return
    }
    setLoading(true)
    setError('')
    try {
      setResult(await translateText(text, target))
    } catch (err) {
      setResult('')
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult('')
    setError('')
  }, [])

  return { result, loading, error, translate, reset }
}
