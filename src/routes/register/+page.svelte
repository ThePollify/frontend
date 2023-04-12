<script lang="ts">
	let username = '';
	let password = '';

	let usernameValid = true;
	let passwordValid = true;

	async function submit() {
		usernameValid = !!username;
		passwordValid = !!password;

		if (!usernameValid || !passwordValid) return;

		const res = await fetch('https://pollify.igorek.dev/account/register', {
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

		const json = await res.json();
		alert(JSON.stringify(json));
	}
</script>

<div class="d-flex min-vh-100">
	<div class="form-signin w-100 m-auto">
		<h1 class="h3 mb-3 fw-normal">Регистрация</h1>

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

		<button class="w-100 mt-3 btn btn-lg btn-primary" on:click={submit}>Зарегистрироваться</button>
	</div>
</div>

<style>
	.form-signin {
		max-width: 360px;
	}
</style>
