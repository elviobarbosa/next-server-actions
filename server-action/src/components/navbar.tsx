import { getAuthData, logout } from "../actions/auth";
import { Form } from "./form";

export async function NavBar() {
    const authData = await getAuthData()
    return (
        <nav className="">
            {
                authData && (
                    <>
                    <div className="text-white" >
                        Logado
                    </div>
                    <Form action={logout}><button>Sair</button></Form>
                    </>
                    
                )
            }
            
        </nav>
    )
}