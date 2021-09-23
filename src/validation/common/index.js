import Vue from 'vue'

import { ValidationProvider} from 'vee-validate';
// import { ValidationProvider } from 'vee-validate/dist/vee-validate.full.esm';
import { ValidationObserver, setInteractionMode} from 'vee-validate';
import { extend } from 'vee-validate';
import PhoneNumber from 'awesome-phonenumber'
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);


setInteractionMode('eager')
import { required, email, numeric, min, alpha, max} from 'vee-validate/dist/rules';

extend('required', {
  ...required,
  message: 'This field is required'
});
extend('alpha', {
  ...alpha,
});
extend('min', {
  ...min,
  message: 'Enter Value greate than one',
  validate: value => {
    return value > 0;
  }
});
extend('maxInterest', {
  ...max,
  message: 'Enter Value less than 100',
  validate: value => {
    return value < 100;
  }
});
extend('minInterest', {
  ...min,
  message: 'Enter Value greate than zero',
  validate: value => {
    return value > 0;
  }
})
extend('minTermLoan', {
  ...min,
  message: 'Enter Value greate than 0',
  validate: value => {
    return value > 0;
  }
})
extend('numeric', {
  ...numeric,
  message: 'Only numbers is accepted'
});
extend('phone', {
  message () {
      return `Please enter a valid phone number`;
  },
  validate (value) {
      return new Promise(resolve => {
          let phone = new PhoneNumber(value, 'NP');
          resolve({ valid: phone.isValid() })
      });
  }
});
extend('email', {
  ...email,
  message: 'Please enter valid email'
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Password confirmation does not match'
});

