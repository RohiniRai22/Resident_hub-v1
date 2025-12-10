import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./modules/user/routes/UserRoutes";
import AdminRoute from "./modules/admin/Route/AdminRoute";
import ServiceProviderRoute from "./modules/service-provider/Route/ServiceProviderRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoute />} />
          <Route
            path="/service-provider/*"
            element={<ServiceProviderRoute />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
