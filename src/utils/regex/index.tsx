const alphaSpaces = /^[a-zA-Z ]*$/
const alphaNumeric = /^[a-zA-Z0-9]*$/
const phonePattern = /^[0-9 ()+-]+$/
const numericPattern = /^[0-9]*$/
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/
const brandFilterSearchPattern = /[^a-zA-Z0-9 ]/gi
const alphaInputPattern = /[^a-zA-Z ]/gi
const notSpaceOnlyPattern = /^(?!\s+$).*/ // dissalow space only
const domainPattern = /^[a-z-]+$/
const spaceAtBeginning = /^(?!\s)[a-zA-Z0-9_\s-]*$/ // dissalow space at beginning
const emailPattern = /^[\w\\.-]+@[\w\\.-]+\.\w+$/
const emailPatterns = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const pageWithlist = /^(Home|Performance|Incentive|Chart|SMP Status|Profile|Booking-asset)/

export {
  alphaSpaces,
  phonePattern,
  passwordPattern,
  brandFilterSearchPattern,
  alphaInputPattern,
  alphaNumeric,
  numericPattern,
  notSpaceOnlyPattern,
  domainPattern,
  spaceAtBeginning,
  emailPattern,
  pageWithlist,
  emailPatterns,
}
