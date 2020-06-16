import React, { useState, useEffect } from "react";
import editingProduct from "../../../styles/scss/vendor/editingProduct.module.scss";
import axiosWithAuth from "../../../utils/axiosWithAuth";

const EditProductForm = (props) => {
  const {
    product,
    setProduct,
    submitProductDetails,
    setEditingDetails,
  } = props; // removed , showEditProduct, reloadProducts, setReloadProducts
  // this state is for pre selecting checkboxes
  const [dietsOnFile, setDietsOnFile] = useState([]);
  // const [unitOnFile, setUnitOnFile] = useState([]);
  console.log("product.diet: ", product.diet);
  console.log("dietsOnFile", dietsOnFile);

  useEffect(() => {
    setDietsOnFile(product.diet);
  }, [product]);

  const updateVendorDiets = (diets) => {
    const vendorId = localStorage.getItem("user_id");
    console.log("updateVendorDiets() diets", diets);
    axiosWithAuth()
      .put(`/vendors/${vendorId}`, { diet_categories: diets })
      .then((results) => {
        console.log("PUT EditProd.Form updateVendorDiets()", results);
      })
      .catch((error) => console.log(error));
  };

  const handleChanges = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelect = (e) => {
    if (e.target.checked) {
      console.log("Checked!", e.target.checked);
      if (product.diet.indexOf(e.target.value) === -1) {
        const updatedProduct = {
          ...product,
          [e.target.name]: [...product[e.target.name], e.target.value],
        };
        console.log("UPDATED DIETS", updatedProduct.diet);
        console.log("NOTHING HERE WITH VALUE: ", e.target.value);
        console.log("ADDING: ", e.target.value);
        setProduct({
          ...product,
          [e.target.name]: [...product[e.target.name], e.target.value],
        });
        //update the Vendor diet_categories on backend.
        updateVendorDiets(updatedProduct.diet);
      } else {
        console.log("ALREADY GOT THAT!");
      }
    }

    if (!e.target.checked) {
      if (product.diet.indexOf(e.target.value) !== -1) {
        console.log("REMOVING VALUE: ", e.target.value);
        let newArray = product.diet.filter((item) => {
          return item !== e.target.value;
        });
        console.log("NEW ARRAY WILL BE: ", newArray);
        setProduct({
          ...product,
          [e.target.name]: newArray,
        });
        //update the Vendor diet_categories on backend.
        updateVendorDiets(newArray);
      } else {
        console.log(`${e.target.value} NOT HERE ANYWAY!`);
      }
    }
  };

  const discardChanges = () => {
    axiosWithAuth()
      .get(`/products/${product.id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={editingProduct.edit_product_form_container}>
      <div className={editingProduct.edit_form_inner_container}>
        <form className={editingProduct.edit_product_form}>
          <div className={editingProduct.input_wrapper}>
            <label htmlFor="name">Product Name: </label>
            <input
              onChange={handleChanges}
              type="text"
              name="name"
              value={product.name}
            />
          </div>
          <div className={editingProduct.input_wrapper}>
            <label htmlFor="description">Product Description: </label>
            <textarea
              onChange={handleChanges}
              type="text"
              name="description"
              value={product.description}
            />
          </div>
          {/* CHECKBOX PROD. CATEGORY */}
          <div
            id={editingProduct.checkbox_container}
            className={editingProduct.input_wrapper}
          >
            <div className={`form-check ${editingProduct.checkbox_wrapper}`}>
              {" "}
              <label htmlFor="name">Diet Categories: </label>
              <div>
                <label
                  className={`form-check-label ${editingProduct.checkbox_label}`}
                  for="defaultCheck1"
                >
                  Gluten Free
                </label>
                <input
                  checked={
                    dietsOnFile && dietsOnFile.indexOf("Gluten Free") !== -1
                      ? true
                      : false
                  }
                  onChange={handleSelect}
                  className={`form-check-input ${editingProduct.checkbox_input}`}
                  name="diet"
                  type="checkbox"
                  value="Gluten Free"
                />
              </div>
              <div>
                <label
                  className={`form-check-label ${editingProduct.checkbox_label}`}
                  for="defaultCheck1"
                >
                  Vegetarian
                </label>
                <input
                  checked={
                    dietsOnFile && dietsOnFile.indexOf("Vegetarian") !== -1
                      ? true
                      : false
                  }
                  onChange={handleSelect}
                  className={`form-check-input ${editingProduct.checkbox_input}`}
                  name="diet"
                  type="checkbox"
                  value="Vegetarian"
                />
              </div>
              <div>
                <label
                  className={`form-check-label ${editingProduct.checkbox_label}`}
                  for="defaultCheck1"
                >
                  Vegan
                </label>
                <input
                  checked={
                    dietsOnFile && dietsOnFile.indexOf("Vegan") !== -1
                      ? true
                      : false
                  }
                  onChange={handleSelect}
                  className={`form-check-input ${editingProduct.checkbox_input}`}
                  name="diet"
                  type="checkbox"
                  value="Vegan"
                />
              </div>
              <div>
                <label
                  className={`form-check-label ${editingProduct.checkbox_label}`}
                  for="defaultCheck1"
                >
                  Keto
                </label>
                <input
                  checked={
                    dietsOnFile && dietsOnFile.indexOf("Keto") !== -1
                      ? true
                      : false
                  }
                  onChange={handleSelect}
                  className={`form-check-input ${editingProduct.checkbox_input}`}
                  name="diet"
                  type="checkbox"
                  value="Keto"
                />
              </div>
              <div>
                <label
                  className={`form-check-label ${editingProduct.checkbox_label}`}
                  for="defaultCheck1"
                >
                  Dairy Free
                </label>
                <input
                  checked={
                    dietsOnFile && dietsOnFile.indexOf("Dairy Free") !== -1
                      ? true
                      : false
                  }
                  onChange={handleSelect}
                  className={`form-check-input ${editingProduct.checkbox_input}`}
                  name="diet"
                  type="checkbox"
                  value="Dairy Free"
                />
              </div>
            </div>
          </div>
          {/* END Checkboxes */}
          <div className={editingProduct.input_wrapper}>
            <label htmlFor="price">$ Price: </label>
            <input
              onChange={handleChanges}
              type="number"
              name="price"
              value={product.price}
            />
          </div>
          <div className={editingProduct.input_wrapper}>
            <label htmlFor="unit">Unit: </label>
            <select
              onChange={handleChanges}
              name="unit"
              type="text"
              class="custom-select custom-select-lg mb-3"
            >
              <option selected>Choose Unit</option>
              <option value="lb">lb</option>
              <option value="dozen">dozen</option>
              <option value="1/2 dozen">1/2 dozen</option>
              <option value="oz">oz</option>
              <option value="gram">gram</option>
              <option value="jar">jar</option>
              <option value="case">case</option>
              <option value="box">box</option>
              <option value="crate">crate</option>
            </select>
            <label htmlFor="">...or write in your own unit: </label>
            <input
              onChange={handleChanges}
              name="unit"
              type="text"
              placeholder={"Write unit"}
            />
          </div>
        </form>

        <div className={editingProduct.commit_discard_btns}>
          <h4
            className={editingProduct.commit_changes_btn}
            onClick={() => {
              submitProductDetails();
              setEditingDetails(false);
            }}
          >
            <i className="fa fa-check-circle" /> Commit Changes
          </h4>
          <h4
            className={editingProduct.discard_changes_btn}
            onClick={() => {
              discardChanges();
              setEditingDetails(false);
            }}
          >
            <i className="fa fa-long-arrow-right"></i>Discard Changes
          </h4>
        </div>
      </div>
    </div>
  );
};

export default EditProductForm;
