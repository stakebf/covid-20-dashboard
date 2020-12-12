import { 
  ON_EVENT
} from './actionTypes';

export const onSomething = (someData) => ({
  type: ON_EVENT,
  payload: someData
});
