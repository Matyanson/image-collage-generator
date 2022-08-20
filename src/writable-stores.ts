import { writable, type Writable } from "svelte/store";
import * as idb from "idb-keyval";
const { get, set } = idb;

export const wStorage = <T>(key: string, initValue: T): Writable<T> => {
	const store = writable(initValue);
	if (typeof Storage === 'undefined') return store;

	const storedValueStr = localStorage.getItem(key);
	if (storedValueStr != null) store.set(JSON.parse(storedValueStr));

	store.subscribe((val) => {
		localStorage.setItem(key, JSON.stringify(val));
	})
	return store;
}

export const wIDatabase = <T>(key: string, initValue: T): Writable<T> => {
	const store = writable(initValue);
	if (typeof indexedDB === 'undefined') return store;

	(async ()=>{
		const storedValue = await get(key);
		if(storedValue != null) store.set(storedValue);
	})();

	store.subscribe((val) => {
		set(key, val);
	})
	return store;
}