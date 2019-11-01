import Store from '@ice/store';
import todos from './todo';

const storeManager = new Store();
storeManager.registerStore('todos', todos);

export default storeManager;
