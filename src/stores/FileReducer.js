import { SEND_FILE, DOWNLOAD_FILE } from "./Actions";

export const initialState = {
  attempt: 0,
  isSent: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SEND_FILE:
      return { ...state, isSent: true };

    case DOWNLOAD_FILE:
      return { ...state, file: {}, isDownloaded: false };

    default:
      return state;
  }
};
