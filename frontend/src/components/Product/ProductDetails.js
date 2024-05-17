import React, { useEffect, useState } from 'react'
import './ProductDetails.css'
import { getProductDetails, newReview, clearErrors } from '../../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import ReactStars from 'react-rating-stars-component';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { addItemsToCart } from '../../actions/cartAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../layout/Loader/Loader'
import ReviewCard from './ReviewCard';
import Helmet from '../layout/MetaData';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notifyError = (message) => toast.error(message);
  const notifySuccess = (message) => toast.success(message);
  
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
    );

  const { success, error: reviewError} = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {

    if(error){
        notifyError(error);
        dispatch(clearErrors);
      }

    if(reviewError){
      notifyError(reviewError);
      dispatch(clearErrors);
    }

    dispatch({ type:NEW_REVIEW_RESET });

    dispatch(getProductDetails(id));

  }, [dispatch, error, reviewError, id, success])

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;
    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    const toastId = notifySuccess("Item Added To Cart");
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 1500);
  };

  const submitReviewToggle = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const options={
    edit: false,
    color: "#ffffff",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 15 : 20,
    isHalf: true,
    value: product.ratings 
  }

  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  if (loading || !product || !product.images) {
    return <Loader/>;
  }

  return (

    <div className='whole'>
    <Helmet title={`${product.name} -- ECOMMERCE`}/>

    <div className='exceptReview'>
      {/* <div className="photos"> */}
      {
        product.images.length > 1 ? (
          <Slider {...settings} className='slider'>
          {
              product.images.map((item) => (
                <div className='ProductDetails' key={item.url}>
                  <img src={item.url} alt={item.url}/>
                </div>
              ))
          }
          </Slider>
        ):(
          <div className="onlyOne">
            {/* <div className='ProductDetails' key={product.images[0].url}> */}
              <img src={product.images[0].url} alt={product.images[0].url}/>
            {/* </div> */}
          </div>
        )
      }
      {/* </div> */}
      <div className="blocks">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status :
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? " OutOfStock" : " InStock"}
                  </b>
                </p>
                <p>
                Stock :{" "} 
                <b>
                {product.Stock}
                </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button  className="submitReview" onClick={submitReviewToggle}>
                Review Product
              </button>

          </div>

          </div>

          <h3 className='reviewsHeading'> REVIEWS </h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <ReactStars
                onChange={handleRatingChange}
                value={rating}
                size={20}
                isHalf="true"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button  onClick={submitReviewToggle} id='cancelBtn'>
                Cancel
              </Button>
              <Button  onClick={reviewSubmitHandler} id='submitBtn'>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
               {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

          <ToastContainer/>

    </div>
    
  );  

};

export default ProductDetails;
