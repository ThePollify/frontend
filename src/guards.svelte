<script lang="ts">
	import { token } from './stores';
	import { goto } from '$app/navigation';

	export function unauthenticatedOnlyGuard() {
		if ($token) goto('/');
	}

	export function authenticatedOnlyGuard() {
		if (!$token) goto('/login');
	}
</script>
