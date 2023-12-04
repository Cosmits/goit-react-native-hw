const globalRegex = {
  timeRegex: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
  dateRegex: /^20[0-2][0-9]-((0[1-9])|(1[0-2]))-(0[1-9]|[1-2][0-9]|3[0-1])$/,

  loginRegexp: /^([a-zA-Z0-9-=_!@]+)(\s[a-zA-Z0-9-=_!@]+)?$/,
  emailRegexp: /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9_-]+).([a-zA-Z]{2,5})$/,
  passwordRegexp: /^(?=.*\d)[A-Za-z\d]{6,}$/,
}

export default globalRegex