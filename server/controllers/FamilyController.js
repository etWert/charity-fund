const Employee = require("../models/Employee")
const Family = require("../models/Family")
const bcrypt = require("bcrypt")

const getAllFamilies = async (req, res) => {
    const family = await Family.find({}, { password: 0 }).populate("employee").lean()

    if (!family.length) {
        return res.status(400).json({
            error: true,
            message: "no family",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: family
    })
}
const getFamilyById = async (req, res) => {
    const { id } = req.params
    const family = await Family.findById(id, { password: 0 }).lean()
    if (!family) {
        return res.status(400).json({
            error: true,
            message: "no family",
            data: null
        })
    }
    res.json({
        error: false,
        message: "",
        data: family
    })
}

const addFamily = async (req, res) => {
    const tzFile = (req.file?.filename ? req.file.filename : "")

    const { employee, name, username, password, address, phone, email, marital_status, bank_details, parent1, parent2, child } = req.body
    console.log(employee);
    console.log(typeof (employee));
    if (!name || !password || !username || !marital_status || !bank_details) {
        return res.status(400).json({
            error: true,
            message: "name, username, password, marital_status and bank_details are required",
            data: null
        })
    }
    const hashPassword = await bcrypt.hash(password, 10)
    let duplicate = await Family.findOne({ username }).lean()
    if (!duplicate) {
        duplicate = await Employee.findOne({ username }).lean()
    }
    if (duplicate) {
        return res.status(409).json({
            error: true,
            message: "duplicate username",
            data: null
        })
    }
    const family = await Family.create({ employee, name, username, password: hashPassword, address, phone, email, marital_status, bank_details, parent1, parent2, child, tzFile })
    if (!family) {
        return res.status(404).json({
            error: true,
            message: "no family",
            data: null
        })
    }
    res.json({
        error: false,
        message: "The family was successfully added",
        data: { username: family.username, _id: family._id }
    })
}
const updateFamily = async (req, res) => {
    const tzFile = (req.file?.filename ? req.file.filename : "")
    console.log("444444444444");
    console.log(req.body);
    console.log("44444444444444444");

    const { id, employee, name, username, password, address, phone, email, marital_status, bank_details, parent1, parent2, child ,waiting,approved} = req.body
    console.log(id);
    if (!id) {
        return res.status(404).send("ID is required")
    }
    const family = await Family.findById(id).exec()
    if (!family) {
        return res.status(400).json({
            error: true,
            message: "no family",
            data: null
        })
    }
    console.log("1");
    console.log(family.password);
    if (password) {
        // const hashPassword = await bcrypt.hash(password, 10)
        const hashPassword = bcrypt.hashSync(password, 10)

        family.password = hashPassword
    }

    else {
        // family.password = family.password
        console.log(family.password);


    }
    console.log("2");

    if (username) {
        console.log("3");

        const duplicate = await Family.findOne({ username }).lean()
        console.log("4");

        if (duplicate && duplicate.username !== family.username) {
            console.log("5");

            return res.status(409).json({
                error: true,
                message: "duplicate username",
                data: null
            })
        }
        console.log("6");

    }

    console.log("employee");
    console.log(employee);

    family.employee = employee
    
    console.log("family.employee");
    console.log(family.employee);

    family.name = name
    family.username = username
    family.address = address
    family.phone = phone
    family.email = email
    family.marital_status = marital_status
    family.bank_details = bank_details
    family.parent1 = parent1
    family.parent2 = parent2
    family.child = child
    family.waiting = waiting
    family.approved = approved
    if (tzFile)
        family.tzFile = tzFile
    console.log("7");
    console.log(family);
    const updateFamily = await family.save()
    console.log("8");

    res.json({
        error: false,
        message: "The family was successfully updeted",
        data: { username: updateFamily.username, _id: updateFamily._id }
    })

}
const deleteFamily = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).res.json({
            error: true,
            message: "ID is required",
            data: null
        })
    }
    const family = await Family.findById(id).exec()
    if (!family) {
        return res.status(400).res.json({
            error: true,
            message: "no family found",
            data: null
        })
    }
    //זה מוחק מהמסד ולא עשינו כפתור שמאפשר למחוק
    const deletedFamily = await family.deleteOne()
    res.json({
        error: false,
        message: "The family was successfully deleted",
        data: deletedFamily
    })
    //המורה עשתה שדה deleted
    //והיא לא מחקה באמת אלא עדכנה true/ false
    //לחשוב מה מתאים לנו
    //ואם כן -להוסיף את השדה במודל ולחצן בריקאט ואולי עוד דברים
    // family.deleted=true
    // const updateFamily = await family.save()
    // res.json({
    //     error: false,
    //     message: "The family was successfully deleted",
    //     data: {username:updateFamily.username,_id:updateFamily._id}
    // })
}

module.exports = { getAllFamilies, getFamilyById, addFamily, updateFamily, deleteFamily } 