import React from 'react';
import { useSelector } from 'react-redux';

const AnnotationList = () => {
    // Retrieve annotations from the Redux store
    const annotations = useSelector(state => state.annotations);

    return (
        <ul>
            {annotations.map((annotation, index) => (
                <li key={index}>{annotation.text}</li>
            ))}
        </ul>
    );
};

export default AnnotationList;