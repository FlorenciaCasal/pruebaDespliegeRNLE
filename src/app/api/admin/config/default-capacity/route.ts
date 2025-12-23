import { NextRequest } from "next/server";
import { backendFetch } from "@/app/api/_backend";


export async function GET() {
    const res = await backendFetch(`/api/admin/config/default-capacity`, {
        cache: "no-store",
    });

    const body = await res.text();
    return new Response(body, {
        status: res.status,
        headers: {
            "content-type": res.headers.get("content-type") ?? "application/json",
        },
    });
}

export async function PUT(req: NextRequest) {
    const body = await req.text();

    const res = await backendFetch(`/api/admin/config/default-capacity`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body,
    });

    return new Response(null, { status: res.status });
}




