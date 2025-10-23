import { LazyLoadImage } from "react-lazy-load-image-component";

function LazyLoadGameImage({ src, alt }) {
  return (
    <LazyLoadImage
      src={src}
      alt={alt}
      effect="blur"
      wrapperProps={{ style: { transitionDelay: "0.5s" } }}
      style={{
        height: "150px", 
        width: "100%", 
        objectFit: "cover", 
      }}
    />
  );
}

export default LazyLoadGameImage;
