import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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

  // Handle search with debouncing
  const handleSearch = useCallback(
    (query) => {
      setSearchQuery(query);

      if (!query.trim()) {
        setFilteredColleges(collegeData);
        setSelectedCourse(null);
        setCurrentIndex(0);
        return;
      }

      const results = collegeData.filter((college) =>
        Object.keys(college.courses).some((course) =>
          course.toLowerCase().includes(query.toLowerCase())
        )
      );

      // Find the first matching course for the query
      const courseMatch = results.length
        ? Object.keys(results[0].courses).find((course) =>
            course.toLowerCase().includes(query.toLowerCase())
          )
        : null;

      setFilteredColleges(results);
      setSelectedCourse(courseMatch || null);
      setCurrentIndex(0);
    },
    [collegeData]
  );

  // Increment like count and update backend
  const incrementLikeCount = async () => {
    const currentCollege = filteredColleges[currentIndex];
    if (!currentCollege) return;

    const isCourseLike =
      selectedCourse && currentCollege.courses[selectedCourse];

    const payload = isCourseLike
      ? { courseName: selectedCourse }
      : { likeCount: currentCollege.likeCount + 1 };

    try {
      const response = await axios.put(
        `http://localhost:4001/college/${currentCollege._id}`,
        payload
      );

      const updatedCollege = response.data;

      // Optimistically update filteredColleges
      const updatedColleges = filteredColleges.map((college) =>
        college._id === updatedCollege._id ? updatedCollege : college
      );
      setFilteredColleges(updatedColleges);
    } catch (error) {
      console.error("Error updating like count:", error);
      toast.error("Failed to update like count.");
    }
  };

  if (isCheckingAuth) return <LoadingSpinner />;

  const currentCollege = filteredColleges[currentIndex] || {};
  const courseDetails = selectedCourse
    ? currentCollege.courses?.[selectedCourse] || {}
    : {};

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
                  />
                  <Info
                    name={currentCollege.name || "Unknown"}
                    location={currentCollege.location || "N/A"}
                    fees={
                      courseDetails.fees ||
                      currentCollege.fees || ["Search Courses"]
                    }
                  />
                  <Review />
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
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
