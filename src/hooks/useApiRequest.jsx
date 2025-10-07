import { useCallback, useState } from "react";
const baseUrl = import.meta.env.VITE_API_URL;

const useApiRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle API requests
  const request = useCallback(
    async (endpoint, method, body = null, headers = {}) => {
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
          setError({
            code: response.status,
            message:
              json?.message ||
              json?.error ||
              "Não foi possível realizar a requisição",
          });

          setData(null);
          console.error(`${response.status} - ${response.statusText}`);
          return {
            success: false,
            error: {
              code: response.status,
              message: json?.message || json?.error,
            },
          };
        }
        setData(json);
        setError(null);
        return json;
      } catch (err) {
        setError({
          code: null,
          message: err.message || "Não foi possível realizar a requisição",
        });
        console.error(`Erro na requisição: ${err.message}`);
        setData(null);
        return {
          success: false,
          error: {
            code: null,
            message: "Erro na requisição, tente novamente mais tarde",
          },
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { request, data, error, loading };
};

export default useApiRequest;
