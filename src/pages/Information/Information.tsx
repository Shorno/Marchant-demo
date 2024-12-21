import {
    Form,
    Input,
    InputNumber,
    Button,
    Select,
    Upload,
    Checkbox,
    Row,
    Col,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./information.css";
import { useForm, Controller } from "react-hook-form";
import { RcFile } from "antd/lib/upload";

const { TextArea } = Input;
const { Option } = Select;

interface FormInputs {
    title: string;
    email: string;
    phone: string;
    website: string;
    street: string;
    city: string;
    zipcode: string;
    country: string;
    identify_address: string;
    number_of_booking_per_day: number;
    seat_capacity: number;
    average_bill: number;
    currency: string;
    cuisine_type: string[];
    logo: RcFile[];
    cover: RcFile[];
    description: string;
    opening_and_closing_time_remark: string;
    service_type: string[];
    public_transport: string;
    parking_note: string;
    food_order_service: boolean;
    hall_reservation_service: boolean;
    is_agree: boolean;
    selected_time_slots: string[];
}

const Information = () => {
    const timeSlots = {
        morning: [
            "05:00",
            "05:30",
            "06:00",
            "06:30",
            "07:00",
            "07:30",
            "08:00",
            "08:30",
            "09:00",
            "09:30",
            "10:00",
            "10:30",
            "11:00",
            "11:30",
        ],
        lunch: [
            "12:00",
            "12:30",
            "13:00",
            "13:30",
            "14:00",
            "14:30",
            "15:00",
            "15:30",
            "16:00",
            "16:30",
            "17:00",
            "17:30",
            "18:00",
            "18:30",
        ],
        dinner: [
            "19:00",
            "19:30",
            "20:00",
            "20:30",
            "21:00",
            "21:30",
            "22:00",
            "22:30",
            "23:00",
            "23:30",
            "24:00",
        ],
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm<FormInputs>({
        defaultValues: {
            selected_time_slots: [],
            cuisine_type: [],
            service_type: [],
            food_order_service: false,
            hall_reservation_service: false,
            is_agree: false,
        },
    });

    const selectedTimeSlots = watch("selected_time_slots");

    const handleSelectSlot = (time: string) => {
        const currentSlots = [...(selectedTimeSlots || [])];
        const newSlots = currentSlots.includes(time)
            ? currentSlots.filter((slot) => slot !== time)
            : [...currentSlots, time];
        setValue("selected_time_slots", newSlots);
    };

    const onSubmit = (data: FormInputs) => {
        console.log("Submitted values:", data);
    };

    return (
        <Form
            layout="vertical"
            style={{ padding: "10px" }}
            onFinish={handleSubmit(onSubmit)}
        >
            <div className="form-container">
                <Form.Item
                    label="Title"
                    validateStatus={errors.title ? "error" : ""}
                    help={errors.title?.message}
                >
                    <Controller
                        name="title"
                        control={control}
                        rules={{ required: "Please enter the title!" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Email"
                    validateStatus={errors.email ? "error" : ""}
                    help={errors.email?.message}
                >
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Please enter a valid email!",
                            },
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Phone"
                    validateStatus={errors.phone ? "error" : ""}
                    help={errors.phone?.message}
                >
                    <Controller
                        name="phone"
                        control={control}
                        rules={{ required: "Please enter the phone!" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Website"
                    validateStatus={errors.website ? "error" : ""}
                    help={errors.website?.message}
                >
                    <Controller
                        name="website"
                        control={control}
                        rules={{ required: "Please enter Wbsite!" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Street"
                    validateStatus={errors.street ? "error" : ""}
                    help={errors.street?.message}
                >
                    <Controller
                        name="street"
                        control={control}
                        rules={{ required: "Please enter Street!" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="City"
                    validateStatus={errors.city ? "error" : ""}
                    help={errors.city?.message}
                >
                    <Controller
                        name="city"
                        control={control}
                        rules={{ required: "Please enter City!" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Zipcode"
                    validateStatus={errors.zipcode ? "error" : ""}
                    help={errors.zipcode?.message}
                >
                    <Controller
                        name="zipcode"
                        control={control}
                        rules={{ required: "Please enter Zip code!" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Country"
                    validateStatus={errors.country ? "error" : ""}
                    help={errors.country?.message}
                >
                    <Controller
                        name="country"
                        control={control}
                        rules={{ required: "Please enter the country" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Identify Address"
                    validateStatus={errors.identify_address ? "error" : ""}
                    help={errors.identify_address?.message}
                >
                    <Controller
                        name="identify_address"
                        control={control}
                        rules={{
                            required: "Please enter the Identify Address",
                        }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Number of Bookings per Day"
                    validateStatus={
                        errors.number_of_booking_per_day ? "error" : ""
                    }
                    help={errors.number_of_booking_per_day?.message}
                >
                    <Controller
                        name="number_of_booking_per_day"
                        control={control}
                        rules={{
                            required: "Please enter the number of booking",
                        }}
                        render={({ field }) => (
                            <InputNumber style={{ width: "100%", backgroundColor:'#F5F5F5' }} {...field} />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Seat Capacity"
                    validateStatus={errors.seat_capacity ? "error" : ""}
                    help={errors.seat_capacity?.message}
                >
                    <Controller
                        name="seat_capacity"
                        control={control}
                        rules={{ required: "Please enter the Seat capacity" }}
                        render={({ field }) => (
                            <InputNumber style={{ width: "100%",backgroundColor:'#F5F5F5' }} {...field} />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Average Bill"
                    validateStatus={errors.average_bill ? "error" : ""}
                    help={errors.average_bill?.message}
                >
                    <Controller
                        name="average_bill"
                        control={control}
                        rules={{ required: "Please enter the average bill" }}
                        render={({ field }) => (
                            <InputNumber style={{ width: "100%",backgroundColor:'#F5F5F5' }} {...field} />
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Currency"
                    className="half-width"
                    validateStatus={errors.currency ? "error" : ""}
                    help={errors.currency?.message}
                >
                    <Controller
                        name="currency"
                        control={control}
                        rules={{ required: "Please enter the Currency" }}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Cuisine Type"
                    className="half-width"
                    validateStatus={errors.cuisine_type ? "error" : ""}
                    help={errors.cuisine_type?.message}
                >
                    <Controller
                        name="cuisine_type"
                        control={control}
                        rules={{ required: "Please enter the Cuisine type" }}
                        render={({ field }) => (
                            <Select {...field} mode="multiple" allowClear
                            style={{ backgroundColor: '#F5F5F5', borderColor: '#ff7f0e' }}
                            >
                                <Option value="Americano">Americano</Option>
                                <Option value="Italian">Italian</Option>
                                <Option value="Chinese">Chinese</Option>
                            </Select>
                        )}
                    />
                </Form.Item>
            </div>

            <div className="upload-container">
                <Form.Item
                    label="Logo"
                    className="upload-item"
                    validateStatus={errors.logo ? "error" : ""}
                    help={errors.logo?.message}
                >
                    <Controller
                        name="logo"
                        control={control}
                        rules={{ required: "Logo is required!" }}
                        render={({ field }) => (
                            <Upload
                                {...field}
                                beforeUpload={() => false}
                                fileList={field.value || []}
                                onChange={({ fileList }) =>
                                    field.onChange(fileList)
                                }
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload Logo
                                </Button>
                            </Upload>
                        )}
                    />
                </Form.Item>

                <Form.Item
                    label="Cover"
                    className="upload-item"
                    validateStatus={errors.cover ? "error" : ""}
                    help={errors.cover?.message}
                >
                    <Controller
                        name="cover"
                        control={control}
                        rules={{ required: "Cover image is required!" }}
                        render={({ field }) => (
                            <Upload
                                {...field}
                                beforeUpload={() => false} // Prevent automatic upload
                                fileList={field.value || []} // Ensure fileList is always an array
                                onChange={({ fileList }) =>
                                    field.onChange(fileList)
                                } // Update field value with fileList
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload Cover
                                </Button>
                            </Upload>
                        )}
                    />
                </Form.Item>
            </div>

            <p className="title">Slot</p>
            <div className="time-slots-container">
                {Object.entries(timeSlots).map(([slotType, times]) => (
                    <div key={slotType} className="time-slot-section">
                        <h4 className="time-slot-title">
                            {slotType.charAt(0).toUpperCase() +
                                slotType.slice(1)}{" "}
                            Time
                        </h4>
                        <Row gutter={[16, 16]} className="time-buttons-row">
                            {times.map((time) => (
                                <Col
                                    key={time}
                                    xs={8}
                                    sm={6}
                                    md={4}
                                    lg={3}
                                    xl={2}
                                >
                                    <Button
                                        className={`time-button ${
                                            selectedTimeSlots?.includes(time)
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() => handleSelectSlot(time)}
                                    >
                                        {time}
                                    </Button>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </div>

            <div className="textarea-container">
                <Form.Item label="Description" className="textarea-item">
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => <TextArea rows={4} {...field} />}
                    />
                </Form.Item>

                <Form.Item
                    label="Opening and Closing Time Remark"
                    className="textarea-item"
                >
                    <Controller
                        name="opening_and_closing_time_remark"
                        control={control}
                        render={({ field }) => <TextArea rows={4} {...field} />}
                    />
                </Form.Item>
            </div>

            <div className="form-row">
                <Form.Item label="Service Type" className="form-item">
                    <Controller
                        name="service_type"
                        control={control}
                        render={({ field }) => (
                            <Select {...field} mode="multiple" allowClear>
                                <Option value="Mastercard">Mastercard</Option>
                                <Option value="Visa">Visa</Option>
                            </Select>
                        )}
                    />
                </Form.Item>

                <Form.Item label="Public Transport" className="form-item">
                    <Controller
                        name="public_transport"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>

                <Form.Item label="Parking Note" className="form-item">
                    <Controller
                        name="parking_note"
                        control={control}
                        render={({ field }) => <Input {...field} />}
                    />
                </Form.Item>
            </div>

            <div className="service">
                <Form.Item>
                    <Controller
                        name="food_order_service"
                        control={control}
                        render={({ field }) => (
                            <Checkbox {...field}>Food Order Service</Checkbox>
                        )}
                    />
                </Form.Item>

                <Form.Item style={{marginTop:'-20px'}}>
                    <Controller
                        name="hall_reservation_service"
                        control={control}
                        render={({ field }) => (
                            <Checkbox {...field}>
                                Hall Reservation Service
                            </Checkbox>
                        )}
                    />
                </Form.Item>
            </div>

            <Form.Item
                validateStatus={errors.is_agree ? "error" : ""}
                help={errors.is_agree?.message}
            >
                <Controller
                    name="is_agree"
                    control={control}
                    rules={{
                        required: "You must agree to the terms!",
                    }}
                    render={({ field }) => (
                        <Checkbox {...field}>I agree to the terms</Checkbox>
                    )}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Information;
