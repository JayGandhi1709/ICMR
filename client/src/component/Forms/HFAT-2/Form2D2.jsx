import React, { useState, useEffect } from 'react';
import SidePanel from './SidePanelHFAT2';
import Buttons from '../child-comp/Buttons';
import Checkbox from '../child-comp/Checkbox';
import setLocalStorage from '../setLocalStorage';
import { turnOffbutton } from '../helpers';
import Heading from '../../Heading/Heading.jsx';
import AOS from 'aos';
import 'aos/dist/aos.css';
import OverlayCard from '../OverlayCard.jsx';
import { validateCheckBox, validateRequired } from '../fv.js';

function Form2D2() {

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
        AOS.init({ duration: 2000 });
        
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);    
    
    // useEffect(() => {
    //     AOS.init({ duration: 2000 });
    // }, []);

    turnOffbutton();

    var form2d2 = setLocalStorage("form2d2", { H2D2: [] });
    const [form2D2, setForm2D2] = useState(JSON.parse(form2d2));
    const [errors, setErrors] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const { isValid, missingFields } = isFormValid();
        setShowOverlay(!isValid);
        if (!isValid) {
            const newErrors = {};
            missingFields.forEach(field => {
                console.log(field + "field");
                if (Array.isArray(form2D2[field])) {
                    console.log(form2D2[field]);
                    newErrors[field] = validateCheckBox(form2D2[field]);
                } else {
                    newErrors[field] = validateRequired(form2D2[field]);
                }
            });
            setErrors(newErrors);
        } else {
            setErrors({});
        }
    }, [form2D2]);

    const isFormValid = () => {
        const requiredFields = ['H2D2'];
        const missingFields = requiredFields.filter(field => {
            if (Array.isArray(form2D2[field])) {
                return form2D2[field].every(item => item === '' || (typeof item === 'string' && item.trim() === ''));
            } else {
                return !form2D2[field] || (typeof form2D2[field] === 'string' && form2D2[field].trim() === '');
            }
        });
        return { isValid: missingFields.length === 0, missingFields };
    };

    useEffect(() => {
        const { isValid, missingFields } = isFormValid();
        setShowOverlay(!isValid);
        if (!isValid) {
            const newErrors = {};
            missingFields.forEach(field => {
                newErrors[field] = 'This field is required';
            });
            setErrors(newErrors);
        } else {
            setErrors({});
        }
    }, [form2D2]);


    return (
        <div>
            <div className="header">
                <div className="burger-menu" onClick={toggleSidebar}>
                &#9776;
                </div>
                <Heading h2="Health Facility Assessment Tool 2: Community Health Centre"></Heading>
            </div>
            <section className="form-main">
                {isSidebarVisible && (
                <>
                    <SidePanel id={"4"} />
                    <div className="grayedover" onClick={toggleSidebar}></div>
                </>
                )}
                <div className="siteInfo" data-aos="fade-left">

                    <div className="formhdr">
                        <div>
                            <h3>
                                2D. Logistics (Drugs/ Consumables/ Equipment)
                            </h3>
                        </div>
                    </div>

                    <div className="formcontent">
                        <h3>2D.2 : Which of the following emergency equipment is available at the CHC? (Multiple answers possible)</h3>

                        <Checkbox
                            required={true}
                            errorMsg="Select at least one equipment"
                            other={true}
                            CheckbobItems={[
                                'Mobile bed for Resuscitation', 'Crash Cart (specialized cart for resuscitation)',
                                'Hard Cervical Collar', 'Oxygen Cylinder/Central Oxygen Supply', 'Suction Machine',
                                'Multipara Monitor (To monitor Heart rate, BP, SPO2[Essential] ECG, Respiration Rate [Desirable] etc)',
                                'Defibrillator with or without external pacer', 'Toothed Forceps, Kocher Forceps, Magill\'s forceps, Artery forceps',
                                'AMBU Bag for adult and Paediatric', 'Basic airway equipment like oropharyngeal nasopharyngeal airway, LMA for adult and pediatric',
                                'Advanced laryngoscope and endotracheal tube or other similar device', 'Tourniquet', 'Pelvic binder or bed sheets with clips',
                                'Laryngoscope with all sized blades', 'Endotracheal Tubes of all sizes', 'Laryngeal Mask Airway (LMA)',
                                'Chest Tubes with Water seal drain', 'ECG Machine', 'Nebulizer', 'Fluid Warmer', 'Infusion pump and Syringe Drivers',
                                'Spine board with sling and scotch tapes', 'Splints for all types of fracture', 'Non-invasive Ventilators',
                                'Invasive Ventilators', 'Incubators'
                            ]}
                            name={"H2D2"}
                            setFunction={setForm2D2}
                            StateValue={form2D2}
                            array={form2D2.H2D2}

                        />

                        <div className="button-container">
                            <Buttons
                                formName={"form2d2"}
                                formData={form2D2}
                                prevText="Previous"
                                nextText="Save & Next"
                                prev="/logistics-2"
                                next="/emergencycareservices-2"
                                formType="hfat2"
                            />

                            <OverlayCard
                                isVisible={showOverlay}
                                message="(Please fill all required fields to proceed)"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Form2D2;
