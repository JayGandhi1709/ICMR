import SidePanel from './SidePanelCST.jsx';
import Checkbox from '../child-comp/Checkbox.jsx';
import Radio from '../child-comp/Radio.jsx';
import { Link } from 'react-router-dom';
import "../Form.css"
import React, { useEffect, useState } from 'react'
import Buttons from '../child-comp/Buttons.jsx';
import InputField from '../child-comp/InputField.jsx';
import { turnOffbutton, handleChange } from '../helpers.js';
import setLocalStorage from '../setLocalStorage.js';
import Heading from '../../Heading/Heading';
import Table from '../child-comp/Table.jsx'
import DropDown from '../child-comp/DropDown.jsx';
import Table1 from '../child-comp/Table1.jsx';
import CSTButton from '../child-comp/CSTButton.jsx';
import useFormValidation from '../../../utils/custom_validation_hook.js';
import OverlayCard from '../OverlayCard.jsx';
import { validateName, validateNumber, validateRequired } from '../fv.js';

function FormC22() {
  var formc22 = setLocalStorage("formc22", { C8: "", C9_1: "", C9_2: "", C10_1: "", C10_2: "", C11: "", C12: "", C13: "", C14: "", C15: "", C16: "", C17: "", C18: "", C19: "" })
  const [formC22, setFormC22] = useState(JSON.parse(formc22))
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

  useEffect(() => {
    if (formC22.C18 !== "Yes") {
      setFormC22({ ...formC22, C19: "" })
    }
  }, [formC22.C18])

  const { isValid, errors, setErrors } = useFormValidation(formC22, [
    "C8",
    "C9_1",
    "C9_2",
    "C10_1",
    "C10_2",
    "C11",
    "C12",
    "C13",
    "C14",
    "C15",
    "C16",
    "C17",
    "C18",
    ...(formC22.C18 === "Yes" ? ["C19"] : [])
  ]);

  const handleChangeWithValidation = (e) => {
    const { name, value } = e.target;
    let validatedValue = value;
    let error = "";

    switch (name) {
      case "C9_1":
      case "C9_2":
      case "C10_1":
      case "C10_2":
            error = validateNumber(value);
            if (!error) {
                validatedValue = value;
            } else {
                validatedValue = formC22[name];
                e.preventDefault(); // Prevent default behavior if the input was invalid
            }
            break;
      case "C13":
            error = validateName(value);
            if (!error) {
                validatedValue = value;
            } else {
                validatedValue = formC22[name];
                e.preventDefault(); // Prevent default behavior if the input was invalid
            }
            break;
        default:
            break;
    }

    setFormC22((prevValue) => ({ ...prevValue, [name]: validatedValue }));

    // Perform additional required validation
    switch (name) {
        case "C8":
        case "C9_1":
        case "C9_2":
        case "C10_1":
        case "C10_2":
        case "C11":
        case "C12":
        case "C13":
        case "C14":
        case "C15":
        case "C16":
        case "C17":
        case "C18":
        case "C19":
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
        <Heading h2="Community Survey Tool"></Heading>
      </div>
      <section id='site-info' className="form-main">
        {isSidebarVisible && (
          <>
            <SidePanel id={"22"} />
            <div className="grayedover" onClick={toggleSidebar}></div>
          </>
        )}

        <div className='siteInfo'>
          <div className="formhdr">
            <div>
              <h2>A Socio-demographic Characteristics</h2>
            </div>
            <div>
              <h3>
                Referral Facility
              </h3>
            </div>
          </div>

          <div className="formcontent ">

            <Radio onClick={handleChange(setFormC22)} h3="C.8 Were there any problems in arranging for transport of the patient?  (Describe)" CheckbobItems={["Yes (Specify)", "No"]} name="C8" setter={setFormC22} otherArray={[1, 0]} byDefault={formC22.C8} />

            <h3>C.9  How much time the ambulance/ any transport took to reach the referring facility? (In Min/Hour)</h3>

            <InputField onChange={handleChangeWithValidation} h3="Hour" placeholder="Type here" name="C9_1" value={formC22.C9_1} />

            <InputField onChange={handleChangeWithValidation} h3="Minutes" placeholder="Type here" name="C9_2" value={formC22.C9_2} />

            <h3>C.10  How much time the ambulance/ any transport took to reach the referred facility? (In Min/Hour)</h3>

            <InputField onChange={handleChangeWithValidation} h3="Hour" placeholder="Type here" name="C10_1" value={formC22.C10_1} />

            <InputField onChange={handleChangeWithValidation} h3="Minutes" placeholder="Type here" name="C10_2" value={formC22.C10_2} />

            <Radio onClick={handleChange(setFormC22)} h3="C.11  Did the patient go to the referred facility?" CheckbobItems={["Yes", "No"]} name="C11" byDefault={formC22.C11} />

            <Radio onClick={handleChange(setFormC22)} h3="C.12  Which type of facility did you or the patient shifted?" CheckbobItems={["SC/HWC/(Ayushman Arogya Mandir)", "PHC", " CHC", "District Headquarter ", "Medical College", "Private hospital", "Private clinic", "ESI/railway/other Govt. Hospital", "Others"]} name="C12" setter={setFormC22} otherArray={[0, 0, 0, 0, 0, 0, 0, 0, 1]} byDefault={formC22.C12} />

            <InputField onChange={handleChangeWithValidation} h3="C.13  What was the name of the facility the patient shifted?" placeholder="Type here" name="C13" value={formC22.C13} />

            <Radio onClick={handleChange(setFormC22)} h3="C.14  Who suggested you visit the above mentioned facility for further emergency care?" CheckbobItems={["Self/ Family members", "Neighbour", "FLHW (ASHA/ AWW/ ANM/ CHO)", "Doctor", "Others"]} name="C14" setter={setFormC22} otherArray={[0, 0, 0, 0, 1]} byDefault={formC22.C14} />

            <Radio onClick={handleChange(setFormC22)} h3="C.15 How long after reaching the referral HCF (in emergency) was the patient attended?" CheckbobItems={["Immediately", "5-10 mins", "10-30 mins", ">30mins", " Do not know"]} name="C15" byDefault={formC22.C15} />

            <Radio onClick={handleChange(setFormC22)} h3="C.16 Who attended the patient at the referral HCF?" CheckbobItems={["Health worker", "Nurse", "Doctor", "Do not know"]} name="C16" byDefault={formC22.C16} />

            <Radio onClick={handleChange(setFormC22)} h3="C.17  Was any treatment started at the referral HCF?" CheckbobItems={["Yes", "No", "Do not know"]} name="C17" byDefault={formC22.C17} />

            <Radio onClick={handleChange(setFormC22)} h3="C.18  Were any laboratory &/or radiology investigations done at the HCF?" CheckbobItems={["Yes", "No", "Do not know"]} name="C18" byDefault={formC22.C18} />

            {
              (formC22.C18 === "Yes") &&
              <>
                <Radio onClick={handleChange(setFormC22)} h3="C.19  How much time was spent in investigations at referral HCF?" CheckbobItems={["Less than 30 minutes", "30 minutes to 1 hour", "More than 1 hour", "Do not Know"]} name="C19" byDefault={formC22.C19} />
              </>
            }

            <div className="button-container">
              <CSTButton formName="formc22" formData={formC22} prev="/referral-facility2" next="/referral-facility4" prevText="Previous" nextText="Save & Next" />
              <OverlayCard
                isVisible={!isValid}
                message="(Please fill all required fields to proceed)"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FormC22