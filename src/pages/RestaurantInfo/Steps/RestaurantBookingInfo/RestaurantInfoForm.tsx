/* eslint-disable @typescript-eslint/no-explicit-any */
import { Col, Row } from "antd";
import { useGetCountryQuery } from "../../../../redux/api/CountryApi/countryApi";
import FormSelectField from "../../../../components/From/FromSelectedField";
import FormInput from "../../../../components/From/FromInput";
import FormMultiSelect from "../../../../components/From/FormMultiSelect";
import FormImageUpload from "../../../../components/From/FormImageUpload";
import { useImageUploadMutation } from "../../../../redux/api/ImageUpload/imageUpload";
import { useGetCuisineQuery } from "../../../../redux/api/Cuisine/cuisine";

const RestaurantInfoForm: React.FC = () => {
    const { data: countries } = useGetCountryQuery({});
    const { data: cuisine } = useGetCuisineQuery({})

    const cuisinesOptions = cuisine?.cuisines?.map((cuisine: any) => ({
        label: cuisine,
        value: cuisine.toLowerCase().replace(/\s+/g, "_"),
    }));

    const [imageUpload] = useImageUploadMutation();

    const handleImageUploadLogo = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const result = await imageUpload(formData).unwrap();
            return result.image_url;

        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };
    const handleImageUploadCover = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const result = await imageUpload(formData).unwrap();
            return result.image_url;

        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };

    return (
        <div style={{ marginBottom: '20px' }}>
            <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="title"
                            label="Restaurant Name"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            type="email"
                            name="email"
                            label="Restaurant Email"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            type="phone"
                            name="phone"
                            label="Phone Number"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="street"
                            label="Street"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="city"
                            label="City"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="zipcode"
                            label="Zipcode"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormSelectField
                            size="large"
                            name="country"
                            options={countries?.map((country: { label: string; value: string }) => ({
                                label: country.label,
                                value: country.value,
                            })) || []}
                            label="Country"
                            placeholder="Select"
                            showSearch
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="identify_address"
                            label="Identify Address"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            type="number"
                            name="number_of_booking_per_day"
                            label="Reservation Per day"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            type="number"
                            name="seat_capacity"
                            label="Seat Capacity"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            type="number"
                            name="average_bill"
                            label="Average Bill"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="currency"
                            label="Currency"
                            size="large"
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormMultiSelect
                            name="cuisine_type"
                            label="Cuisine Type"
                            size="large"
                            options={cuisinesOptions}
                        />
                    </div>
                </Col>
            </Row>
            <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormImageUpload
                            name="logo"
                            label="Restaurant Logo"
                            required
                            maxCount={1}
                            accept="image/*"
                            onUpload={handleImageUploadLogo}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <FormImageUpload
                        name="cover"
                        label="Restaurant Cover Image"
                        required
                        maxCount={1}
                        accept="image/*"
                        onUpload={handleImageUploadCover}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default RestaurantInfoForm;


