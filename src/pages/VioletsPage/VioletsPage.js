import React, { useEffect, useState } from "react";
import { useFetchAllVioletsQuery } from "../../api/violetsAPI";
import { Gallery } from "react-grid-gallery";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import s from "./VioletsPage.module.scss";
import Preloader from "../../components/Preloader";

const VioletsPage = () => {
  const { data, error, isLoading } = useFetchAllVioletsQuery({
    requestAll: true,
  });

  const images =
    data &&
    data.map((item) => {
      return {
        src: item.photo,
        original: item.photo,
        alt: item.nameViolet,
        nano: "base64",
        caption: item.nameViolet,

        customOverlay: (
          <div className={s.customOverlay}>
            <h3>{item.nameViolet}</h3>
          </div>
        ),
        width: 500,
        height: 500,
      };
    });

  const [index, setIndex] = useState(-1);

  const currentImage = data && images[index];
  const nextIndex = data && (index + 1) % images.length;
  const nextImage = (data && images[nextIndex]) || currentImage;
  const prevIndex = data && (index + images.length - 1) % images.length;
  const prevImage = (data && images[prevIndex]) || currentImage;

  const handleClick = (index, item) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={s.root}>
      <h1>Моя коллекция:</h1>

      {images && (
        <Gallery
          images={images}
          margin={15}
          onClick={handleClick}
          rowHeight={500}
          enableImageSelection={false}
        />
      )}
      {!!currentImage && (
        <Lightbox
          mainSrc={currentImage.original}
          imageTitle={currentImage.caption}
          mainSrcThumbnail={currentImage.src}
          nextSrc={nextImage.original}
          nextSrcThumbnail={nextImage.src}
          prevSrc={prevImage.original}
          prevSrcThumbnail={prevImage.src}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
};
export default VioletsPage;
