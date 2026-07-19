import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routes } from "../lib/constant/routes";
import { ROLES } from "../lib/constant/roles";

import PublicLayout from "../component/layout/PublicLayout";
import AdminLayout from "../component/layout/AdminLayout";
// import UserLayout from "../component/layout/UserLayout";

// ─── Loading Spinner ──────────────────────────────────────────
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

// ─── Layout Wrapper ───────────────────────────────────────────
function LayoutWrapper({ layout, children }) {
  if (layout === "admin") return <AdminLayout>{children}</AdminLayout>;
  //   if (layout === "user") return <UserLayout>{children}</UserLayout>;
  if (layout === "auth") return <>{children}</>; // no header/footer
  return <PublicLayout>{children}</PublicLayout>; // default
}

// ─── App Router ───────────────────────────────────────────────
export default function AppRouter() {
  return (
    <BrowserRouter>
      {/* <Suspense fallback={<PageLoader />}> */}
      <Routes>
        {routes.map((route) => {
          const Component = route.component;

          return (
            <Route
              key={route.path}
              path={route.path}
              element={
                <LayoutWrapper layout={route.layout}>
                  <Component />
                </LayoutWrapper>
              }
            />
          );
        })}
      </Routes>
      {/* </Suspense> */}
    </BrowserRouter>
  );
}
