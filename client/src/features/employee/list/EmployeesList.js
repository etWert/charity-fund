import { Link, useSearchParams } from "react-router-dom"
import { useDeleteEmployeeMutation, useGetAllEmployeesQuery } from "../employeesApiSlice"
import "./EmployeesList.css"
import Search from "../../../components/search/Search"

const EmployeesList = () => {
    const { data: employeesObj, isError, error, isLoading, isSuccess } = useGetAllEmployeesQuery()
    const [deleteEmployee, { isSuccess: isDeleteSuccess ,isError:isDeleteEror}] = useDeleteEmployeeMutation()
    const deleteClick = (employee) => {
        if (window.confirm("האם אתה בטוח שברצונך למחוק את העובד")) {
            deleteEmployee({ _id: employee._id })
        }
    }

    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")

    if (isLoading)
        return <h1>Loading...</h1>
    if (isError)
        return <h1>{JSON.stringify(error)}helllo</h1>

    const filteredData = !q ? [...employeesObj.data] : employeesObj.data.filter(emp => emp.name.indexOf(q) > -1)
    
    return (
        <div className="employees-list">
            <div className="employees-list-top">
                <Search placeholder="חיפוש לפי שם נציג" />
                <Link to="/dash/employees/add" className="employees-list-add-button">הוספת נציג</Link>
            </div>
            <table className="employees-list-table">
                <thead>
                    <tr>
                        <td>שם העובד</td>
                        <td>פלאפון</td>
                        <td>אימייל</td>
                        <td>תפקיד</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map(employee =>
                        <tr key={employee._id}>
                            <td>
                                <div className="employees-list-employee">
                                    {employee.name}
                                </div>
                            </td>
                            <td>
                                {employee.phone}
                            </td>
                            <td>
                                {employee.email}
                            </td>
                            <td>
                                {employee.role}
                            </td>
                            <td>
                                <Link to={`/dash/employees/${employee._id}`} className="employees-list-button employees-list-view">עדכון</Link>
                                <button onClick={() => { deleteClick(employee) }} className="employees-list-button employees-list-delete">מחיקה</button>
                            </td>
                        </tr>)}
                </tbody>
            </table>
        </div>
    )
}

export default EmployeesList
