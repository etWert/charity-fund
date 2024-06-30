import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllFamiliesQuery, useUpdateFamilyMutation } from "../familiesApiSlice"

import "./singleFamily.css"
import useAuth from "../../../hooks/useAuth";
import ChangeEmployeeForFamily from "./ChangeEmployeeForFamily";

const SingleFamily = () => {
    const { role } = useAuth()

    const navigate = useNavigate()
    const { familyId } = useParams()

    const { data: familiesObj, isError, error, isSuccess, isLoading } = useGetAllFamiliesQuery()
    const [updateFamily, { isSuccess: isUpdateSuccess }] = useUpdateFamilyMutation()
    useEffect(() => {
        if (isUpdateSuccess) {
            if (role === "משפחה") {
                navigate("/dash")
            }
            else {
                navigate("/dash/families")
            }
        }
    }, [isUpdateSuccess])

    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>

    const family = familiesObj.data.find(fam => fam._id === familyId)
    if (!family)
        return <h1>no found</h1>

    const formSubmit = (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        console.log("p");
        console.log(data);
        const objFamily = Object.fromEntries(data.entries())

        console.log(objFamily);
        //tzfile children/////////////////
        const newObjFamily = {
            id: familyId,
            name: objFamily.name,
            username: objFamily.username,
            password: objFamily.password,
            address: {
                street: objFamily.street,
                neighborhood: objFamily.neighborhood,
                city: objFamily.city
            },
            employee: objFamily.employee,
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
        console.log(objFamily);
        console.log("uuuuuuuuuuuuuuu");
        console.log(newObjFamily);
        console.log("uuuuuuuuuuuuuuu");
        updateFamily(newObjFamily)
    }

    // const handleUpdateFamily = (event, family) => {
    //     const employeeId = event.target.value;
    //     updateFamily({ ...family, id: family._id, employee: employeeId });
    // };

    return (
        <div className="single-family-container">
            {/* מציג את שם המשפחה וההורים ככותרת ובפורם נותן אפשרות לעדכן */}
            <div className="single-family-info">
                {`${family.name} ${family.parent1?.first_name} ${family.parent2?.first_name}`}
            </div>
            <div className="single-family-form-container">
                <form onSubmit={formSubmit} className="single-family-form">
                    <input type="text" defaultValue={family.name} required name="name" placeholder="שם משפחה" />
                    <input type="text" defaultValue={family.username} required name="username" placeholder="שם משתמש" />
                    <input type="password" defaultValue={family.password} name="password" placeholder="סיסמה" />
                    <label name="parent1">
                        <h3>פרטי הורה 1</h3>
                        <input type="text" defaultValue={family.parent1?.first_name} name="first_name1" placeholder="שם" />
                        <input type="text" defaultValue={family.parent1?.tz} name="tz1" placeholder="ת.ז." />
                        <input type="date" defaultValue={family.parent1?.birth_date} name="birth_date1" placeholder="תאריך לידה" />
                        <input type="text" defaultValue={family.parent1?.phone} name="phone1" placeholder="פלאפון" />
                        <input type="text" defaultValue={family.parent1?.occupation} name="occupation1" placeholder="עיסוק" />
                    </label>
                    <label name="parent2">
                        <h3>פרטי הורה 2</h3>
                        <input type="text" defaultValue={family.parent2?.first_name} name="first_name2" placeholder="שם" />
                        <input type="text" defaultValue={family.parent2?.tz} name="tz2" placeholder="ת.ז." />
                        <input type="date" defaultValue={family.parent2?.birth_date} name="birth_date2" placeholder="תאריך לידה" />
                        <input type="text" defaultValue={family.parent2?.phone} name="phone2" placeholder="פלאפון" />
                        <input type="text" defaultValue={family.parent2?.occupation} name="occupation2" placeholder="עיסוק" />
                    </label>
                    {/* <button onClick={<AddChild/>}>פלוס </button> */}
                    <label name="address">
                        <input type="text" defaultValue={family.address?.street} name="street" placeholder="רחוב" />
                        <input type="text" defaultValue={family.address?.neighborhood} name="neighborhood" placeholder="שכונה" />
                        <input type="text" defaultValue={family.address?.city} name="city" placeholder="עיר" />
                    </label>
                    <input type="text" defaultValue={family.phone} name="phone" placeholder="טלפון" />
                    <input type="email" defaultValue={family.email} name="email" placeholder="אימייל" />

                    <select required="true" name="marital_status">
                        <option value="">מצב משפחתי</option>
                        <option selected={family.marital_status === "נשוי/אה"} value="נשוי/אה">נשוי/אה</option>
                        <option selected={family.marital_status === "רווק/ה"} value="רווק/ה">רווק/ה</option>
                        <option selected={family.marital_status === "גרוש/ה"} value="גרוש/ה">גרוש/ה</option>
                        <option selected={family.marital_status === "פרוד/ה"} value="פרוד/ה">פרוד/ה</option>
                        <option selected={family.marital_status === "אלמן/נה"} value="אלמן/נה">אלמן/נה</option>
                    </select>
                    <label name="bank_details">
                        <h3>פרטי בנק</h3>
                        <input type="text" defaultValue={family.bank_details?.name} required="true" name="name" placeholder="שם בעל החשבון" />
                        <input type="text" defaultValue={family.bank_details?.bank_number} required="true" name="bank_number" placeholder="מספר בנק" />
                        <input type="text" defaultValue={family.bank_details?.branch_number} required="true" name="branch_number" placeholder="מספר סניף" />
                        <input type="text" defaultValue={family.bank_details?.account_number} required="true" name="account_number" placeholder="מספר חשבון" />
                    </label>
                    {role === 'מנהל' && <ChangeEmployeeForFamily family={family} />
                    }
                    <label>צילום ת"ז</label>
                    <input type="file" name="tzFile" />

                    <button>שלח</button>
                </form>
            </div>
        </div>
    )
}

export default SingleFamily
