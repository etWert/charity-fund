import { useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode"
import { selectToken } from "../features/auth/authSlice"

const useAuth = () => {
    const token = useSelector(selectToken)
    ///////////////////////
    let isAdmin = true
    let isFamily = false
    let isEmployee = false
    if (token) {
        const userDecode = jwtDecode(token)
        console.log("userDecode", userDecode)
        const { _id, username, role, name, isAdmin, isEmployee, isFamily } = userDecode
///////////////////////
///////////////////////
        // console.log(role)
        // isAdmin = role === "מנהל"
        // isEmployee = role === "נציג"
        // isFamily = role === "משפחה"
        return { username, role, name, isAdmin, isEmployee, isFamily, _id }

    }
    return { _id: "", username: "", name: "", role: "", isAdmin, isEmployee, isFamily }
}
export default useAuth