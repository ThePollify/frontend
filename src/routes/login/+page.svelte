<script lang="ts">
	import { toast } from '@zerodevx/svelte-toast';
	import { token } from '../../stores';
	import { goto } from '$app/navigation';

	$: if ($token !== null) goto('/');

	let username = '';
	let password = '';

	async function submit() {
		const res = await fetch('https://pollify.igorek.dev/account/login', {
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
		} else if (res.status == 403) {
			toast.push('Неверное имя пользователя или пароль.');
		}
	}
</script>

<div class="d-flex min-vh-100">
	<div class="form-signin w-100 m-auto">
		<h1 class="h3 mb-3 fw-normal">Авторизация</h1>

		<form>
			<div class="form-floating">
				<input
					type="text"
					class="form-control"
					id="username"
					placeholder="username"
					bind:value={username}
				/>
				<label for="username">Имя пользователя</label>
			</div>
			<div class="form-floating mt-2">
				<input
					type="password"
					class="form-control"
					id="password"
					placeholder="password"
					bind:value={password}
				/>
				<label for="password">Пароль</label>
			</div>
			<button class="w-100 mt-3 btn btn-lg btn-primary" type="submit" on:click={submit}
				>Авторизоваться</button
			>

			<p class="mt-3">Нет аккаунта? <a href="/register">Зарегистрироваться</a></p>
		</form>
	</div>
</div>

<style>
	.form-signin {
		max-width: 360px;
	}
</style>
