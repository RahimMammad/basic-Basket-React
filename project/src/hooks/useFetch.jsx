import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchData = (urlTitle) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/${urlTitle}`);
                setData(response.data);
            } catch (error) {
                setError("An error occurred while fetching the data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [urlTitle]);

    return { data, isLoading, error };
};

export default useFetchData;