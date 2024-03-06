<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button, FlexBox, Text } from '$lib/components';
	import { auth } from '$lib/firebase';
	import { isLoading } from '$lib/store/auth';
	import { closeModal, updateModal } from '$lib/store/overlays/modal';
	import type { ModalPropsInterface } from '$lib/types/components';
	import { deleteUser, signOut, type User } from 'firebase/auth';

	const handleLogout = () => {
		const newModalProps: ModalPropsInterface = {
			open: true,
			title: 'Cerrar sesión',
			content: 'Seguro que deseas cerrar sesión?',
			actions: {
				primary: {
					label: 'Confirm',
					action: () => {
						console.log('logging out');
						signOut(auth)
							.then(() => {
								goto('/get-started');
								updateModal({
									open: false,
									title: '',
									content: '',
									actions: {
										primary: null,
										secondary: null
									}
								});
								$isLoading = false;
							})
							.catch((error) => {
								// An error happened.
								$isLoading = false;
							});
					}
				},
				secondary: {
					label: 'Cancel',
					action: () => {
						closeModal();
					}
				}
			}
		};
		updateModal(newModalProps);
	};

	const handleDelete = () => {
		const newModalProps: ModalPropsInterface = {
			open: true,
			title: 'Eliminar cuenta',
			content: 'Seguro que deseas eliminar tu cuenta?',
			actions: {
				primary: {
					label: 'Confirmar',
					action: () => {
						console.log('deleting account');
						deleteUser(auth.currentUser as User)
							.then(() => {
								goto('/get-started');
								closeModal();
							})
							.catch((error) => {
								// An error happened.
								console.error(error);
							});
					}
				},
				secondary: {
					label: 'Cancelar',
					action: () => {
						closeModal();
					}
				}
			}
		};
		updateModal(newModalProps);
	};
</script>

<FlexBox intent="flexColCenter" px="xsmall" class="">
	<FlexBox py="small" class="w-full border-b-[1.5px] border-on-surface-light/60">
		<Button
			intent="text"
			fullWidth
			size="large"
			class="flex items-center justify-center gap-[8px] max-w-fit ">
			<Text class="text-on-surface-light">Mi perfil</Text>
		</Button>
	</FlexBox>
	<FlexBox py="small" class="w-full border-b-[1.5px] border-on-surface-light/60">
		<Button
			intent="text"
			fullWidth
			size="large"
			class="flex items-center justify-center gap-[8px] max-w-fit"
			onClick={() => {
				console.log('clicked');
				handleLogout();
			}}>
			<Text class="text-primary">Cerrar sesión</Text>
		</Button>
	</FlexBox>
	<FlexBox py="small" class="w-full border-b-[1.5px] border-on-surface-light/60">
		<Button
			intent="text"
			fullWidth
			size="large"
			class="flex items-center justify-center gap-[8px] max-w-fit"
			onClick={() => {
				console.log('clicked');
				handleDelete();
			}}>
			<Text class="text-primary">Eliminar cuenta</Text>
		</Button>
	</FlexBox>
</FlexBox>
