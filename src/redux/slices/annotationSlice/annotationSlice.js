import { createSlice } from '@reduxjs/toolkit';

// AnnotateSlice: Handles comments and highlights state
const annotationSlice = createSlice({
    name: 'annotations',
    initialState: {
        comments: []
    },
    reducers: {
        addComment: (state, action) => {
            state.comments.push(action.payload);
        }
    }
});

export const { addComment } = annotationSlice.actions;
export default annotationSlice.reducer;