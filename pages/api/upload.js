const cloudinary = require('cloudinary').v2;
const videoshow = require('videoshow');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (req, res) => {
  const imagesToConvert = [
    {
      path: './images/image5.jpg',
      caption: 'Communication is Key',
    },
    {
      path: './images/image6.jpg',
      caption: 'Thats why we love phones',
      loop: 10, // long caption
    },
    {
      path: './images/image5.jpg',
      caption: 'It keeps us connected',
    },
    {
      path: './images/image6.jpg',
      caption: 'offer lasts while stocks last !!!!',
      loop: 10, // long caption
    },
  ];

  try {
    const output = await handleConvert(
      imagesToConvert,
      './phones.mp3',
      'repository/videos/slider.mp4'
    );

    console.error('Video created in:', output);

    const uploadApiResponse = await handleVideoUpload(output);

   console.log(uploadApiResponse);
    console.log(uploadApiResponse.url);

    return res.status(200).json({
      uploadApiResponse,
    });
  } catch (error) {
    console.error(error);

    console.error('Error:', err);
    console.error('ffmpeg stderr:', stderr);

   return res.status(400).json({
     error
   })
    
  }
};

/**
 * Handles conversion of images. Takes in an array of images parameter
 * @param {Array<{path:string;caption: string; loop:number}>} images
 * @param {string} audioPath
 * @param {string} outputPath
 *
 * @returns {Promise<string>}
 */
const handleConvert = (images, audioPath, outputPath) => {
  return new Promise((resolve, reject) => {
    videoshow(images)
      .audio(audioPath)
      .save(outputPath)
      .on('error', function (err, stdout, stderr) {
        reject({ err, stdout, stderr });
      })
      .on('end', function (output) {
        resolve(output);
      });
  });
};

/**
 * @param {string} filePath
 *
 */
const handleVideoUpload = async (filePath) => {
  return new Promise((resolve,reject)=>{
    cloudinary.uploader.upload_large(filePath, {
    resource_type: 'video',
    upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
    chunk_size: 6000000,
  },(error,result) => {

    if(error){
      reject(error);
      return;
    }

    resolve(result);
  });
  });
};
