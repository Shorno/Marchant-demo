import "./signup.css";
import logo from "../../assets/ubaky_logo.png";
import author from "../../assets/author-image.jpeg";
import type { StepsProps } from "antd";
import { Popover, Steps } from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";

function Signup() {
    const customDot = (dot, { status, index }) => (
        <Popover
            content={
                <span>
                    step {index} status: {status}
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

                    <form className="signup-form">
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
                                />
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
                                />
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
                            />
                        </div>
                        <div className="form-row">
                            <div className="form-item">
                                <label
                                    className="label-title"
                                    htmlFor="country"
                                >
                                    Country
                                </label>
                                <select id="country">
                                    <option>Country</option>
                                </select>
                            </div>
                            <div className="form-item">
                                <label className="label-title" htmlFor="city">
                                    City
                                </label>
                                <select id="city">
                                    <option>City</option>
                                </select>
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
                            <PhoneInput
                                country={"us"}
                                inputProps={{
                                    name: "phone",
                                    required: true,
                                    autoFocus: true,
                                }}
                                containerClass="phone-input-container"
                                inputClass="phone-input-field"
                            />
                        </div>
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
                        </div>

                        <div>
                            <label className="label-title" htmlFor="password">
                                Confirm Password
                            </label>
                            <div className="password-input">
                                <input
                                    type={visible ? "text" : "password"}
                                    id="confirm-password"
                                    className="password-design"
                                    placeholder="Confirm Password"
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
                        </div>

                        <button className="submit" type="submit">
                            GET STARTED →
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
