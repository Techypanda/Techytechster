<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url }) => ({ props: { url } });
</script>

<script lang="ts">
	import { fly } from 'svelte/transition';
	export let url;
</script>


<svelte:body id="TEST" />
<div class="overflow-hidden">
	{#key url}
		<div
			in:fly={{ delay: 100, duration: 200, y: -10 }}
			out:fly={{ duration: 100, y: 10 }}
		>
			<slot />
		</div>
	{/key}
</div>