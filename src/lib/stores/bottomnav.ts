import MdHome from 'svelte-icons/md/MdHome.svelte';
import MdInsertDriveFile from 'svelte-icons/md/MdInsertDriveFile.svelte';
import MdSettings from 'svelte-icons/md/MdSettings.svelte';
import { writable } from 'svelte/store';

const bottomNavOpen = writable(false);

const data = writable([
	{
		title: 'Inicio',
		icon: MdHome,
		active: true
	},
	{
		title: 'Sesiones',
		icon: MdInsertDriveFile,
		active: false
	},
	{
		title: 'Ajustes',
		icon: MdSettings,
		active: false
	}
]);

const openBottomNav = () => {
	bottomNavOpen.update(() => true);
};

const closeBottomNav = () => {
	bottomNavOpen.update(() => false);
};

export { bottomNavOpen, closeBottomNav, data, openBottomNav };
