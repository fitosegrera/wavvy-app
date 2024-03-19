export const requestNotificationPermission = async () => {
	const permission = await window.Notification.requestPermission();
	// value of permission can be 'granted', 'default', 'denied'
	// granted: user has accepted the request
	// default: user has dismissed the notification permission popup by clicking on x
	// denied: user has denied the request.
	return permission;
};
