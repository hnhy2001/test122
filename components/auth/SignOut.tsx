'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOut = () => {
    return (
        <div onClick={() => {
            signOut({ callbackUrl: window.location.href });
        }}>Sign Out</div>
    )
}

export default SignOut