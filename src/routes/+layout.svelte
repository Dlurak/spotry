<script lang="ts">
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import '../app.css';
</script>

<Navbar />
<main class="min-h-screen text-black dark:text-white px-4 py-2">
	<slot />
</main>
