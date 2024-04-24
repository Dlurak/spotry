import { currentlyPlayingScheme } from './schema/currentlyPlaying';

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
