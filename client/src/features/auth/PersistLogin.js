import { useSelector } from "react-redux"
import { selectToken } from "./authSlice"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import { Link, Outlet } from "react-router-dom"

const PersistLogin = () => {

    const token = useSelector(selectToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.MODE_ENV != "development") {
            const verifyRefreshToken = async () => {
                console.log('verif refresh token')
                try {
                    await refresh()
                } catch (error) {
                    console.log(error)
                }
            }
            if (!token) verifyRefreshToken()
        }
        return () => effectRan.current = true
    }, [])

    let content
    if (isLoading) {
        console.log('loading')
        content = <h1>loading</h1>
    }
    else if (isError) {
        console.log('error')
        content = (
            <p className="errmsg">
                {`${error?.data?.message}-`}
                <Link to="/login">Please login again</Link>
            </p>
        )

    } else if (isSuccess && trueSuccess) {
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) {
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    }

    return content
}

export default PersistLogin
