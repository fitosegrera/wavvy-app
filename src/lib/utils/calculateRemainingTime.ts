export const calculateRemainingTime = (initialDate: Date, totalHours: number) => {
	// Parse the initial date
	const startDate = new Date(initialDate);

	// Calculate the end date by adding total hours to the initial date
	const endDate = new Date(startDate.getTime() + totalHours * 60 * 60 * 1000);

	// Get the current date and time
	const currentDate = new Date();

	// Calculate the remaining time in milliseconds
	const remainingTime = endDate.getTime() - currentDate.getTime();

	// Check if the remaining time is negative (i.e., the time has already passed)
	if (remainingTime < 0) {
		return 'Time over';
	}

	// Convert remaining time to hours, minutes, and seconds
	const remainingHours = Math.floor(remainingTime / (60 * 60 * 1000));
	const remainingMinutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
	const remainingSeconds = Math.floor((remainingTime % (60 * 1000)) / 1000);

	const result = `${remainingHours} hours, ${remainingMinutes} minutes, and ${remainingSeconds} seconds remaining`;
	// console.log(result);

	return result;
};
