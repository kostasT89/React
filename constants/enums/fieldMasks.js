import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const currency = createNumberMask({
  prefix: '$ ',
  allowDecimal: true,
});

const negativeCurrency = createNumberMask({
  prefix: '-$ ',
  allowDecimal: true,
});

const years = createNumberMask({
  prefix: '',
  suffix: ' years',
  allowDecimal: true,
});

const months = createNumberMask({
  prefix: '',
  suffix: ' months',
  allowDecimal: true,
});

const decimalPercentage = createNumberMask({
  prefix: '',
  suffix: ' %',
  allowDecimal: true,
});

export default {
  usPhone: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  usPhoneWithCountryCode: ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  dateTwoDigitYear: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/],
  dateFourDigitYear: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  zipCode: [/\d/, /\d/, /\d/, /\d/, /\d/],
  children: [/\d/],
  age: [/\d/, /\d/],
  dayOfMonth: [/\d/, /\d/],
  year: [/\d/, /\d/, /\d/, /\d/],
  yearDate: [/\d/, /\d/, '/', /\d/, /\d/],
  percentage: [/\d/, /\d/, '%'],
  decimalPercentage,
  currency,
  negativeCurrency,
  years,
  months
};
