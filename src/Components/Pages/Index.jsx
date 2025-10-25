import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

import Products from './../../Products.json';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Index() {
  // const [filterSortOption] = useState('all'); // variable kept for future use

  // Add to wishlist, safely initializing the array
  const addToWishlist = (product) => {
    const existing = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!existing.some(p => p.id === product.id)) {
      const updated = [...existing, product];
      localStorage.setItem('wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlistUpdated'));
      toast.success(`${product.Productname} added to Your wishlist`);
    } else {
      toast.info(`${product.Productname} is already in Your wishlist`);
    }
  };

  // Add to cart, safely initializing the array
  const addToCart = (product) => {
    const existing = JSON.parse(localStorage.getItem('cart')) || [];
    if (!existing.some(p => p.id === product.id)) {
      const updated = [...existing, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cartUpdated'));
      toast.success(`${product.Productname} added to Your cart`);
    } else {
      toast.info(`${product.Productname} is already in Your cart`);
    }
  };

  // Featured Products logic
  const featuredProducts = Products.filter(product => product.id >= 5 && product.id <= 10);
  const productSlidesPerView = featuredProducts.length >= 4 ? 4 : featuredProducts.length;
  const productLoop = featuredProducts.length >= 4;

  return (
    <>
      <ToastContainer />

      {/* Hero Section */}
      <div className="hero">
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={false}
          grabCursor={true}
          className="hero-swiper"
        >
          <SwiperSlide>
            <div className="hero-wrap hero-wrap1">
              <div className="hero-content">
                <h5>ESSENTIAL ITEMS</h5>
                <h1>Elite Gear <br /> For Epic Gamers</h1>
                <p className="my-3">Discover top-tier gaming gear designed to elevate your play.</p>
                <Link to="/shop" className="btn hero-btn mt-3" role="button">
                 Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-wrap hero-wrap2">
              <div className="hero-content">
                <h5>NEW UPGRADES</h5>
                <h1>Built different <br /> for deadly performance</h1>
                <p className="my-3">Discover top-tier gaming gear designed to elevate your play.</p>
                <Link to="/shop" className="btn hero-btn mt-3" role="button">
                 Shop Now
                   </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-wrap hero-wrap3">
              <div className="hero-content">
                <h5>GET THE PERFORMANCE</h5>
                <h1>Build your kind <br /> of beauty</h1>
                <p className="my-3">Discover top-tier gaming gear designed to elevate your play.</p>
                <Link to="/shop" className="btn hero-btn mt-3" role="button">
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Products */}
      <div className="product-container py-5 my-5">
        <div className="container position-relative">
          <div className="row">
            <div className="section-title mb-5 product-title text-center">
              <h2 className="fw-semibold fs-1">Our Featured Products</h2>
              <p className="text-muted">Get the godly performance you dreamed</p>
            </div>
          </div>
          {/* Swiper navigation buttons */}
          <div className="product-swiper-prev swiper-button-prev"></div>
          <div className="product-swiper-next swiper-button-next"></div>
          <Swiper
            slidesPerView={productSlidesPerView}
            spaceBetween={30}
            modules={[Navigation]}
            navigation={{ nextEl: ".product-swiper-next", prevEl: ".product-swiper-prev" }}
            loop={productLoop}
            breakpoints={{
              1399: { slidesPerView: 4 },
              1199: { slidesPerView: 3 },
              991: { slidesPerView: 2 },
              767: { slidesPerView: 1.5 },
              0: { slidesPerView: 1 },
            }}
            className='mt-4 swiper position-relative'
          >
            {featuredProducts.map(product => (
              <SwiperSlide key={product.id}>
                <div className="product-item text-center position-relative">
                  <div className="product-image w-100 position-relative overflow-hidden">
                    <img
                      src={product.image}
                      className='img-fluid'
                      alt={product.Productname || "Product"}
                    />
                    <div className="product-icons gap-3">
                      <div className="product-icon" title='Add to Wishlist' onClick={() => addToWishlist(product)}>
                        <i className="bi bi-heart fs-5"></i>
                      </div>
                      <div className="product-icon" title='Add to Cart' onClick={() => addToCart(product)}>
                        <i className="bi bi-cart3 fs-5"></i>
                      </div>
                    </div>
                  </div>
                  <span className={`tag badge text-white ${product.tags === "New" ? 'bg-success' : product.tags === "Sale" ? 'bg-danger' : 'bg-success'}`}>
                    {product.tags}
                  </span>
                  <Link to={`/product/${product.id}`} className='text-decoration-none text-black'>
                    <div className="product-content pt-3">
                      <span className="price text-decoration-none">{product.price}</span>
                      <h3 className="title pt-1">{product.Productname}</h3>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Index;
