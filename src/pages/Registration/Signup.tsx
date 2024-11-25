import "./signup.css";
import logo from "../../assets/ubaky_logo.png";
import author from "../../assets/author-image.jpeg";
import { Popover, Steps } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useState } from "react";
import type { StepsProps } from "antd";
import { Controller, useForm } from "react-hook-form";
import { ArrowRightOutlined } from '@ant-design/icons';


function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        watch
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    const password = watch("password")
    const customDot: StepsProps["progressDot"] = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    Step {index + 1} status: {status}
                </span>
            }
        >
            {dot}
        </Popover>
    );

    const [visible, setVisible] = useState(false);

    return (
        <div className="signup-container">
            <div className="left-section">
                <img className="logo" src={logo} alt="logo" />
                <div className="info">
                    <h1 className="left-title">
                        Let’s Setup your Restaurant Portal
                    </h1>
                    <p className="left-paragraph">
                        All-in-one solution to for your business in the state.
                        Form a new company from scratch or onboard your existing
                        US company.
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
                                    alt=""
                                />
                            </span>
                            <span className="author-name">Catherine Johns</span>
                        </div>
                        <span className="star">★ ★ ★ ★ ★</span>
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
                    <Steps
                        className=""
                        current={1}
                        direction="horizontal"
                        labelPlacement="horizontal"
                        progressDot={customDot}
                        items={[{}, {}, {}, {}]}
                    />
                </div>
                <div className="signup-info">
                    <h1 className="signup-title">Let’s get stated</h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="signup-form"
                    >
                        <div className="form-row">
                            <div className="form-item">
                                <label
                                    className="label-title "
                                    htmlFor="first-name"
                                >
                                    First Name
                                </label>
                                <input
                                    id="first-name"
                                    type="text"
                                    placeholder="First name"
                                    {...register("first_name", {
                                        required: true,
                                    })}
                                />
                                {errors.first_name && (
                                    <span className="error-message">
                                        First Name is required
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
                                        required: true,
                                    })}
                                />
                                {errors.last_name && (
                                    <span className="error-message">
                                        Last Name is required
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
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <span className="error-message">
                                    Email field is required
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
                                        Please select a Country
                                    </span>
                                )}
                            </div>

                            {/* City Field */}
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
                                        {/* {errors.city.message} */}
                                        Please select a City
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Phone */}
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
                                    validate: (value) =>
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
                                    Enter a valid phone number
                                </p>
                            )}
                        </div>
                        
                        {/* Password */}
                        <div>
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
                                    Password must include one
                                    uppercase,lowercase,number,symbol, and at
                                    least 8 characters
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label
                                className="label-title"
                                htmlFor="confirm-password"
                            >
                                Confirm Password
                            </label>
                            <div className="password-input">
                                <input
                                    type={visible ? "text" : "password"}
                                    id="confirm-password"
                                    className="password-design"
                                    placeholder="Confirm Password"
                                    {...register("confirmPassword", {
                                        required:
                                            "Confirm Password is required",
                                        validate: (value) =>
                                            value === password ||
                                            "Passwords do not match",
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
                            {errors.confirmPassword && (
                                <p className="error-message">
                                    {errors.confirmPassword.message}
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
