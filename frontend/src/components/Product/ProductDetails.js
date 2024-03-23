import React, { useEffect } from 'react'
import './ProductDetails.css'
import { getProductDetails } from '../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
    );

  useEffect(() => {

    if(error){
        return alert.error(error);
      }

    dispatch(getProductDetails(id));

  }, [dispatch, error, id])

  if (loading || !product || !product.images) {
    return <div>Loading...</div>;
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (

    <>

    <Slider {...settings} className='slider'>
      {
          product.images.map((item) => (
            <div className='ProductDetails' key={item.url}>
              <img src={item.url} alt={item.url}/>
            </div>
          ))
      }
    </Slider>

    <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                {/* <Rating {...options} /> */}
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button >-</button>
                    <input readOnly type="number"  />
                    <button >+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

    </>
  );

};

export default ProductDetails;
