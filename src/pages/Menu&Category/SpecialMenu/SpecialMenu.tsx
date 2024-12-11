import { useState } from "react";
import {
    Card,
    Input,
    Modal,
    Select,
    Checkbox,
    Upload,
    Image,
    Button,
    // Grid,
} from "antd";
import type { CheckboxProps } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./specialmenu.css";
import { Controller, useForm } from "react-hook-form";
import { usePostSpecialMenuMutation } from "../../../redux/api/Menu/menu";

interface FormData {
    title: string;
    menuDescription: string;
    menuType: string | null;
    menuCategory: string | null;
    sellingType: string[];
    variants: string[];
    images: UploadFile[];
    price: string;
    compareAtPrice: string;
}
// const { useBreakpoint } = Grid;
const SpecialMenu: React.FC = () => {
    // const screens = useBreakpoint();
    // console.log(screens);

    // const isMobile = !screens.lg;

    const [open, setOpen] = useState(false);
    const [editorHtml, setEditorHtml] = useState("");
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: "-4",
            name: "image.png",
            status: "done",
            url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        },
        {
            uid: "-5",
            name: "image.png",
            status: "error",
        },
    ]);
    const [variants, setVariants] = useState<string[]>([""]);
    const [specialMenu, { isLoading }] = usePostSpecialMenuMutation();

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
        setValue,
        trigger,
    } = useForm<FormData>({
        defaultValues: {
            title: "",
            menuDescription: "",
            menuType: null,
            menuCategory: null,
            sellingType: [],
            variants: [],
            images: [],
            price: "",
            compareAtPrice: "",
        },
    });

    const sellingType = watch("sellingType");

    const showModal = () => setOpen(true);

    const handleOk = () => setTimeout(() => setOpen(false), 1000);

    const handleCancel = () => setOpen(false);

    const handleEditorChange = (html: string) => setEditorHtml(html);

    const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const getBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as File);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const addVariant = () => {
        const newVariants = [...variants, ""];
        setVariants(newVariants);
        setValue("variants", newVariants);
    };

    const updateVariant = (index: number, value: string) => {
        const newVariants = [...variants];
        newVariants[index] = value;
        setVariants(newVariants);
        setValue("variants", newVariants);
        trigger("variants");
    };

    // const onSubmit =async (data: FormData) => {
    //     console.log("Form Submitted: ", data);

    // };

    type FormValues = {
        title: string;
        price: string;
    };

    const onSubmit = async (formData: FormValues) => {
    const payload = {
        title: formData.title,
        price: formData.price,
    };

    console.log("Payload being sent:", payload); // Debug the payload

    try {
        const result = await specialMenu(payload).unwrap(); // Unwrap RTK Query response
        console.log("API Success Response:", result);

        setOpen(false); // Close modal
        reset(); // Reset form
    } catch (error: any) {
        console.error("Error posting data:", error?.data || error);
    }
};
    

    const uploadButton = (
        <Button icon={<PlusOutlined />} type="text">
            Upload
        </Button>
    );

    return (
        <div>
            <button className="modal-button" onClick={showModal}>
                Special menu
            </button>
            <Modal
                open={open}
                title="Special menu"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="custom-modal"
                closeIcon={<span>×</span>}
                // width={isMobile && 100 }
                // style={{
                //     marginLeft: `${isMobile ? "0px" : "300px"}`,
                // }}
                width={900}
            >
                <form
                    className="main-content"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {/* Left side content */}
                    <div>
                        {/* //Description  */}
                        <p className="title">Description</p>
                        <Card style={{ width: "100%", marginBottom: "10px" }}>
                            {/* Menu Name */}
                            <label className="label">Menu Name</label>
                            <Controller
                                name="title"
                                control={control}
                                rules={{
                                    required: "Menu Name is required",
                                }}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        className="normal-input"
                                        placeholder="Basic usage"
                                    />
                                )}
                            />
                            {errors.title && (
                                <p className="error-message">
                                    {errors.title.message}
                                </p>
                            )}

                            {/* Menu Description */}
                            <label className="label">Menu Description</label>
                            <div>
                                <Controller
                                    name="menuDescription"
                                    control={control}
                                    rules={{
                                        required:
                                            "Menu Description is required",
                                        validate: (value) =>
                                            (value && value.trim() !== "") ||
                                            "Menu Description cannot be empty",
                                    }}
                                    render={({ field }) => (
                                        <ReactQuill
                                            {...field}
                                            placeholder="Enter menu description"
                                            className="normal-input"
                                            modules={Editor.modules}
                                            formats={Editor.formats}
                                        />
                                    )}
                                />
                                {errors.menuDescription && (
                                    <p className="error-message">
                                        {errors.menuDescription.message}
                                    </p>
                                )}
                            </div>
                        </Card>

                        {/* Category */}
                        <p className="title">Category</p>
                        <Card style={{ width: "100%", marginBottom: "10px" }}>
                            {/* Menu Type */}
                            <div>
                                <label className="label">Menu Type</label>
                                <Controller
                                    name="menuType"
                                    control={control}
                                    rules={{
                                        required: "Menu Type is required",
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select menu type"
                                            options={[
                                                { value: "1", label: "Jack" },
                                                { value: "2", label: "Lucy" },
                                                { value: "3", label: "Tom" },
                                            ]}
                                            style={{ width: "100%" }}
                                            className="custom-select normal-input"
                                        />
                                    )}
                                />
                                {errors.menuType && (
                                    <p className="error-message">
                                        {errors.menuType.message}
                                    </p>
                                )}
                            </div>

                            {/* Menu Category */}
                            <div>
                                <label className="label">Menu Category</label>
                                <Controller
                                    name="menuCategory"
                                    control={control}
                                    rules={{
                                        required: "Menu Category is required",
                                    }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            placeholder="Select menu category"
                                            options={[
                                                { value: "1", label: "Jack" },
                                                { value: "2", label: "Lucy" },
                                                { value: "3", label: "Tom" },
                                            ]}
                                            style={{ width: "100%" }}
                                            className="custom-select normal-input"
                                        />
                                    )}
                                />
                                {errors.menuCategory && (
                                    <p className="error-message">
                                        {errors.menuCategory.message}
                                    </p>
                                )}
                            </div>
                        </Card>

                        {/* Selling type */}
                        <p className="title">Selling Type</p>
                        <Card style={{ width: "100%", marginBottom: "10px" }}>
                            <Controller
                                name="sellingType"
                                control={control}
                                rules={{
                                    validate: (value) =>
                                        value.length > 0 ||
                                        "Please select at least one option",
                                }}
                                render={({ field }) => {
                                    const handleCheckboxChange =
                                        (label) => (e) => {
                                            const isChecked = e.target.checked;
                                            field.onChange(
                                                isChecked
                                                    ? [...field.value, label]
                                                    : field.value.filter(
                                                          (item) =>
                                                              item !== label
                                                      )
                                            );
                                        };

                                    return (
                                        <>
                                            <div>
                                                <Checkbox
                                                    onChange={handleCheckboxChange(
                                                        "Dine-in selling only"
                                                    )}
                                                    checked={field.value.includes(
                                                        "Dine-in selling only"
                                                    )}
                                                >
                                                    Dine-in selling only
                                                </Checkbox>
                                            </div>
                                            <div>
                                                <Checkbox
                                                    style={{
                                                        marginTop: "5px",
                                                        marginBottom: "5px",
                                                    }}
                                                    onChange={handleCheckboxChange(
                                                        "Online selling only"
                                                    )}
                                                    checked={field.value.includes(
                                                        "Online selling only"
                                                    )}
                                                >
                                                    Online selling only
                                                </Checkbox>
                                            </div>
                                            <div>
                                                <Checkbox
                                                    onChange={handleCheckboxChange(
                                                        "Available for both dine-in and online"
                                                    )}
                                                    checked={field.value.includes(
                                                        "Available for both dine-in and online"
                                                    )}
                                                >
                                                    Available for both dine-in
                                                    and online
                                                </Checkbox>
                                            </div>
                                        </>
                                    );
                                }}
                            />
                            {errors.sellingType && (
                                <p className="error-message">
                                    {errors.sellingType.message}
                                </p>
                            )}
                        </Card>

                        {/* Additional Variant */}

                        <p className="title">Additional Variant</p>
                        <div className="menu-variants-container">
                            <label className="menu-variants-label">
                                Menu variants
                            </label>
                            <Controller
                                name="variants"
                                control={control}
                                rules={{
                                    validate: (value) =>
                                        (Array.isArray(value) &&
                                            value.some(
                                                (v) => v.trim() !== ""
                                            )) ||
                                        "Enter at least one non-empty variant",
                                }}
                                render={() => (
                                    <>
                                        <div className="menu-variants-input-container">
                                            <input
                                                type="text"
                                                className="menu-variants-input"
                                                placeholder="Enter variant name"
                                                value={
                                                    variants[
                                                        variants.length - 1
                                                    ]
                                                }
                                                onChange={(e) =>
                                                    updateVariant(
                                                        variants.length - 1,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addVariant();
                                                }}
                                                className="menu-variants-add-button"
                                                type="button"
                                            >
                                                + Add Variants
                                            </button>
                                        </div>
                                        {variants
                                            .slice(0, -1)
                                            .map((variant, index) => (
                                                <input
                                                    key={index}
                                                    type="text"
                                                    className="menu-variants-input"
                                                    placeholder="Enter variant name"
                                                    value={variant}
                                                    onChange={(e) =>
                                                        updateVariant(
                                                            index,
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            ))}
                                        {errors.variants && (
                                            <p className="error-message">
                                                {errors.variants.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    {/* Right side content */}
                    <div>
                        {/* Image */}
                        <p className="title">Menu Images</p>
                        <Card style={{ width: "100%", marginBottom: "10px" }}>
                            {/* React Hook Form Integration */}
                            <Controller
                                name="images"
                                control={control}
                                rules={{
                                    validate: (fileList) =>
                                        fileList.length > 0 ||
                                        "Please upload at least one image.",
                                }}
                                render={({ field }) => (
                                    <>
                                        <Upload
                                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                            listType="picture-card"
                                            fileList={field.value}
                                            onPreview={handlePreview}
                                            onChange={({
                                                fileList: newFileList,
                                            }) => {
                                                field.onChange(newFileList);
                                                setValue("images", newFileList); // Keep RHF and local state in sync
                                            }}
                                        >
                                            {field.value.length >= 8
                                                ? null
                                                : uploadButton}
                                        </Upload>
                                        {errors.images && (
                                            <p
                                                style={{
                                                    color: "red",
                                                    marginTop: "5px",
                                                }}
                                            >
                                                {errors.images.message}
                                            </p>
                                        )}
                                    </>
                                )}
                            />
                            {previewImage && (
                                <Image
                                    wrapperStyle={{ display: "none" }}
                                    preview={{
                                        visible: previewOpen,
                                        onVisibleChange: (visible) =>
                                            setPreviewOpen(visible),
                                        afterOpenChange: (visible) =>
                                            !visible && setPreviewImage(""),
                                    }}
                                    src={previewImage}
                                />
                            )}
                        </Card>

                        {/* Price */}
                        <p className="title">Pricing</p>
                        <Card
                            className="price-card"
                            style={{ width: "100%", marginBottom: "10px" }}
                        >
                            <div className="price-input-group">
                                {/* Price Field */}
                                <div className="price-input-wrapper">
                                    <label className="label">Price</label>
                                    <div className="price-input-container">
                                        <Controller
                                            name="price"
                                            control={control}
                                            rules={{
                                                required: "Price is required",
                                                min: {
                                                    value: 0,
                                                    message:
                                                        "Price cannot be negative",
                                                },
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    prefix="$"
                                                    placeholder=""
                                                    className="price-input"
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                />
                                            )}
                                        />
                                        {errors.price && (
                                            <p style={{ color: "red" }}>
                                                {errors.price.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Compare at Price Field */}
                                <div className="price-input-wrapper">
                                    <label className="label">
                                        Compare at Price
                                    </label>
                                    <div className="price-input-container">
                                        <Controller
                                            name="compareAtPrice"
                                            control={control}
                                            rules={{
                                                required:
                                                    "Compare at Price is required",
                                                min: {
                                                    value: 0,
                                                    message:
                                                        "Compare at Price cannot be negative",
                                                },
                                                validate: (value) => {
                                                    const price = parseFloat(
                                                        watch("price")
                                                    );
                                                    if (value < price) {
                                                        return "Compare at Price cannot be less than Price";
                                                    }
                                                    return true;
                                                },
                                            }}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    prefix="$"
                                                    placeholder=""
                                                    className="price-input"
                                                    type="number"
                                                    min={0}
                                                    step={0.01}
                                                />
                                            )}
                                        />
                                        {errors.compareAtPrice && (
                                            <p style={{ color: "red" }}>
                                                {errors.compareAtPrice.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <div className="button-container">
                            <button className="discard-btn">Discard</button>
                            <div className="action-buttons">
                                <button className="schedule-btn">
                                    Schedule
                                </button>
                                <button
                                    type="submit"
                                    className="add-product-btn"
                                >
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

// Editor component modules and formats
const Editor = {
    modules: {
        toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["clean"],
        ],
        clipboard: {
            matchVisual: false,
        },
    },
    formats: [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
    ],
};

export default SpecialMenu;
