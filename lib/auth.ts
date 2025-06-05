import { db } from '@/db'
import { usersTable } from '@/db/schema'
import { hash, compare } from 'bcrypt'
import * as jose from 'jose'
import { cookies } from 'next/headers'
import { cache } from 'react'
interface JWTPayload {
  userId: string
  [key: string]: string | number | boolean | null | undefined
}
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'bombastic'
)

const JWT_EXPIRATION = '7d'

const REFRESH_THRESHOLD = 24 * 60 * 60 //24hours in seconds

export const generateJWT = async (payload: JWTPayload) => {
  return await new jose.SignJWT()
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}
export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15, // 15 seconds tolerance for clock skew
    })

    // Get expiration time
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)

    // If token expires within the threshold, refresh it
    return exp - now < REFRESH_THRESHOLD
  } catch {
    // If verification fails, token is invalid or expired
    return false
  }
}

export const createSession = async (userId: string) => {
  try {
    const token = await generateJWT({ userId })
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    })
    return true
  } catch (err) {
    console.error('Error while creating session', err)
    return false
  }
}

export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies()
    console.log(cookieStore)
    const token = cookieStore.get('auth_token')?.value
    if (!token) {
      return null
    }
    const payload = await verifyJWT(token)
    if (!payload) {
      return null
    }
    return { userId: payload.userId }
  } catch (error) {
    // Handle the specific prerendering error
    if (
      error instanceof Error &&
      error.message.includes('During prerendering, `cookies()` rejects')
    ) {
      console.log(
        'Cookies not available during prerendering, returning null session'
      )
      return null
    }

    console.error('Error getting session:', error)
    return null
  }
})
const deleteSession = async () => {
  const cookieStore = cookies()
  ;(await cookieStore).delete('auth_token')
}
export const hashpassword = async (password: string) => {
  return hash(password, 10)
}
export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  return compare(password, hashedPassword)
}
export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const hashedPassword = await hashpassword(password)
  try {
    await db
      .insert(usersTable)
      .values({ email, name, password: hashedPassword })
    return { id: usersTable.id, name, email }
  } catch (err) {
    console.error('Failed to create User', err)
    return {
      success: null,
    }
  }
}
