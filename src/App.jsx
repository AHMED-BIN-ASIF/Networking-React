import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Layout from "./components/common/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Topology1 from "./pages/Topology1";
import Topology2 from "./pages/Topology2";
import Topology3 from "./pages/Topology3";
import Topology4 from "./pages/Topology4";
import Topology5 from "./pages/Topology5";
import Topology6 from "./pages/Topology6";
import Topology7 from "./pages/Topology7";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <Home />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topology-1"
            element={
              <ProtectedRoute>
                <Layout>
                  <Topology1 />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topology-2"
            element={
              <ProtectedRoute>
                <Layout>
                  <Topology2 />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topology-3"
            element={
              <ProtectedRoute>
                <Layout>
                  <Topology3 />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topology-4"
            element={
              <ProtectedRoute>
                <Layout>
                  <Topology4 />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topology-5"
            element={
              <ProtectedRoute>
                <Layout>
                  <Topology5 />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topology-6"
            element={
              <ProtectedRoute>
                <Layout>
                  <Topology6 />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/topology-7"
            element={
              <ProtectedRoute>
                <Layout>
                  <Topology7 />
                </Layout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
