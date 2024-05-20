const express = require("express")
const FamilyController = require("../controllers/FamilyController")
const verifyJWT = require("../middleware/verifyJWT")
const verifyAdmin = require("../middleware/verifyAdmin")
const router = express.Router()


const multer = require("multer")
const Family = require("../models/Family")

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        //אם אנחנו רוצות שכל אחד יוכל לעלות כמה קבצים אולי נפתח לכל אחד תיקייה לפי השם שלו וכך אם יש לו כבר תיקייה זה יכנס לשם ואם לא הוא יצור לו תיקיה
        //השאלה היא אם יש אפשרות כבר בדף הזה לדעת את שם המשפחה 
        cb(null,`./public/uploads`)
    },
    filename: function (req , file ,cb){
        //צריך להחליט על שם לקובץ אולי תעודות זהות 
        const unique = Date.now() + "-" + Family.username
        cb(null , unique +"-"+ file.o)
    }

})

const upload = multer ({storage :storage})
router.use(verifyJWT)
router.use(verifyAdmin)

router.get("/", FamilyController.getAllFamilies)
router.get("/:id", FamilyController.getFamilyById)
router.post("/", upload.single("tzFile") ,FamilyController.addFamily)
router.put("/", upload.single("tzFile") , FamilyController.updateFamily)
router.delete("/", FamilyController.deleteFamily)

module.exports = router