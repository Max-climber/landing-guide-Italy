const validCountryCodes = [
  '1', '7', '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
  '51', '52', '53', '54', '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81', '82', '84', '86', '90', '91', '92', '93', '94', '95', '98', '212', '213', '216', '218',
  '220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239',
  '240', '241', '242', '243', '244', '245', '246', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '258', '260', '261',
  '262', '263', '264', '265', '266', '267', '268', '269', '290', '291', '297', '298', '299', '350', '351', '352', '353', '354', '355', '356',
  '357', '358', '359', '370', '371', '372', '373', '374', '375', '376', '377', '378', '380', '381', '382', '383', '385', '386', '387', '389',
  '420', '421', '423', '500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '590', '591', '592', '593', '594', '595', '596',
  '597', '598', '599', '670', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '685', '686', '687', '688',
  '689', '690', '691', '692', '850', '852', '853', '855', '856', '880', '886', '960', '961', '962', '963', '964', '965', '966', '967', '968',
  '970', '971', '972', '973', '974', '975', '976', '977', '992', '993', '994', '995', '996', '998',
]

export function validatePhone(phone) {
  if (!phone || !phone.trim()) {
    return 'Телефон обязателен для заполнения'
  }

  let cleanPhone = phone.trim().replace(/[\s-()]/g, '')

  if (!cleanPhone.startsWith('+')) {
    if (cleanPhone.startsWith('8')) {
      cleanPhone = '+7' + cleanPhone.slice(1)
    } else if (/^\d/.test(cleanPhone)) {
      cleanPhone = '+' + cleanPhone
    } else {
      return 'Телефон должен начинаться с + или цифры'
    }
  }

  const e164Regex = /^\+[1-9]\d{6,14}$/
  if (!e164Regex.test(cleanPhone)) {
    return 'Неверный формат телефона. Используйте формат: +7 (999) 123-45-67 или +39 123 456 7890'
  }

  const digitsOnly = cleanPhone.slice(1)
  let countryCode = ''

  for (let i = 1; i <= 3 && i <= digitsOnly.length; i++) {
    const code = digitsOnly.slice(0, i)
    if (validCountryCodes.includes(code)) {
      countryCode = code
      break
    }
  }

  if (!countryCode) {
    return 'Неверный код страны. Проверьте правильность ввода'
  }

  const numberPart = digitsOnly.slice(countryCode.length)
  if (numberPart.length < 6) {
    return 'Номер слишком короткий. Минимум 6 цифр после кода страны'
  }

  if (numberPart.length > 12) {
    return 'Номер слишком длинный. Максимум 12 цифр после кода страны'
  }

  if (countryCode === '7') {
    if (digitsOnly.length !== 11) {
      return 'Российский номер должен содержать 11 цифр: +7 (XXX) XXX-XX-XX'
    }
  } else if (countryCode === '1') {
    if (digitsOnly.length !== 11) {
      return 'Номер США/Канады должен содержать 11 цифр: +1 (XXX) XXX-XXXX'
    }
  } else if (countryCode === '39') {
    if (digitsOnly.length < 11 || digitsOnly.length > 12) {
      return 'Итальянский номер должен содержать 11-12 цифр после знака +: +39 XXX XXX XXXX'
    }
  }

  return ''
}

export function formatPhone(value) {
  if (!value) return ''

  let clean = value.replace(/[^\d+]/g, '')

  if (!clean.startsWith('+')) {
    if (clean.startsWith('8')) {
      clean = '+7' + clean.slice(1)
    } else if (clean.length > 0) {
      clean = '+' + clean
    }
  }

  if (clean.startsWith('+8')) {
    clean = '+7' + clean.slice(2)
  }

  if (clean.startsWith('+7')) {
    const digits = clean.slice(2).replace(/\D/g, '')
    if (digits.length === 0) return '+7'
    if (digits.length <= 3) return `+7 (${digits}`
    if (digits.length <= 6) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3)}`
    if (digits.length <= 8) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`
  }

  return clean
}

export function validateEmail(email) {
  if (!email || !email.trim()) {
    return ''
  }

  const trimmedEmail = email.trim().toLowerCase()
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  if (!emailRegex.test(trimmedEmail)) {
    return 'Введите корректный email адрес'
  }

  if (trimmedEmail.includes('..')) {
    return 'Email не может содержать двойные точки'
  }

  if (trimmedEmail.startsWith('.') || trimmedEmail.startsWith('@')) {
    return 'Email не может начинаться с точки или @'
  }

  const parts = trimmedEmail.split('@')
  if (parts.length !== 2) {
    return 'Email должен содержать один символ @'
  }

  const [localPart, domain] = parts

  if (localPart.length === 0 || localPart.length > 64) {
    return 'Локальная часть email слишком короткая или длинная'
  }

  if (localPart.endsWith('.') || localPart.startsWith('.')) {
    return 'Локальная часть не может начинаться или заканчиваться точкой'
  }

  if (domain.length === 0 || domain.length > 255) {
    return 'Домен слишком короткий или длинный'
  }

  if (!domain.includes('.')) {
    return 'Email должен содержать домен верхнего уровня (например, .com, .ru)'
  }

  return ''
}
