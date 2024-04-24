import { z } from 'zod';

const accessTokenScheme = z.object({
	access_token: z.string(),
	expires_in: z.number().int().min(0),
	refresh_token: z.string(),
	token_type: z.literal('Bearer')
});

interface AccessTokenProrps {
	base64Encoded: string;
	code: string;
	redirectUri: string;
}

export async function accessToken({ base64Encoded, redirectUri, code }: AccessTokenProrps) {
	const unparsed = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${base64Encoded}`
		},
		body: new URLSearchParams({
			code,
			redirect_uri: redirectUri,
			grant_type: 'authorization_code'
		})
	}).then((r) => r.json());

	return accessTokenScheme.parse(unparsed);
}

const refreshAccessTokenScheme = z.object({
	access_token: z.string(),
	expires_in: z.number().int().min(0),
	token_type: z.literal('Bearer'),
});

interface RefreshAccessTokenProps {
	refreshToken: string;
	base64Encoded: string;
}

export async function newAccessToken({ refreshToken, base64Encoded }: RefreshAccessTokenProps) {
	const unparsed = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: refreshToken
		}),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: `Basic ${base64Encoded}`
		}
	}).then((r) => r.json());

	const parsed = refreshAccessTokenScheme.parse(unparsed);
	return parsed;
}
