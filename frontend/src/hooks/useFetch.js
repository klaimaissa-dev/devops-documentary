import { useState, useEffect } from 'react';

const BASE = process.env.REACT_APP_API_URL || '';

function useFetch(endpoint) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    fetch(`${BASE}${endpoint}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => { if (!cancelled) setData(json.data); })
      .catch((err) => { if (!cancelled) setError(err.message); })
      .finally(()  => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, [endpoint]);

  return { data, loading, error };
}

export default useFetch;
