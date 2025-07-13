import Navbar from './components/Navbar';
import AQIBot from './components/AQIBot';
import Dashboard from './pages/Dashboard';
import AQITables from './pages/AQITables';
import AQITables2 from './pages/AQITables2';
import AirPrevData from './pages/AirPrevData';
import {BrowserRouter, Routes,Route} from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <AQIBot />
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/AQITables" element={<AQITables />} />
        <Route path="/AQITables2" element={<AQITables2 />} />
        <Route path="/AirPrevData" element={<AirPrevData />} />
        {/* Add more routes as needed */}
      </Routes>
      {/* </BrowserRouter> */}
    </>
  );
}

export default App;
