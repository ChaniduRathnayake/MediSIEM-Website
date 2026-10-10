import { useEffect, useState } from 'react'

// Runs an already-fallback-safe fetcher (see src/services/api.ts) and tracks
// a loading flag so pages can show a skeleton instead of a blank screen.
export function useAsyncData<T>(fetcher: () => Promise<T>, initialValue: T) {
  const [data, setData] = useState<T>(initialValue)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetcher().then((result) => {
      if (isMounted) {
        setData(result)
        setLoading(false)
      }
    })

    return () => {
      isMounted = false
    }
    // Intentionally runs once on mount — `fetcher` is expected to be a stable
    // reference (e.g. `fetchMilestones`), not an inline closure.
  }, [])

  return { data, loading }
}
