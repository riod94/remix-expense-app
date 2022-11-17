import { json } from "@remix-run/node";

export function action({request}) {
    if (request.method !== 'post') {
        throw json({message:'Invalid request method'},{status:400})
    }
}