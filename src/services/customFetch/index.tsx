const customFetch = async (url: string | URL | globalThis.Request, options?: RequestInit) => {
    try {
        const baseUrl = 'http://localhost:3000/api/' // inner app server nextjs
        const result = await fetch(`${baseUrl}${url}`, options)
        const response = await result.json();
        return response
    } catch (error) {
        return error
    }
}
export default customFetch;