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
    // Re-runs when `fetcher` changes, so pass a stable reference (a module
    // function like `fetchMilestones`, or a useCallback), not an inline closure.
  }, [fetcher])

  return { data, loading }
}
