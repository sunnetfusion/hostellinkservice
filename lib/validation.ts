export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+234|0)?[789][01]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export const validateRequired = (value: string | number | undefined | null): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== undefined && value !== null;
};

export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

export const validateNumber = (value: string | number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && isFinite(num);
};

export const validateMinValue = (value: string | number, minValue: number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num >= minValue;
};

export const validateMaxValue = (value: string | number, maxValue: number): boolean => {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return !isNaN(num) && num <= maxValue;
};

export const validateDate = (date: string): boolean => {
  const dateObj = new Date(date);
  return dateObj instanceof Date && !isNaN(dateObj.getTime());
};

export const validateFutureDate = (date: string): boolean => {
  const dateObj = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateObj >= today;
};

export const validateBookingForm = (data: {
  inspectionDate: string;
  inspectionTime: string;
  fullName: string;
  email: string;
  phone: string;
  message?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Required fields
  if (!validateRequired(data.inspectionDate)) {
    errors.push({ field: 'inspectionDate', message: 'Inspection date is required' });
  } else if (!validateDate(data.inspectionDate)) {
    errors.push({ field: 'inspectionDate', message: 'Please enter a valid date' });
  } else if (!validateFutureDate(data.inspectionDate)) {
    errors.push({ field: 'inspectionDate', message: 'Inspection date must be in the future' });
  }

  if (!validateRequired(data.inspectionTime)) {
    errors.push({ field: 'inspectionTime', message: 'Inspection time is required' });
  }

  if (!validateRequired(data.fullName)) {
    errors.push({ field: 'fullName', message: 'Full name is required' });
  } else if (!validateMinLength(data.fullName, 2)) {
    errors.push({ field: 'fullName', message: 'Full name must be at least 2 characters' });
  } else if (!validateMaxLength(data.fullName, 100)) {
    errors.push({ field: 'fullName', message: 'Full name must be less than 100 characters' });
  }

  if (!validateRequired(data.email)) {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!validateRequired(data.phone)) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid Nigerian phone number' });
  }

  if (data.message && !validateMaxLength(data.message, 500)) {
    errors.push({ field: 'message', message: 'Message must be less than 500 characters' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateCaretakerForm = (data: {
  name: string;
  location: string;
  price: string;
  roomType: string;
  facilities: string[];
  description: string;
  photos: File[];
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Required fields
  if (!validateRequired(data.name)) {
    errors.push({ field: 'name', message: 'Apartment name is required' });
  } else if (!validateMinLength(data.name, 2)) {
    errors.push({ field: 'name', message: 'Apartment name must be at least 2 characters' });
  } else if (!validateMaxLength(data.name, 100)) {
    errors.push({ field: 'name', message: 'Apartment name must be less than 100 characters' });
  }

  if (!validateRequired(data.location)) {
    errors.push({ field: 'location', message: 'Location is required' });
  } else if (!validateMinLength(data.location, 5)) {
    errors.push({ field: 'location', message: 'Location must be at least 5 characters' });
  }

  if (!validateRequired(data.price)) {
    errors.push({ field: 'price', message: 'Price is required' });
  } else if (!validateNumber(data.price)) {
    errors.push({ field: 'price', message: 'Price must be a valid number' });
  } else if (!validateMinValue(data.price, 10000)) {
    errors.push({ field: 'price', message: 'Price must be at least ₦10,000' });
  } else if (!validateMaxValue(data.price, 10000000)) {
    errors.push({ field: 'price', message: 'Price must be less than ₦10,000,000' });
  }

  if (!validateRequired(data.roomType)) {
    errors.push({ field: 'roomType', message: 'Room type is required' });
  }

  if (data.facilities.length === 0) {
    errors.push({ field: 'facilities', message: 'Please select at least one facility' });
  }

  if (!validateRequired(data.description)) {
    errors.push({ field: 'description', message: 'Description is required' });
  } else if (!validateMinLength(data.description, 20)) {
    errors.push({ field: 'description', message: 'Description must be at least 20 characters' });
  } else if (!validateMaxLength(data.description, 1000)) {
    errors.push({ field: 'description', message: 'Description must be less than 1000 characters' });
  }

  if (data.photos.length === 0) {
    errors.push({ field: 'photos', message: 'Please upload at least one photo' });
  } else if (data.photos.length > 10) {
    errors.push({ field: 'photos', message: 'Maximum 10 photos allowed' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateContactForm = (data: {
  name: string;
  email: string;
  message: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!validateRequired(data.name)) {
    errors.push({ field: 'name', message: 'Name is required' });
  } else if (!validateMinLength(data.name, 2)) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters' });
  }

  if (!validateRequired(data.email)) {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!validateRequired(data.message)) {
    errors.push({ field: 'message', message: 'Message is required' });
  } else if (!validateMinLength(data.message, 10)) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters' });
  } else if (!validateMaxLength(data.message, 1000)) {
    errors.push({ field: 'message', message: 'Message must be less than 1000 characters' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
