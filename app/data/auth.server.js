import { prisma } from './database.server'
import { hash, compare } from 'bcryptjs'
import { createCookieSessionStorage, redirect } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
    throw new Error("SESSION_SECRET must be set");
}

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage({
        // a Cookie from `createCookie` or the CookieOptions to create one
        cookie: {
            name: "__session",

            // all of these are optional
            // domain: "remix.run",
            expires: new Date(Date.now() + 30),
            httpOnly: true,
            maxAge: 60,
            path: "/",
            sameSite: "lax",
            secrets: [sessionSecret],
            secure: process.env.NODE_ENV === 'production'
        }
    });

export { getSession, commitSession, destroySession };

async function createUserSession(userId, redirectPath) {
    const session = await getSession()
    session.set('UID', userId)
    return redirect(redirectPath, {
        headers: {
            'Set-Cookie': await commitSession(session)
        }
    })
}

export async function getUserFromSession(request){
    const session = await getSession(request.headers.get('Cookie'))

    const userId = session.get('UID')

    if (!userId) {
        return null
    }

    return userId
}

export async function signup({ email, password }) {
    const existingUser = await prisma.user.findFirst({ where: { email } })

    if (existingUser) {
        const error = new Error('A user with the provided email address already exists')
        error.status = 422
        throw error
    }

    const passwordHash = await hash(password, 16)
    const user = await prisma.user.create({ data: { email: email, password: passwordHash } })
    return createUserSession(user.id, '/expenses')
}

export async function signin({ email, password }) {
    const existingUser = await prisma.user.findFirst({ where: { email } })

    if (!existingUser) {
        const error = new Error('Could not log you in. please check your email address')
        error.status = 401
        throw error
    }

    const isPassowrdCorrect = await compare(password, existingUser.password)
    if (!isPassowrdCorrect) {
        const error = new Error('Could not log you in. please check your password')
        error.status = 401
        throw error
    }

    return createUserSession(existingUser.id, '/expenses')
}