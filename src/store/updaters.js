import { store } from 'react-recollect';

export function setActivePost(index) {
	store.activePostIndex = index;
}

export function back(index) {
	store.activePostIndex = undefined;
}
