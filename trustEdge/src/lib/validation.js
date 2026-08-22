// Shared Validation Helpers

export const validateFullName = (name) => {
  if (!name?.trim()) return "Full name is required";
  if (name.trim().length < 3) return "Full name must be at least 3 characters long";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Full name can only contain letters and spaces";
  return null;
};

export const validateDob = (dob) => {
  if (!dob) return "Date of Birth is required";
  const dobDate = new Date(dob);
  const today = new Date();
  if (dobDate > today) return "Date of Birth cannot be in the future";

  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  if (age < 18) return "User must be at least 18 years old";
  return null;
};

export const validateMobileNumber = (mobileNumber) => {
  if (!mobileNumber) return "Mobile number is required";
  if (mobileNumber.length !== 10) return "Mobile number must be exactly 10 digits";
  if (!/^[6-9]\d{9}$/.test(mobileNumber)) return "Please enter a valid 10-digit mobile number starting with 6-9";
  return null;
};

export const validateEmail = (email) => {
  if (!email) return "Email address is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address (e.g. name@domain.com)";
  return null;
};

export const validatePanNumber = (pan) => {
  if (!pan) return "PAN number is required";
  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan.toUpperCase())) return "Please enter a valid PAN number (e.g. ABCDE1234F)";
  return null;
};

export const validateAadhaarNumber = (aadhaar) => {
  if (!aadhaar) return "Aadhaar number is required";
  if (aadhaar.length !== 12) return "Aadhaar number must be exactly 12 digits";
  if (!/^\d{12}$/.test(aadhaar)) return "Aadhaar number must contain only numbers";
  return null;
};

export const validateChequeNumber = (chequeNum) => {
  if (!chequeNum) return "Cheque number is required";
  if (!/^\d{6}$/.test(chequeNum)) return "Cheque number must be exactly 6 digits";
  return null;
};

export const validateVehicleNumber = (vehicleNum) => {
  if (!vehicleNum?.trim()) return "Vehicle number is required";
  const stripped = vehicleNum.replace(/\s+/g, "");
  if (!/^[A-Za-z0-9]{10}$/.test(stripped)) {
    return "Vehicle number must be exactly 10 alphanumeric characters (e.g., MH12AB1234)";
  }
  return null;
};

export const validateAddress = (address) => {
  if (!address?.trim()) return "Address is required";
  if (address.trim().length < 5) return "Address must be at least 5 characters long";
  return null;
};

export const validateCity = (city) => {
  if (!city?.trim()) return "City is required";
  if (!/^[A-Za-z\s]+$/.test(city)) return "City can only contain letters and spaces";
  return null;
};

export const validateState = (state) => {
  if (!state?.trim()) return "State is required";
  if (!/^[A-Za-z\s]+$/.test(state)) return "State can only contain letters and spaces";
  return null;
};

export const validatePinCode = (pinCode) => {
  if (!pinCode) return "PIN Code is required";
  if (pinCode.length !== 6) return "PIN Code must be exactly 6 digits";
  if (!/^\d{6}$/.test(pinCode)) return "PIN Code must contain only numbers";
  return null;
};

