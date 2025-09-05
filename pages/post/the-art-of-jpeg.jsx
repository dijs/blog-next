import { useEffect, useRef, useState } from 'react';
import PostContainer from '../../components/PostContainer';
import styles from '../../styles/the-art-of-jpeg.module.css';
import {
  drawImageDataToCanvas,
  extractColorChannels,
  getImageDataFromBlob,
} from '../../utils/jpg';

export default function ArtOfJPEG() {
  const imgRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [fileSize, setFileSize] = useState(0);

  const yImgRef = useRef(null);
  const cbImgRef = useRef(null);
  const crImgRef = useRef(null);

  async function processImage() {
    setSize({
      width: imgRef.current.naturalWidth,
      height: imgRef.current.naturalHeight,
    });
    const resp = await fetch(imgRef.current.src);
    const blob = await resp.blob();
    setFileSize(Math.ceil(blob.size / 1024));

    // Blob to ImageData?
    const ogImageData = await getImageDataFromBlob(blob);

    const { yImageData, cbImageData, crImageData } =
      extractColorChannels(ogImageData);

    yImgRef.current.src = drawImageDataToCanvas(yImageData);
    cbImgRef.current.src = drawImageDataToCanvas(cbImageData);
    crImgRef.current.src = drawImageDataToCanvas(crImageData);
  }

  useEffect(() => {
    if (imgRef.current) {
      processImage();
    }
  }, [imgRef.current]);

  return (
    <PostContainer
      metadata={{
        published: true,
        title: 'The Art of JPEG',
        blurb: 'An exploration of the JPEG image format.',
        layout: 'post',
        tags: ['jpeg', 'image', 'format', 'history', 'technology'],
        date: 'Sep 5, 2025',
      }}
      slug="the-art-of-jpeg"
      number={73}
    >
      <div className={styles.root}>
        <div className={styles.intro}>
          <div className={styles.imageContainer}>
            <img
              ref={imgRef}
              src="/lenna.png"
              alt="Lenna"
              style={{ maxWidth: '300px' }}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    imgRef.current.src = event.target.result;
                    setTimeout(processImage, 0);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>
          <div className={styles.description}>
            The famous Lenna image, often used in image processing research. A
            fun fact that many developers may have missed: it was cropped from a
            Playboy magazine centerfold in 1972. The image has become a standard
            test image in the field of image processing, and today, we will use
            it to explore how JPEG works.
            <br />
            <br />
            Feel free to upload your own image using the file input below the
            picture!
          </div>
          <div className={styles.info}>
            <dl>
              <dt>Size in pixels:</dt>
              <dd>
                {size.width} x {size.height}
              </dd>
              <dt>Size in kilobytes:</dt>
              <dd>{fileSize}</dd>
            </dl>
          </div>
        </div>
        <section>
          <h2>First step: Color Space Conversion</h2>
          <p>
            JPEG starts with a color space conversion from RGB to YCbCr. This
            separates the image into one luminance (Y) and two chrominance (Cb
            and Cr) components. The human eye is more sensitive to luminance
            than chrominance, allowing JPEG to compress the chrominance channels
            more aggressively without significant perceived loss in quality.
          </p>
          <div className={styles.channelImages}>
            <img ref={yImgRef} alt="Luminance Channel" />
            <img ref={cbImgRef} alt="Chrominance Blue Channel" />
            <img ref={crImgRef} alt="Chrominance Red Channel" />
          </div>
        </section>
      </div>
    </PostContainer>
  );
}
