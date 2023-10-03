import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    },
});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024, // 5MB in bytes
    },
    fileFilter: function (req, file, cb) {
        // Check file size
        if (file.size > 5 * 1024 * 1024) {
            return cb(new Error('File too large!'));
        }
        cb(null, true);
    }
});
