import React,{ Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import "./Home.css"
import ProductCard from './ProductCard.js'
import Helmet from '../layout/MetaData.js'
import { getProducts, clearErrors } from '../../actions/productAction.js'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../layout/Loader/Loader.js'

const Home = () => {

  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.products
  );

  const notify = (message) => toast(message);

  useEffect(() => {

    if(error){
      dispatch(clearErrors());
      notify(error);
    }

    dispatch(getProducts());
  }, [dispatch, error])

  if(loading){
    return <Loader/>
  }

  return (
    <Fragment>
      
      <Helmet title="ECOMMERCE"/>

      <div className="banner">

        <p>Welcome to ECommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
            <button>
                scroll <CgMouse/>
            </button>
        </a>
      </div>

      <h2 className='homeHeading'>Featured Products</h2>

      <div className="container" id="container">

        {products && products.map((product) => (
          <ProductCard product={product} key={product.name}/>
        ))}

      </div>

      <ToastContainer/>

    </Fragment>
  )
}

export default Home
