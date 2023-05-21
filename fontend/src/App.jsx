import './App.css';
import Header from './component/Header';
import Home from './component/Home';
import Product from './component/Product';
import EditProduct from './component/EditProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from 'react-router-dom';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/product' element={ <Product />} />
        <Route path='/edit/:id' element={ <EditProduct />} />
      </Routes>
      
    </>
  );
}

export default App;
