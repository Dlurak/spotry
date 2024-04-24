import { episodeObject, trackObject } from '$lib/spotify/schema/currentlyPlaying';
import { z } from 'zod';

const union = z.union([trackObject, episodeObject]);
type Item = z.infer<typeof union>;

export function getImages(item: Item) {
	if (item.type === 'episode') return item.images.sort((a, b) => b.width - a.width);

	return item.album?.images?.sort((a, b) => b.width - a.width) || [];
}
