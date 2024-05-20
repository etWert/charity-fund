import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useGetAllFamiliesQuery, useUpdateFamilyMutation } from "../familiesApiSlice"

import "./singleFamily.css"

const SingleFamily = () => {
    
    const navigate = useNavigate()
    const { familyId } = useParams()
    const { data: familiesObj, isError, error, isSuccess, isLoading } = useGetAllFamiliesQuery()
    const [updateFamily, { isSuccess: isUpdateSuccess }] = useUpdateFamilyMutation()
    useEffect(() => {
        if (isUpdateSuccess) {
            navigate("/dash/families")
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
        // const objFamily = Object.fromEntries(data.entries())
        updateFamily(data)
    }

    return (
        <div className="single-family-container">
            {/* מציג את שם המשפחה וההורים ככותרת ובפורם נותן אפשרות לעדכן */}
            <div className="single-family-info">
                {`${family.familyName} ${family.husband} ${family.wife}`}
            </div>
            <div className="single-family-form-container">
                <form onSubmit={formSubmit} className="single-family-form">
                    <input type="text" required name="familyName" placeholder="שם משפחה" />
                    <input type="text" required name="username" placeholder="שם משתמש" />
                    <input type="password" required name="password" placeholder="סיסמה" />
                    <h3>פרטי הבעל</h3>
                    <input type="text" name="husbandName" placeholder="שם" />
                    <input type="text" name="husbandTZ" placeholder="ת.ז." />
                    <input type="date" name="birthDate" placeholder="תאריך לידה" />
                    <input type="text" name="phone" placeholder="פלאפון" />
                    <input type="text" name="occupation" placeholder="עיסוק" />
                    <input type="text" name="workPlace" placeholder="מקום עבודה" />
                    <h3>פרטי האשה</h3>
                    <input type="text" name="husbandName" placeholder="שם" />
                    <input type="text" name="husbandTZ" placeholder="ת.ז." />
                    <input type="date" name="birthDate" placeholder="תאריך לידה" />
                    <input type="text" name="phone" placeholder="פלאפון" />
                    <input type="text" name="occupation" placeholder="עיסוק" />
                    <input type="text" name="workPlace" placeholder="מקום עבודה" />

                    <input type="text" name="street" placeholder="רחוב" />
                    <input type="text" name="neighborhood" placeholder="שכונה" />
                    <input type="text" name="city" placeholder="עיר" />
                    <input type="text" name="phone" placeholder="טלפון" />
                    <input type="email" name="email" placeholder="אימייל" />

                    <select required="true" name="maritalStatus">
                        <option value="">מצב משפחתי</option>
                        <option value="נשוי/אה">נשוי/אה</option>
                        <option value="רווק/ה">רווק/ה</option>
                        <option value="גרוש/ה">גרוש/ה</option>
                        <option value="פרוד/ה">פרוד/ה</option>
                        <option value="אלמן/נה">אלמן/נה</option>
                    </select>

                    <h3>פרטי בנק</h3>
                    <input type="text" required="true" name="bankDetails" placeholder="שם בעל החשבון" />
                    <input type="text" required="true" name="bankNumber" placeholder="מספר בנק" />
                    <input type="text" required="true" name="branchNumber" placeholder="מספר סניף" />
                    <input type="text" required="true" name="accountNumber" placeholder="מספר חשבון" />
                    <h4>נציג</h4>
                    {family.employee?.name}
                    <h4>מאושר</h4>
                    {family.approved}
                    <h4>ממתין לטיפול</h4>
                    {family.waiting}
                    <label>צילום ת"ז</label>
                    <input type="file" name="tzFile"/>
                    <button>עדכון</button>
                </form>
            </div>
        </div>
    )
}

export default SingleFamily
