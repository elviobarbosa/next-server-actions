import { redirect } from "next/navigation"
import { Form } from "../../components/form";
import { Submit } from "../../components/submit";
import { LoginAction } from "../../actions/auth";

function LoginPage() {

    return (
        <div className="m-2">
            <div className="bg-white p-8 rounded shadow w-96">
                <h2 className="text-2xl text-black">Login</h2>

                <Form action={LoginAction}>
                    <div className="mt-4">
                        <label className="p-2 text-black rounded">Usuário</label>
                        <input type="text"  name="username" className="text-black w-full p-2 border shadow mt-1"/>
                    </div>

                    <div>
                        <label htmlFor="" className="w-full p-2 text-black mt-1">Senha</label>
                        <input type="password"  name="password" className="text-black w-full p-2 border shadow mt-1"/>
                    </div>

                    <div>
                        <Submit type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">Enviar</Submit>
                    </div>
                </Form>
            </div>
            
        </div>
    )
}

export default LoginPage