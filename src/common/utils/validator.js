import { formatCurrency } from './format'

export function validatePasswordLength (rule, value, next) {
  if (`${value}`.length < 8 || `${value}`.length > 60) {
    next('Passwords must between 8 to 60 charactor.')
  } else {
    next()
  }
}

export function compareToFirstPassword (rule, value, next, form) {
  if (value && value !== form.getFieldValue('password')) {
    next('Two passwords that you enter is inconsistent.')
  } else {
    next()
  }
}

export function validateNumber (rule, value, next) {
  if (isNaN(`${value}`)) {
    next('Field value must be a number.')
  } else {
    next()
  }
}

export function validateMin (rule, value, next, { min }) {
  if (value && `${value}` && +value < +min) {
    next(`Field value less than ${formatCurrency(min)}.`)
  } else {
    next()
  }
}
