import { displayMessage } from '../redux/message/message';
import { store } from '../redux/store';

export const showMessage = ({ content, type }) => {
  store.dispatch(displayMessage({ content, type }));
};