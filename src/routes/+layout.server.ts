import { CLIENT_ID, CLIENT_SECRET } from '$env/static/private';

export const load = () => ({
	base64: btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
});
