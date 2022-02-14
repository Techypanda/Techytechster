<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url }) => ({ props: { url } });
</script>

<script>
	import PageTransition from '../components/shared/pagetransition.svelte';
	import '../app.css';
	export let url;
</script>

<PageTransition {url}>
	<slot />
</PageTransition>
