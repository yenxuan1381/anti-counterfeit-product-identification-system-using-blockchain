import Home from './components/home/Home';
import Login from './components/home/Login';
import ScannerPage from './components/pages/ScannerPage';
import Admin from './components/pages/Admin';
import Manufacturer from './components/pages/Manufacturer';
import Supplier from './components/pages/Supplier';
import Retailer from './components/pages/Retailer';
import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import Layout from './components/Layout';
import AddAccount from './components/pages/AddAccount';
import ManageAccount from './components/pages/ManageAccount';
import AddProduct from './components/pages/AddProduct';
import Profile from './components/pages/Profile';
import UpdateProduct from './components/pages/UpdateProduct';
import Product from './components/pages/Product';
import AuthenticProduct from './components/pages/AuthenticProduct';
import FakeProduct from './components/pages/FakeProduct';
import UpdateProductDetails from './components/pages/UpdateProductDetails';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>

        {/* public routes */}
        <Route exact path='/' element={< Home />}></Route>
        <Route exact path='/login' element={< Login />}></Route>
        <Route exact path='/scanner' element={< ScannerPage />}></Route>
        <Route exact path='/product' element={< Product />}></Route>
        <Route exact path='/authentic-product' element={< AuthenticProduct />}></Route>
        <Route exact path='/fake-product' element={< FakeProduct />}></Route>

        {/* private routes */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route exact path='/admin' element={< Admin />}></Route>
          <Route exact path='/add-account' element={< AddAccount />}></Route>
          <Route exact path='/manage-account' element={< ManageAccount />}></Route> 

        </Route>

        <Route element={<RequireAuth allowedRoles={["manufacturer", "supplier", "retailer"]} />}>
          <Route exact path='/profile' element={< Profile />}></Route>
          <Route exact path='/update-product' element={< UpdateProduct />}></Route>
          <Route exact path='/update-product-details' element={< UpdateProductDetails />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["supplier", "retailer"]} />}>
          <Route exact path='/update-product' element={< UpdateProduct />}></Route>
          <Route exact path='/update-product-details' element={< UpdateProductDetails />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["manufacturer"]} />}>
          <Route exact path='/manufacturer' element={< Manufacturer />}></Route>
          <Route exact path='/add-product' element={< AddProduct />}></Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={["supplier"]} />}>
          <Route exact path='/supplier' element={< Supplier />}></Route>        
        </Route>

        <Route element={<RequireAuth allowedRoles={["retailer"]} />}>
          <Route exact path='/retailer' element={< Retailer />}></Route>
        </Route>

        {/* catch all */}
        {/* <Route path='*' element={< Missing />}></Route> */}

      </Route>
    </Routes>

  );
}

export default App;
