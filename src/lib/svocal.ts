import { localstorage } from 'svocal';

const keys = {
	accessToken: {
		key: 'oauth.token.access',
		default: null as string | null
	},
	accessTokenExpires: {
		key: 'oauth.token.access.expires',
		default: 0
	},
	refreshToken: {
		key: 'oauth.token.refresh',
		default: null as string | null
	},

	'settings-showMetadata': {
		key: 'settings.showMetadata',
		default: true
	}
};

type SvocalKey = keyof typeof keys;

type SvocalDefault<T extends SvocalKey> = (typeof keys)[T]['default'];

export function svocal<T extends SvocalKey>(key: T) {
	const obj = keys[key];

	return localstorage(obj.key, obj.default as SvocalDefault<T>);
}
