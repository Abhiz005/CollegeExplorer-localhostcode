import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";

const Review = ({ selectedCourse: userSelectedCourse, collegeName }) => {
  const [reviews, setReviews] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(
    userSelectedCourse || "default"
  );
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    img: "",
  });
  const [message, setMessage] = useState(""); // Success/Error messages
  const { isAuthenticated } = useAuthStore();
  const handleWriteReviewClick = async () => {
    if (!isAuthenticated) {
      toast.error("Please log in to use this feature.");
      return;
    }
    setShowModal(true);
  };

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

  // Fetch colleges
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("http://localhost:4001/college/");
        setColleges(response.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
      }
    };

    fetchColleges();
  }, []);

  // Update course list when a college is selected
  useEffect(() => {
    if (selectedCollege) {
      const selectedCollegeData = colleges.find(
        (college) => college._id === selectedCollege
      );
      if (selectedCollegeData && selectedCollegeData.courses) {
        setCourses(Object.keys(selectedCollegeData.courses)); // Extracting course names
      } else {
        setCourses([]); // Reset courses if no college is selected
      }
    }
  }, [selectedCollege, colleges]);

  useEffect(() => {
    if (userSelectedCourse) {
      setSelectedCourse(userSelectedCourse);
    }
  }, [userSelectedCourse]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, img: reader.result });
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:4001/review-add/review-add",
        {
          ...formData,
          college_id: selectedCollege,
          course_id: selectedCourse,
          user_id: user?._id,
        }
      );

      if (response.status === 201) {
        setMessage("✅ Review published successfully!");
      } else {
        setMessage("❌ Error in publishing review.");
      }

      setFormData({ name: "", description: "", img: "" });
      setTimeout(() => {
        setShowModal(false);
        setMessage("");
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage("❌ Error in publishing review.");
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="review-bigcontainer">
      <div className="line-container">
        <span className="labelline" id="review">
          Reviews
        </span>
        <div className="line-with-bend"></div>
      </div>

      <section className="container-review">
        <button
          onClick={handleWriteReviewClick}
          className="write-review-button"
        >
          Write a Review
        </button>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="swiper-container"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <article
                className={`card__article ${
                  index % 3 === 0
                    ? "card__blue"
                    : index % 3 === 1
                    ? "card__green"
                    : "card__orange"
                }`}
              >
                <div className="card__scale-1"></div>
                <div className="card__scale-2"></div>

                <div className="card__shape-1">
                  <div className="card__shape-2"></div>
                  <div className="card__shape-3">
                    <img
                      src={review.img || "default-avatar.png"}
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
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Modal for Review Submission */}
      {showModal && (
        <div className="modal">
          <button className="close-button" onClick={() => setShowModal(false)}>
            ✖
          </button>
          <div className="modal-content">
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              {/* College Dropdown */}
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                required
              >
                <option value="">Select College</option>
                {colleges.map((college) => (
                  <option key={college._id} value={college._id}>
                    {college.name}
                  </option>
                ))}
              </select>
              {/* Course Dropdown */}
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>
                {courses.map((courseName, index) => (
                  <option key={index} value={courseName}>
                    {courseName}
                  </option>
                ))}
              </select>
              <textarea
                name="description"
                placeholder="Your Review"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
              {/* Image Upload */}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <button type="submit">Publish</button>
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              {message && <p className="message">{message}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Review;
