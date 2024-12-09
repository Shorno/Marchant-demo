/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from "../../../assets/ubaky_logo.png";
import author from "../../../assets/author-image.jpeg";
import { message } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    ArrowRightOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useUserRegistrationMutation } from "../../../redux/api/Auth/authApi";
import { storeUserInfo } from "../../../services/auth.service";
import "./signup.css";


// Define Form Data Type
interface FormData {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    country: string;
    city: string;
    phone: string;
    password: string;
    password2: string;
}

function Signup() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const { register, handleSubmit, formState: { errors }, control, watch, } = useForm<FormData>();
    const [userRegistration] = useUserRegistrationMutation()

    const onSubmit = async (data: FormData) => {
        console.log("Form Data:", data);
        try {
            const res = await userRegistration(data).unwrap();
            const accessToken = res?.data?.access
            const refreshToken = res?.data?.refresh
            if (res?.data?.access) {
                storeUserInfo({ access:accessToken, refresh:refreshToken });
                navigate("/restaurant-info", { replace: true });
                message.success(res.message);
            }
        } catch (err: any) {
            message.error(err?.message)
        }
    };

    const password = watch("password");



    return (
        <div className="signup-container">
            <div className="left-section">
                <img className="logo" src={logo} alt="logo" />
                <div className="info">
                    <h1 className="left-title">
                        Let’s Setup your Restaurant Portal
                    </h1>
                    <p className="left-paragraph">
                        All-in-one solution for your business in the state. Form
                        a new company from scratch or onboard your existing US
                        company.
                    </p>
                </div>
                <div className="testimonial">
                    <p className="quote">"I barely had to do anything"</p>
                    <p className="description">
                        Love the experience. Got my business set up and all
                        necessary details in about a month and I barely had to
                        do anything. Definitely recommend!
                    </p>
                    <div className="author">
                        <div className="author-info">
                            <span>
                                <img
                                    className="author-image"
                                    src={author}
                                    alt="Author"
                                />
                            </span>
                            <span className="author-name">Khorshed Alom</span>
                        </div>
                        <span className="star1">★ ★ ★ ★ ★</span>
                    </div>
                </div>
                <div className="page-dots">
                    <span className="dot active"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>

            {/* Right side */}
            <div className="right-section">
                <div className="progress-bar">
                </div>
                <div className="signup-info">
                    <h3 className="signup-title">Let’s get started</h3>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="signup-form"
                    >
                        <div className="form-row">
                            <div className="form-item">
                                <label

                                    htmlFor="first-name"
                                >
                                    First Name
                                </label>
                                <input

                                    id="first-name"
                                    type="text"
                                    placeholder="First name"
                                    {...register("first_name", {
                                        required: "First Name is required",
                                    })}
                                />
                                {errors.first_name && (
                                    <span className="error-message">
                                        {errors.first_name.message}
                                    </span>
                                )}
                            </div>
                            <div className="form-item">
                                <label
                                    className="label-title"
                                    htmlFor="last-name"
                                >
                                    Last Name
                                </label>
                                <input

                                    id="last-name"
                                    type="text"
                                    placeholder="Last name"
                                    {...register("last_name", {
                                        required: "Last Name is required",
                                    })}
                                />
                                {errors.last_name && (
                                    <span className="error-message">
                                        {errors.last_name.message}
                                    </span>
                                )}
                            </div>
                            <div className="form-item">
                                <label
                                    className="label-title"
                                    htmlFor="user-name"
                                >
                                    User Name
                                </label>
                                <input

                                    id="user-name"
                                    type="text"
                                    placeholder="user name"
                                    {...register("username", {
                                        required: "user Name is required",
                                    })}
                                />
                                {errors.username && (
                                    <span className="error-message">
                                        {errors.username.message}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="form-item">
                            <label className="label-title" htmlFor="email">
                                Email
                            </label>
                            <input

                                id="email"
                                type="email"
                                placeholder="Email"
                                {...register("email", {
                                    required: "Email field is required",
                                })}
                            />
                            {errors.email && (
                                <span className="error-message">
                                    {errors.email.message}
                                </span>
                            )}
                        </div>
                        <div className="form-row">
                            {/* Country Field */}
                            <div className="form-item">
                                <label
                                    className="label-title"
                                    htmlFor="country"
                                >
                                    Country
                                </label>
                                <select
                                    id="country"
                                    {...register("country", {
                                        required: "Country is required",
                                    })}
                                >
                                    <option value="">Select Country</option>
                                    <option value="USA">USA</option>
                                    <option value="Canada">Canada</option>
                                    <option value="UK">UK</option>
                                </select>
                                {errors.country && (
                                    <span className="error-message">
                                        {errors.country.message}
                                    </span>
                                )}
                            </div>

                            <div className="form-item">
                                <label className="label-title" htmlFor="city">
                                    City
                                </label>
                                <select
                                    id="city"
                                    {...register("city", {
                                        required: "City is required",
                                    })}
                                >
                                    <option value="">Select City</option>
                                    <option value="New York">New York</option>
                                    <option value="Toronto">Toronto</option>
                                    <option value="London">London</option>
                                </select>
                                {errors.city && (
                                    <p className="error-message">
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label
                                className="label-title"
                                htmlFor="phone"
                                id="phone-label"
                            >
                                Phone
                            </label>
                            <Controller
                                name="phone"
                                control={control}
                                rules={{
                                    required: "Phone number is required",
                                    validate: (value: string) =>
                                        value.length >= 10 ||
                                        "Enter a valid phone number",
                                }}
                                render={({ field }) => (
                                    <PhoneInput
                                        {...field}
                                        country={"us"}
                                        inputProps={{
                                            name: "phone",
                                            required: true,
                                            autoFocus: true,
                                        }}
                                        containerClass="phone-input-container"
                                        inputClass="phone-input-field"
                                    />
                                )}
                            />
                            {errors.phone && (
                                <p className="error-message">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        <div className="password-details">
                            <label className="label-title" htmlFor="password">
                                Password
                            </label>
                            <div className="password-input">
                                <input
                                    type={visible ? "text" : "password"}
                                    id="password"
                                    className="password-design"
                                    placeholder="Password"
                                    {...register("password", {
                                        required: "Password is required",
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message:
                                                "Password must include 1 uppercase, 1 lowercase, 1 number, 1 symbol, and at least 8 characters",
                                        },
                                    })}
                                />
                                <span
                                    className="toggle-password-button"
                                    onClick={() => setVisible(!visible)}
                                >
                                    {visible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )}
                                </span>
                            </div>
                            {errors.password && (
                                <p className="error-message">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="password-details">
                            <label
                                className="label-title"
                                htmlFor="password2"
                            >
                                Confirm Password
                            </label>
                            <div className="password-input">
                                <input
                                    type={confirmVisible ? "text" : "password2"}
                                    id="password2"
                                    className="password-design"
                                    placeholder="Confirm Password"
                                    {...register("password2", {
                                        required:
                                            "Confirm Password is required",
                                        validate: (value: string) =>
                                            value === password ||
                                            "Passwords do not match",
                                    })}
                                />
                                <span
                                    className="toggle-password-button"
                                    onClick={() => setConfirmVisible(!confirmVisible)}
                                >
                                    {confirmVisible ? (
                                        <EyeTwoTone />
                                    ) : (
                                        <EyeInvisibleOutlined />
                                    )}
                                </span>
                            </div>
                            {errors.password2 && (
                                <p className="error-message">
                                    {errors.password2.message}
                                </p>
                            )}
                        </div>

                        <button className="submit" type="submit">
                            GET STARTED <ArrowRightOutlined />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
