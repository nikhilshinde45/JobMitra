import multer from "multer";

//File will be stored in RAM, inside a buffer (temporary memory).const ;
const  storage = multer.memoryStorage();

// single file upload with field name "file"
export const singleUpload = multer({ storage }).single("file");
