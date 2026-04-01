import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { profile } from './redux/slices/userSlice';
import type { RootState } from './redux/store';
import { useAppDispatch } from './redux/store';

//Pages
import About from './pages/About/About';
import AddExpense from './pages/AddExpense/AddExpense';
import Commitments from './pages/Commitments/Commitments';
import EditExpense from './pages/EditExpense/EditExpense';
import AddIncome from './pages/AddIncome/AddIncome';
import EditIncome from './pages/EditIncome/EditIncome';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import Expenses from './pages/Expenses/Expenses';
import Home from './pages/Home/Home';
import Incomes from './pages/Incomes/Incomes';
import Login from './pages/Login/Login';
import Pricing from './pages/Pricing/Pricing';

//Components
import ProtectedRoute from './features/shared/ProtectedRoute';

const App = () => {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const dispatch = useAppDispatch();
  const { token } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(profile());
    }
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/expenses' element={<Expenses />} />
          <Route path='/expenses/add' element={<AddExpense />} />
          <Route path='/expenses/:id/edit' element={<EditExpense />} />
          <Route path='/incomes' element={<Incomes />} />
          <Route path='/income/add' element={<AddIncome />} />
          <Route path='/incomes/:id/edit' element={<EditIncome />} />
          <Route path='/commitments' element={<Commitments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
