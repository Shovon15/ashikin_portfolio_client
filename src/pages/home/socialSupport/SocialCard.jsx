/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { LazyLoadImage } from "react-lazy-load-image-component";

const SocialCard = ({ data }) => {
  const { image, title, description } = data;
  return (
    <section
      className="bg-white w-[300px] mx-auto
   rounded-2xl border-2 border-color-border shadow-xl"
    >
      <div
        className="w-full  h-[250px] md:h-[340px] mx-auto  bg-transparent 
      cursor-pointer group [perspective:1000px]"
      >
        <div
          className="relative [transform-style:preserve-3d] group-hover:my-rotate-y-180 w-full h-full
         duration-1000"
        >
          <div
            className="absolute backface-hidden rounded-2xl  w-full h-full flex flex-col p-2 justify-center items-center pt-5"
          >
            <img src={image} className="w-80 md:w-9/12 mx-auto rounded-md " alt="..." />
            <p className="py-4 text-md md:text-xl lg:text-2xl flex justify-center 
            items-center text-center font-extrabold text-color-secondary">
              {title}
            </p>
          </div>
          <div
            className="absolute my-rotate-y-180 backface-hidden w-full h-full bg-color-secondary rounded-xl 
          overflow-hidden"
          >
            <div className="text-center flex flex-col items-center justify-center h-full text-white p-2 md:p-5">
              <p className=" text-xs md:text-lg">{description}</p>
            </div>
          </div>
        </div> 
      </div>
    </section>
    // <div
    //   key={id}
    //   className="bg-color-custom p-4 rounded-lg shadow-lg hover:shadow-xl h-[23rem]"
    // >
    //   <div className="w-full h-44 flex justify-center  duration-300 hover:scale-110 transition ease-in-out ">
    //     <LazyLoadImage
    //       effect="blur"
    //       src={image}
    //       alt="card-image"
    //       className="object-fill h-full rounded-xl"
    //       width="400"
    //       height="200"
    //     />
    //   </div>

    //   <h2 className="text-2xl text-color-header font-bold mb-2 mt-5">{title}</h2>
    //   <p className="text-color-primary">{description}</p>
    // </div>
  );
};

export default SocialCard;
