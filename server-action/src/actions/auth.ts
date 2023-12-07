'use server'

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function LoginAction(prevState: any, formData: FormData) {
 
    //console.log(formData)
    const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            username: formData.get('username'),
            password: formData.get('password')
        })
    })

    if (response.ok) {
        const data = await response.json();
        //console.log(data)
        await setAuthData(data.token)
        redirect("/protected")
    } else {
        const data = await response.json();
        return { error: data.error }
    }
}

export async function getToken() {
    const authData = await getAuthData();
    return authData?.token
}

export async function getAuthData() {
    const cookiesStore = cookies();
    const auth = cookiesStore.get('auth')?.value;
    if (!auth) {
        return null
    }

    return JSON.parse(auth)
}

export async function setAuthData(jwtToken: string) {
    const payloadBase64 = jwtToken.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    const cookiesStore = cookies();
    cookiesStore.set('auth', JSON.stringify({
        token: jwtToken,
        payload
    }))
}