import { Route, Routes } from "react-router";
import ReactHookFormPage from "./pages/ReactHookForm";
import AxiosPage from "./pages/Axios";
import YupPage from "./pages/Yup";
import ZodPage from "./pages/Zod";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/react-hook-form" element={<ReactHookFormPage />} />
        <Route path="/axios" element={<AxiosPage />} />
        <Route path="/yup" element={<YupPage />} />
        <Route path="/zod" element={<ZodPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
