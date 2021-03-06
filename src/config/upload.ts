import path from 'path'
import crypto from 'crypto'
import multer, { StorageEngine } from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
    driver: 's3' | 'disk';

    multer: {
        storage: StorageEngine;
    };

    config: {
        disk: {
            
        };
        aws: {
            bucket: string;
        };
    };

    tmpFolder: string;
    uploadsFolder: string;
}

export default {
    driver: process.env.STORAGE_DRIVER || 'disk', 

    tmpFolder,
    uploadsFolder: path.resolve(tmpFolder, 'uploads'),

    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('hex')
                const fileName = `${fileHash}-${file.originalname}`
    
                return callback(null, fileName)
            },
        }),
    },

    config: {
        disk: {
            
        },
        aws: {
            bucket: process.env.AWS_BUCKET_S3,
        }
    }
} as IUploadConfig;