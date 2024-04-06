import React,{ Fragment, useEffect, useState } from 'react';
import './Products.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProducts } from '../../actions/productAction';
import Loader from '../layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import ReactStars from 'react-rating-stars-component';
import { useParams } from 'react-router-dom';
import Slider from "@material-ui/core/Slider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider';

function valuetext(value) {
    return `${value}°C`;
  }
  

const Products = () => {
    
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,250000]);

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {console.log(price);
        setPrice(newPrice);
    }

    const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
      );

    const { keyword }  = useParams();

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, price));
    },[dispatch, keyword, currentPage, price]);

  return (
    <Fragment>
        {
            loading ? (
            <Loader/>
            ) : (
            <Fragment>
                <h2 className='productsHeading' >Products</h2>

                <div className="products">
                    {
                        products && 
                        products.map((product) => (
                            <ProductCard product={product} key={product._id}/>
                        ))
                    }
                </div>

                <div className="filterBox">
                    {/* <p>Price</p>
                    <img src={FilterAltIcon} alt='filter'/>
                    <Slider
                        value = {price}
                        onChange = {priceHandler}
                        valueLabelDisplay = "auto"
                        aria-labelledby = "range-slider"
                        min = {0}
                        max = {500000}
                    /> */}
                    
                </div>
                
                {
                    resultPerPage < productsCount &&
                    <div className="paginationBox">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        firstPageText="1st"
                        lastPageText="last"
                        nextPageText="next"
                        prevPageText="prev"
                        itemClass='page-item'
                        linkClass='page-link'
                        activeClass='pageItemActive'
                    />
                </div>
                }
            </Fragment>
            )
        }
    </Fragment>
  )
}

export default Products
