import React,{ Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import "./Home.css"
import Product from './Product.js'
import Helmet from '../layout/MetaData.js'
import {getProducts} from '../../actions/productAction.js'
import { useDispatch, useSelector } from 'react-redux'


const Home = () => {

  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {

    if(error){
      return alert.error(error);
    }

    dispatch(getProducts());
  }, [dispatch, error])

  return (
    <Fragment>
      
      <Helmet title="ECommerce"/>

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
          <Product product={product}/>
        ))}

      </div>

    </Fragment>
  )
}

export default Home
