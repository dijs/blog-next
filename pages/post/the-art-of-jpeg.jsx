import { useEffect, useRef, useState } from 'react';
import PostContainer from '../../components/PostContainer';
import styles from '../../styles/the-art-of-jpeg.module.css';
import {
  drawSubsampledImageDataToCanvas,
  drawImageDataToCanvas,
  extractColorChannels,
  getImageDataFromBlob,
  uniqueColorCount,
} from '../../utils/jpg';

function Section({ number, title, children }) {
  return (
    <section>
      <h2>
        <span className={styles.sectionNumber}>
          {number}
          <sup>
            {number === 1
              ? 'st'
              : number === 2
              ? 'nd'
              : number === 3
              ? 'rd'
              : 'th'}
          </sup>
        </span>
        <span className={styles.sectionIcon}>❖</span> {title}
      </h2>
      {children}
    </section>
  );
}

export default function ArtOfJPEG() {
  const imgRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [fileSize, setFileSize] = useState(0);
  const [uniqueColors, setUniqueColors] = useState(0);

  const [colorChannelThreshold, setColorChannelThreshold] = useState(120);
  const [colorChannelAmplify, setColorChannelAmplify] = useState(3);

  const yImgRef = useRef(null);
  const cbImgRef = useRef(null);
  const crImgRef = useRef(null);

  const [subsampleAmount, setSubsampleAmount] = useState(2);

  const subCbImgRef = useRef(null);
  const subCrImgRef = useRef(null);

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

    setUniqueColors(uniqueColorCount(ogImageData));

    const { yImageData, cbImageData, crImageData } = extractColorChannels(
      ogImageData,
      colorChannelThreshold,
      colorChannelAmplify
    );

    yImgRef.current.src = drawImageDataToCanvas(yImageData);
    cbImgRef.current.src = drawImageDataToCanvas(cbImageData);
    crImgRef.current.src = drawImageDataToCanvas(crImageData);

    subCbImgRef.current.src = drawSubsampledImageDataToCanvas(
      cbImageData,
      subsampleAmount
    );
    subCrImgRef.current.src = drawSubsampledImageDataToCanvas(
      crImageData,
      subsampleAmount
    );
  }

  useEffect(() => {
    if (imgRef.current) {
      processImage();
    }
  }, [
    imgRef.current,
    colorChannelThreshold,
    colorChannelAmplify,
    subsampleAmount,
  ]);

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
              <dd>{fileSize.toLocaleString()}</dd>
              <dt>Unique colors:</dt>
              <dd>{uniqueColors.toLocaleString()}</dd>
            </dl>
          </div>
        </div>
        <Section number={1} title="Color Space Conversion">
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
          <div className={styles.sliderContainer}>
            <label>
              Chrominance Threshold:
              <input
                type="range"
                min="0"
                max="255"
                value={colorChannelThreshold}
                onChange={(e) =>
                  setColorChannelThreshold(parseInt(e.target.value, 10))
                }
              />
            </label>
            <label>
              Chrominance Amplify:
              <input
                type="range"
                min="1"
                max="20"
                value={colorChannelAmplify}
                onChange={(e) =>
                  setColorChannelAmplify(parseInt(e.target.value, 10))
                }
              />
            </label>
          </div>
          <p>
            The images above show the Y, Cb, and Cr channels extracted from the
            original image. The sliders allow you to adjust the threshold and
            amplification for the chrominance channels, demonstrating how JPEG
            can manipulate these channels for compression.
          </p>
        </Section>

        <Section number={2} title="Chroma Subsampling">
          <p>
            After color space conversion, JPEG typically applies chroma
            subsampling. This reduces the resolution of the chrominance channels
            (Cb and Cr) relative to the luminance channel (Y). Common
            subsampling ratios include 4:4:4 (no subsampling), 4:2:2, and 4:2:0.
            By reducing the amount of chrominance data, JPEG can achieve
            significant compression while maintaining visual quality.
          </p>

          <div className={styles.subsampledChannels}>
            <img ref={subCbImgRef} alt="Subsampled Chrominance Blue Channel" />
            <img ref={subCrImgRef} alt="Subsampled Chrominance Red Channel" />
          </div>

          <label>
            Subsampling Amount:
            <input
              type="range"
              min="1"
              max="20"
              value={subsampleAmount}
              onChange={(e) => setSubsampleAmount(parseInt(e.target.value, 10))}
            />
          </label>

          <p>
            The images above illustrate the effect of chroma subsampling on the
            Cb and Cr channels. Notice how the resolution is reduced, which
            contributes to overall file size reduction in JPEG compression.
          </p>
        </Section>
      </div>
    </PostContainer>
  );
}
