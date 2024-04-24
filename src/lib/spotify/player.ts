import { z } from 'zod';

const imageScheme = z.object({
	url: z.string(),
	height: z.number(),
	width: z.number()
});

const currentlyPlayingScheme = z.object({
	context: z.nullable(
		z.object({
			type: z.union([
				z.literal('artist'),
				z.literal('playlist'),
				z.literal('album'),
				z.literal('show')
			]),
			href: z.string(),
			external_urls: z.object({
				spotify: z.string()
			}),
			uri: z.string()
		})
	),
	timestamp: z.number(),
	progress_ms: z.number(),
	is_playing: z.boolean(),
	item: z.optional(
		z.object({
			album: z.object({
				album_type: z.union([z.literal('album'), z.literal('single'), z.literal('compilation')]),
				total_tracks: z.number(),
				available_markets: z.array(z.string()),
				external_urls: z.object({
					spotify: z.string()
				}),
				href: z.string(),
				id: z.string(),
				images: z.array(imageScheme),
				name: z.string(),
				release_date: z.string(),
				restrictions: z.optional(
					z.object({
						reason: z.optional(z.string())
					})
				),
				type: z.literal('album'),
				url: z.optional(z.string()),
				artists: z.array(
					z.object({
						external_urls: z.object({
							spotify: z.string()
						}),
						href: z.string(),
						id: z.string(),
						name: z.string(),
						type: z.string(),
						url: z.optional(z.string())
					})
				)
			}),
			artists: z.array(
				z.object({
					external_urls: z.object({
						spotify: z.string()
					}),
					followers: z.optional(
						z.object({
							href: z.null(),
							total: z.number()
						})
					),
					genres: z.optional(z.array(z.string())),
					href: z.string(),
					id: z.string(),
					images: z.optional(z.array(imageScheme)),
					name: z.string(),
					popularity: z.optional(z.number()),
					type: z.literal('artist'),
					uri: z.string()
				})
			),
			available_markets: z.array(z.string()),
			disc_number: z.number(),
			duration_ms: z.number(),
			explicit: z.boolean(),
			external_ids: z.object({
				isrc: z.optional(z.string()),
				ean: z.optional(z.string()),
				upc: z.optional(z.string())
			}),
			external_urls: z.object({
				spotify: z.string()
			}),
			href: z.string(),
			id: z.string(),
			is_playable: z.optional(z.boolean()),
			name: z.string(),
			popularity: z.number(),
			preview_url: z.nullable(z.string()),
			uri: z.string()
		})
	)
});

interface CurrentlyPlayingTrackProps {
	accessToken: string;
}

export const getCurrentlyPlayingTrack = async (props: CurrentlyPlayingTrackProps) => {
	const unparsed = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
		headers: {
			Authorization: `Bearer ${props.accessToken}`
		}
	}).then((r) => r.json());

	const parsed = currentlyPlayingScheme.parse(unparsed);
	return parsed;
};
