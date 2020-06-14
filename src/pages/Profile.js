import React, { useState, useEffect } from "react";
import {
  About,
  VendorProducts,
  Bulletin,
  BannerUploader,
  Nav,
} from "../components/index";
import { Placeholder } from "../assets/images/index";
//Styles
import profile from "../styles/scss/vendor/a_vendors_profile.module.scss";
import banner from "../styles/scss/vendor/a_vendors_banner.module.scss";
//Font awesom
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSave, faPen } from '@fortawesome/free-solid-svg-icons';
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import axiosWithAuth from "../utils/axiosWithAuth";
import Footer from "../components/shared/Footer";
import browse from "../styles/scss/browse.module.scss";

const Profile = (props) => {
  // It all starts here!...with vendorId from localStorage
  const [vendorId] = useState(localStorage.getItem("user_id")); // removed setVendorId from const
  const [vendorInfo, setVendorInfo] = useState({
    location: {
      zipcode: "18641",
    },
  });
  const [bannerInfo, setBannerInfo] = useState("no_banner.jpg");
  const [products, setProducts] = useState([]);
  // const [productImagesIds, setProductImagesIds] = useState([]);

  // Booleans

  const [editingName, setEditingName] = useState(false);
  // bool for reloading products after product update.
  const [reloadProducts, setReloadProducts] = useState(false);
  const [editAbout, setEditAbout] = useState(false);
  // const [editBusinessName, setEditBusinessName] = useState(false);
  //console.log('Profile.js vendorInfo: ', vendorInfo);

  useEffect(() => {
    //console.log('USEEFFECT 1 Profile.js');
    axiosWithAuth()
      .get(`/vendors/${vendorId}`)
      .then((response) => {
        console.log("Here is the response data", response.data);
        setVendorInfo(response.data);
        /* setBannerInfo(vendorInfo.data.data.vendor_banner); */
        console.log(
          "GET useEffect Profile.js setVendorInfo(response)",
          response
        );
      })
      .catch((error) => {
        console.log("ERROR Profile.js GET vendors/:vendorId error: ", error);
      });
  }, [vendorId]);

  useEffect(() => {
    //console.log('USEEFFECT 2 Profile.js');
    axiosWithAuth()
      .get(`/vendors/${vendorId}/products`)
      .then((response) => {
        console.log(
          "GET Profile.js /vendors/:vendorId/products response",
          response
        );
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(
          "ERROR Profile.js GET fetchProducts() vendors/:vendorId/products error: ",
          error
        );
      });
  }, [vendorId, reloadProducts, setReloadProducts]);

  // const editName = () => {
  //   setEditBusinessName(!editBusinessName);
  // };

  const saveName = () => {
    axiosWithAuth()
      .put(
        `https://quickstlabs.herokuapp.com/api/v1.0/vendors/${vendorId}`,
        vendorInfo
      )
      .then((res) => {
        // console.log(`update vendor info`, res);
        setVendorInfo(res.data.data);
      })
      .catch((err) => {
        console.log("ERROR PUT SAVE NAME", err);
      });
  };

  const editProfile = () => {
    // console.log(`edit profile clicked`);
    setEditAbout(!editAbout);
  };

  const saveProfile = (e) => {
    if (e) {
      e.preventDefault();
    }

    //console.log('SAVE PROFILE vendorInfo', vendorInfo);
    axiosWithAuth()
      .put(
        `https://quickstlabs.herokuapp.com/api/v1.0/vendors/${vendorId}`,
        vendorInfo
      )
      .then((res) => {
        console.log(`Profile.js saveProfile()`, res);
        setVendorInfo(res.data.data);
      })
      .catch((err) => {
        console.log("VendorProf. PUT error ", err);
      });
  };

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#00B2ED" }} className={browse.temp_menu}>
        <Nav />
      </div>
      <div className={profile.profile_container}>
        <div className={`${profile.wrapper} ${banner.banner_wrapper}`}>
          <div
            className={`${profile.inner_container} ${banner.inner_banner_container}`}
          >
            <div className={banner.banner_text_btns}>
              <div className={banner.vendor_header_name}>
                {editingName ? ( // <<<<<<<<<< turnary ?
                  <React.Fragment>
                    <input
                      className={banner.business_name_input}
                      onChange={(e) => {
                        if (editingName) {
                          setVendorInfo({
                            ...vendorInfo,
                            business_name: e.target.value,
                          });
                        }
                      }}
                      value={vendorInfo.business_name}
                    />
                    <div
                      className={banner.edit_guides}
                      onClick={() => {
                        setEditingName(false);
                        saveName();
                        console.log("CLICKED");
                      }}
                    >
                      <p className={`${banner.save_changes}`}>
                        <i className="fa fa-save"></i>&nbsp; save
                      </p>
                    </div>
                  </React.Fragment>
                ) : (
                  //<<<<<<< TURNARY input name or p tag
                  <h1
                    onClick={() => setEditingName(true)}
                    className={banner.business_name_text}
                  >
                    {vendorInfo.business_name}
                  </h1>
                )}
              </div>
            </div>

            <div className={banner.vendor_banner_image_container}>
              {vendorInfo.vendor_banner !== `no-photo.jpg` ? (
                <CloudinaryContext cloudName="quickstlabs">
                  <Image
                    className={banner.vendor_banner_image}
                    publicId={vendorInfo.vendor_banner}
                  >
                    <Transformation
                      gravity="center"
                      height="500"
                      width="1800"
                      crop="fill"
                    />
                  </Image>
                </CloudinaryContext>
              ) : (
                <img
                  className="vendor_banner_image"
                  src={Placeholder}
                  alt="vendor header"
                />
              )}

              <BannerUploader
                vendorId={vendorId}
                vendorInfo={vendorInfo}
                setBannerInfo={setBannerInfo}
                bannerInfo={bannerInfo}
              />
            </div>
          </div>
          {/* Inner Banner Container */}
        </div>
        {/* END BANNER WRAPPER */}
        {/* 
        <About
          vendorInfo={vendorInfo}
          editAbout={editAbout}
          editProfile={editProfile}
          saveProfile={saveProfile}
          setVendorInfo={setVendorInfo}
        /> */}
        <VendorProducts
          setReloadProducts={setReloadProducts}
          reloadProducts={reloadProducts}
          // reloadProducts={reloadProducts}
          products={products}
          vendorId={vendorInfo._id}
        />
        <Bulletin vendorId={vendorId} />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Profile;
