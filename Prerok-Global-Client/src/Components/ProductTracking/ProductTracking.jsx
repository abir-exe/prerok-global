import { useEffect, useState } from "react";
import { axiosSecure } from "../../api/axiosInstances";
import { useParams } from "react-router";
import Lottie from "lottie-react";
import tracking from './../../assets/animations/tracking.json'


// import { useNavigate } from "react-router";

const ProductTracking = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  let { productIdForSearch } = useParams();
  productIdForSearch && console.log(productIdForSearch);

  const handleTracking = async (e) => {
    e.preventDefault();
    const enteredProductId = e.target.elements.productID.value;
    await axiosSecure
      .get(`/api/tracking/get-tracking-details/${enteredProductId}`)
      .then((res) => setBookingData(res.data));
    if (bookingData) setIsVisible(true);
  };

  useEffect(() => {
    if (productIdForSearch) {
      axiosSecure
        .get(`api/bookings/get-booking/${productIdForSearch}`)
        .then((res) => setBookingData(res.data.paymentInfo));
      if (bookingData) setIsVisible(true);
    }
  }, [productIdForSearch, bookingData, isVisible]);
  // console.log(bookingData);

  return (
    <div className="overflow-hidden lg:max-w-screen-2xl my-10 mx-auto px-3 md:px-20">
      {/* title section */}
      <div>
        <h1 className="text-2xl font-bold uppercase  md:text-3xl">
          Product Tracking{" "}
        </h1>
        <p className="text-gray-500">
          Track your product & see the current condition
        </p>
      </div>

      {/* product tracking field  */}
      <div
        className="w-full mt-20 "
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="lg:w-1/2 w-full mx-auto bg-white border-2 border-amber-500 ">
          <p className="font-medium text-xl px-8 py-4">
            TRACK YOUR PRODUCT{" "}
            <span className="font-light text-sm text-slate-500">
              Now you can track your product easily
            </span>
          </p>
          <form
            onSubmit={handleTracking}
            className="md:flex justify-center p-5 items-center"
          >
            <input
              type="text"
              name="productID"
              className="border-2 mb-2 border-amber-500 md:w-[400px] mx-auto px-4 py-2 rounded-lg mt-1"
              id=""
              placeholder="Enter your product ID"
              // data-aos="fade-right"
            />
            <input
              type="submit"
              value="TRACK YOUR PRODUCT"
              className="btn bg-amber-500 hover:bg-black h-12 md:w-72 ml-4 block mx-auto text-white"
              data-aos="fade-left"
              name="productId"
            />
          </form>
        </div>
      </div>

      {/* image and product details sections  */}
      {isVisible && (
        <div className="md:w-2/3 mt-10 md:mt-20  mx-auto">
          <div className="md:flex ">
            <div
              className="flex-[1] w-full object-cover "
              data-aos="zoom-in-right"
            >
              <img
                src="https://i.ibb.co/f4y9xtm/download.png"
                alt="product picture"
              />
            </div>
            <div
              className="flex-[1] p-3 bg-slate-800 space-y-7 text-gray-100"
              data-aos="zoom-in-left"
            >
              <div className=" p-1 border-b-2 py-4 ">
                <span className="mr-5">Booked By: </span>
                <span>{bookingData.name}</span>
              </div>
              <div className=" p-1 border-b-2 ">
                <span className="mr-5">Transation ID: </span>
                <span>{bookingData.transactionID}</span>
              </div>
              <div className=" p-1 border-b-2 ">
                <span className="mr-5">ORDER DATE:</span>
                <span> {bookingData.paymentAt}</span>
              </div>
              <div className="p-1 border-b-2 ">
                <span className="mr-5">ORDER STATUS: </span>
                <span className="text-yellow-400"> {bookingData.status}</span>
              </div>
              <div className="p-1 border-b-2 ">
                <span className="mr-5">ORDER AMOUNT:</span>
                <span className=""> ${bookingData.amount}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* bg image sections  */}
      <div className="w-2/3 mx-auto mt-10" data-aos="fade-up ">
        {/* <img
          src="https://c8.alamy.com/comp/2CG94WK/airplane-route-line-plane-dotted-route-airplane-destination-track-plane-traveling-destination-pathway-plane-travel-map-vector-illustration-2CG94WK.jpg"
          alt=""
          className=""
        /> */}
        <Lottie animationData={tracking} loop={true} />
      </div>
    </div>
  );
};

export default ProductTracking;
