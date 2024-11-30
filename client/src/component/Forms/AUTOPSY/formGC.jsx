import React, { useState, useEffect } from "react";
import AOS from "aos";
import { handleChange, turnOffbutton } from "../helpers";
import setLocalStorage, { getLocalStorage } from "../setLocalStorage";
import Heading from "../../Heading/Heading";
import SidePanelCST from "../CST/SidePanelCST";
import InputField from "../child-comp/InputField";
import SidePanelAutopsy from "./sideBarAutopsy";
import Checkbox from "../child-comp/Checkbox";
import Radio from "../child-comp/Radio";
import Buttons from "../child-comp/Buttons";
import OverlayCard from "../OverlayCard";
import { validateNumber, validateRequired } from "../fv";
import useFormValidation from "../../../utils/custom_validation_hook";

function FormGC() {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  turnOffbutton();
  var formgc = setLocalStorage("formgc", {
    GC1: "",
    GC2: "",
  });
  const [formGC, setFormGC] = useState(JSON.parse(formgc));
  // const [errors, setErrors] = useState({});
  // for validation
  const { isValid, errors, setErrors } = useFormValidation(formGC, [
    "GC1",
    ...(formGC.GC1 !== "No" ? ["GC2"] : []),
  ]);

  useEffect(() => {
    console.log(formGC.GD1);
    if (formGC.GC1 === "No") {
      setFormGC({ ...formGC, GC2: "" });
    }
  }, [formGC.GC1]);

  const [showOverlay, setShowOverlay] = useState(false);

  // --toggle--
  const [isSidebarVisible, setSidebarVisible] = useState(
    window.innerWidth > 1024
  );
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const handleResize = () => {
    if (window.innerWidth >= 1025) {
      setSidebarVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="header">
        <div className="burger-menu" onClick={toggleSidebar}>
          &#9776;
        </div>
        <Heading h2="Verbal Autopsy Tools"></Heading>
      </div>
      <section className="form-main">
        {isSidebarVisible && (
          <>
            {/* <SidePanelCST id={"1"} /> */}
            <SidePanelAutopsy id={"9"} />
            <div className="grayedover" onClick={toggleSidebar}></div>
          </>
        )}
        {/* <SidePanel id={"1"} /> */}
        <div className="siteInfo" data-aos="fade-left">
          <div className="formhdr">
            <div>
              <h3>GC. Child Death</h3>
            </div>
          </div>
          <div className="formcontent">
            <Radio
              name="GC1"
              h3="GC.1 : Did he/she die from an injury or accident?:"
              CheckbobItems={["Yes", "No", "Unknown"]}
              byDefault={formGC.GC1}
              onClick={handleChange(setFormGC)}
              error={errors.GC1}
            />

            {formGC.GC1 !== "No" && formGC.GC1 && (
              <Radio
                name="GC2"
                h3="GC.2 : If yes, what kind of injury or accident?:"
                CheckbobItems={[
                  "Road traffic accident",
                  "Fall",
                  "Fall of objects",
                  "Burn",
                  "Poisoning",
                  "Bite/sting",
                  "Natural disaster",
                  "Homicide/Assault",
                ]}
                byDefault={formGC.GC2}
                onClick={handleChange(setFormGC)}
                error={errors.GC2}
              />
            )}
            <div className="button-container">
              <Buttons
                formName="formgc"
                formData={formGC}
                prevText="Previous"
                nextText="Save & Next"
                prev="/formGB"
                next={formGC.GC1 !== "No" ? "/formGF" : "/formGD"}
                // validateForm={validateForm}
                formType="autopsy"
              />
              <OverlayCard
                isVisible={!isValid}
                message="(Please fill all required fields to proceed)"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FormGC;
