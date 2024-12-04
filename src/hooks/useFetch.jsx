import { useState, useEffect } from "react";


const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message);
        }
        setData(result);
      } catch (e) {

        if (e.message === "Unauthorized") {
          localStorage.removeItem("token");
          localStorage.removeItem("rol");
          window.location.href = "/";
        }
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    if (url) fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
