// How to allow only if the request come from the same domain?
export async function GET(request) {
    return Response.json({ request })
}