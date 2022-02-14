<div class="container mx-auto">
	<h2 class="text-center">Here's Some Cool (Public) Project's I've Worked On Recently</h2>
	<h3 class="text-xl ">
		<a href="https://github.com/Techypanda/Interactive-Study-Planner" class="blue"
			>Interactive Study Planner</a
		>
	</h3>
	<p class="mb-3">
		The interactive study planner was my university capstone project, it is a open source full
		featured courseplanner that allows you to load in data via the admin portal (which is secured by
		AWS Cognito), then plan out a course on the public frontend. A live demo is currently <a
			class="blue" href="https://dev.courseplanner.tech">hosted by my university professor</a
		> (for how long is a good question). The courseplanner involved a golang/python/node serverless backend
		using AWS lambda + API Gateway and two react frontends (strongly typed with Typescript).
	</p>
    <img class="w-full object-fill" src="courseplanner.PNG" alt="A Screenshot Of Courseplanner" />
    <h3 class="mt-12 text-xl ">
		<a href="https://github.com/Techypanda/Golang-Video-API" class="blue"
			>Golang Video API</a
		>
	</h3>
    <p class="mb-3">
		This project was fueled by a interest to be able to post links into discord and have funny videos randomly
        returned via the og:video attribute, i.e I could post the same link and it would always be different. However
        discord caches videos so this ended up just really being a way you could proxy videos e.g. TikTok, Youtube, etc.
        There is a admin backend (secured by just a single password configured in environment variable) and a frontend which
        just returns the videos randomly, you can also go ahead and browse to a specific video by entering the guid. The video
        api was written using Golang, Docker and Redis.
	</p>
    <img class="w-full object-fill" src="AdminSite.png" alt="A Screenshot Of Admin Site For Video API" />
</div>

<style>
	.blue {
		color: var(--blue);
	}
</style>
