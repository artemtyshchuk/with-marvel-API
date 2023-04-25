import { useState, useCallback } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false); // состояние необходимо будет менять, это будет происходить во время запросов когда загрузка будет тру
    const [error, setError] = useState(null);  // А также когда будет появляться ошибка, когда запрос закончился ошибкой
        // запрос  Сюда помещаем функцию которая будет делать запросы
                                    //
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => {
                    // используем useCallback Патамушта предполагаем что эту конструкцию будем позже использовать внутри нашего приложения
        setLoading(true);

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            setLoading(false);
            return data;
        } catch(e) {
            setLoading(false);
            setError(e.message);
            throw e;
        }

    }, []);

    const clearError = useCallback(() => setError(null), []);

    return {loading, request, error, clearError};
}