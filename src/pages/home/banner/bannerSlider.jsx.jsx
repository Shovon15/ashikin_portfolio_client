/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "none", background: "green" }}
      onClick={onClick}
    />
  );
}

const BannerSLider = ({ data }) => {
  console.log(data, " from banner slider")
  const settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />

  };
  return (
    <div className="">
      <Slider {...settings}>
      {data.map((url, index) => (
          <div key={index} className="active:border-none border-none">
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className=" mx-auto"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSLider;
