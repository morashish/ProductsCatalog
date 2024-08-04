import { Routes, Route } from 'react-router-dom';
import Products from '../pages/Products';
import Product from '../pages/Product';

const AppRoutes = () => {

  return  (
    <Routes>
      <Route path='*' element={<Products />} />
      <Route path='products/:id' element={<Product />} />
    </Routes>
  );
};

export default AppRoutes;
