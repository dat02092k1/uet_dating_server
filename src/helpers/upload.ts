import {Api401Error, BusinessLogicError} from "../core/error.response";
import {cloudinary} from "../api_services/cloudinary";

export async function uploadImg(files: any) {
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
            console.log(result);
            return {
                photo_url: result.secure_url,
                photo_id: result.public_id
            };
        })
    );

    return uploadResults;
}