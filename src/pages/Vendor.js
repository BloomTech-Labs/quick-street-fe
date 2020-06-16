// ** Vendor customer facing page ** //

import React from "react";
import {
  ViewAboutVendor,
  ViewVendorProducts,
  ViewVendorPosts,
  Footer,
  Nav,
} from "../components/index"; // removed ShoppingCartItems, Modal,
// import axiosWithAuth from '../utils/axiosWithAuth';
import "../styles/scss/OldcustomerFacingVendorProfile.scss";

// stlyes
import browse from "../styles/scss/browse.module.scss";

const Vendor = (props) => {
  const vendorId = props.match.params.id;
  // const [ cartModal, setCartModal ] = useState(false);
  console.log("vendor id", vendorId);
  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#00B2ED" }} className={browse.temp_menu}>
        <Nav />
      </div>
      <ViewAboutVendor vendorId={vendorId} />
      <ViewVendorProducts vendorId={vendorId} />
      <ViewVendorPosts vendorId={vendorId} />
      {/* <button onClick={() => props.history.goBack()}>Back</button> */}
      <Footer />
    </React.Fragment>
  );
};

export default Vendor;
