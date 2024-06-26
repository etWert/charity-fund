import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import SiteLayout from './components/layout/site/SiteLayout';
import DashLayout from './components/layout/dash/DashLayout';
import AdminsList from './features/admin/list/AdminsList'
import EmployeesList from './features/employee/list/EmployeesList';
import AddEmployee from './features/employee/add/AddEmployee';
import SingleEmployee from './features/employee/view/SingleEmployee';
import FamiliesList from './features/family/list/FamiliesList';
import AddFamily from './features/family/add/AddFamily';
import SingleFamily from './features/family/view/SingleFamily';
import LoginPage from './features/auth/login/LoginPage';
import RequireAuth from './features/auth/RequireAuth';
import PersistLogin from './features/auth/PersistLogin';
import SingleAdmin from './features/admin/view/SingleAdmin';
import Main from './components/layout/dash/Main';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SiteLayout />}>
          <Route index element={<h1>site</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowRoles={["מנהל", "נציג", "משפחה"]} />}>
              <Route path='/dash' element={<DashLayout />}>
                <Route index element={<Main/>} />
                <Route path='families' element={<Outlet />}>
                  <Route path=':familyId' element={<SingleFamily />} />
                </Route>
                <Route element={<RequireAuth allowRoles={["מנהל", "נציג"]} />}>
                  <Route path='admins' element={<Outlet />}>
                    <Route index element={<AdminsList />} />
                    {/* <Route path='add' element={<AddEmployee />} /> */}
                    <Route path=':employeeId' element={<SingleAdmin />} />
                  </Route>
                  <Route path='employees' element={<Outlet />}>
                    <Route index element={<EmployeesList />} />
                    <Route path='add' element={<AddEmployee />} />
                    <Route path=':employeeId' element={<SingleEmployee />} />
                  </Route>
                  <Route path='families' element={<Outlet />}>
                    <Route index element={<FamiliesList />} />
                    <Route path='add' element={<AddFamily />} />
                    <Route path=':familyId' element={<SingleFamily />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
