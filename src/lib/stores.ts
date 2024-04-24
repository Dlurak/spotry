import { writable } from "svelte/store";

export const oauthStates = writable<string[]>([])
