import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddFamilyMutation } from "../familiesApiSlice"
import AddChild from "../AddChild"
import "./addFamily.css"

const AddFamily = () => {

    const [addFamily, { data, isError, error, isSuccess, isLoading }] = useAddFamilyMutation()
    const navigate = useNavigate()
    useEffect(() => {
        if (isSuccess) {
            navigate("/dash/families")
        }
    }, [isSuccess])

    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const objFamily = Object.fromEntries(data.entries())


        //tzfile children/////////////////
        const newObjFamily = {
            name: objFamily.name,
            username: objFamily.username,
            password: objFamily.password,
            address: {
                street: objFamily.street,
                neighborhood: objFamily.neighborhood,
                city: objFamily.city
            },
            phone: objFamily.phone,
            email: objFamily.email,
            marital_status: objFamily.marital_status,
            parent1: {
                first_name: objFamily.first_name1,
                tz: objFamily.tz1,
                birth_date: objFamily.birth_date1,
                phone: objFamily.phone1,
                occupation: objFamily.occupation1
            },
            parent2: {
                first_name: objFamily.first_name2,
                tz: objFamily.tz2,
                birth_date: objFamily.birth_date2,
                phone: objFamily.phone2,
                occupation: objFamily.occupation2
            },
            child: [
                {
                    first_name: objFamily.first_name,
                    birth_date: objFamily.birth_date,
                    tuition: objFamily.tuition
                }
            ],
            bank_details: {
                name: objFamily.name,
                bank_number: objFamily.bank_number,
                branch_number: objFamily.branch_number,
                account_number: objFamily.account_number
            }
        }
        console.log(newObjFamily);

        addFamily(newObjFamily)
    }
    return (
        <div className="add-family-container">
            {/* //////////////////// */}
            <form onSubmit={formSubmit} className="add-family-form">
                <input type="text" required name="name" placeholder="שם משפחה" />
                <input type="text" required name="username" placeholder="שם משתמש" />
                <input type="password" required name="password" placeholder="סיסמה" />
                <label name="parent1">
                    <h3>פרטי הורה 1</h3>
                    <input type="text" name="first_name1" placeholder="שם" />
                    <input type="text" name="tz1" placeholder="ת.ז." />
                    <input type="date" name="birth_date1" placeholder="תאריך לידה" />
                    <input type="text" name="phone1" placeholder="פלאפון" />
                    <input type="text" name="occupation1" placeholder="עיסוק" />
                </label>
                <label name="parent2">
                    <h3>פרטי הורה 2</h3>
                    <input type="text" name="first_name2" placeholder="שם" />
                    <input type="text" name="tz2" placeholder="ת.ז." />
                    <input type="date" name="birth_date2" placeholder="תאריך לידה" />
                    <input type="text" name="phone2" placeholder="פלאפון" />
                    <input type="text" name="occupation2" placeholder="עיסוק" />
                </label>
                {/* <button onClick={<AddChild/>}>פלוס </button> */}
                <label name="address">
                    <input type="text" name="street" placeholder="רחוב" />
                    <input type="text" name="neighborhood" placeholder="שכונה" />
                    <input type="text" name="city" placeholder="עיר" />
                </label>
                <input type="text" name="phone" placeholder="טלפון" />
                <input type="email" name="email" placeholder="אימייל" />

                <select required="true" name="marital_status">
                    <option value="">מצב משפחתי</option>
                    <option value="נשוי/אה">נשוי/אה</option>
                    <option value="רווק/ה">רווק/ה</option>
                    <option value="גרוש/ה">גרוש/ה</option>
                    <option value="פרוד/ה">פרוד/ה</option>
                    <option value="אלמן/נה">אלמן/נה</option>
                </select>
                <label name="bank_details">
                    <h3>פרטי בנק</h3>
                    <input type="text" required="true" name="name" placeholder="שם בעל החשבון" />
                    <input type="text" required="true" name="bank_number" placeholder="מספר בנק" />
                    <input type="text" required="true" name="branch_number" placeholder="מספר סניף" />
                    <input type="text" required="true" name="account_number" placeholder="מספר חשבון" />
                </label>
                <label>צילום ת"ז</label>
                <input type="file" name="tzFile" />

                <button type="submit">שלח</button>
            </form>

        </div>
    )
}

export default AddFamily
