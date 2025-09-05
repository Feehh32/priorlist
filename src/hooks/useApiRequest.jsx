import { useState } from "react";
const baseUrl = import.meta.env.VITE_API_URL;

const useApiRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle API requests
  const request = async (endpoint, method, body = null, headers = {}) => {
    setLoading(true);
    let json;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${baseUrl}/${endpoint}`, options);

      // Check if the response is JSON
      json = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          json?.error ||
            json?.message ||
            "Não foi possível realizar a requisição"
        );
        setData(null);
        console.error(`${response.status} - ${response.statusText}`);
        return;
      }
      setData(json);
      setError(null);
      return json;
    } catch (err) {
      setError("Não foi possível realizar a requisição");
      console.error(`Erro na requisição: ${err.message}`);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return { request, data, error, loading };
};

export default useApiRequest;
