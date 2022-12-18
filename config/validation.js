const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
var phoneRegex = /^\d{10}$/;
const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

const alphabet = /^[a-zA-Z]*$/;
const number = /^[0-9]+$/;
const phoneNumber = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const personNameValidation = /^[a-zA-Z ]*$/;
const reWhiteSp = /^[^\s]+(\s+[^\s]+)*$/;
const emailValidation = /[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}/;
// const emailValidation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const alphabetWithSpace = /[^\w -]/;
const smallLetter = /^(?=.*[a-z])/;
const capitalLetter = /^(?=.*[A-Z])/;


const Validations = {

//   validateLoginForm: (form) => {
//     const errors = {};
//     const { email, password } = form;

//     if (!email) {
//       errors.email = MESSAGES.LOGIN.ERROR.EMAIL.EMPTY
//     } else if (email && !emailValidation.test(String(email).toLowerCase())) {
//       errors.email = MESSAGES.LOGIN.ERROR.EMAIL.EMAIL_VALIDATION
//     }

//     if (!password) {
//       errors.password = MESSAGES.LOGIN.ERROR.PASSWORD.EMPTY;
//     }
//     if (!reWhiteSp.test(String(password).toLowerCase())) {
//       errors.password = MESSAGES.VALID_PASSWORD.ERROR.PASSWORD.WHITE_SPACE;
//     }
//     if (password.length < 8 || !smallLetter.test(password) || !capitalLetter.test(password) || password.search(/[0-9]/) < 0 || password.search(/[!# $@%&]/) < 0) {
//       errors.password = MESSAGES.VALID_PASSWORD.ERROR.PASSWORD.STRONG_PASSWORD;
//     }
//     return errors;
//   },
//   validateRegisterForm: (form) => {
//     const errors = {};
//     const {
//       first_name,
//       last_name,
//       email,
//       confirm_email,
//       mobile_no,
//       // street_1,
//       // suburb,
//       country,
//       state,
//       // postal_code,
//       login_password,
//       setting_password,
//       country_code,
//       term_condition
//     } = form;

//     if (!first_name) {
//       errors.first_name = MESSAGES.REGISTER.ERROR.FIRST_NAME.EMPTY;
//     }
//     if (!last_name) {
//       errors.last_name = MESSAGES.REGISTER.ERROR.LAST_NAME.EMPTY;
//     }

//     if (!email) {
//       errors.email = MESSAGES.REGISTER.ERROR.EMAIL.EMPTY
//     }
//     if (email && !emailValidation.test(String(email).toLowerCase())) {
//       errors.email = MESSAGES.REGISTER.ERROR.EMAIL.EMAIL_VALIDATION
//     }

//     if (!confirm_email) {
//       errors.confirm_email = MESSAGES.REGISTER.ERROR.CONFIRM_EMAIL.EMPTY
//     }

//     if (confirm_email && confirm_email !== email) {
//       errors.confirm_email = MESSAGES.REGISTER.ERROR.CONFIRM_EMAIL.INVALID
//     }

//     if (!mobile_no) {
//       errors.mobile_no = MESSAGES.REGISTER.ERROR.MOBILE_NO.EMPTY;
//     }
//     if (mobile_no && !number.test(mobile_no)) {
//       errors.mobile_no = MESSAGES.REGISTER.ERROR.MOBILE_NO.NUMBER;
//     }

//     if (mobile_no && mobile_no.length < 10) {
//       errors.mobile_no = MESSAGES.REGISTER.ERROR.MOBILE_NO.DIGIT;
//     }

//     // if (!street_1) {
//     //   errors.street_1 = MESSAGES.REGISTER.ERROR.STREET_1.EMPTY;
//     // }

//     // if (!postal_code) {
//     //   errors.postal_code = MESSAGES.REGISTER.ERROR.POSTAL_CODE.EMPTY;
//     // }
//     // if (postal_code && postal_code.length > 6) {
//     //   errors.postal_code = MESSAGES.REGISTER.ERROR.POSTAL_CODE.LENGTH_INVALID;
//     // }

//     // if (postal_code && alphabet.test(String(postal_code).toLowerCase())) {
//     //   errors.postal_code = MESSAGES.REGISTER.ERROR.POSTAL_CODE.INVALID;
//     // }

//     // if (!suburb) {
//     //   errors.suburb = MESSAGES.REGISTER.ERROR.SUBURB.EMPTY;
//     // }

//     if (!country) {
//       errors.country = MESSAGES.REGISTER.ERROR.COUNTRY.EMPTY;
//     }

//     if (!state) {
//       errors.state = MESSAGES.REGISTER.ERROR.STATE.EMPTY;
//     }


//     if (!reWhiteSp.test(String(login_password).toLowerCase())) {
//       errors.login_password = MESSAGES.VALID_PASSWORD.ERROR.PASSWORD.WHITE_SPACE;
//     }

//     if (login_password.length < 8) {
//       errors.login_password = MESSAGES.VALID_PASSWORD.ERROR.PASSWORD.INVALID_LENGTH;
//     }

//     if (!smallLetter.test(login_password) || !capitalLetter.test(login_password) || login_password.search(/[0-9]/) < 0 || login_password.search(/[!# $@%&]/) < 0) {
//       errors.login_password = MESSAGES.VALID_PASSWORD.ERROR.PASSWORD.STRONG_PASSWORD;
//     }

//     if (!login_password) {
//       errors.login_password = MESSAGES.REGISTER.ERROR.PASSWORD.EMPTY;
//     }

//     if (!reWhiteSp.test(String(setting_password).toLowerCase())) {
//       errors.setting_password = MESSAGES.VALID_PASSWORD.ERROR.PASSWORD.WHITE_SPACE;
//     }

//     if (setting_password.length < 8) {
//       errors.setting_password = MESSAGES.VALID_PASSWORD.ERROR.PASSWORD.INVALID_LENGTH;
//     }

//     if (!smallLetter.test(setting_password) || !capitalLetter.test(setting_password) || setting_password.search(/[0-9]/) < 0 || setting_password.search(/[!#_$@%&]/) < 0) {
//       errors.setting_password = MESSAGES.VALID_PASSWORD.ERROR.PASSWORD.STRONG_PASSWORD;
//     }

//     if (!setting_password) {
//       errors.setting_password = MESSAGES.REGISTER.ERROR.PASSWORD.EMPTY;
//     }

//     if (!country_code) {
//       errors.country_code = MESSAGES.REGISTER.ERROR.COUNTRY_CODE.EMPTY;
//     }

//     if (!term_condition) {
//       errors.term_condition = MESSAGES.REGISTER.ERROR.TERM_CONDITION.EMPTY;
//     }

//     // if (!industry) {
//     //   errors.industry = Messages.SIGNUP.ERROR.SELECT_INDUSTRY.EMPTY;
//     // }
//     // if (!img) {
//     //   errors.img = Messages.SIGNUP.ERROR.IMAGE.EMPTY;
//     // }
//     return errors;
//   },
  validatePostBookingForm: (form) => {
    const errors = {};
    const {
        pick_up,
        drop,
        date_of_jorney,
        pickup_time,
        prefer_car,
        cost_of_jorney,
        commission_of_vendor,
        customer_name,
        customer_mobile_number,
        is_driver_request_form,
    } = form;

    if (!pick_up) {
      errors.pick_up = "Please enter pickup location";
    }
    if (!drop) {
      errors.drop = "Please enter drop location";
    }
    if (!date_of_jorney) {
      errors.date_of_jorney = "Please enter date of jorney";
    }
    if (!pickup_time) {
      errors.pickup_time = "Please select pickup time";
    }
    if (!prefer_car) {
      errors.prefer_car = "Please Enter prefer_car";
    }
    if (!cost_of_jorney) {
      errors.cost_of_jorney = "Please Enter cost of jorney";
    }
    if (!commission_of_vendor) {
      errors.commission_of_vendor = "Please Enter commission of vendor";
    }
    if (!customer_name) {
      errors.customer_name = "Please Enter customer name";
    }
    if (!customer_mobile_number) {
      errors.customer_mobile_number = "Please Enter customer mobile number";
    }
    if (customer_mobile_number && !phoneRegex.test(customer_mobile_number.trim().toString())) {
      errors.customer_mobile_number = "Please Enter valid customer mobile number";
    }
    
    return errors;
  },
  validateContactUsForm: (form) => {
    const errors = {};
    const { name, email, phone_number, msg } = form;

    if (!name) {
      errors.name = "Please enter name";
    }
    if (!email) {
      errors.email = "Please enter email";
    }

    if (email && !emailRegex.test(email.trim().toString())) {
      errors.email = "Please enter valid email";
    }
    if (!phone_number) {
      errors.phone_number = "Please enter phone number";
    }
    if (phone_number && !phoneRegex.test(phone_number.trim().toString())) {
      errors.phone_number = "Please Enter valid phone number";
    }
    if (!msg) {
      errors.msg = "Please enter message";
    }    
    return errors;
  },
  validateFeedbackForm: (form) => {
    const errors = {};
    const { name, email, phone_number, feedback } = form;

    if (!name) {
      errors.name = "Please enter name";
    }
    if (!email) {
      errors.email = "Please enter email";
    }
    if (email && !emailRegex.test(email.trim().toString())) {
      errors.email = "Please enter valid email";
    }
    if (!phone_number) {
      errors.phone_number = "Please enter phone number";
    }
    if (phone_number && !phoneRegex.test(phone_number.trim().toString())) {
      errors.phone_number = "Please Enter valid phone number";
    }
    if (!feedback) {
      errors.feedback = "Please enter message";
    }    
    return errors;
  },
  validatePostTestimonialsForm: (form) => {
    const errors = {};
    const { name, testimonials} = form;

    if (!name) {
      errors.name = "Please enter name";
    }
    if (!testimonials) {
      errors.testimonials = "Please enter testimonials";
    }   
    return errors;
  },
  validateMyProfileForm: (form) => {
    const errors = {};
    const {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        razorpay_account_id,
        state,
        city,
        dob,
    } = form;

    if (!first_name) {
      errors.first_name = "Please enter first_name";
    }
    if (!last_name) {
      errors.last_name = "Please enter last_name";
    }
    if (!email) {
      errors.email = "Please enter email";
    }
    if (email && !emailRegex.test(email.trim().toString())) {
      errors.email = "Please enter valid email";
    }
    if (!password) {
      errors.password = "Please select password";
    }
    if (!phone_number) {
      errors.phone_number = "Please Enter phone_number";
    }
    if (phone_number && !phoneRegex.test(phone_number.trim().toString())) {
      errors.phone_number = "Please Enter valid phone number";
    }
    if (!razorpay_account_id) {
      errors.razorpay_account_id = "Please Enter razorpay_account_id";
    }
    if (!state) {
      errors.state = "Please Enter state";
    }
    if (!city) {
      errors.city = "Please Enter city";
    }
    if (!dob) {
      errors.dob = "Please Enter date of birth";
    }
    
    return errors;
  },
  validateDriverForm: (form) => {
    const errors = {};
    const { driver_name, driver_email, driver_mobile_number, driver_licence_number, driver_vehicle_number} = form;

    if (!driver_name) {
      errors.driver_name = "Please enter driver name";
    }
    if (!driver_email) {
      errors.driver_email = "Please enter driver email";
    }   
    if (driver_email && !emailRegex.test(driver_email.trim().toString())) {
      errors.driver_email = "Please enter valid email";
    }
    if (!driver_mobile_number) {
      errors.driver_mobile_number = "Please enter driver mobile number";
    }   
    if (driver_mobile_number && !phoneRegex.test(driver_mobile_number.trim().toString())) {
      errors.driver_mobile_number = "Please Enter valid driver mobile number";
    }
    if (!driver_licence_number) {
      errors.driver_licence_number = "Please enter driver licence number";
    }   
    if (!driver_vehicle_number) {
      errors.driver_vehicle_number = "Please enter driver vehicle number";
    }   
    return errors;
  },
}
export default Validations;