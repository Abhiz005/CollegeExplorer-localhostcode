import React from 'react'

const Home = () => {
  return (
    <>
       
            <Header />
            <DynamicIsland />
            <Lineback />

            {collegeData.length > 0 && (
              <>
                <NumberBadge number={currentCollege.number ?? "N/A"} />
                <EmblaCarousel
                  slides={collegeData.map((college) => college.image)}
                  options={OPTIONS}
                  onSlideChange={handleSlideChange}
                />
                <LikeButton
                  likeCount={currentCollege.likeCount ?? 0}
                  onLike={incrementLikeCount}
                />
                <Info
                  name={currentCollege.name ?? "Unknown"}
                  location={currentCollege.location ?? "N/A"}
                  fees={currentCollege.fees ?? "Not Available"}
                />
                <Review />
                <Map
                  latitude={currentCollege.latitude ?? 0}
                  longitude={currentCollege.longitude ?? 0}
                />
              </>
            )}

            <FeedBack />
            <Footer />
          
    </>
  )
}

export default Home
