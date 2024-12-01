import {useState} from "react";
import {Button, Upload, UploadFile, Form} from "antd";
import {ArrowRightOutlined, PlusOutlined, LoadingOutlined} from "@ant-design/icons";
import GetHelp from "../../pages/GetHelp/GetHelp.tsx";
import "../../pages/Gallery/gallery.css"


interface GalleryProps {
    onNext: (values: UploadFile[]) => void;
    onPrevious: () => void;
}



export default function Gallery({onNext, onPrevious}: GalleryProps) {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-2",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ]);

    const handleChange = (info: { fileList: UploadFile[] }) => {
        let newFileList = [...info.fileList];

        newFileList = newFileList.slice(-8);

        newFileList = newFileList.filter(file =>
            file.status === 'done' || file.status === 'error'
        );

        setFileList(newFileList);
    };

    const handleSubmit = (values: UploadFile[]) => {
        console.log("Gallery values:", values);
        onNext(values);
    };

    const uploadButton = (loading: boolean) => (
        <div
            style={{
                border: '2px dashed #d9d9d9',
                borderRadius: '8px',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {loading ? <LoadingOutlined/> : <PlusOutlined/>}
            <div style={{marginTop: 8}}>Upload</div>
        </div>
    );

    return (
        <div>
            <GetHelp/>
            <p className="restaurant-title">Manage Restaurant Gallery</p>
            <p className="restaurant-paragraph">
                Upload up to 8 images of your restaurant
            </p>

            <Form form={form} onFinish={handleSubmit}>
                <Form.Item
                    name="restaurantGallery"
                    rules={[{
                        required: true,
                        message: "Please upload at least one restaurant image"
                    }]}
                >
                    <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        beforeUpload={() => false}
                        multiple
                        maxCount={8}
                    >
                        {fileList.length >= 8 ? null : uploadButton(false)}
                    </Upload>
                </Form.Item>

                <div className="form-footer">
                    <Button onClick={onPrevious}>
                        Previous
                    </Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="button-details"
                    >
                        Next <ArrowRightOutlined/>
                    </Button>
                </div>
            </Form>
        </div>
    );
};

