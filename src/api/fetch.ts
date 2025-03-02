
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Nesto-Candidat': 'Sandeep Ponagandla'
}

export async function getData<T>(url: string): Promise<T> {
    const options: RequestInit = {
        method: "GET",
        headers
    };

    try {
        const response = await fetch(`https://nesto-fe-exam.vercel.app/api/${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<T>;
    } catch (error) {
        console.error('Error making API request:', error);
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
        const response = await fetch(`https://nesto-fe-exam.vercel.app/api/${url}`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json() as Promise<T>;
    } catch (error) {
        console.error('Error making API request:', error);
        throw error;
    }
}