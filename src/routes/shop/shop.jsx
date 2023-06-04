import { Routes, Route } from "react-router-dom";
import ShopCategoriesPreview from "../shop-categories-preview/shop-categories-preview";
import ShopCategory from "../shop-category/shop-category";

const Shop = () => {


   return (
      <Routes>
         <Route index element={<ShopCategoriesPreview />} />
         <Route path=':category' element={<ShopCategory />} />
      </Routes>
   )
}

export default Shop