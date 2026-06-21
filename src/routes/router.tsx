import { createBrowserRouter } from "react-router-dom"
import RootLayout from "@/layouts/RootLayout"
import HomePage from "@/pages/HomePage"
import ProductsPage from "@/pages/ProductsPage"
import CartPage from "@/pages/CartPage"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "cart", element: <CartPage /> },
    ],
  },
])