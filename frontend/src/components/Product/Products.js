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
import { FaFilter } from "react-icons/fa6";
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Box from '@mui/material/Box';
// import Slider from '@mui/material/Slider'; 

const Products = () => {
    
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0,250000]);
    const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    }

    const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
      );
// console.log(productsCount, resultPerPage, filteredProductsCount);
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

                <div className="filterBox">
                    <p><FaFilter className='filterLogo'/> Filter by Price</p>
                    <Slider
                        value = {price}
                        onChange = {priceHandler}
                        valueLabelDisplay = "auto"
                        aria-labelledby = "range-slider"
                        min = {0}
                        max = {250000}
                    />

                    {/* <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={age}
                            label="Age"
                            onChange={handleChange}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>   */}
                </div>

                <div className="products">
                    {
                        products && 
                        products.map((product) => (
                            <ProductCard product={product} key={product._id}/>
                        ))
                    }
                </div>
                
                {
                    resultPerPage < filteredProductsCount &&
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
