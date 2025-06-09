import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useFilter } from "../context/FilterContext";
import { useRouter } from "next/router";

// استایل کلی اسلایدر
const sliderStyle = {
  width: "100%",
  margin: "1rem 0",
};

// هندل سفارشی با tooltip دائمی
const CustomHandle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  const leftOffset = -10;

  return (
    <div style={{ position: "relative" }}>
      <Slider.Handle value={value} {...restProps} />
      <div
        style={{
          position: "absolute",
          top: -30,
          left: leftOffset,
          backgroundColor: "#333",
          color: "#fff",
          padding: "2px 6px",
          borderRadius: "4px",
          fontSize: "12px",
          whiteSpace: "nowrap",
          transform: "translateX(-50%)",
        }}
      >
        {value} $
      </div>
    </div>
  );
};

const PriceSlider = () => {
  const { priceRange, setPriceRange,setDefaultData } = useFilter();
  const router = useRouter()

  const [tempRange, setTempRange] = useState(priceRange);

  const handleSliderChange = (value) => {
    setTempRange(value);
  };

  const applyFilter = () => {
    let newQuery = { ...router.query }
    setDefaultData(null)


    if (tempRange[0] === 1 && tempRange[1] === 5000) {
      delete newQuery.minPrice
      delete newQuery.maxPrice   
      setPriceRange(tempRange);   
    }else{
      setPriceRange(tempRange);
      newQuery = { ...router.query, page: 1,minPrice:tempRange[0],maxPrice:tempRange[1] }
    }

    router.push(
      {
        pathname: router.pathname,
        query: newQuery
      },
      undefined,
      { shallow: true }
    )
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "1rem",
        border: "1px solid var(--color-border)",
        boxShadow: "0 0 10px var(--color-border)",
        borderRadius: "8px",
      }}
    >
      <p style={{ marginBottom: "1rem" }}>بازه قیمت:</p>

      <div style={sliderStyle}>
        <Slider
          range
          allowCross={false}
          value={tempRange}
          onChange={handleSliderChange}
          min={1}
          max={5000}
          step={10}
          handle={CustomHandle}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <span>{tempRange[1]} $</span>
        <span>{tempRange[0]} $</span>
      </div>

      <button
        onClick={applyFilter}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "var(--color-primary)",
          color: "var(--color-background)",
          border: "1px solid var(--color-primary)",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-primary-light)";
          e.currentTarget.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "var(--color-primary)";
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        اعمال فیلتر
      </button>
    </div>
  );
};

export default PriceSlider;
