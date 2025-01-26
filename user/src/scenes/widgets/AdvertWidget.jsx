import { Typography, useTheme } from "@mui/material";
import React, { useState, useEffect } from "react";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    "http://localhost:3001/assets/info4.jpeg",
    "http://localhost:3001/assets/Coffee.png",
    "http://localhost:3001/assets/Tokyo.jpg",
    "http://localhost:3001/assets/techgadgets.jpg",
    "http://localhost:3001/assets/FitnessPro.jpeg",
    "http://localhost:3001/assets/HealthyLife.jpeg",
    "http://localhost:3001/assets/AdventureGear.jpg",
    "http://localhost:3001/assets/SmartHome.jpg",
    "http://localhost:3001/assets/EcoFriendly.jpeg",
    "http://localhost:3001/assets/FashionHub.webp",
    "http://localhost:3001/assets/TravelWise.jpeg",
    "http://localhost:3001/assets/GourmetDelights.jpg",
  ];

  const texts = [
    {
      heading: "MikaCosmetics",
      website: "mikacosmetics.com",
      description:
        "Your pathway to stunning and immaculate beauty and made sure your skin is exfoliating skin and shining like light.",
      category: "Beauty & Skincare",
    },
    {
      heading: "Net Work Chuck's Coffee",
      website: "networkchuck.com",
      description:
        "Coffee to fuel IT Because everything in I.T. requires coffee.",
      category: "Food & Beverage",
    },
    {
      heading: "Tokyo",
      website: "ExploreIndia.com",
      description: "Your Travel Made Easy and Enjoyable.",
      category: "Travel & Tourism",
    },
    {
      heading: "Tech Gadgets",
      website: "techgadgets.com",
      description: "Latest and greatest in tech gadgets and accessories.",
      category: "Technology",
    },
    {
      heading: "Fitness Pro",
      website: "fitnesspro.com",
      description: "Get in shape with the best fitness equipment and advice.",
      category: "Health & Fitness",
    },
    {
      heading: "Healthy Life",
      website: "healthylife.com",
      description: "Your one-stop shop for healthy living products.",
      category: "Health & Wellness",
    },
    {
      heading: "Adventure Gear",
      website: "adventuregear.com",
      description: "Gear up for your next big adventure with top-quality gear.",
      category: "Outdoor & Adventure",
    },
    {
      heading: "Smart Home",
      website: "smarthome.com",
      description: "Transform your house into a smart home with our products.",
      category: "Home & Living",
    },
    {
      heading: "Eco Friendly",
      website: "ecofriendly.com",
      description: "Sustainable and eco-friendly products for a better planet.",
      category: "Eco-Friendly",
    },
    {
      heading: "Fashion Hub",
      website: "fashionhub.com",
      description: "Stay stylish with the latest trends in fashion.",
      category: "Fashion & Apparel",
    },
    {
      heading: "Travel Wise",
      website: "travelwise.com",
      description: "Travel smarter with tips, gear, and destination guides.",
      category: "Travel & Tourism",
    },
    {
      heading: "Gourmet Delights",
      website: "gourmetdelights.com",
      description: "Indulge in gourmet foods and culinary experiences.",
      category: "Food & Beverage",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        {/* <Typography color={medium}>Create Ad</Typography> */}
      </FlexBetween>
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "0.75rem",
          margin: "0.75rem 0",
          height: "200px",
        }}
      >
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s",
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div key={index} style={{ flex: "0 0 auto", width: "100%" }}>
              <img
                src={image}
                alt={`advert ${index}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={handlePrev}
          style={{
            position: "absolute",
            top: "50%",
            left: "10px",
            transform: "translateY(-50%)",
            zIndex: "1",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
        >
          <ArrowBackIos style={{ fontSize: 24, color: "#fff" }} />
        </button>
        <button
          onClick={handleNext}
          style={{
            position: "absolute",
            top: "50%",
            right: "10px",
            transform: "translateY(-50%)",
            zIndex: "1",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
        >
          <ArrowForwardIos style={{ fontSize: 24, color: "#fff" }} />
        </button>
      </div>
      <FlexBetween>
        <Typography color={main}>{texts[currentImageIndex].heading}</Typography>
        <Typography color={medium}>
          {texts[currentImageIndex].website}
        </Typography>
      </FlexBetween>
      <Typography color={medium} m="0.5rem 0">
        {texts[currentImageIndex].description}
      </Typography>
      <Typography color={medium} m="0.5rem 0">
        Category: {texts[currentImageIndex].category}
      </Typography>
    </WidgetWrapper>
  );
};

export default AdvertWidget;
