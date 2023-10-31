import { createUserSchema } from "@/app/login/FormSchema";
import prisma from "@/prisma/PrismaProvider";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"


export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, password, confirmPassword } = body.data
    
    // validation user info
    if (password != confirmPassword) {
        return NextResponse.json({ message: "Confirm password is incorrect"}, { status: 400 })
    }

    const validation = createUserSchema.safeParse({ email, password })
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    try {
        // Create user
        const userData = await prisma.user.findFirst({
            where: { email }
        })
        if (userData) {
            return NextResponse.json({ message: "The email address has already been used"}, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email,
                password: hashPassword
            }
        })

        return NextResponse.json({ message: "Create user success" }, { status: 201 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Create user fail" }, { status: 400 })
    }
}
