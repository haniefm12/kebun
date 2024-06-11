import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
 
    const signup = async (name, email, password, phoneNumber, role, image) => {
        setIsLoading(true);
        setError(null);

        const response = await fetch('api/user/signup' , {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, email, password, phoneNumber, role, image })
        })
        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok){
            localStorage.setItem('user', JSON.stringify(json))

            dispatch({tpye: 'LOGIN', payload: json})

            setIsLoading(false)
        }
    }

    return {signup, isLoading, error}

}