<script>
	import 'iconify-icon';

	const entries = [
		{
			name: 'Home',
			icon: 'mdi:home',
			path: '/'
		},
		{
			name: 'Login',
			icon: 'heroicons-outline:user',
			path: '/login'
		}
	];
</script>

<nav
	class="fixed bottom-12 left-1/2 flex translate-x--1/2 gap-7 rounded-full bg-white bg-opacity-50 px-5 py-1 shadow-2xl shadow-black backdrop-blur-lg"
>
	{#each entries as entry}
		<a class="flex flex-col items-center justify-center" href={entry.path}>
			<iconify-icon icon={entry.icon} />
			{entry.name}
		</a>
	{/each}
</nav>
