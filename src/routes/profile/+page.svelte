<script lang="ts">
	import authenticatedOnlyGuard from '../../guards.svelte';
	$: authenticatedOnlyGuard;
</script>
