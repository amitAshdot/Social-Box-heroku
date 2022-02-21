import React from 'react';
import emailjs from 'emailjs-com';
import { useDispatch, useSelector } from 'react-redux';

// import { init } from '@emailjs/browser';
// init("user_vDUBQd87BDiQhmE7iy0Cf");
import config from '../../../.config.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTimesCircle, faCoffee } from '@fortawesome/free-solid-svg-icons'

const MailForm = () => {
  const formState = useSelector(state => state.formReducer);
  const dataState = useSelector(state => state.dataReducer);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_royue7n', 'template_z241xon', e.target, 'user_vDUBQd87BDiQhmE7iy0Cf')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

  const handleClose = () => {
    console.log('close')
  }

  return (
    <div className='contact-container'>
      <form className="contact-form" onSubmit={sendEmail}>
        <FontAwesomeIcon className='close' icon={faTimesCircle} onClick={handleClose} />

        <input type="hidden" name="contact_number" />
        <input type="hidden" name="vendor" value={formState.vendor ? formState.vendor : ''} />
        <input type="hidden" name="industry" value={formState.industry ? formState.industry : ''} />
        <input type="hidden" name="revRange" value={formState.revRange ? formState.revRange : ''} />
        <input type="hidden" name="type" value={formState.type ? formState.type : ''} />

        <p>השאר פרטים בטופס מטה ונציג יחזור אליך בהקדם</p>
        <p className="taknonbox">
          שליחת הפרטים מהווה אישור
          <a rel="nofollow" href="https://check-box.co.il/privacy-policy/" target="_blank"> תקנון </a>
          האתר
        </p>

        <div className='inputs'>
          <div className='inputs-top'>
            {/* <label>שם פרטי</label> */}
            <input type="text" name="user_name" placeholder="שם מלא" />

            {/* <label>אימייל</label> */}
            <input type="email" name="user_email" placeholder="טלפון" />
          </div>
          <div className='inputs-bottom'>
            {/* <label>טלפון</label> */}
            <input type="tel" name="phone" placeholder="מייל" />

            <input type="submit" value="צרו איתי קשר" />
          </div>

        </div>

        {/* <input type="hidden" name="referralLinks" value={formState.referralLinks} /> */}

        {/* <input type="hidden" name="vendor" value={formState.vendor} /> */}
      </form>
    </div>
  )
}

export default MailForm