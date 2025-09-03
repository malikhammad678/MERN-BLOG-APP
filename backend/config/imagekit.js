import ImageKit from "imagekit";

var imageKit = new ImageKit({
    publicKey:process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey:process.env.IMAGEKIT_API_PRIVATE,
    urlEndpoint:process.env.IMAGEKIT_API_ENDPOINT
})

export default imageKit