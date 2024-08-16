export const prefixWithZero = (originalNumber: number | string) => {
  return `0${originalNumber}`.slice(-2)
}
