import React from "react";
import about from "../../styles/css/vendor_about.module.css";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BusinessHourForm = ({ hour, onBusinessHourChange }) => {
  console.log(`hour`, hour);
  return (
    <form>
      <div>
        <label>Days of week</label>
        <select name="days" value={hour.days} onChange={onBusinessHourChange}>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <div className={`${about.vendor_info_hour} ${about.input_container}`}>
        <label>Hours of Operation</label>
        <div className={about.vendor_info_hour_input_group}>
          <div className={about.inputWithIcon}>
            <input
              type="text"
              name="time_from"
              value={hour.time_from}
              className={about.hour_input}
              onChange={onBusinessHourChange}
            />
            <FontAwesomeIcon
              id={about.clock}
              className={about.input_icon}
              icon={faClock}
            />
          </div>

          <p>to</p>

          <div className={about.inputWithIcon}>
            <input
              className={about.vendor_info_hour_input_2}
              type="text"
              name="time_to"
              value={hour.time_to}
              className={about.hour_input}
              id={about.hour_to}
              onChange={onBusinessHourChange}
            />
            <FontAwesomeIcon
              id={about.clock}
              className={about.input_icon}
              icon={faClock}
            />
          </div>
        </div>
        <button>remove</button>
      </div>
    </form>
  );
};

export default BusinessHourForm;
