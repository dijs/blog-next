import { store, afterChange, initStore } from 'react-recollect';

const storageKey = 'BLOG';

store.activePostIndex = undefined;

const localStoreData = localStorage.getItem(storageKey);
if (localStoreData) {
	const localStore = JSON.parse(localStoreData);
	initStore(localStore);
}

afterChange(({ store }) => {
	localStorage.setItem(storageKey, JSON.stringify(store));
});
