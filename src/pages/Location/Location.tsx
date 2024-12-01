import { useState } from "react";
import GetHelp from "../GetHelp/GetHelp";
import "./location.css";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface FormInputs {
    latitude: string; // Form inputs are strings by default
    longitude: string;
}

const Location: React.FC<{ onNext: () => void }> = ({onNext}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>();

    const [coordinates, setCoordinates] = useState<Coordinates>({
        latitude: 24.8742508, // Default latitude (Naogaon District)
        longitude: 88.4375333, // Default longitude
    });

    const onSubmit: SubmitHandler<FormInputs> = (data) => {
        const lat = parseFloat(data.latitude);
        const lng = parseFloat(data.longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
            setCoordinates({
                latitude: lat,
                longitude: lng,
            });
        } else {
            console.error("Invalid coordinates entered.");
        }
    };

    const mapSrc = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${coordinates.latitude},${coordinates.longitude}&zoom=15`;

    return (
        <div className="main-location">
            <GetHelp />

            <p className="restaurant-title">MAP COORDINATES</p>
            <p className="restaurant-paragraph">
                Enter the latitude and longitude below to find a specific
                location.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-container">
                    <div>
                        <label>
                            Latitude <span className="star">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("latitude", {
                                required: "Latitude is required",
                                pattern: {
                                    value: /^-?\d+(\.\d+)?$/,
                                    message: "Latitude must be a valid number",
                                },
                            })}
                        />
                        {errors.latitude && (
                            <p className="error-message">
                                {errors.latitude.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label>
                            Longitude <span className="star">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("longitude", {
                                required: "Longitude is required",
                                pattern: {
                                    value: /^-?\d+(\.\d+)?$/,
                                    message: "Longitude must be a valid number",
                                },
                            })}
                        />
                        {errors.longitude && (
                            <p className="error-message">
                                {errors.longitude.message}
                            </p>
                        )}
                    </div>
                </div>
                <button className="detect-button" type="submit">
                    Search Location
                </button>
            </form>

            <div>
                <iframe
                    src={mapSrc}
                    width="450"
                    height="450"
                    style={{ border: "0" }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            {/* <BookingButton /> */}
            <div className="form-footer">
                <a href="#" className="previous">   
                    Previous Step
                </a>
                <Button className="button-details"
                 htmlType="submit"
                 onClick={onNext}
                //   href="/restaurant-profile/gallery"
                  >
                    Next <ArrowRightOutlined />
                </Button>
            </div>
        </div>
    );
};

export default Location;
