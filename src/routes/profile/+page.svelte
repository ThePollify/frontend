<script lang="ts">
	import { goto } from '$app/navigation';
	import { token } from '../../stores';

	$: if ($token === null) goto('/login');

	let data: object | null = null;

	fetch('https://pollify.igorek.dev/account/me', {
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
	<div class="container" />
{/if}
