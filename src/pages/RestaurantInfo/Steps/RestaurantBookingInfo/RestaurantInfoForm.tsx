/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import { Col, Row } from "antd";
// import { useGetCountryQuery } from "../../../../redux/api/CountryApi/countryApi";
// import FormSelectField from "../../../../components/From/FromSelectedField";
// import FormInput from "../../../../components/From/FromInput";
// import FormMultiSelect from "../../../../components/From/FormMultiSelect";
// import { selectCuisines } from "../../../../constants/selectCuisines";
// import { useImageUploadMutation } from "../../../../redux/api/ImageUpload/imageUpload";


// const RestaurantInfoForm = () => {
//     const { data: countries } = useGetCountryQuery({});
//     const [imageupload] = useImageUploadMutation();



//     return (
//         <div style={{ marginBottom: '20px' }}>
//             <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
//                 {/* name */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="title"
//                             label="Restaurant Name"
//                             size="large"
//                             validation={{
//                                 required: "Restaurant name is required",
//                             }}
//                         />
//                     </div>
//                 </Col>
//                 {/* email */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="email"
//                             label="Restaurant Email"
//                             size="large"
//                             validation={{
//                                 required: "Restaurant email is required",
//                             }}
//                         />
//                     </div>
//                 </Col>
//                 {/* phone */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="phone"
//                             label="Phone Number"
//                             size="large"
//                             validation={{
//                                 required: "Restaurant Phone Number is required",
//                             }}
//                         />
//                     </div>
//                 </Col>
//                 {/* street */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="street"
//                             label="street"
//                             size="large"
//                             validation={{
//                                 required: "street is required",
//                             }}
//                         />
//                     </div>
//                 </Col>
//                 {/* city */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="city"
//                             label="city"
//                             size="large"
//                             validation={{
//                                 required: "city is required",
//                             }}
//                         />
//                     </div>
//                 </Col>
//                 {/* street */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="zipcode"
//                             label="zipcode"
//                             size="large"
//                             validation={{
//                                 required: "zipcode is required",
//                             }}
//                         />
//                     </div>
//                 </Col>

//                 {/* country*/}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormSelectField
//                             size="large"
//                             name="country"
//                             options={countries?.map((country: { label: string; value: string }) => ({
//                                 label: country.label,
//                                 value: country.value,
//                             })) || []}
//                             label="Country"
//                             placeholder="Select"
//                             showSearch
//                             filterOption={(input, option) =>
//                                 (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
//                             }
//                             validation={{
//                                 required: "Country is required",
//                             }}
//                         />
//                     </div>
//                 </Col>

//                 {/* identify_address */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="identify_address"
//                             label="Identify Address"
//                             size="large"
//                             validation={{
//                                 required: "Identify address is required",
//                             }}
//                         />
//                     </div>
//                 </Col>
//                 {/* number_of_booking_per_day */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="number_of_booking_per_day"
//                             label="Reservation Per day"
//                             size="large"
//                             validation={{
//                                 required: "Reservation Per day is required",
//                             }}
//                         />
//                     </div>
//                 </Col>

//                 {/* seat_capacity */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="seat_capacity"
//                             label="seat capacity "
//                             size="large"
//                             validation={{
//                                 required: "seat capacity is required",
//                             }}
//                         />
//                     </div>
//                 </Col>

//                 {/* average_bill */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="average_bill"
//                             label="Average Bill "
//                             size="large"
//                             validation={{
//                                 required: "Average Bill is required",
//                             }}
//                         />
//                     </div>
//                 </Col>
//                 {/* currency */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormInput
//                             name="currency"
//                             label="currency"
//                             size="large"
//                             validation={{
//                                 required: "currency is required",
//                             }}
//                         />
//                     </div>
//                 </Col>

//                 {/* cuisine_type */}
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         <FormMultiSelect
//                             name="cuisine_type"
//                             label="Cuisine Type"
//                             size="large"
//                             validation={{
//                                 required: "Cuisine type is required",
//                             }}
//                             options={selectCuisines}
//                         />

//                     </div>
//                 </Col>
//             </Row>
//             <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                       {/* use image upload   for logo  */}
//                     </div>
//                 </Col>
//                 <Col span={12}>
//                     <div style={{ margin: "10px 0" }}>
//                         {/* use image upload   for logo  cover  */}
//                     </div>
//                 </Col>
//             </Row>
//         </div>
//     );
// };

// export default RestaurantInfoForm;



import { Col, Row } from "antd";
import { useGetCountryQuery } from "../../../../redux/api/CountryApi/countryApi";
import FormSelectField from "../../../../components/From/FromSelectedField";
import FormInput from "../../../../components/From/FromInput";
import FormMultiSelect from "../../../../components/From/FormMultiSelect";
import FormImageUpload from "../../../../components/From/FormImageUpload";
import { selectCuisines } from "../../../../constants/selectCuisines";
import { useImageUploadMutation } from "../../../../redux/api/ImageUpload/imageUpload";

const RestaurantInfoForm: React.FC = () => {
    const { data: countries } = useGetCountryQuery({});
    const [imageUpload] = useImageUploadMutation();

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const result = await imageUpload(formData).unwrap();
            console.log(result) 
            console.log(result.image_url)
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
                            validation={{
                                required: "Restaurant name is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="email"
                            label="Restaurant Email"
                            size="large"
                            validation={{
                                required: "Restaurant email is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="phone"
                            label="Phone Number"
                            size="large"
                            validation={{
                                required: "Restaurant Phone Number is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="street"
                            label="Street"
                            size="large"
                            validation={{
                                required: "Street is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="city"
                            label="City"
                            size="large"
                            validation={{
                                required: "City is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="zipcode"
                            label="Zipcode"
                            size="large"
                            validation={{
                                required: "Zipcode is required",
                            }}
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
                            validation={{
                                required: "Country is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="identify_address"
                            label="Identify Address"
                            size="large"
                            validation={{
                                required: "Identify address is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="number_of_booking_per_day"
                            label="Reservation Per day"
                            size="large"
                            validation={{
                                required: "Reservation Per day is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="seat_capacity"
                            label="Seat Capacity"
                            size="large"
                            validation={{
                                required: "Seat capacity is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="average_bill"
                            label="Average Bill"
                            size="large"
                            validation={{
                                required: "Average Bill is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormInput
                            name="currency"
                            label="Currency"
                            size="large"
                            validation={{
                                required: "Currency is required",
                            }}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormMultiSelect
                            name="cuisine_type"
                            label="Cuisine Type"
                            size="large"
                            validation={{
                                required: "Cuisine type is required",
                            }}
                            options={selectCuisines}
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
                            validation={{
                                required: "Restaurant logo is required",
                            }}
                            maxCount={1}
                            accept="image/*"
                            onUpload={handleImageUpload}
                        />
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{ margin: "10px 0" }}>
                        <FormImageUpload
                            name="cover"
                            label="Restaurant Cover Image"
                            required
                            validation={{
                                required: "Restaurant cover image is required",
                            }}
                            maxCount={1}
                            accept="image/*"
                            onUpload={handleImageUpload}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default RestaurantInfoForm;


