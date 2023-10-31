"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassowrd, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [end, setEnd] = useState("")
    const [loading, setLoading] = useState(false)

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const handleConfirmPassowordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }

    const registerEventHandler = async (email: string, password: string, confirmPassword: string) => {
        setLoading(true)
        try {
            const response = await axios.post("/api/register", {
                data: {
                    email,
                    password,
                    confirmPassword
                }
            })
            
            if (response.status == 201) {
                setError("")
                setEnd("Create user success return to login page?")
            }


        } catch (error: any) {
            console.error(error.response.data.message)
            setError(error.response.data.message)
        }
        setLoading(false)
    }

    return (
        <div className="flex justify-center items-center h-[600px]">
            <div className="card lg:card-side bg-base-100 shadow-xl border">
                <div className="card-body">
                    <h1 className="card-title">Jsonwebtoken-api-test</h1>
                    <p className="text-sm text-neutral-600">Register account</p>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs" value={email} onChange={handleUsernameChange} />
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full max-w-xs" value={password} onChange={handlePasswordChange} />
                        <label className="label">
                            <span className="label-text text-xs">password must contains be least 4 character or number</span>
                        </label>
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text">Confirm password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full max-w-xs" value={confirmPassowrd} onChange={handleConfirmPassowordChange} />
                    </div>
                    {error &&
                        <div className="flex justify-start text-red-700">
                            {error}
                        </div>
                    }
                    {end &&
                        <div className="flex flex-col justify-start text-green-500">
                            <p>{end}</p>
                        </div>
                    }
                    <div className="card-actions flex justify-end mt-6">
                        <button className="btn btn-neutral" disabled={loading} onClick={() => registerEventHandler(email, password, confirmPassowrd)}>
                            Register
                            {loading &&
                                <span className="loading loading-spinner loading-md"></span>
                            }
                        </button>
                        <button className="btn btn-neutral btn-outline" disabled={loading}>
                            <Link href="/login">Login</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
