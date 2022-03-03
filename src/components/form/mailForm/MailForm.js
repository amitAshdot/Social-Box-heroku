import React from 'react';
import emailjs from 'emailjs-com';
import { useDispatch, useSelector } from 'react-redux';
import { mailSent, toggleMailForm, setError } from '../../../store/form/action';

import MailSentLottie from '../../lottie/MailSentLottie';

// import { init } from '@emailjs/browser';
// init("user_vDUBQd87BDiQhmE7iy0Cf");
// import config from '../../../.config.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

const MailForm = ({ url }) => {
  const formState = useSelector(state => state.formReducer);
  // const dataState = useSelector(state => state.dataReducer);
  const dispatch = useDispatch();
  const ValidateEmail = (mail) => {
    return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) ? true : false
  }
  const phonenumber = (inputtxt) => { debugger; return inputtxt.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) ? true : false; }

  const changeStyle = (element, color) => { element.style.borderBottom = color; }

  const sendEmail = (e) => {
    e.preventDefault();
    dispatch(setError(null));
    changeStyle(document.getElementsByName('user_name')[0], `2px solid white`);
    changeStyle(document.getElementsByName('user_email')[0], `2px solid white`);
    changeStyle(document.getElementsByName('phone')[0], `2px solid white`);

    const name = document.getElementsByName('user_name')[0].value;
    const email = document.getElementsByName('user_email')[0].value;
    const phone = document.getElementsByName('phone')[0].value;
    let flag = false;
    if (name.length < 2) {
      dispatch(setError('error name'));
      flag = true;
      changeStyle(document.getElementsByName('user_name')[0], `2px solid red`);
    }
    if (!ValidateEmail(email)) {
      dispatch(setError('error email'));
      flag = true;
      changeStyle(document.getElementsByName('user_email')[0], `2px solid red`);
    }
    if (!phonenumber(phone)) {
      dispatch(setError('error phone'));
      flag = true;
      changeStyle(document.getElementsByName('phone')[0], `2px solid red`);
    }
    if (!flag) {
      emailjs.sendForm('service_royue7n', 'template_z241xon', e.target, 'user_vDUBQd87BDiQhmE7iy0Cf')
        .then((result) => {
          dispatch(mailSent())
          // if (formState.vendor !== '1')
          //   window.open(url, '_blank').focus();

          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    }

  }

  const handleClose = (e) => {
    e.preventDefault()

    if (e.target.className === 'contact-container' || e.currentTarget.hasAttribute("close"))
      dispatch(toggleMailForm(false))
  }

  const contentObj = formState.vendor === '1' ?
    {
      title: 'השאר פרטים בטופס מטה ונציג יחזור אליך בהקדם',
      btnValue: 'צרו איתי קשר'
    } :
    {
      title: 'בוא נתחיל! ',
      btnValue: 'לשלב הבא'
    }

  return (formState.mailForm ?
    <div className='contact-container'  >
      <form className="contact-form" onSubmit={sendEmail}>
        <FontAwesomeIcon className='close' close='close' icon={faTimesCircle} onClick={handleClose} />

        <input type="hidden" name="contact_number" />
        <input type="hidden" name="vendor" value={formState.vendor ? formState.vendor : ''} />
        <input type="hidden" name="industry" value={formState.industry ? formState.industry : ''} />
        <input type="hidden" name="revRange" value={formState.revRange ? formState.revRange : ''} />
        <input type="hidden" name="type" value={formState.type ? formState.type : ''} />

        {formState.vendor !== '1' ?
          <div className='step-container'>
            <div className='step-one'>
              1
            </div>
          </div>
          : null}

        <p className='contact-form-title'>{contentObj.title}</p>

        <img src={formState.currentCompany.imgUrl} alt={formState.currentCompany.brand} />

        {formState.mailSent ?
          <MailSentLottie />
          :
          <div className='inputs'>
            <div className='inputs-top'>
              <input type="text" name="user_name" placeholder="שם מלא" />

              <input type="email" name="user_email" placeholder=" מייל" />
            </div>
            <div className='inputs-bottom'>
              <input type="tel" name="phone" placeholder="טלפון" />

              <input type="submit" value={contentObj.btnValue} />
            </div>
            <p className="taknonbox">
              שליחת הפרטים מהווה אישור
              <a href="https://check-box.co.il/privacy-policy/" target="_blank" rel="noreferrer"> תקנון </a>
              האתר
            </p>
          </div>
        }

        {/* <input type="hidden" name="referralLinks" value={formState.referralLinks} /> */}
      </form>
    </div> : null
  )
}

export default MailForm