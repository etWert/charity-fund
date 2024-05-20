import { Link, useSearchParams } from "react-router-dom"
import { useGetAllFamiliesQuery } from "../familiesApiSlice"
import "./FamiliesList.css"
import Search from "../../../components/search/Search"
import useGetFilePath from "../../../hooks/useGetFilePath"

const FamiliesList = () => {
    const { data: familiesObj, isError, error, isLoading } = useGetAllFamiliesQuery()

    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")

    const { getFilePath } = useGetFilePath()
    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}</h1>

    //להוסיף תנאים לפילטור (שם הבעל,האשה וכו)
    console.log(familiesObj);
    const namesArr = q && q.split(" ")

    familiesObj.data.forEach(family => {
        if (namesArr) {
            console.log(family.name + " " + family.parent1.first_name + " " + family.parent2.first_name === namesArr[0] + " " + namesArr[1] + " " + namesArr[2])
            console.log(family.name + " " + family.parent1.first_name + " " + family.parent2.first_name, namesArr[0] + " " + namesArr[1] + " " + namesArr[2])
        }
    });

    const filteredData = !q ? [...familiesObj.data] : familiesObj.data.filter(family =>
        family.name.indexOf(q) > -1 ||
        family.parent1.first_name.indexOf(q) > -1 ||
        family.parent2.first_name.indexOf(q) > -1
    )

    return (
        <div className="families-list">
            <div className="families-list-top">
                <Search placeholder="חיפוש לפי שם משפחה" />
                <Link to="/dash/families/add" className="families-list-add-button">הוספת משפחה</Link>
            </div>
            <table className="families-list-table">
                <thead>
                    <tr>
                        <td>שם משפחה</td>
                        <td>שם הבעל</td>
                        <td>שם האישה</td>
                        <td>מספר ילדים</td>
                        <td>נציג</td>
                        <td>ממתין</td>
                        <td>מאושר</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(family =>
                        <tr key={family._id}>
                            <td>
                                <div className="families-list-family">
                                    {family.name}
                                </div>
                            </td>
                            <td>
                                {family.parent1?.first_name}
                            </td>
                            <td>
                                {family.parent2?.first_name}
                            </td>
                            <td>
                                {/* {family.child.length} */}
                            </td>
                            <td>
                                {family.employee?.name}
                            </td>
                            <td>
                                {family.waiting ? "✔" : "❓"}
                            </td>
                            <td>
                                {family.approved ? "✔" : "❓"}
                            </td>
                            <td>
                                <Link to={getFilePath(family.tzFile)}>לצילום ת"ז</Link>
                                <Link to={`/dash/families/${family._id}`} className="families-list-button families-list-view">עדכון</Link>

                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default FamiliesList
