'use client'
import React, { PropsWithChildren } from "react"
import { useFormState } from "react-dom"

type HTMLFormProps = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>

type FormProps = PropsWithChildren<Omit<HTMLFormProps, "action"> & {
    action: (prevState: any, formData: FormData) => Promise<any>
}>

export function Form(props: FormProps) {
    const [state, formAction] = useFormState(props.action, { error: null });
    return (
    <form {...props} action={formAction} >
        {state.error && (
            <div className="bg-red-500 text-white p-2 rounded">{state.error}</div>
        )}
        {props.children}
    </form>
    )
}