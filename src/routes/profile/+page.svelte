<script lang="ts">
	import { goto } from '$app/navigation';
	import { toast } from '@zerodevx/svelte-toast';
	import { token } from '../../stores';

	$: if ($token === null) goto('/login');

	let data: any | null = null;
	let username = '';
	let password = '';
	let files: FileList | null = null;

	let usernameValid = true;
	let passwordValid = true;
	let fileValid = true;

	async function changeUsername(): Promise<void> {
		if (!username) usernameValid = false;
		else usernameValid = true;

		if (!usernameValid) return;

		const res = await fetch('https://pollify.igorek.dev/api/v1/account/update/username', {
			method: 'PUT',
			body: JSON.stringify({
				username: username
			}),
			headers: {
				'X-Token': $token!,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (res.status == 200) {
			const json = await res.json();
			data.username = json.username;
			username = '';
			toast.push('Имя пользователя успешно изменено!');
		} else if (res.status == 400) {
			toast.push('Пользователь с таким именем уже существует.');
		}
	}

	async function changePassword(): Promise<void> {
		if (!password) passwordValid = false;
		else passwordValid = true;

		if (!passwordValid) return;

		const res = await fetch('https://pollify.igorek.dev/api/v1/account/update/password', {
			method: 'PUT',
			body: JSON.stringify({
				password: password
			}),
			headers: {
				'X-Token': $token!,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (res.status == 200) {
			const json = await res.json();
			$token = json.token;
			password = '';
			toast.push('Пароль успешно изменен!');
		}
	}

	async function changeImage(): Promise<void> {
		if (!files) fileValid = false;
		else fileValid = true;

		if (!fileValid) return;

		let body = new FormData();
		body.append('file', files[0], files[0].name);

		const res = await fetch('https://pollify.igorek.dev/api/v1/account/update/image', {
			method: 'PUT',
			body: body,
			headers: {
				'X-Token': $token!,
				Accept: 'application/json'
			}
		});

		console.log(await res.text());

		if (res.status == 200) {
			files = null;
			toast.push('Фото профиля успешно изменено!');
		}
		if (res.status == 400) {
			files = null;
			fileValid = false;
		}
	}

	async function deleteAccount(): Promise<void> {
		const res = await fetch('https://pollify.igorek.dev/api/v1/account/delete', {
			method: 'DELETE',
			headers: {
				'X-Token': $token!
			}
		});

		if (res.status == 200) {
			$token = null;
		}
	}

	function logout(): void {
		$token = null;
	}

	fetch('https://pollify.igorek.dev/api/v1/account/me', {
		method: 'GET',
		headers: {
			'X-Token': $token!
		}
	})
		.then((data) => data.json())
		.then((json) => {
			data = json;
		});
</script>

{#if data === null}
	<div class="min-vh-100 justify-content-center d-flex align-items-center">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Загрузка...</span>
		</div>
	</div>
{:else}
	<div class="container mt-4">
		<img
			src="https://pollify.igorek.dev/api/v1/account/get/image?user_id={data.id}"
			class="avatar rounded me-5"
			alt="Avatar"
		/>
		<h2 class="mb-4 d-inline">Настройка профиля {data.username}</h2>

		<hr />

		<form class="mt-4 d-flex flex-sm-row flex-column">
			<div class="mt-2">
				<input
					type="text"
					class={usernameValid ? 'form-control' : 'form-control is-invalid'}
					id="username"
					placeholder="Новое имя пользователя"
					bind:value={username}
				/>
				<div class="invalid-feedback">Неправильный формат имени пользователя</div>
			</div>
			<button class="mt-2 ms-sm-2 btn btn-secondary" type="submit" on:click={changeUsername}
				>Изменить имя пользователя</button
			>
		</form>

		<form class="mt-2 d-flex flex-sm-row flex-column">
			<div class="mt-sm-2 mt-4">
				<input
					type="password"
					class={passwordValid ? 'form-control' : 'form-control is-invalid'}
					id="password"
					placeholder="Новый пароль"
					bind:value={password}
				/>
				<div class="invalid-feedback">Неправильный формат имени пользователя</div>
			</div>
			<button class="mt-2 ms-sm-2 btn btn-secondary" type="submit" on:click={changePassword}
				>Изменить пароль</button
			>
		</form>

		<form class="mt-2 d-flex flex-sm-row flex-column">
			<div class="mt-sm-2 mt-4">
				<input
					type="file"
					class={fileValid ? 'form-control' : 'form-control is-invalid'}
					id="file"
					accept="image/png"
					bind:files
				/>
				<div class="invalid-feedback">Неправильный формат изображения</div>
			</div>
			<button class="mt-2 ms-sm-2 btn btn-secondary" type="submit" on:click={changeImage}
				>Изменить фото профиля</button
			>
		</form>

		<button class="mt-4 btn btn-danger" on:click={logout}>Выйти из аккаунта</button>
		<button class="mt-4 btn btn-outline-danger" on:click={deleteAccount}>Удалить аккаунт</button>
	</div>
{/if}

<style>
	.avatar {
		width: 100px;
		height: 100px;
	}
</style>
