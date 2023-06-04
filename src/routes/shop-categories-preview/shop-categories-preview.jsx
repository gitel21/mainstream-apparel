import { useContext, Fragment } from "react";
import { CategoriesContext } from "../../context/categories.context";
import ShopCategoryPreview from "../../components/shop-category-preview/shop-category-preview";

const ShopCategoriesPreview = () => {

   const {categoriesMap} = useContext(CategoriesContext);

   return (
      <Fragment>
         {
            Object.keys(categoriesMap).map((title) => {
               const products = categoriesMap[title];
               return (
                  <ShopCategoryPreview key={title} title={title} products={products} 
                  />
               )
            })
         }
      </Fragment>
   )
}

export default ShopCategoriesPreview;