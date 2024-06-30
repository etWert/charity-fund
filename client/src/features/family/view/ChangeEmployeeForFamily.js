import { useGetAllEmployeesQuery } from "../../employee/employeesApiSlice"

const ChangeEmployeeForFamily = ({family}) => {
    const { data :employeesObj} = useGetAllEmployeesQuery()

    return <select name="employee" >
        {!family.employee?._id && <option value="">עדכן נציג</option>}
        {console.log("ooooooooooooooooooooooooo")}
        {console.log(family.employee)}
        {employeesObj.data.filter(emplo => emplo.role === 'נציג').map(emp => (
            <option selected={family.employee?._id === emp._id} value={emp._id}>{emp.name}</option>
        ))}
    </select>
}

export default ChangeEmployeeForFamily
