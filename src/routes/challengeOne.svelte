<script lang="ts">
	import { onMount } from 'svelte';
	import QrCode from '../components/challenges/qr.svelte';
	let mouse = {
		x: 0,
		y: 0
	};
	let moveDiv;
	let screenDiv;
	let success = false;
	onMount(() => {
		screenDiv.addEventListener('mousemove', setMouse);
	});
	function setMouse(event) {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	}
	function getRandomInt(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
	}
	function hardMode() {
		const xVals = [
			getRandomInt(mouse.x - 350, mouse.x - 10),
			getRandomInt(mouse.x + 10, mouse.x + 350)
		];
		const yVals = [
			getRandomInt(mouse.y - 350, mouse.y - 10),
			getRandomInt(mouse.y + 10, mouse.y + 350)
		];
		const xPos = xVals[Math.floor(Math.random() * xVals.length)];
		const yPos = yVals[Math.floor(Math.random() * yVals.length)];
		moveDiv.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
		requestAnimationFrame(updatePosition);
	}
	function easyMode() {
		const xPos = mouse.x - 50;
		const yPos = mouse.y - 50;
		moveDiv.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
		requestAnimationFrame(easyMode);
	}
	let updatePosition = hardMode;
	function switchMode() {
		updatePosition = updatePosition === easyMode ? hardMode : easyMode;
	}
</script>

<svelte:head>
	<title>Techytechster - Powerpoint Slides</title>
	<meta property="og:title" content="Jonathan's Powerpoint Slides" />
	<meta property="og:description" content="See my powerpoint slides from the grad thing" />
</svelte:head>
<div class="h-screen w-screen" bind:this={screenDiv} on:mousemove={updatePosition}> <!-- get creative with the console :) -->
	<div class="inline-block" bind:this={moveDiv}>
		<h2 class="text-4xl inline-block cursor-pointer hover:bg-red-700 select-none" on:click={() => { success = true }}>Click Me For Slides</h2>
	</div>
	{#if success}
		<div
			class="absolute top-0 left-0 bottom-0 right-0 w-screen h-screen flex justify-center items-center"
		>
			<div style="width: 200px;">
				<QrCode />
			</div>
		</div>
	{/if}
</div>
<button
	class="absolute top-0 left-0 right-0"
	on:click={() => {
		switchMode();
	}}
>
	{#if updatePosition === hardMode}
		ez mode plz
	{/if}
	{#if updatePosition === easyMode}
		ok hard mode was quite funny
	{/if}
</button>
