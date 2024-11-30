import React, { useEffect, useState } from "react";
import Checkbox from "../child-comp/Checkbox";
import SidePanel from "./SidePanelAmbulance";
import Buttons from "../child-comp/Buttons";
import Radio from "../child-comp/Radio";
import InputField from "../child-comp/InputField";
import { handleChange, turnOffbutton } from "../helpers";
import AMB1 from "./table/AMB1";
import AMB2 from "./table/AMB2";
import Heading from "../../Heading/Heading.jsx";
import setLocalStorage from "../setLocalStorage.js";
import LastButton from "../child-comp/LastButton.jsx";
import LocationButton from "../child-comp/Location.jsx";
import {
  validateName,
  validateNumber,
  validateRequired,
  validateEmail,
  validateCheckBox,
} from "../fv.js";
import OverlayCard from "../OverlayCard.jsx";

function Facility() {
  turnOffbutton();

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
    // AOS.init({ duration: 2000 });
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  var ambulance = setLocalStorage("ambulance", {
    AMB1: "",
    AMB2: "",
    AMB3: "",
    AMB4: "",
    AMB5: "",
    AMB6: "",
    AMB7: "",
    AMB8: "",
    AMB9: "",
    AMB10: "",
    AMB11: "",
    AMB12: [],
    AMB13: "",
    AMB14: "",
    AMB15: "",
    AMB18: [],
    AMB19: [""],
  });
  const [Ambulance, setAmbulance] = useState(JSON.parse(ambulance));
  const [errors, setErrors] = useState({});
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const date = new Date();
    setAmbulance((prevValue) => {
      return {
        ...prevValue,
        AMB3:
          Ambulance.AMB3 == ""
            ? `${date.toDateString()}  ${date.getHours()}:${date.getMinutes()}`
            : Ambulance.AMB3,
      };
    });
  }, []);

  const columns1 = [
    { key: "Item", label: "Item", type: "text" },
    {
      key: "Available",
      label: "Available (Y/N)",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      key: "Functional",
      label: "Functional (Y/N)",
      type: "radio",
      options: ["Yes", "No"],
    },
    {
      key: "LastUsed",
      label: "If Functional (Yes), When was it last used?",
      type: "input",
    },
  ];

  const initialRows1 = [
    { Item: "Monitor", Available: "", Functional: "", LastUsed: "" },
    { Item: "ECG Machine", Available: "", Functional: "", LastUsed: "" },
    { Item: "Pulse Oxymeter", Available: "", Functional: "", LastUsed: "" },
    { Item: "Glucometer", Available: "", Functional: "", LastUsed: "" },
    { Item: "Defibrillator", Available: "", Functional: "", LastUsed: "" },
    {
      Item: "Defibrillator pads — disposable",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Sphygmomanometer, Non-mercurial- Paediatric cuff- Adult cuff",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Stethoscope (Adult)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Stethoscope (Paediatric)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Endotracheal tubes (Adult)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Endotracheal tubes (Paediatric)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Laryngeal Mask Airway (Paediatric)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Laryngeal Mask Airway (Adult)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Nebulizer with nebulizer kit",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Laryngoscope set (Adult)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Laryngoscope set (Paediatric)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Communication device(eg. mobile, Radio)",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Syringe infusion pump",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    {
      Item: "Transport Ventilators",
      Available: "",
      Functional: "",
      LastUsed: "",
    },
    { Item: "GPS system", Available: "", Functional: "", LastUsed: "" },
  ];

  const columns2 = [
    { key: "Item", label: "Item", type: "text" },
    {
      key: "Available",
      label: "Available (Y/N)",
      type: "radio",
      options: ["Yes", "No"],
    },
  ];

  const initialRows2 = [
    { Item: "Adrenaline Ampoules", Available: "" },
    { Item: "Anti Snake Venom Vial", Available: "" },
    { Item: "Atropine Ampoules", Available: "" },
    { Item: "Buscopan / Hyoscine Ampoules", Available: "" },
    { Item: "Methylergonovine Inj", Available: "" },
    { Item: "Frusemide / Lasix Ampoules", Available: "" },
    { Item: "Hydrocort 2ml Vial", Available: "" },
    { Item: "Magnesium Sulfate Ampoules", Available: "" },
    { Item: "Midazolam Vial", Available: "" },
    { Item: "Mucain gel Syrup", Available: "" },
    { Item: "Ondansetron Zofer Ampoules", Available: "" },
    { Item: "Oxytocin Ampoules", Available: "" },
    { Item: "ORS", Available: "" },
    { Item: "Glucose", Available: "" },
    { Item: "Paracetamol Ampoules", Available: "" },
    { Item: "Paracetamol Syrup", Available: "" },
    { Item: "Pheniramine Maleate / Avil Ampoules", Available: "" },
    { Item: "Ranitidine Ampoules", Available: "" },
    { Item: "Tablet Activated Charcoal / Powder", Available: "" },
    { Item: "Tablet Aspirin / Dispirin", Available: "" },
    { Item: "Tablet Clopidogrel (75mg)", Available: "" },
    { Item: "Tablet Isosorbide", Available: "" },
    { Item: "AsthalinRespule", Available: "" },
    { Item: "BudecortRepsule", Available: "" },
    { Item: "DuolinRespule", Available: "" },
    { Item: "Lignocaine / Xylocaine Gel", Available: "" },
    { Item: "Distil / Sterile Water", Available: "" },
    { Item: "Fluid Normal Saline (NS) 100 ml & 500 ml", Available: "" },
    { Item: "Betadine", Available: "" },
    { Item: "Dextrose 25% 100 ml", Available: "" },
    { Item: "Disposable Delivery Kit", Available: "" },
    { Item: "Disposable Hand Gloves", Available: "" },
    { Item: "Disposable Face Masks", Available: "" },
    { Item: "Cotton 500gm", Available: "" },
    { Item: "IV Cannula 18G 20G 22G & 24G", Available: "" },
    { Item: "All Syringes 3ml,5ml & 10 ml", Available: "" },
    { Item: "IV Sets – Macro", Available: "" },
    { Item: "IV Sets – Micro", Available: "" },
    { Item: "Spirit", Available: "" },
    { Item: "Betadine", Available: "" },
  ];

  const validateForm = () => {
    const newErrors = {};

    newErrors.AMB2 =
      validateName(Ambulance.AMB2) || validateRequired(Ambulance.AMB2);
    newErrors.AMB6 =
      validateName(Ambulance.AMB6) || validateRequired(Ambulance.AMB6);
    newErrors.AMB9 =
      validateNumber(Ambulance.AMB9) || validateRequired(Ambulance.AMB9);
    newErrors.AMB10 =
      validateNumber(Ambulance.AMB10) || validateRequired(Ambulance.AMB10);
    newErrors.AMB11 =
      validateName(Ambulance.AMB11) || validateRequired(Ambulance.AMB11);

    setErrors(newErrors);
    setShowOverlay(
      Object.keys(newErrors).some((key) => newErrors[key] !== undefined)
    );
  };

  useEffect(() => {
    const { isValid, missingFields } = isFormValid();
    setShowOverlay(!isValid);
    if (!isValid) {
      const newErrors = {};
      missingFields.forEach((field) => {
        console.log(field + "field");
        if (Array.isArray(Ambulance[field])) {
          console.log(Ambulance[field]);
          newErrors[field] = validateCheckBox(Ambulance[field]);
        } else {
          newErrors[field] = validateRequired(Ambulance[field]);
        }
      });
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  }, [Ambulance]);

  const isFormValid = () => {
    const requiredFields = [
      "AMB1",
      "AMB2",
      // "AMB4",    // SSL
      "AMB5",
      "AMB6",
      "AMB7",
      "AMB8",
      "AMB9",
      "AMB10",
      "AMB11",
      "AMB12",
      "AMB13",
      "AMB14",
      "AMB15",
      "AMB18",
      "AMB19",
    ];

    const missingFields = requiredFields.filter((field) => {
      if (Array.isArray(Ambulance[field])) {
        return Ambulance[field].every(
          (item) =>
            item === "" || (typeof item === "string" && item.trim() === "")
        );
      } else {
        return (
          !Ambulance[field] ||
          (typeof Ambulance[field] === "string" &&
            Ambulance[field].trim() === "")
        );
      }
    });
    return { isValid: missingFields.length === 0, missingFields };
  };

  useEffect(() => {
    const { isValid, missingFields } = isFormValid();
    setShowOverlay(!isValid);
    if (!isValid) {
      const newErrors = {};
      missingFields.forEach((field) => {
        newErrors[field] = "This field is required";
      });
      setErrors(newErrors);
    } else {
      setErrors({});
    }
  }, [Ambulance]);

  const handleChangeWithValidation = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;
    let error = "";

    switch (name) {
      case "AMB2":
        error = validateName(value);
        if (!error) {
          validatedValue = value;
        } else {
          validatedValue = Ambulance[name];
          e.preventDefault(); // Prevent default behavior if the input was invalid
        }
        break;
      // case "AMB6":
      case "AMB9":
      case "AMB10":
      case "AMB11":
        error = validateNumber(value);
        if (!error) {
          validatedValue = value;
        } else {
          validatedValue = Ambulance[name];
          e.preventDefault();
        }
        break;
      default:
        break;
    }

    setAmbulance((prevValue) => ({ ...prevValue, [name]: validatedValue }));

    // Perform additional required validation
    switch (name) {
      case "AMB2":
      case "AMB6":
      case "AMB9":
      case "AMB10":
      case "AMB11":
        error = error || validateRequired(validatedValue);
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  return (
    <div>
      <div className="header">
                <div className="burger-menu" onClick={toggleSidebar}>
                &#9776;
                </div>
                <Heading h2="Gap Assessment Tool – Ambulance at Facility Level"></Heading>
      </div>
      <section className="form-main">
                {isSidebarVisible && (
                <>
                    <SidePanel id={"1"} />
                    <div className="grayedover" onClick={toggleSidebar}></div>
                </>
                )}
        <div className="siteInfo">
          <div className="formhdr">
            <div>
              <h3>Facility Information</h3>
            </div>
          </div>

          <div className="formcontent">
            <Radio
              h3="State :"
              byDefault={Ambulance.AMB1}
              onClick={handleChange(setAmbulance)}
              CheckbobItems={[
                "GJBRC_AST",
                "ORPUR_AST",
                "MPBHS_AST",
                "PBLDH_AST",
                "PYPDY_AST",
              ]}
              name="AMB1"
            />

            <InputField
              h3="Name of the data collector:"
              onChange={handleChangeWithValidation}
              value={Ambulance.AMB2}
              placeholder="Type here"
              name="AMB2"
              required
              errorMsg={errors.AMB2}
            />

            <div>
              <p className="datetime">Date : {Ambulance.AMB3}</p>
            </div>

            {/* <InputField
              h3="GPS Coordinates:"
              onChange={handleChange(setAmbulance)}
              value={Ambulance.AMB4}
              placeholder="Type here"
              name="AMB4"
            /> */}
            <LocationButton
              setter={setAmbulance}
              Name={"AMB4"}
              required
              errorMsg={errors.AMB4}
            />

            <Radio
              h3="1. Name of the Ambulance Service?"
              byDefault={Ambulance.AMB5}
              onClick={handleChange(setAmbulance)}
              CheckbobItems={[
                "Public",
                "108",
                "104",
                "112",
                "102",
                "Private",
                "Institutional Ambulance",
              ]}
              name="AMB5"
            />

            <InputField
              h3="2. Which Location/Area does your ambulance operate in?"
              // onChange={handleChange(setAmbulance)}
              onChange={handleChangeWithValidation}
              value={Ambulance.AMB6}
              placeholder="Type here"
              name="AMB6"
            />

            <Radio
              h3="3. Type of Ambulance Service?"
              byDefault={Ambulance.AMB7}
              onClick={handleChange(setAmbulance)}
              CheckbobItems={["Type A", "Type B", "Type C", "Type D"]}
              name="AMB7"
              // required
              errorMsg={errors.AMB7}
            />

            <Radio
              h3="4. Is the ambulance service available 24/7?"
              byDefault={Ambulance.AMB8}
              onClick={handleChange(setAmbulance)}
              CheckbobItems={["Yes", "No"]}
              name="AMB8"
              // required
              errorMsg={errors.AMB8}
            />

            <InputField
              h3="5. How many cases do you transport per day on an a average"
              onChange={handleChangeWithValidation}
              value={Ambulance.AMB9}
              placeholder="Type here"
              name="AMB9"
              required
              errorMsg={errors.AMB9}
            />

            <InputField
              h3="6. How many emergency cases do you transport per day on an a average"
              onChange={handleChangeWithValidation}
              value={Ambulance.AMB10}
              placeholder="Type here"
              name="AMB10"
              required
              errorMsg={errors.AMB10}
            />

            <InputField
              h3="7. How much area to you cater to ?"
              onChange={handleChangeWithValidation}
              value={Ambulance.AMB11}
              placeholder="Km radius"
              name="AMB11"
              required
              errorMsg={errors.AMB11}
            />

            <Checkbox
              CheckbobItems={[
                "Driver",
                "Doctor",
                "Emergency medical technicians",
                "Nurse",
              ]}
              h3="8. Staff on duty per ambulance"
              name="AMB12"
              setFunction={setAmbulance}
              StateValue={Ambulance}
              array={Ambulance.AMB12}
            />

            <h3>9. EMERGENCY EQUIPMENT:</h3>

            <Radio
              h3="9.1 : Which Suction apparatus and accessories is available"
              CheckbobItems={[
                "Portable or Mounted Suction Machine",
                "Flexible suction catheters Fr. 5,8,12 and 14",
                "Both of the above",
                "None of the above",
              ]}
              name="AMB13"
              onClick={handleChange(setAmbulance)}
              byDefault={Ambulance.AMB13}
              // required
              errorMsg={errors.AMB13}
            />

            <Radio
              h3="9.2 : Which type of Portable oxygen equipment/installed"
              CheckbobItems={[
                "Portable oxygen tank with regulator",
                "Oxygen mask No. 2,3 and 4 (for new-born, infant and adult)",
                "Both of the above",
                "None of the above",
              ]}
              name="AMB14"
              onClick={handleChange(setAmbulance)}
              byDefault={Ambulance.AMB14}
              // required
              errorMsg={errors.AMB14}
            />

            <Radio
              h3="9.3 : Whether Bag valve mask resuscitator with rebreathe bag for adult, paediatric and infant is available"
              CheckbobItems={["Yes", "No"]}
              name="AMB15"
              onClick={handleChange(setAmbulance)}
              byDefault={Ambulance.AMB15}
              // required
              errorMsg={errors.AMB15}
            />

            <h3>9.4 : Whether it’s available or not</h3>
            <AMB1 columns={columns1} initialRows={initialRows1} name="AMB16" />

            <h3>
              9.5 : Whether these Emergency Medications are available or not?
            </h3>
            <AMB2 columns={columns2} initialRows={initialRows2} name="AMB17" />

            <h3>9.6 : Whether these Immobilizing equipment’s are available?</h3>

            <Checkbox
              h3="Select the appropriate equipment available:"
              CheckbobItems={[
                "Firm padding or commercial head immobilization device",
                "Lower extremity traction devices (supporting slings, padding, traction strap)",
                "Upper and Lower extremity immobilization devices",
                "Joint above and joint below fracture immobilizing device",
                "Resistant straps or cravats",
                "Orthopaedic (scoop) stretcher/ Long back board",
                "Rigid cervical collars (small, medium, large)",
              ]}
              name="AMB18"
              setFunction={setAmbulance}
              StateValue={Ambulance}
              array={Ambulance.AMB18}
            />

            <h3>
              9.7 : What are the different types of registers/records/checklists
              maintained on the ambulance?
            </h3>

            <Checkbox
              CheckbobItems={[
                "Ambulance Cleaning Checklist",
                "Portable Oxygen Cylinder Pressure Monitoring Sheet",
                "In Ambulance Treatment Summary Form",
                "Emergency Injection Register",
                "Emergency Medicine Checklist",
                "AED Checklist",
                "Patient Register",
              ]}
              other={true}
              name="AMB19"
              setFunction={setAmbulance}
              StateValue={Ambulance}
              array={Ambulance.AMB19}
            />

            <div className="button-container">
              <LastButton
                prev=""
                formName="ambulance"
                formData={Ambulance}
                next="/"
                MainForm="AMBULANCE"
                formType="ambulance"
              />

              <OverlayCard
                isVisible={showOverlay}
                message="Please fill all required fields to proceed."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Facility;
