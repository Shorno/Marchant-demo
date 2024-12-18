/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Upload, Button, Image, notification, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useImageUploadMutation } from '../../../../redux/api/ImageUpload/imageUpload';
import './gallery.css'
const Gallery = ({ onGalleryChange }: { onGalleryChange: (galleryData: { image: string }[]) => void }) => {
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [galleryImageUpload] = useImageUploadMutation();

    const handleImageUpload = async (options: any) => {
        setLoading(true);
        const { file } = options;

        try {
            const formData = new FormData();
            formData.append('image', file);
            const result = await galleryImageUpload(formData);
            if (result?.data?.image_url) {
                const imageUrl: string = result.data.image_url;
                setUploadedImages((prevImages) => {
                    const updatedImages = [...prevImages, imageUrl];
                    onGalleryChange(updatedImages.map((img) => ({ image: img }))); 
                    return updatedImages;
                });
            } else {
                notification.error({
                    message: 'Upload Error',
                    description: 'The uploaded image could not be processed properly.',
                });
            }
        } catch (error: any) {
           message.error(error.message, error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='gallery'>
            <p>Upload Images</p>
            <div className='image'>
                {uploadedImages.map((preview, index) => (
                    <div key={index} style={{ margin: '8px' }}>
                        <Image width={100} height={100} src={preview} alt={`Preview ${index}`} />
                    </div>
                ))}
                <Upload
                    listType="picture-card"
                    customRequest={handleImageUpload}
                    showUploadList={false}
                >
                    {loading ? (
                        <div>Uploading...</div>
                    ) : (
                        <Button icon={<UploadOutlined />}></Button>
                    )}
                </Upload>
            </div>
        </div>
    );
};

export default Gallery;
