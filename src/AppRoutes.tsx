import { Route, Routes } from "react-router";
import ReactHookFormPage from "./pages/ReactHookForm";
import AxiosPage from "./pages/Axios";
import JotaiPage from "./pages/Jotai";
import ZodPage from "./pages/Zod";
import TanstackQueryPage from "./pages/TanstackQueryPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";

const AppRoutes = () => {
  const queryClient = new QueryClient();

  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Home Page</h2>} />
        <Route path="/axios" element={<AxiosPage />} />
        <Route path="/jotai" element={<JotaiPage />} />
        <Route path="/react-hook-form" element={<ReactHookFormPage />} />
        <Route
          path="/tanstack-query"
          element={
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<p>Loading ...</p>}>
                <TanstackQueryPage />
                <ReactQueryDevtools initialIsOpen={false} />
              </Suspense>
            </QueryClientProvider>
          }
        />
        <Route path="/zod" element={<ZodPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
