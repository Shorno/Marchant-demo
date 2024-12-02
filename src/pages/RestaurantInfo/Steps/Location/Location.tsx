import { useState } from "react";
// import BookingButton from "../../components/RestaurantBookingButton/BookingButton";
import GetHelp from "../GetHelp/GetHelp";
import "./location.css";
import { useForm, SubmitHandler } from "react-hook-form";

interface Coordinates {
    latitude: number;
    longitude: number;
}

interface FormInputs {
    latitude: string; // Form inputs are strings by default
    longitude: string;
}

const Location = () => {
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

    const mapSrc = `https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=${coordinates.latitude ?? 0},${coordinates.longitude ?? 0}&zoom=15`;

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
                    <div>
                        <button className="detect-button" type="submit">
                            Search Location
                        </button>
                    </div>
                </div>

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
        </div>
    );
};

export default Location;
