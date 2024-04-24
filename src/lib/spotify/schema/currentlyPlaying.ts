import { z } from 'zod';

const device = z.object({
	id: z.optional(z.nullable(z.string())),
	is_active: z.optional(z.boolean()),
	is_private_session: z.optional(z.boolean()),
	is_restricted: z.optional(z.boolean()),
	name: z.optional(z.string()),
	type: z.optional(z.string()),
	volume_percent: z.optional(z.nullable(z.number().int().min(0).max(100))),
	supports_volume: z.optional(z.boolean())
});

const repeatState = z.union([z.literal('off'), z.literal('track'), z.literal('context')]);

const externalUrls = z.object({ spotify: z.optional(z.string()) });

const context = z.object({
	type: z.optional(z.string()),
	href: z.optional(z.string()),
	external_urls: z.optional(externalUrls),
	url: z.optional(z.string())
});

const imageObject = z.object({ url: z.string(), height: z.number(), width: z.number() });

const simplifiedArtistObject = z.object({
	external_urls: z.optional(externalUrls),
	href: z.optional(z.string()),
	id: z.optional(z.string()),
	name: z.optional(z.string()),
	type: z.optional(z.literal('artist')),
	url: z.optional(z.string())
});

const artistObject = z.object({
	external_urls: z.optional(externalUrls),
	followers: z.optional(
		z.object({
			href: z.optional(z.nullable(z.string())),
			total: z.optional(z.number().int())
		})
	),
	genres: z.optional(z.array(z.string())),
	href: z.optional(z.string()),
	id: z.optional(z.string()),
	images: z.optional(z.array(imageObject)),
	name: z.optional(z.string()),
	popularity: z.optional(z.number().int()),
	type: z.optional(z.literal('artist')),
	uri: z.optional(z.string())
});

const restrictionReason = z.union([
	z.literal('market'),
	z.literal('product'),
	z.literal('explicit')
]);

export const trackObject = z.object({
	album: z.optional(
		z.object({
			album_type: z.union([z.literal('album'), z.literal('single'), z.literal('compilation')]),
			total_tracks: z.number().int(),
			available_markets: z.array(z.string()),
			external_urls: externalUrls,
			href: z.string(),
			id: z.string(),
			images: z.array(imageObject),
			name: z.string(),
			release_date: z.string(),
			restrictions: z.optional(
				z.object({
					reason: restrictionReason
				})
			),
			type: z.literal('album'),
			uri: z.string(),
			artists: z.array(simplifiedArtistObject)
		})
	),
	artists: z.optional(z.array(artistObject)),
	available_markets: z.optional(z.array(z.string())),
	disc_number: z.optional(z.number().int()),
	duration_ms: z.optional(z.number().int()),
	explicit: z.optional(z.boolean()),
	external_ids: z.optional(
		z.object({
			isrc: z.optional(z.string()),
			ean: z.optional(z.string()),
			upc: z.optional(z.string())
		})
	),
	external_urls: z.optional(externalUrls),
	href: z.optional(z.string()),
	id: z.optional(z.string()),
	is_playable: z.optional(z.boolean()),
	linked_from: z.optional(z.object({})),
	restrictions: z.optional(
		z.object({
			reason: z.optional(restrictionReason)
		})
	),
	name: z.optional(z.string()),
	popularity: z.optional(z.number().int().min(0).max(100)),
	preview_url: z.optional(z.nullable(z.string())),
	track_number: z.optional(z.number().int()),
	type: z.optional(z.literal('track')),
	uri: z.optional(z.string()),
	is_local: z.optional(z.boolean())
});

const copyrightObject = z.object({
	text: z.optional(z.string()),
	type: z.optional(z.string())
});

export const episodeObject = z.object({
	audio_preview_url: z.nullable(z.string()),
	description: z.string(),
	html_description: z.string(),
	duration_ms: z.number().int(),
	explicit: z.boolean(),
	external_urls: externalUrls,
	href: z.string(),
	id: z.string(),
	images: z.array(imageObject),
	is_externally_hosted: z.boolean(),
	is_playable: z.boolean(),
	languages: z.array(z.string()),
	name: z.string(),
	release_date: z.string(),
	release_date_precision: z.union([z.literal('year'), z.literal('month'), z.literal('day')]),
	resume_point: z.optional(
		z.object({
			fully_played: z.optional(z.boolean()),
			resume_position_ms: z.optional(z.number().int())
		})
	),
	type: z.literal('episode'),
	uri: z.string(),
	restrictions: z.optional(z.object({ reason: restrictionReason })),
	show: z.object({
		available_markets: z.array(z.string()),
		copyrights: z.array(copyrightObject),
		description: z.string(),
		html_description: z.string(),
		explicit: z.boolean(),
		external_urls: externalUrls,
		href: z.string(),
		id: z.string(),
		images: z.array(imageObject),
		is_externally_hosted: z.boolean(),
		languages: z.array(z.string()),
		media_type: z.string(),
		name: z.string(),
		publisher: z.string(),
		type: z.literal('show'),
		uri: z.string(),
		total_episodes: z.number().int()
	})
});

const currentlyPlayingType = z.union([
	z.literal('track'),
	z.literal('episode'),
	z.literal('unknown')
]);

const actions = z.object({
	interrupting_playback: z.optional(z.boolean()),
	pausing: z.optional(z.boolean()),
	resuming: z.optional(z.boolean()),
	seeking: z.optional(z.boolean()),
	skipping_next: z.optional(z.boolean()),
	skipping_prev: z.optional(z.boolean()),
	toggling_repeat_context: z.optional(z.boolean()),
	toggling_shuffle: z.optional(z.boolean()),
	toggling_repeat_track: z.optional(z.boolean()),
	transferring_playback: z.optional(z.boolean())
});

export const currentlyPlayingScheme = z.object({
	device: z.optional(device),
	repeat_state: z.optional(repeatState),
	shuffle_state: z.optional(z.boolean()),
	context: z.optional(z.nullable(context)),
	timestamp: z.optional(z.number().int()),
	progress_ms: z.optional(z.nullable(z.number().int())),
	is_playing: z.optional(z.boolean()),
	item: z.optional(z.nullable(z.union([trackObject, episodeObject]))),
	currently_playing_type: z.optional(currentlyPlayingType),
	actions: z.optional(actions)
});

export type CurrentlyPlaying = z.infer<typeof currentlyPlayingScheme>;
