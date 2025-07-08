import { Route, Routes } from "react-router";
import ReactHookFormPage from "./pages/ReactHookForm";
import AxiosPage from "./pages/Axios";
import JotaiPage from "./pages/Jotai";
import ZodPage from "./pages/Zod";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/react-hook-form" element={<ReactHookFormPage />} />
        <Route path="/axios" element={<AxiosPage />} />
        <Route path="/jotai" element={<JotaiPage />} />
        <Route path="/zod" element={<ZodPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
