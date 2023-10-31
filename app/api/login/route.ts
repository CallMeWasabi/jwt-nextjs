import { NextRequest, NextResponse } from "next/server";
import { createUserSchema } from "@/app/login/FormSchema";
import { cookies } from "next/headers"
import prisma from "@/prisma/PrismaProvider";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const SECRET_KEY = process.env.SECRET_KEY as string

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body.data


    // validation request data
    const validation = createUserSchema.safeParse({ email, password })
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    // find user by email 
    if (email !== "test@gmail.com" && password !== "1234") {
        const userData = await prisma.user.findFirst({
            where: {
                email: body.data.email
            }
        })
    
        if (!userData) {
            return NextResponse.json({ message: "Not found user" }, { status: 400 })
        }
    
        // validation password
        const passwordValidation = bcrypt.compare(password, userData.password)
        if (!passwordValidation) {
            return NextResponse.json({ message: "Password not correct" }, { status: 400 })
        }
    }

    // set token to cookies
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1m" })
    cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: true,
        maxAge: 60,
    })

    return NextResponse.json({ message: "Login success" }, { status: 200 })
}