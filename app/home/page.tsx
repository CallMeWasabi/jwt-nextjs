"use client"

import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const HomePage = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [res, setRes] = useState<number | undefined>(undefined)
    const [userInfo, setUserInfo] = useState(() => {
        const getUserInfo = async () => {
            try {
                const response = await axios.get("/api/users")

                if (response.status !== 200) {
                    throw new Error()
                }

                setUserInfo(response.data.userInfo.email)
            } catch (error) {
                console.error(error)
            }
        }
        const result = getUserInfo().then((result) => {
            return result
        })
        return result
    })
    let intervalId: NodeJS.Timeout[] = []

    function clearAllInterval() {
        if (intervalId.length === 0) {
            return;
        }
        for (let i = 0; i < intervalId.length; i++) {
            clearInterval(intervalId[i])
        }
        intervalId.splice(0, intervalId.length)
    }

    useEffect(() => {
        // Check token user every 5 seconds
        const reValidation = async () => {
            try {
                const res = await fetch("/api/users")
                if (res.status !== 200) {
                    throw new Error()
                }

            } catch (error) {
                console.error(error)
                clearAllInterval()
                router.push("/login")
            }
        }

        if (intervalId.length === 0) {
            intervalId.push(setInterval(reValidation, 5000))
        } else if (intervalId.length > 1) {
            let len = intervalId.length
            for (let i = 0; i < len - 1; i++) {
                intervalId.pop()
            }
        }
    }, [])

    const userLogout = async () => {
        setLoading(true)
        clearAllInterval()
        try {
            await axios.delete("/api/users")
        } catch (error) {
            console.error(error)
        }
        router.push("/login")
        setLoading(false)
    }

    const requestData = async () => {
        try {
            const response = await axios.get("/api/users")
            setRes(response.data.resource)
        } catch (error) {
            console.error(error)
            setRes(-1)
            userLogout()
        }
    }

    return (
        <div className="flex justify-center items-center h-[600px]">
            <div className="card lg:card-side bg-base-100 shadow-xl border">
                <div className="card-body">
                    <div className="flex justify-between gap-x-10">
                        <h1 className="card-title">Jsonwebtoken-api-test</h1>
                        <div className="tooltip" data-tip={userInfo}>
                            <button className="btn">U</button>
                        </div>
                    </div>
                    <p className="text-sm text-neutral-600">Homepage token expire in 1 minute <br /> if token timeout we will auto redirect to login page</p>
                    <div className="h-[200px] flex items-center justify-center">
                        {(res !== undefined && res >= 1 && res <= 1000)  ?
                            <h1>Your lucky number is {res}</h1>
                        : res === -1 &&
                            <h1 className="text-red-600">Can not access data</h1>
                        }
                    </div>
                    <div className="card-actions flex justify-end">
                        <button disabled={loading} className="btn btn-neutral" onClick={requestData}>Test request data</button>
                        <button disabled={loading} className="btn btn-neutral btn-outline" onClick={userLogout}>Logout</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default HomePage
