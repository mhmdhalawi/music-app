import { configure, defineRule } from 'vee-validate';
import {
  required,
  email,
  min,
  alpha_spaces as alphaSpaces,
  numeric,
  confirmed,
  between,
  alpha_num as alphaNum,
  alpha_dash as alphaDash,
} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

configure({
  generateMessage: localize('en', {
    messages: {
      required: 'This field is required',
      email: '{field} must be a valid email',
      min: '{field} must be at least 0:{min} characters',
      alpha_spaces: '{field} must be alphabetic and spaces only',
      between: '{field} must be between 0:{min} and 1:{max} ',
      numeric: '{field} must be numeric',
      confirmed: 'Passwords must match',
      alpha_num: 'This field must be alphabetic and numeric only',
      alpha_dash: 'This field must be alphabetic and dash only',
    },
  }),
});

export const rules = [
  defineRule('required', required),
  defineRule('email', email),
  defineRule('min', min),
  defineRule('alpha_spaces', alphaSpaces),
  defineRule('between', between),
  defineRule('numeric', numeric),
  defineRule('confirmed', confirmed),
  defineRule('alpha_num', alphaNum),
  defineRule('alpha_dash', alphaDash),
];
