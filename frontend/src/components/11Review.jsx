import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Review = ({ selectedCourse: userSelectedCourse, collegeName }) => {
  const [reviews, setReviews] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(
    userSelectedCourse || "default"
  );

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/college/review?collegeName=${collegeName}&courseName=${selectedCourse}`
        );
        const filterData = response.data.filter(
          (review) => review.course_id === selectedCourse
        );

        setReviews(filterData);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (collegeName && selectedCourse) {
      fetchReviews();
    }
  }, [collegeName, selectedCourse]);

  // Handle updates to user-selected course
  useEffect(() => {
    if (userSelectedCourse) {
      setSelectedCourse(userSelectedCourse);
    }
  }, [userSelectedCourse]);

  return (
    <div className="review-bigcontainer">
      <div className="line-container">
        <span className="labelline" id="review">
          Reviews
        </span>
        <div className="line-with-bend"></div>
      </div>
      <section className="container-review">
        <div className="card__container">
          {reviews.map((review, index) => (
            <article
              className={`card__article ${
                index % 3 === 0
                  ? "card__blue"
                  : index % 3 === 1
                  ? "card__green"
                  : "card__orange"
              }`}
              key={index}
            >
              <div className="card__scale-1"></div>
              <div className="card__scale-2"></div>

              <div className="card__shape-1">
                <div className="card__shape-2"></div>
                <div className="card__shape-3">
                  <img
                    src={review.img || "default-avatar.png"} // Use a default image if profilePhoto is missing
                    alt={`${review.name}'s profile`}
                    className="card__profile-photo"
                  />
                </div>
              </div>

              <div className="card__data">
                <h3 className="card__name">{review.name}</h3>
                <p className="card__description">{review.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Review;
