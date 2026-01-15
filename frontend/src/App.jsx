import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Detection from "./Detection";
import Gharana from "./Gharana";
import Mudras from "./Mudras";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route
        path="/real-time-mudra-detection"
        element={<Detection />}
      />
      <Route path="/different-kathak-gharanas" element={<Gharana />} />
      <Route path="/different-hasta-mudras" element={<Mudras />} />
    </Routes>
  );
};

export default App;
