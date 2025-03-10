
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Nesto-Candidat': 'Sandeep Ponagandla'
}

export const API_HOST = 'https://nesto-fe-exam.vercel.app/api'

export async function getData<T>(url: string): Promise<T> {
    const options: RequestInit = {
        method: "GET",
        headers
    };

    try {
        const response = await fetch(`${API_HOST}/${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<T>;
    } catch (error) {
        console.error('Error with getData:', error, url);
        throw error;
    }
}

export async function postData<T>(url: string, body: string, method: "POST" | "PUT" = "POST"): Promise<T> {
    const options: RequestInit = {
        method,
        headers,
        body
    };

    try {
        const response = await fetch(`${API_HOST}/${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<T>;
    } catch (error) {
        console.error('Error with postData:', error);
        throw error;
    }
}