import { getAuthData } from "../actions/auth";

export async function NavBar() {
    const authData = await getAuthData()
    return (
        <nav className="">
            {
                authData && (
                    <div className="text-white" >
                        Logado
                    </div>
                )
            }
        </nav>
    )
}