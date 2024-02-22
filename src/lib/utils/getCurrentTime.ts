export const getCurrentTime = (seconds: number) => {
	// Calculate hours, minutes, and remaining seconds
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	// Add leading zeros if necessary
	const formattedHours = hours < 10 ? '0' + hours : hours;
	const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
	const formattedSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;

	// Return formatted time
	return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds;
};
