'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const SignOut = () => {
    return (
        <div onClick={() => {
            signOut();
        }}>Sign Out</div>
    )
}

export default SignOut