import { NextRequest, NextResponse } from "next/server";

export function corsMiddleware(req: NextRequest) {

    const host = req.headers.get("host") || "";
    const referer = req.headers.get("referer") ? new URL(req.headers.get("referer") as string).origin : "";
    const origin = req.headers.get("origin") || referer;
    console.log({ origin, referer,host })
    const isSameOrigin = !req.headers.get("origin") && !referer && host;
    const allowedOrigins = [
        "http://localhost:3000",
        // "https://your-production-site.com/",
    ];

    // Reject the request if the domain is not allowed
    if (!isSameOrigin && !allowedOrigins.includes(origin)) {
        return NextResponse.json({ error: "CORS Not Allowed", status: 403 }, {
            status: 403,
            headers: { "Content-Type": "application/json" },
        });
    }

    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    response.headers.set("Access-Control-Allow-Credentials", "true");

    // Handle preflight (OPTIONS) requests
    if (req.method === "OPTIONS") {
        return new NextResponse(null, { status: 204 });
    }
    return response;
}
