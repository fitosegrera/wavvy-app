import { PUBLIC_SOCKET_SERVER_URL } from '$env/static/public';

export const sendPushNotification = async (
	route: string,
	subscription: PushSubscription,
	payload: string
) => {
	try {
		await fetch(`${PUBLIC_SOCKET_SERVER_URL}${route}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ subscription, payload })
		});
	} catch (error) {
		console.error('Error sending push notification:', error);
	}
};
