<script lang="ts">
import { compute_rest_props } from "svelte/internal";


    export let quote: string
    export let firstname: string
    export let lastname: string
    export let imgSrc: string
</script>
<blockquote class={$$props.class}>
	<p>{quote}</p>
	<cite>{firstname}<span class="cite-last-name">{lastname}</span></cite>
	<div
		class="blockquote-author-image"
		style="--image: url('{imgSrc}')"
	/>
</blockquote>

<style>
	:root {
		--type-body: Open Sans, Helvetica, Arial, sans-serif;
		--type-quote: Vollkorn;
		--quote-image-width: 140px;
		--border-rad: 7px;
		--accent-color: var(--blue);
		--quote-bg: hsl(0 0% 97%);
	}

    p {
        color: var(--darkblack)
    }

	blockquote {
        margin: 0;
		position: relative;
		padding: 1.6em 2.4em 0.7em calc(1.4em + var(--quote-image-width));
		font: italic 1.2rem var(--type-quote);
		background: var(--quote-bg) no-repeat left / var(--quote-image-width);
		border-radius: var(--border-rad);
		border: 2px solid white;
		box-shadow: 2px 2px 4px hsl(0 0% 0% / 20%);
		text-indent: 1.6em;
	}

	blockquote::before {
		content: '';
		pointer-events: none;
		position: absolute;
		z-index: 1;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		border-radius: var(--border-rad);
		box-shadow: inset -2px -2px 1px hsl(0 0% 100%), inset 2px 2px 4px hsl(0 0% 0% / 20%);
	}

	blockquote::after {
		content: '❝';
		position: absolute;
		z-index: 1;
		left: 50%;
		top: -2px;
		transform: translate(-50%, -50%);
		width: 1.3em;
		height: 1.3em;
		background: white;
		box-shadow: 0 4px 5px -1px hsla(0 0% 0% / 20%);
		border-radius: 999px;
		display: grid;
		place-content: center;
		padding-top: 0.5em;
		color: var(--accent-color);
		font-size: 36px;
		font-style: normal;
		text-indent: 0;
	}

	.blockquote-author-image {
		position: absolute;
		left: 0;
		top: 0;
		width: var(--quote-image-width);
		height: 100%;
		opacity: 0.75;
		background: var(--accent-color) var(--image) no-repeat center / cover;
		background-blend-mode: hard-light;
		border-top-left-radius: var(--border-rad);
		border-bottom-left-radius: var(--border-rad);
	}

	cite {
		display: block;
		margin-top: 30px;
		text-indent: 0;
		text-align: center;
		font: bold 0.9rem var(--type-body);
		text-transform: uppercase;
		color: hsl(0 0% 20%);
	}

	@media (min-width: 768px) {
		cite {
			margin-left: calc(1rem - var(--quote-image-width));
		}
	}

	.cite-last-name {
		background: var(--accent-color);
		color: var(--quote-bg);
	}
</style>
