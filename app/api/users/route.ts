import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value

    if (!token) {
        return NextResponse.json({ message: "forbidden" }, { status: 401 })
    }

    try {

        const userInfo = jwt.verify(token, process.env.SECRET_KEY as string)

        return NextResponse.json({ message: "ok", userInfo, resource: JSON.stringify(getRandomInt(0, 1001))}, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "forbidden" }, { status: 401 })
    }
}

export async function DELETE(req: NextRequest) {
    console.log(req)
    if (cookies().has("token")) {
        // req.cookies.delete("token")
        cookies().delete("token")
    }
    return NextResponse.json({ message: "delete token success" }, { status: 200 })
}