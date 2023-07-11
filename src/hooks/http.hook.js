import { useState, useCallback } from "react";

export const useHttp = () => {

    const [process, setProcess] = useState('waiting'); //FSM
                                    //
    const request = useCallback(async (url, method = 'GET', body = null, headers = {'Content-Type': 'aplication/json'}) => {
                    // используем useCallback потому что предполагаем что эту конструкцию будем позже использовать внутри нашего приложения
        setProcess('loading'); //FSM

        try {
            const response = await fetch(url, {method, body, headers});

            if (!response.ok) {
                throw new Error(`Could not fetch ${url}, status: ${response.status}`);
            }

            const data = await response.json();

            return data;
        } catch(e) {
            setProcess('error') //FSM
            throw e;
        }

    }, []);

    const clearError = useCallback(() => {
        setProcess('loading'); //FSM
    }, []);

    return {request, clearError, process, setProcess};
}

