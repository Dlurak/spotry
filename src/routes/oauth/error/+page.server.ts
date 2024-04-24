import type { PageServerLoadEvent } from './$types';

export function load({ url }: PageServerLoadEvent) {
	const reason = url.searchParams.get('reason');

	return { reason };
}
