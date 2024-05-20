const Employee = require("../models/Employee")
const bcrypt = require("bcrypt")
const getAllEmployee = async (req, res) => {
    const employee = await Employee.find({}, { password: 0 }).lean()
    if (!employee.length) {
        return res.status(400).json({
            error: true,
            message: "no employee",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: employee
    })
}
const getEmployeeById = async (req, res) => {
    const { id } = req.params
    const employee = await Employee.findById(id, { password: 0 }).lean()
    if (!employee) {
        return res.status(400).json({
            error: true,
            message: "no employee",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: employee
    })
}
const addEmployee = async (req, res) => {
    const { name, username, password, phone, email, role } = req.body
    if (!name || !password || !username || (role !== 'נציג' && role !== 'מנהל' && role)) {
        return res.status(400).json({
            error: true,
            message: "name, username and password are required",
            data: null
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const duplicate = await Employee.findOne({ username }).lean()
    if (duplicate) {
        return res.status(409).json({
            error: true,
            message: "duplicate username",
            data: null
        })
    }

    const employee = await Employee.create({ name, username, password: hashPassword, phone, email, role })
    if (!employee) {
        return res.status(404).json({
            error: true,
            message: "no employee",
            data: null
        })
    }
    res.json({
        error: false,
        message: "The employee was successfully added",
        data: employee
    })
}
const updateEmployee = async (req, res) => {

    const { id, name, username, password, phone, email, role } = req.body

    if (!id) return res.status(404).send("ID is required")

    if (role !== 'נציג' && role !== 'מנהל' && role) {
        return res.status(400).json({
            error: true,
            message: "role not valid",
            data: null
        })
    }
    const employee = await Employee.findById(id).exec()

    if (!employee) {
        return res.status(400).json({
            error: true,
            message: "no employee",
            data: null
        })
    }
    if (password) {
        const hashPassword = await bcrypt.hash(password, 10)
        employee.password = hashPassword
    }
    else {
        employee.password = password
    }
    if (username) {
        const duplicate = await Employee.findOne({ username }).lean()
        if (duplicate && duplicate.username !== employee.username) {
            return res.status(409).json({
                error: true,
                message: "duplicate username",
                data: null
            })
        }
    }


    employee.name = name
    employee.username = username
    employee.phone = phone
    employee.email = email
    employee.role = role

    const newEmployee = await employee.save()

    res.json({
        error: false,
        message: "The employee was successfully updeted",
        data: newEmployee
    })
}
const deleteEmployee = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).res.json({
            error: true,
            message: "ID is required",
            data: null
        })
    }
    const employee = await Employee.findById(id).exec()
    if(!employee){
        return res.json({
            error: true,
            message: "no employee found",
            data: null
        })
    }
    const deletedEmployee = await employee.deleteOne()
    res.json({
        error: false,
        message: "The employee was successfully deleted",
        data: deletedEmployee
    })
}

module.exports = { getAllEmployee, getEmployeeById, addEmployee, updateEmployee, deleteEmployee }