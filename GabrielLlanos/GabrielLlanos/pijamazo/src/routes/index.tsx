import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "@/layouts/MainLayout"
import Cart from "@/pages/Cart"
import Home from "@/pages/Home"
import ProductDetail from "@/pages/ProductDetail"
import Products from "@/pages/Products"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
    ],
  },
])