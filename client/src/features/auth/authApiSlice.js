import apiSlice from "../../app/apiSlice";
import { logout, setToken } from "./authSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (userData) => ({
                url: "/api/auth/login",
                method: "POST",
                body: userData
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.accessToken) {
                        console.log(data.accessToken);
                        dispatch(setToken({ accessToken: data.accessToken }))
                    }
                } catch (error) {
                    console.log(error);
                }
            },
        }),
        // sendLogout: build.mutation({
        //     query: () => ({
        //         url: "/api/auth/logout",
        //         method: "POST",
        //     }),
        //     async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //         try {
        //             //const {data}=
        //             await queryFulfilled
        //             //console.log(data)
        //             dispatch(logout())
        //             setTimeout(() => {
        //                 dispatch(apiSlice.util.resetApiState())
        //             }, 1000)
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     }
        // }),
        // refresh: build.mutation({
        //     query: () => ({
        //         url: "/api/auth/refresh",
        //         method: "GET"
        //     }),
        //     async onQueryStarted(args, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled
        //             if (data.accessToken) {
        //                 dispatch(setToken({ accessToken: data.accessToken }))
        //             }
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     },
        // })
    })
})
export const { useLoginMutation,/* useSendLogoutMutation, useRefreshMutation*/ } = authApiSlice