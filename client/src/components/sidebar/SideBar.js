import { MdDeselect, MdLogout, MdSearch } from "react-icons/md"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./sidebar.css"
import MenuLink from "./MenuLink"
// import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import useAuth from "../../hooks/useAuth";

const SideBar = () => {
    const { username, fullname, role } = useAuth()
    // const [logout, { isSuccess }] = useSendLogoutMutation()
    const navigate = useNavigate()

    const adminMenuItems = [
        {
            title: "דפים",
            list: [
                {
                    title: "ראשי",
                    path: "/dash",
                    icon: <MdSearch />,
                },
                {
                    title: "משפחות",
                    path: "/dash/families",
                    icon: <MdSearch />,
                }, {
                    title: "נציגים",
                    path: "/dash/employees",
                    icon: <MdSearch />,
                }, {
                    title: "מנהלים",
                    //******************
                    path: "/dash/employees/admin",
                    icon: <MdSearch />,
                },
            ]
        },
        {
            title: "משתמשים",
            list: [
                {
                    title: "הגדרות",
                    path: "/dash/settings",
                    icon: <MdSearch />,
                },
                {
                    title: "עזרה",
                    path: "/dash/help",
                    icon: <MdSearch />,
                },
            ]


        }]
    const employeeMenuItems = [
        {
            title: "דפים",
            list: [
                {
                    title: "ראשי",
                    path: "/dash",
                    icon: <MdSearch />,
                },
                {
                    title: "משפחות",
                    path: "/dash/families",
                    icon: <MdSearch />,
                }
            ]
        },
        {
            title: "משתמשים",
            list: [
                {
                    title: "הגדרות",
                    path: "/dash/settings",
                    icon: <MdSearch />,
                },
                {
                    title: "עזרה",
                    path: "/dash/help",
                    icon: <MdSearch />,
                },
            ]


        }]
    const familyMenuItems = [
        {
            title: "דפים",
            list: [
                {
                    title: "ראשי",
                    path: "/dash",
                    icon: <MdSearch />,
                }
            ]
        },
        {
            title: "משתמשים",
            list: [
                {
                    title: "הגדרות",
                    path: "/dash/settings",
                    icon: <MdSearch />,
                },
                {
                    title: "עזרה",
                    path: "/dash/help",
                    icon: <MdSearch />,
                },
            ]


        }]

    const menuItems = role === "מנהל" ? adminMenuItems : (role === "נציג" ? employeeMenuItems : familyMenuItems)
  

    const logoutClick = () => {
        //logout()
        navigate("/login")

    }
    return <div className="side-bar">
        <div className="side-bar-user">
            <div className="side-bar-user-details">
                <span className="side-bar-user-fullname">{fullname}</span>
                <span className="side-bar-user-username">{username}</span>
                <span className="side-bar-user-role">{role}</span>
            </div>
        </div>
        <ul className="side-bar-menu-list">{menuItems.map(cat => (<li key={cat.title}>
            <span className="side-bar-menu-cat">{cat.title}</span>
            {cat.list.map(item => (
                <MenuLink item={item} key={item.title} />
            ))}
        </li>)
        )}
        </ul>
        <button onClick={logoutClick} className="side-bar-logout">
            <MdLogout />
            יציאה
        </button>

    </div>
}
export default SideBar