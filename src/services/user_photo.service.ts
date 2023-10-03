import {Api401Error, BusinessLogicError} from "../core/error.response";
import {cloudinary} from "../api_services/cloudinary";
// import {cloudinaryService} from "../api_services/cloudinary";

export class User_photoService {
    static async uploadImg(files: any) {
        console.log(files);
        if (!files || files.length === 0) throw new Api401Error('No files were uploaded');

        for (let i = 0; i < files.length; i++) {
            if (!files[i].mimetype.startsWith('image/')) {
                throw new BusinessLogicError('Only image files are allowed');
            }
        }

        const uploadResults = await Promise.all(
            files.map(async (file: Express.Multer.File) => {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: 'UET_Dating'
                });
                if (!result) {
                    console.log('Error uploading image');
                    throw new BusinessLogicError('Error uploading image');
                }
                return result.secure_url;
            })
        );

        return uploadResults;
    }
}