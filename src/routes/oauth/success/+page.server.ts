import { redirect } from '@sveltejs/kit';
import type { PageServerLoadEvent } from "./$types"
import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';

export function load({ url }: PageServerLoadEvent) {
	const code = url.searchParams.get('code');
	if (!code) throw redirect(307, '/oauth/error?reason=noCode');

	const redirectUri = `${url.origin}/callback/`;

	return {
		code,
		redirectUri,
		base64: btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
	};
}
