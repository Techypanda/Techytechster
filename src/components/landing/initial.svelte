<script lang="ts">
	import Icon from '../shared/Icon.svelte';
	// import Contact from '../../icons/alternate_email_white_24dp.svg';
	// import { fade } from 'svelte/transition';
	const USERPROFILESRC = 'https://avatars.githubusercontent.com/u/37826825';
	/* async function xkcd() {
		try {
			const fet = await fetch('https://xkcd.vercel.app/?comic=latest');
			const data = await fet.json();
			const latest: number = data['num'];
			const toGet = Math.floor(Math.random() * (latest - 1 + 1) + 1);
			const fet2 = await fetch(`https://xkcd.vercel.app/?comic=${toGet}`);
            const data2 = await fet2.json();
            return data2;
		} catch (err) {
			console.error(err);
		}
	} */
	// let promise = xkcd();
</script>

<div class="container mx-auto flex justify-center items-center h-screen p-5">
	<div>
		<div class="flex justify-center items-center gap-10">
			<div>
				<img id="profile" src={USERPROFILESRC} alt="me" width="150" height="150" />
			</div>
			<div class="flex justify-center items-center">
				<div>
					<h1 class="font-black text-3xl">Jonathan <span id="lastname">Wright</span></h1>
					<h2>Software Engineer - <a href="https://sre.google/">SRE</a> - DevOps</h2>
					<div id="discordgame" class="rounded-2xl px-3 py-2 mt-3">
						<h3 class="text-xs font-bold gamealert">PLAYING A GAME</h3>
						<div class="flex mt-1 items-center">
							<img
								src="mcgrass.png"
								width="40px"
								height="40px"
								id="minecraft"
								class="mr-3"
								alt="grass block minecraft"
							/>
							<div>
								<h4 class="text-sm font-medium">Minecraft</h4>
								<p class="text-xs font-thin">for 10 hours</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-12 flex justify-around">
			<a href="https://blog.techytechster.com/" class="text-sm lggray px-8 py-3 rounded-xl">
				<Icon name="blog" class="inline" />
				<h4 class="inline">Blog</h4>
			</a>
			<a href="/projects" class="text-sm lggray px-8 py-3 rounded-xl">
				<Icon name="code" class="inline" />
				<h4 class="inline">Projects</h4>
			</a>
			<a href="mailto: jonathan_wright@hotmail.com" class="text-sm lggray px-8 py-3 rounded-xl">
				<Icon name="email" class="inline" />
				<h4 class="inline">Contact</h4>
			</a>
		</div>
	</div>
</div>

<style>
	#lastname {
		color: var(--blue);
	}
	.gamealert {
		color: #aeafb2;
	}
	#discordgame {
		background-color: var(--darkblack);
		max-width: 180px;
	}
	.lggray {
		background-color: var(--gray);
	}
	h1 {
		margin: 0;
	}
	h2 {
		margin: 0;
	}
	a {
		text-decoration: none;
	}
	#profile {
		border-radius: 100%;
	}
</style>
