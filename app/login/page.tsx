"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


const FormInput = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [end, setEnd] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const loginEventHandler = async (email: string, password: string) => {
        setLoading(true)
        try {
            

            const res = await axios.post("/api/login", {
                data: {
                    email,
                    password
                }
            })
            if (res.status == 200) {
                setEnd("Login success")
                const res  = await axios.get("/api/users")
                router.push("/home")
            }
            

        } catch (error: any) {
            console.error(error)
            setError("Wrong email or password")
        }
        setLoading(false)

    }

    return (
        <div className="flex justify-center items-center h-[600px]">
            <div className="card lg:card-side bg-base-100 shadow-xl border">
                <div className="card-body">
                    <h1 className="card-title">Jsonwebtoken-api-test</h1>
                    <p className="text-sm text-neutral-600">Login for access data</p>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={email} onChange={handleEmailChange} />
                        <label className="label">
                            <span className="label-text text-xs">Testcase email: test@gmail.com</span>
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full max-w-xs" value={password} onChange={handlePasswordChange} />
                        <label className="label">
                            <span className="label-text text-xs">Testcase password: 1234</span>
                        </label>
                    </div>
                    {error && 
                        <div className="flex justify-start text-red-700">
                            {error}
                        </div>
                    }
                    {end && 
                        <div className="flex justify-start text-emerald-500">
                            {end}
                        </div>
                    }
                    <div className="card-actions flex justify-end mt-6">
                        <button disabled={loading} className="btn btn-neutral" onClick={() => loginEventHandler(email, password)}>
                            Login
                            {loading && 
                                <span className="loading loading-spinner loading-md"></span>
                            }
                        </button>
                        <button disabled={loading} className="btn btn-neutral btn-outline"><Link href="/register">Register</Link></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormInput;
