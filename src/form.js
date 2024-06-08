import React from "react";
import data from "./data.json"; // Ensure your JSON data structure supports this usage.
import "./form.css";

const emailValidator = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
const phoneValidator = /^\d{10}$/; // Assuming phone number should be exactly 10 digits.

class FormComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      username: "",
      emailAddress: "",
      password: "",
      showPassword: false,
      phoneNo: "",
      countryCode: "", 
      country: "",
      city: "",
      panNo: "",
      aadharNo: "",
      errors: {},
      isFormSubmitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === "country") {
      this.setState({ city: "" });
    }
  }

  handleBlur(event) {
    const { name } = event.target;
    this.validateField(name);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formFields = [
      "firstName",
      "lastName",
      "username",
      "emailAddress",
      "password",
      "phoneNo",
      "countryCode",
      "country",
      "city",
      "panNo",
      "aadharNo",
    ];
    let isValid = true;

    formFields.forEach((field) => {
      isValid = this.validateField(field) && isValid;
    });

    if (isValid) {
      this.setState({ isFormSubmitted: true });
    }
  }

  validateField(name) {
    let error = "";
    const value = this.state[name];
    const { errors } = this.state;

    if (value.trim() === "") {
      error = `${
        name.charAt(0).toUpperCase() +
        name
          .slice(1)
          .replace(/([A-Z])/g, " $1")
          .trim()
      } is required`;
    } else if (name === "emailAddress" && !emailValidator.test(value)) {
      error = "Invalid email address";
    } else if (name === "password" && !passwordValidator.test(value)) {
      error =
        "Password must contain minimum 8 characters, at least one letter and one number!";
    } else if (name === "phoneNo" && !phoneValidator.test(value)) {
      error = "Phone number must be 10 digits";
    }

    this.setState({ errors: { ...errors, [name]: error } });
    return !error;
  }

  togglePasswordVisibility() {
    this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
  }

  renderInput(name, label, type = "text") {
    return (
      <div>
        <label>{label}:</label>
        <input
          type={type}
          placeholder={label}
          name={name}
          value={this.state[name]}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          autoComplete="off"
        />
        {this.state.errors[name] && (
          <div className="errorMsg">{this.state.errors[name]}</div>
        )}
      </div>
    );
  }

  renderSelect(name, label, options) {
    return (
      <div>
        <label>{label}:</label>
        <select
          name={name}
          value={this.state[name]}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
        >
          <option value="">Select a {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {this.state.errors[name] && (
          <div className="errorMsg">{this.state.errors[name]}</div>
        )}
      </div>
    );
  }

  render() {
    const {
      firstName,
      lastName,
      username,
      emailAddress,
      password,
      showPassword,
      phoneNo,
      countryCode,
      country,
      city,
      panNo,
      aadharNo,
      errors,
      isFormSubmitted,
    } = this.state;

    return (
      <div className="main">
        <h3>SignUp Form</h3>
        {isFormSubmitted ? (
          <div className="details">
            <h3>Thanks for signing up, find your details below:</h3>
            <div>First Name: {firstName}</div>
            <div>Last Name: {lastName}</div>
            <div>Username: {username}</div>
            <div>Email Address: {emailAddress}</div>
            <div>
              Phone No: {countryCode} {phoneNo}
            </div>
            <div>Country: {country}</div>
            <div>City: {city}</div>
            <div>PAN No: {panNo}</div>
            <div>Aadhar No: {aadharNo}</div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput("firstName", "First Name")}
              {this.renderInput("lastName", "Last Name")}
              {this.renderInput("username", "Username")}
              {this.renderInput("emailAddress", "Email Address", "email")}
              {this.renderInput(
                "password",
                "Password",
                showPassword ? "text" : "password"
              )}
              <button type="button" onClick={this.togglePasswordVisibility}>
                {showPassword ? "Hide" : "Show"} Password
              </button>
              {this.renderInput("countryCode", "Country Code")}
              {this.renderInput("phoneNo", "Phone No")}
              {this.renderSelect(
                "country",
                "Country",
                data.countries.map((country) => country.name)
              )}
              {this.renderSelect(
                "city",
                "City",
                country
                  ? data.countries.find((c) => c.name === country).cities
                  : []
              )}
              {this.renderInput("panNo", "PAN No")}
              {this.renderInput("aadharNo", "Aadhar No")}
              <button type="submit">Signup</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default FormComponent;
