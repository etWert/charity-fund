import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: { token: null },
    reducers: {
        setToken: (state, action) => {
            const { accessToken } = action.payload
            state.token = accessToken
            //אולי צריך לשמור כאן בלוקאל  סטורג ואם כן לעשות שהסטייט ההתחלתי שווה לו או לריק
            // localStorage.setItem("token",accessToken)
        },
        // logout: (state, action) => {
        //     state.token = null
        //     // localStorage.removeItem("token",accessToken)

        // }
    }
})
export default authSlice.reducer
export const { setToken, /*logout*/ } = authSlice.actions
export  const selectToken = (state)=>state.auth.token