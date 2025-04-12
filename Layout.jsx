import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="bg-slate-700 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
