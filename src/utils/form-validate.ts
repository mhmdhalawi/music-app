import { configure, defineRule } from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';

configure({
  generateMessage: localize('en', {
    messages: {
      required: 'This field is required',
      email: 'This field must be a valid email',
      min: 'This field must be at least 0:{min} characters',
    },
  }),
});

export const rules = [
  defineRule('required', required),
  defineRule('email', email),
  defineRule('min', min),
];
