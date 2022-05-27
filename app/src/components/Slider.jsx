import React from "react";
import dataSlider from "./dataSlider";
import BtnSlider from "./BtnSlider";

export default function Slider() {
  const [sliderIndex, setSliderIndex] = React.useState(1);

  const nextSlide = () => {
    if (sliderIndex !== dataSlider.length) {
      setSliderIndex(sliderIndex + 1);
    } else if (sliderIndex === dataSlider.length) {
      setSliderIndex(1);
    }
  };

  const prevSlide = () => {
    if (sliderIndex !== 1) {
      setSliderIndex(sliderIndex - 1);
    } else if (sliderIndex === 1) {
      setSliderIndex(dataSlider.length);
    }
  };
  const moveDot = (index) => {
    setSliderIndex(index);
  };
  return (
    <div className="container__slider">
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={sliderIndex === index + 1 ? "slide active" : "slide"}
          >
            <img src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpg`} />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />
      <div className="container__dots">
        {Array.from({ length: 5 }).map((item, index) => (
          <div
            onClick={() => moveDot(index + 1)}
            className={sliderIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
}
