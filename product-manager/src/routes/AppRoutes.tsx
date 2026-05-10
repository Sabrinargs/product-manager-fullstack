import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DefaultLayout } from "../layouts/DefaultLayout";

import Products from "../pages/Products";
import CreateProduct from "../pages/CreateProduct";

export function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Products/>} />
                <Route path="Create" element={<CreateProduct/>} />
            </Routes>
        </BrowserRouter>
    );
}