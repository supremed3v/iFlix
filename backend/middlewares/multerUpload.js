import multer from "multer";

export default function uploadMovie(){
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, '../public/videos');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    })
    
    const upload = multer({ storage: storage }); 
    return upload.single("movie");
}