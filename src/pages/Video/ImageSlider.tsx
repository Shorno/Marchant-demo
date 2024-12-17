import {useState, useRef, useEffect} from 'react';
import {
    PlusOutlined,
    PlayCircleOutlined,
    PauseCircleOutlined,
    DownloadOutlined,
    CameraOutlined
} from '@ant-design/icons';
import {Upload, Image, Button, Space, Card, Typography, Layout, Row, Col} from 'antd';
import type {GetProp, UploadFile, UploadProps} from 'antd';
import {data} from "./data.ts";
const {Title, Text} = Typography;
const {Content} = Layout;

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];


const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function ImageSlider() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const duration = 10;

    const containerRef = useRef<HTMLDivElement>(null);
    const currentImageRef = useRef<HTMLImageElement>(null);
    const nextImageRef = useRef<HTMLImageElement>(null);
    const currentIndex = useRef(0);
    const animationRef = useRef<Animation>();
    const nextAnimationRef = useRef<Animation>();

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = async ({fileList: newFileList}) => {
        const updatedList = [...newFileList].reverse();
        setFileList(updatedList);

        const urls = await Promise.all(
            updatedList.map(async (file) => {
                if (file.originFileObj) {
                    return await getBase64(file.originFileObj);
                }
                return file.url || file.preview || '';
            })
        );
        setImageUrls(urls.filter(Boolean));
    };

    const handlePlayPause = () => {
        if (!isPlaying) {
            requestFullScreen();
        }
        setIsPlaying(!isPlaying);
    };

    const handleDownload = () => {
        alert('In a production environment, this would download the video file');
    };

    useEffect(() => {
        if (!imageUrls.length || !isPlaying) return;

        const transitionDuration = (duration * 1000) / imageUrls.length;
        const displayDuration = Math.max(transitionDuration * 0.7, 2000);
        const transitionTime = Math.min(transitionDuration * 0.9, 1000);

        const animate = () => {
            if (!currentImageRef.current || !nextImageRef.current) return;

            const nextIndex = (currentIndex.current + 1) % imageUrls.length;
            nextImageRef.current.src = imageUrls[nextIndex];

            animationRef.current?.cancel();
            nextAnimationRef.current?.cancel();

            const transition = data[Math.floor(Math.random() * data.length)];

            animationRef.current = currentImageRef.current.animate(
                transition.current,
                {
                    duration: transitionTime,
                    easing: 'ease-in-out',
                    fill: 'forwards',
                    delay: displayDuration
                }
            );

            nextAnimationRef.current = nextImageRef.current.animate(
                transition.next,
                {
                    duration: transitionTime,
                    easing: 'ease-in-out',
                    fill: 'forwards',
                    delay: displayDuration
                }
            );

            animationRef.current.onfinish = () => {
                if (currentImageRef.current) {
                    currentImageRef.current.src = imageUrls[nextIndex];
                    currentIndex.current = nextIndex;
                    setTimeout(animate, 0);
                }
            };
        };

        animate();

        return () => {
            animationRef.current?.cancel();
            nextAnimationRef.current?.cancel();
        };
    }, [imageUrls, isPlaying, duration]);

    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );


    const requestFullScreen = () => {
        if (containerRef.current) {
            containerRef.current.requestFullscreen();
            document.addEventListener('fullscreenchange', handleFullScreenChange);

        }
    };

    const handleFullScreenChange = () => {
        if (!document.fullscreenElement) {
            setIsPlaying(false);
        }
    };

    document.removeEventListener('fullscreenchange', handleFullScreenChange);

    return (
        <div style={{minHeight: '100vh', marginTop: "20px"}}>
            <Content style={{padding: '24px'}}>
                <Row justify="center">
                    <Col xs={24} sm={24} md={20} lg={16} xl={12}>
                        <div style={{textAlign: 'center', marginBottom: '24px'}}>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                background: '#1890ff',
                                marginBottom: '16px'
                            }}>
                                <CameraOutlined style={{fontSize: '32px', color: '#fff'}}/>
                            </div>
                            <Title level={2}>Showcase your beautiful restaurant</Title>
                            <Text type="secondary">Transform your images into beautiful slideshows</Text>
                        </div>

                        <Card>
                            <Upload
                                accept=".jpeg, .png, .jpg"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={() => false}
                            >
                                {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                        </Card>

                        {imageUrls.length > 0 && (
                            <>
                                <Card style={{marginTop: '24px'}}>
                                    <div
                                        ref={containerRef}
                                        style={{
                                            position: 'relative',
                                            width: '100%',
                                            paddingTop: '56.25%',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            background: '#000'
                                        }}
                                    >
                                        <img
                                            ref={currentImageRef}
                                            src={imageUrls[0]}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover'
                                            }}
                                            alt="Current frame"
                                        />
                                        <img
                                            ref={nextImageRef}
                                            src={imageUrls[1] || imageUrls[0]}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                opacity: 0
                                            }}
                                            alt="Next frame"
                                        />
                                    </div>
                                </Card>

                                <Card style={{marginTop: '24px'}}>
                                    <Space direction="vertical" style={{width: '100%'}}>
                                        <Space>
                                            <Button
                                                type="primary"
                                                icon={isPlaying ? <PauseCircleOutlined/> : <PlayCircleOutlined/>}
                                                onClick={handlePlayPause}
                                            >
                                                {isPlaying ? 'Pause' : 'Play'}
                                            </Button>
                                            <Button
                                                icon={<DownloadOutlined/>}
                                                onClick={handleDownload}
                                            >
                                                Download Video
                                            </Button>
                                        </Space>
                                    </Space>
                                </Card>
                            </>
                        )}

                        {previewImage && (
                            <Image
                                style={{display: 'none'}}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
                    </Col>
                </Row>
            </Content>
        </div>
    );
}




