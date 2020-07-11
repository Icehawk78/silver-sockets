import { createSlice } from "@reduxjs/toolkit";

export const lobbySlice = createSlice({
  name: "lobby",
  initialState: {
    messages: []
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    removeMessage: (state, action) => {
      state.messages = state.messages.filter(
        m => m.uuid !== action.payload.uuid
      );
    },
    loadMessages: (state, action) => {
      state.messages = action.payload;
    }
  }
});

export const { addMessage, removeMessage, loadMessages } = lobbySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectMessages = state => state.lobby.messages;

export default lobbySlice.reducer;
