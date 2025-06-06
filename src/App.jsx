import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Home from "./topologies/Home";
import Topology1 from "./topologies/Topology1";
import Topology2 from "./topologies/Topology2";
import Topology3 from "./topologies/Topology3";
import Topology4 from "./topologies/Topology4";
import Topology5 from "./topologies/Topology5";
import Topology6 from "./topologies/Topology6";
import Topology7 from "./topologies/Topology7";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Background Layers and other styling can be added here */}
        <Sidebar />
        <div  className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/topology-1" element={<Topology1 />} />
          <Route path="/topology-2" element={<Topology2 />} />
          <Route path="/topology-3" element={<Topology3 />} />
          <Route path="/topology-4" element={<Topology4 />} />
          <Route path="/topology-5" element={<Topology5 />} />
          <Route path="/topology-6" element={<Topology6 />} />
          <Route path="/topology-7" element={<Topology7 />} />
        </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
