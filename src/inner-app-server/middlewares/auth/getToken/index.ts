import { NextRequest } from "next/server";

const getToken = (req: NextRequest) => {
    try {
        const token_name = 'nightlearn-token'
        const query_token = req.nextUrl.searchParams.get(token_name)
        let token =
            req.cookies.get(token_name)?.value || // access the cookie in backend when the cookie is httponly and it doesnot send from client side
            (req.headers as any)?.authorization ||
            (req.body as any)?.token || query_token ||
            (req.headers as any)?.['x-access-token'];

        return token;
    } catch (error) {
        throw error;
    }
}
export default getToken;