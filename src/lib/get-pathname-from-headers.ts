import { headers } from "next/headers";


export default function getPathNameFromHeaders(): string {
    const headersList = headers();
    const referer = headersList.get('referer');
    if (referer) {
        const url = new URL(referer);
        return url.pathname;
    }
    return "/";
}