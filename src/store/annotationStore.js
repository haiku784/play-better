// Importing the required modules for state management
import { createStore } from 'redux';

// Initial state for annotations
const initialState = {
    annotations: []
};

// Action types
const ADD_ANNOTATION = 'ADD_ANNOTATION';

// Action creator for adding annotations
export const addAnnotation = (annotation) => {
    return { type: ADD_ANNOTATION, payload: annotation };
};

// Reducer function to handle actions
const annotationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ANNOTATION:
            return {
                ...state,
                annotations: [...state.annotations, action.payload]
            };
        default:
            return state;
    }
};

// Create Redux store
const store = createStore(annotationReducer);

export default store;