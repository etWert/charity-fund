import "./registerPage.css";
import { useRegisterMutation } from "../authApiSlice";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GrReturn } from "react-icons/gr";

const RegisterPage = () => {
    const [register, { isError, error, isLoading, isSuccess }] = useRegisterMutation();
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            setRegistrationSuccess(true);
        }
    }, [isSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const userObj = Object.fromEntries(data.entries());
        register(userObj);
    };

    return (
        <div className="register-page">
            {!registrationSuccess ? (
                <form onSubmit={handleSubmit} className="register-page-form">
                    <h1>הרשמת משתמש חדש</h1>
                    <input type="text" required name="name" id="name" placeholder="שם" />
                    <input type="text" required name="username" id="username" placeholder="שם משתמש" />
                    <input type="password" required name="password" id="password" placeholder="סיסמה" />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "נרשם..." : "הרשמה"}
                    </button>
                    {isError && <p className="error">{error.data?.message}</p>}
                </form>
            ) : (
                <div className="success-message">
                    <p>נרשמת בהצלחה !! לכניסה <Link to="/login" className="return-link">לחץ כאן</Link></p>
                </div>
            )}
        </div>
    );
};

export default RegisterPage;
