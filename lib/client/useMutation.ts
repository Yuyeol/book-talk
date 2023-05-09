import { useState } from "react";

export default function useMutation(url: string) {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });

  function mutation(data: any, method: "POST" | "DELETE") {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }
  return { mutation, ...state };
}
