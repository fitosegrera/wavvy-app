import MdHome from 'svelte-icons/md/MdHome.svelte';
import MdPlaylistAddCheck from 'svelte-icons/md/MdPlaylistAddCheck.svelte';
import MdRateReview from 'svelte-icons/md/MdRateReview.svelte';
import { writable } from 'svelte/store';

const sidebarOpen = writable(false);

const data = writable([
	{
		section: 'Menu',
		content: [
			{
				title: 'Home',
				icon: MdHome,
				link: '/',
				active: false
			},
			{
				title: 'Orders',
				icon: MdPlaylistAddCheck,
				link: '/',
				active: true
			},
			{
				title: 'Reviews',
				icon: MdRateReview,
				link: '/',
				active: false
			}
		]
	}
]);

const openSidebar = () => {
	sidebarOpen.update(() => true);
};

const closeSidebar = () => {
	sidebarOpen.update(() => false);
};

export { closeSidebar, data, openSidebar, sidebarOpen };
