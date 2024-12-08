import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAnnotation } from './store/annotationStore';

const AddAnnotation = () => {
    const [annotationText, setAnnotationText] = useState('');
    const dispatch = useDispatch();

    const handleAddAnnotation = () => {
        // Dispatch action to add a new annotation
        dispatch(addAnnotation({ text: annotationText }));
        setAnnotationText(''); // Reset input field
    };

    return (
        <div>
            <input
                type='text'
                value={annotationText}
                onChange={(e) => setAnnotationText(e.target.value)}
                placeholder='Enter annotation'
            />
            <button onClick={handleAddAnnotation}>Add Annotation</button>
        </div>
    );
};

export default AddAnnotation;