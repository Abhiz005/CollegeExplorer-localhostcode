import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Gopika",
    description:
      "Teaching is good. Infrastructure is poor,& not many facilities are available. The college does not offer placements for this course, but they are now trying to improve.",
    img: "/images/avatar-1.png",
  },
  {
    name: "Krish",
    description:
      "The college is good, and all the faculty are also very good. Placements: There are no placements given in SIES College. Placement Sales are not active; actually, there is no placement cell in SIES College. There is no top recruitment company at SIES College. No student has an internship at SIES College. Infrastructure: There is no classroom for M.Sc. students in the college. The library has a very good structure. The department is also very good, and the teachers are very helpful. The college structure is also very well-developed, and cleaning is also very good in college. The canteen food is also good. Faculty: Teachers are very helpful in college and are well-qualified and knowledgeable. Teaching quality is also very good. It makes students industry-ready. Semester exams are very good, and they are average, according to students. The passing rate is 40% in the college.",
    img: "/images/avatar-2.png",
  },
  {
    name: "Sara Mit",
    description:
      "An innovative thinker with a passion for technology and problem-solving.",
    img: "/images/avatar-3.png",
  },
  {
    name: "Jenny Wert",
    description:
      "Passionate about solving problems, I create amazing web experiences.",
    img: "/images/avatar-4.png",
  },
];

const Review = () => {
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
