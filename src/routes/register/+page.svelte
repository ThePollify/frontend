<script lang="ts">
	import { token } from '../../stores';
	import { toast } from '@zerodevx/svelte-toast';
	import { goto } from '$app/navigation';

	$: if ($token !== null) goto('/');

	let username = '';
	let password = '';

	let usernameValid = true;
	let passwordValid = true;

	async function submit() {
		usernameValid = !!username;
		passwordValid = !!password;

		if (!usernameValid || !passwordValid) return;

		const res = await fetch('https://pollify.igorek.dev/api/v1/account/register', {
			method: 'POST',
			body: JSON.stringify({
				username: username,
				password: password
			}),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});

		if (res.status == 200) {
			const json = await res.json();
			$token = json.token;
		} else if (res.status == 400) {
			toast.push('Пользователь с таким именем уже существует.');
		}
	}
</script>

<div class="d-flex min-vh-100">
	<div class="form-signin w-100 m-auto">
		<h1 class="h3 mb-3 fw-normal">Регистрация</h1>

		<form>
			<div class="form-floating">
				<input
					type="text"
					class={usernameValid ? 'form-control' : 'form-control is-invalid'}
					id="username"
					placeholder="username"
					bind:value={username}
				/>
				<label for="username">Имя пользователя</label>
				<div class="invalid-feedback">Неправильный формат имени пользователя</div>
			</div>
			<div class="form-floating mt-2">
				<input
					type="password"
					class={passwordValid ? 'form-control' : 'form-control is-invalid'}
					id="password"
					placeholder="password"
					bind:value={password}
				/>
				<label for="password">Пароль</label>
				<div class="invalid-feedback">Неправильный формат пароля</div>
			</div>
			<button class="w-100 mt-3 btn btn-lg btn-primary" type="submit" on:click={submit}
				>Зарегистрироваться</button
			>

			<p class="mt-3">Уже есть аккаунт? <a href="/login">Авторизоваться</a></p>
		</form>
	</div>
</div>

<style>
	.form-signin {
		max-width: 360px;
	}
</style>
