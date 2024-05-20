const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const Family = require("../models/Family")
const Employee = require("../models/Employee")

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(401).json({
            error: true,
            message: "All fields are required",
            data: null
        })
    }
    let foundUser
    if (password === process.env.EMPLOYEE_PASSWORD) {
        foundUser = await Employee.findOne({ username: username })
    }
    else {
        foundUser = await Family.findOne({ username: username }).populate("employee", { name: 1 })
    }
    if (!foundUser) {
        return res.status(401).json({
            error: true,
            ////////////////////////////
            message: "Unauthorized-משתמש לא רשום",
            data: null
        })
    }

    //password
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized-השוואת הסיסמא לסיסמה המקודדת",
            ////////////////////////////
            data: null
        })
    }

    // token
    const UserInfo = {
        _id: foundUser._id,
        username: foundUser.username,
        name: foundUser.name,
        role: foundUser.role
    }

    const accessToken = jwt.sign(UserInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
    console.log(accessToken);
    // res.cookie("jwt", refreshToken, {
    //     httpOnly: true,
    //     maxAge: 7 * 24 * 60 * 60 * 1000
    // })

    res.json({ accessToken })

}

// const refresh = async (req, res) => {
//     const cookies = req.cookies
//     //jwt או שהוא ריק או שאין לו את
//     if (!cookies?.jwt) {
//         return res.status(401).json({
//             error: true,
//             message: "Unauthorized",
//             data: null
//         })
//     }
//     const refreshToken = cookies.jwt
//     jwt.verify(refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         async (err, decode) => {
//             if (err) {
//                 return res.status(403).json({
//                     error: true,
//                     message: "Forbidden",
//                     data: null
//                 })
//             }
//             const foundUser = await Family.findOne({ username: decode.username/*,ניתן להוסיף כאן תנאים נוספים כגון פעיל/ נמחק וכו */ }).populate("employee", { name: 1/*ניתן להוסיף שדות להצגה או הסתרה */ })
//             const UserInfo = {
//                 _id: foundUser._id,
//                 username: foundUser.username,
//                 familyName: foundUser.familyName,
//                 husband: foundUser.husband,
//                 wife: foundUser.wife,
//                 role: foundUser.role
//             }

//             const accessToken = jwt.sign(UserInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m'/* אומר לכמה זמן הטוקן הטוקן מאושר*/ })

//             res.json({ accessToken })
//         })
// }

// //איך אפשר לשמור בעוגיות ללא refreshToken?
// const logout = async (req, res) => {
//     const cookies = req.cookies
//     //jwt או שהוא ריק או שאין לו את
//     if (!cookies?.jwt) {
//         //סטטוס של - אין נתונים
//         return res.status(204).json({
//             error: true,
//             message: "NoContent ",
//             data: null
//         })
//     }
//     res.clearCookie("jwt", {
//         httpOnly: true
//     })
//     res.json({
//         error: false,
//         message: "Cookie cleard",
//         data: null
//     })
// }
module.exports = { login } 