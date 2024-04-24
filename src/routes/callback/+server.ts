import { oauthStates } from '$lib/stores';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';

export const GET = ({ request }: { request: Request }) => {
	const ownUrl = new URL(request.url);
	const search = ownUrl.searchParams;

	const state = search.get('state');
	const code = search.get('code');
	const error = search.get('error');

	console.log(get(oauthStates), state)

	if (!get(oauthStates).includes(state || '')) {
		throw redirect(307, `${ownUrl.origin}/oauth/error?reason=failed`);
	}

	if (error) {
		throw redirect(307, `${ownUrl.origin}/oauth/error?reason=${error}`);
	}

	if (code) {
		throw redirect(307, `${ownUrl.origin}/oauth/success?code=${code}`);
	}

	return new Response("Okay so that is very weird and shouldn't ever happen");
};
