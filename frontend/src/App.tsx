import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Pages
import About from './pages/About/About';
import AddExpense from './pages/AddExpense/AddExpense';
import AddIncome from './pages/AddIncome/AddIncome';
import Incomes from './pages/Incomes/Incomes';
import Contact from './pages/Contact/Contact';
import Dashboard from './pages/Dashboard/Dashboard';
import Expenses from './pages/Expenses/Expenses';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Pricing from './pages/Pricing/Pricing';

function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/expenses' element={<Expenses />} />
        <Route path='/expenses/add' element={<AddExpense />} />
        <Route path='/incomes' element={<Incomes />} />
        <Route path='/income/add' element={<AddIncome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
