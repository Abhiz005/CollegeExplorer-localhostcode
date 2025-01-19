import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Review = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch reviews from the backend when the component mounts
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4001/college/review"
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="review-bigcontainer">
      <div className="line-container">
        <span className="labelline" id="review">
          Reviews
        </span>
        <div className="line-with-bend"></div>
      </div>
      <section className="container-review">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            240: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          onInit={(swiper) => {
            const swiperContainer = swiper.el;
            swiperContainer.addEventListener("mouseenter", () => {
              if (swiper && swiper.autoplay) {
                swiper.autoplay.stop();
              }
            });
            swiperContainer.addEventListener("mouseleave", () => {
              if (swiper && swiper.autoplay) {
                swiper.autoplay.start();
              }
            });
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <article className="card__article">
                <div className="card__image">
                  <img
                    src={review.img}
                    alt={review.name}
                    className="card__img"
                  />
                  <div className="card__shadow"></div>
                </div>
                <h3 className="card__name">{review.name}</h3>
                <div className="card__data">
                  <p className="card__description">{review.description}</p>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </section>
    </div>
  );
};

export default Review;
