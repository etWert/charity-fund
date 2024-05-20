import {MdSearch}from "react-icons/md"
import "./navbar.css"
const Navbar = () => {
    return <div className="Navbar">
        <div className="navbar-title">
            ראשי
        </div>
        <div className="navbar-menu">
            <div className="navbar-search">
                <MdSearch/>
                <input type="text" placeholder="search" className="navbar-input" />
            </div>
            <div className="navbar-icons">
            </div>
        </div>

    </div>
}
export default Navbar