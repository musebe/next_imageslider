import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import { Video, Transformation } from 'cloudinary-react';

export default function VideoSlider({ productShowcase }) {
  return (
    <Layout>
      <h1> Convert Product Images into a video slideshow </h1>
      {productShowcase.length === 0 && <h3>No videos to Showcase</h3>}

      {productShowcase !== undefined &&
        productShowcase.resources.map((video) => (
          <Video
            key={video.public_id}
            publicId={video.public_id}
            cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}
            secure='true'
            controls
            fallbackContent='Your browser does not support HTML5 video tags.'
            format='webm'
          ></Video>
        ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`${API_URL}/api/sliderVideos`);
  const productShowcase = await res.json();

  if (!productShowcase) {
    return {
      notFound: true,
    };
  }
  //This will log the responses on the server side
  console.log(productShowcase);

  return {
    props: { productShowcase },
  };
}
