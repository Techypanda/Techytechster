<script lang="ts">
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

<div class="container mx-auto flex justify-center items-center h-screen">
	<div>
		<div class="flex justify-center items-center gap-10">
			<div>
				<img id="profile" src={USERPROFILESRC} alt="me" width="150" height="150" />
			</div>
			<div class="flex justify-center items-center">
				<div>
					<h1>Jonathan <span id="lastname">Wright</span></h1>
					<h2>Software Engineer - <a href="https://sre.google/">SRE</a> - DevOps</h2>
				</div>
			</div>
		</div>
		<div class="mt-12 flex justify-around">
			<a href="https://blog.techytechster.com/" class="text-sm">Blog</a>
			<a href="/projects" class="text-sm">Projects</a>
			<a href="mailto: jonathan_wright@hotmail.com" class="text-sm">Contact</a>
		</div>
	</div>
</div>

<style>
	#lastname {
		color: var(--blue);
	}
    #xkcd {
        margin: 15px auto 0 auto;
        object-fit: contain;
        max-height: 100px;
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
