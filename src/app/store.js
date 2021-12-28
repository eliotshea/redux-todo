import { combineReducers, configureStore } from '@reduxjs/toolkit';
import debounce from 'debounce';
import { itemReducer } from './reducers/itemsReducer';
import { personReducer } from './reducers/peopleReducer';
import { projectReducer } from './reducers/projectReducer';

const reducers = combineReducers({
  items: itemReducer,
  people: personReducer,
  project: projectReducer
})

const KEY = "redux-todo-project-storage"
function loadState() {
  try {
    console.log("loading state")
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) {
      return undefined;
    } else {
      return JSON.parse(serializedState);
    }
  } catch (e) {
    return undefined;
  }
}

async function saveState(state) {
  try {
    console.log("saving state");
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {

  }
}

export const store = configureStore({
  reducer: reducers,
  preloadedState: loadState(),
});

store.subscribe(debounce(() => {
  saveState(store.getState());
}, 1000));

