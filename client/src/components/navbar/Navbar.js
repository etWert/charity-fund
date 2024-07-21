// import { MdCall, MdSearch } from "react-icons/md"
// import { SiGmail } from "react-icons/si";
// import { FaMapMarkerAlt } from "react-icons/fa";


// import "./navbar.css"
// const Navbar = () => {
//     return <div className="Navbar">
//         <div className="navbar-title">
//             ראשי
//         </div>
//         <div className="navbar-menu">
//             <div className="navbar-search">
//                 <MdSearch />
//                 <input type="text" placeholder="search" className="navbar-input" />
//             </div>
//             <div className="navbar-icons">
//                 <FaMapMarkerAlt size={30} title="נחל לוז 3 בית שמש" />
//                 <MdCall size={30} title="02-9951111" />
//                 <SiGmail size={30} title="a@gmail.com" />
//             </div>
//         </div>

//     </div>
// }
// export default Navbar



import { MdCall, MdSearch } from "react-icons/md";
import { SiGmail } from "react-icons/si";
import { FaMapMarkerAlt } from "react-icons/fa";
import { GiRotaryPhone } from "react-icons/gi";

import "./navbar.css";

const Navbar = () => {
    return (
        <div className="Navbar">
            <div className="navbar-title">
                ראשי
            </div>
            <div className="navbar-menu">
                <div className="navbar-search">
                    <MdSearch />
                    <input type="text" placeholder="search" className="navbar-input" />
                </div>
                {/* לשנות לפרטים האמיתיים של הקופה */}
                <div className="navbar-icons">
                    <a href="https://www.google.com/maps/place/מוסיוף+5,+ירושלים" target="_blank" rel="noopener noreferrer">
                        <FaMapMarkerAlt size={30} title="מוסיוף 5 ירושלים" />
                    </a>
                    <a href="tel:0527154470">
                        <MdCall size={30} title="052-715-4470" />
                    </a>
                    <a href="tel:0527154470">
                        <GiRotaryPhone size={30} title="052-715-4470" />
                    </a>
                    <a href="mailto:4470heny@gmail.com">
                        <SiGmail size={30} title="4470heny@gmail.com" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
