import { useState } from "react";
import GetHelp from "../GetHelp/GetHelp";
import "./gallery.css";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Upload, UploadFile } from "antd";
import { Link } from "react-router-dom";



const Gallery: React.FC<{ onNext: () => void }> = ({onNext}) => {
    // const [previewOpen, setPreviewOpen] = useState<boolean>(false);
    // const [previewImage, setPreviewImage] = useState<string>("");
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
        {
            uid: "-3",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-4",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
    ]);

    // const handlePreview = async (file: UploadFile) => {
    //     if (!file.url && !file.preview) {
    //         file.preview = await new Promise<string>((resolve, reject) => {
    //             const reader = new FileReader();
    //             reader.readAsDataURL(file.originFileObj as Blob);
    //             reader.onload = () => resolve(reader.result as string);
    //             reader.onerror = (error) => reject(error);
    //         });
    //     }
    //     setPreviewImage(file.url || file.preview || "");
    //     setPreviewOpen(true);
    // };

    const handleChange = ({ fileList }: { fileList: UploadFile[] }) => {
        // Remove files with "uploading" or "error" status
        const filteredList = fileList.filter((file) => file.status === "done");
        setFileList(filteredList);
    };

    const uploadButton = (
        <div className="upload-button">
            <PlusOutlined />
            <div>Upload</div>
        </div>
    );

    return (
        <div>
            <GetHelp />
            <p className="restaurant-title">Manage Restaurant Time Slot</p>
            <p className="restaurant-paragraph">
                All info of your restaurant shown below.
            </p>

            <div className="gallery-container">
                {/* Upload button */}
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    fileList={[]}
                    onChange={handleChange}
                    showUploadList={false}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>

                {/* Render images */}
                {/*{fileList.map((file) => (*/}
                {/*    <div key={file.uid} className="gallery-item">*/}
                {/*        <Image*/}
                {/*            src={file.url}*/}
                {/*            preview={{*/}
                {/*                visible: previewOpen,*/}
                {/*                onVisibleChange: (visible) =>*/}
                {/*                    setPreviewOpen(visible),*/}
                {/*            }}*/}
                {/*            alt={file.name}*/}
                {/*            onClick={() => handlePreview(file)}*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*))}*/}
            </div>

            {/* <BookingButton /> */}
            <div className="form-footer">
                <Link to="#" className="previous">
                    Previous Step
                </Link>
               
                    <Button
                        className="button-details"
                        htmlType="submit"
                        // href="/restaurant-profile/agreement"
                        onClick={onNext}
                    >
                        Next <ArrowRightOutlined />
                    </Button>
               
            </div>
        </div>
    );
};

export default Gallery;
