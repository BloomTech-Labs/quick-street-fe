import React, { useState, useContext } from "react";

import axiosWithAuth from "../../../utils/axiosWithAuth";
import { CustomButton } from "../../index";
import { Context as CartContext } from "../../../contexts/TestCartContext";

// stlyes
import registration from "../../../styles/scss/registration.module.scss";

const CustomerConfirmation = (props) => {
  const { createCart } = useContext(CartContext);
  const { email, password } = props.values;
  const [duplicateEmail, setDuplicateEmail] = useState("");

  const cancel = (event) => {
    event.preventDefault();
    props.previousStep();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const registerObject = {
      email,
      password,
      isVendor: false,
    };
    axiosWithAuth()
      .post("/auth/register", registerObject)
      .then((response) => {
        // console.log('POST CustomerConfirm res: ', response);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", response.data.id);
        localStorage.setItem("isVendor", response.data.isVendor);
        createCart(response.data.id);
        props.history.push(`/browse`);
      })
      .catch((error) => {
        // console.log(error.response);
        // console.log(error.response.data.error);
        setDuplicateEmail(
          `${error.response.data.error} Please go back and change it to register.`
        );
      });
  };

  return (
    <div className={registration.wrapper}>
      <div className={registration.form_step3}>
        <h1>Please confirm your information</h1>
        <div className={registration.confirm_form}>
          <h1>Email</h1>
          <p>{email}</p>
        </div>
        <div className={registration.confirm_form}>
          <h1>Password</h1>
          <p>{password}</p>
        </div>
        {duplicateEmail && (
          <div class={registration.errorMessage}>{duplicateEmail}</div>
        )}

        <div className="vendor_confirmation_div">
          <CustomButton styleClass="green-border" onClick={cancel}>
            Back
          </CustomButton>
          <CustomButton styleClass="green-full" onClick={handleSubmit}>
            Save & Confirm
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CustomerConfirmation;
