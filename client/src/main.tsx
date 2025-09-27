import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router";
import Main from "./layouts/Main.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import { Toaster } from "sonner";
import Profile from "./pages/Profile.tsx";
import IsLogin from "./pages/protector/isLogin.tsx";
import ResetPassword from "./pages/ResetPassword.tsx";
import ForgetPassword from "./pages/ForgetPassword.tsx";
import IsAdmin from "./pages/protector/isAdmin.tsx";
import ProductFilter from "./pages/ProductFilter.tsx";
import Panel from "./pages/admin/Panel.tsx";
import ProductCreate from "./pages/admin/ProductCreate.tsx";
import ProductEdit from "./pages/admin/ProductEdit.tsx";
import ProductManagement from "./pages/admin/ProductManagement.tsx";
import UserManagement from "./pages/admin/UserManagement.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import { PersistGate } from "redux-persist/integration/react";
import ConfirmOrder from "./pages/order/ConfirmOrder.tsx";
import Cancelled from "./pages/order/Cancelled.tsx";
import OrderTablePage from "./pages/order/OrderTablePage.tsx";
import OrderManagement from "./pages/admin/OrderManagement.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/profile",
        element: (
          <IsLogin>
            <Profile />
          </IsLogin>
        ),
      },
      { path: "/reset-password/:id", element: <ResetPassword /> },
      { path: "/forget-password", element: <ForgetPassword /> },
      { path: "/products/:id", element: <ProductDetail /> },
      { path: "/products/filter", element: <ProductFilter /> },
      {
        path: "/admin",
        element: (
          <IsAdmin>
            <Panel />
          </IsAdmin>
        ),
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "create-product", element: <ProductCreate /> },
          { path: "edit-product/:id", element: <ProductEdit /> },
          { path: "manage-products", element: <ProductManagement /> },
          { path: "manage-users", element: <UserManagement /> },
          {
            path: "manage-orders",
            element: <OrderManagement />,
          },
        ],
      },
      {
        path: "/order-success",
        element: <ConfirmOrder />,
      },
      {
        path: "/order-cancelled",
        element: <Cancelled />,
      },
      {
        path: "/orders",
        element: (
          <IsLogin>
            <OrderTablePage />
          </IsLogin>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toaster richColors />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
