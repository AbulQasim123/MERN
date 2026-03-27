import { useState, useEffect } from "react";
function useFetch(url) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			try {
				const res = await fetch(url);
				const json = await res.json();
				setData(json);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [url])

	return { data, loading, error };
}

export default useFetch