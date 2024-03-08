'use server'
import {cookies} from 'next/headers'

// nextjs14쿠키. 아래는 참고자료.
// https://nextjs.org/blog/next-14
// https://nextjs.org/docs/app/api-reference/functions/cookies
const cookieStore = cookies()
export async function setCookie(name, isocode) {
    cookieStore.set(name, isocode)
}
export async function getCookie(name) {
    const cookie = cookieStore.get(name)
    return cookie
}