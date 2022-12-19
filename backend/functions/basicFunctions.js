const isValidPhoneNumber = (phoneNumber) => {
  const strippedPhoneNumber = phoneNumber.replace(/[^\d]/g, "");

  if (strippedPhoneNumber.length < 11 || strippedPhoneNumber.length > 13) {
    return false;
  }

  if (
    !strippedPhoneNumber.startsWith("92") &&
    !strippedPhoneNumber.startsWith("0")
  ) {
    return false;
  }

  for (let i = 0; i < strippedPhoneNumber.length; i++) {
    if (
      strippedPhoneNumber[i] === strippedPhoneNumber[i + 1] &&
      strippedPhoneNumber[i] === strippedPhoneNumber[i + 2]
    ) {
      return false;
    }
  }

  return true;
};

export { isValidPhoneNumber };
