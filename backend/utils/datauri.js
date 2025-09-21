import DataUriParser from 'datauri/parser.js'
import path from "path"

const getDataUri = (file)=>{
    const parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer);
    //file.buffer → the raw binary content of the uploaded file (available when using multer with memoryStorage).
}

export default getDataUri;