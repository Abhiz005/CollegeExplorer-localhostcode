import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Scraper from "./components/15Scraper";
import SaveButton from "./components/9save";
// Global Styles
import "./App.css";

// Components
import Header from "./components/1Header";
import DynamicIsland from "./components/2DynamicIsand";
import EmblaCarousel from "./components/4embala";
import Info from "./components/6Info";
import NumberBadge from "./components/7hashtag";
import LikeButton from "./components/8Like";
import Review from "./components/11Review";
import Lineback from "./components/10Lineback";
import Map from "./components/12Map";
import FeedBack from "./components/13FeedBack";
import Footer from "./components/14Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import SearchIcon from "./components/3SearchIcon";

// Pages
import SignUpPage from "./components/pages/SignUpPage";
import LoginPage from "./components/pages/LoginPage";
import EmailVerificationPage from "./components/pages/EmailVerificationPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import DashboardPage from "./components/pages/DashboardPage";

// State Management
import { useAuthStore } from "./components/store/authStore";

// Constants
const OPTIONS = { loop: true };

// Protected Routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user.isVerified) return <Navigate to="/verify-email" replace />;
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  const [collegeData, setCollegeData] = useState([]);
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const handleSave = () => {
    alert("Save button clicked!");
  };
  // Fetch colleges data and memoize sorting logic
  const fetchColleges = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:4001/college");
      const sortedData = res.data.sort((a, b) => {
        const aNumber = parseInt(a.number[0], 10) || 0;
        const bNumber = parseInt(b.number[0], 10) || 0;
        return aNumber - bNumber;
      });
      setCollegeData(sortedData);
      setFilteredColleges(sortedData);
    } catch (error) {
      console.error("Error fetching college data:", error);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const handleSearch = useCallback(
    (query) => {
      console.log("Search query received:", query);
      setSearchQuery(query);

      if (!query.trim()) {
        console.log("Query is empty, resetting data.");
        setFilteredColleges(collegeData);
        setSelectedCourse(null);
        setCurrentIndex(0);
        return;
      }

      const results = collegeData.filter((college) =>
        Object.keys(college.courses).some(
          (course) => course.toLowerCase() === query.toLowerCase()
        )
      );

      console.log("Filtered colleges:", results);

      const courseMatch = results.length
        ? Object.keys(results[0].courses).find(
            (course) => course.toLowerCase() === query.toLowerCase()
          ) ||
          Object.keys(results[0].courses).find((course) =>
            course.toLowerCase().includes(query.toLowerCase())
          )
        : null;

      console.log("First matched course:", courseMatch);

      setFilteredColleges(results);
      setSelectedCourse(courseMatch || null);
      setCurrentIndex(0);
    },
    [collegeData]
  );

  // Increment like count and update backend
  // Increment like count and update backend
  const incrementLikeCount = (newLikeCount) => {
    const currentCollege = filteredColleges[currentIndex];
    if (!currentCollege) return;

    const updatedColleges = filteredColleges.map((college) => {
      if (college._id === currentCollege._id) {
        if (selectedCourse) {
          // Update like count for the specific course
          return {
            ...college,
            courses: {
              ...college.courses,
              [selectedCourse]: {
                ...college.courses[selectedCourse],
                likeCountCourse: newLikeCount,
              },
            },
          };
        } else {
          // Update overall like count
          return { ...college, likeCount: newLikeCount };
        }
      }
      return college;
    });

    setFilteredColleges(updatedColleges);
  };

  if (isCheckingAuth) return <LoadingSpinner />;

  const currentCollege = filteredColleges[currentIndex] || {};
  const courseDetails = selectedCourse
    ? currentCollege.courses?.[selectedCourse] || {}
    : {};
  console.log("selected course:", selectedCourse);
  // console.log("currentCollege.name:", currentCollege.name);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <SearchIcon onSearch={handleSearch} />
              <DynamicIsland />
              <Lineback courseName={selectedCourse || "Colleges"} />
              {filteredColleges.length > 0 ? (
                <>
                  <NumberBadge
                    number={
                      courseDetails.number?.[0] ||
                      currentCollege.number?.[0] ||
                      "N/A"
                    }
                  />
                  <EmblaCarousel
                    key={filteredColleges
                      .map((college) => college._id)
                      .join(",")}
                    slides={filteredColleges.map((college) => college.image)}
                    options={OPTIONS}
                    onSlideChange={setCurrentIndex}
                  />
                  <LikeButton
                    likeCount={
                      selectedCourse
                        ? courseDetails?.likeCountCourse || 0
                        : currentCollege.likeCount || 0
                    }
                    onLike={incrementLikeCount}
                    collegeId={currentCollege._id}
                    selectedCourse={selectedCourse}
                  />

                  <Info
                    name={currentCollege.name || "Unknown"}
                    location={currentCollege.location || "N/A"}
                    fees={
                      courseDetails.fees ||
                      currentCollege.fees || ["Search Courses"]
                    }
                  />
                  <SaveButton
                    onClick={handleSave}
                    collegeId={currentCollege._id}
                    location={currentCollege.location}
                    fees={courseDetails.fees || currentCollege.fees}
                    selectedCourse={selectedCourse}
                  />
                  <Review
                    selectedCourse={selectedCourse}
                    collegeName={currentCollege.name}
                  />
                  <Map
                    latitude={currentCollege.latitude || 0}
                    longitude={currentCollege.longitude || 0}
                  />
                </>
              ) : (
                <p>No colleges found for your search query.</p>
              )}
              <FeedBack />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/verify-email"
          element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/reset-password/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/DashboardPage"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="/scraper" element={<Scraper />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
