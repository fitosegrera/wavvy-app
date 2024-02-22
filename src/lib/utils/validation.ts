export const validateEmail = (email: string) => {
	// Regular expression for a simple email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Check if the email matches the regular expression
	return email.length > 0 && emailRegex.test(email);
};

export const validateName = (name: string) => {
	// Regular expression for a simple name validation
	const nameRegex = /^[a-zA-Z]+$/;

	// Check if the name matches the regular expression
	return name.length > 2 && nameRegex.test(name);
};

export const validatePassword = (password: string) => {
	// Check if the password contains at least one number, one lowercase letter, one uppercase letter, and one special character
	const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).*$/;
	return password.length >= 6 && regex.test(password);
};
