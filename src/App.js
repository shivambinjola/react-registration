import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
// import DataTable from "./components/DataTable";

function App() {
  return (
    <main className="">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          {/* <Route exact path="/datatable" element={<DataTable />} /> */}
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
