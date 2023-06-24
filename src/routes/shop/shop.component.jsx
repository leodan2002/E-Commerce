import Category from '../category/category.component';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import { Routes, Route } from'react-router-dom';

import './shop.styles.scss';

const Shop = () => {

return(
  <Routes>
      <Route index element={<CategoriesPreview/>} />
      <Route path=":category" element={<Category/>} />

  </Routes>
)}
  

export default Shop;