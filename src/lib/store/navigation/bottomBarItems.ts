import type { ScreenInterface } from '$lib/types/components';
import IoMdClipboard from 'svelte-icons/io/IoMdClipboard.svelte';
import MdHome from 'svelte-icons/md/MdHome.svelte';
import MdOndemandVideo from 'svelte-icons/md/MdOndemandVideo.svelte';
import MdSettings from 'svelte-icons/md/MdSettings.svelte';
import { writable } from 'svelte/store';

const appScreens: ScreenInterface[] = [
	{
		title: 'Inicio',
		icon: MdHome,
		active: true
	},
	{
		title: 'Sesiones',
		icon: IoMdClipboard,
		active: false
	},
	{
		title: 'Aprende',
		icon: MdOndemandVideo,
		active: false
	},
	{
		title: 'Ajustes',
		icon: MdSettings,
		active: false
	}
];

export const appScreensStore = writable(appScreens);
