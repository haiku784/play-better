import React, { useCallback, useState } from 'react';

// Define props for the component
interface ClipManipulationProps {
    onSuccess: (message: string) => void;
    onError: (message: string) => void;
}

const ClipManipulationComponent: React.FC<ClipManipulationProps> = ({ onSuccess, onError }) => {
    // State to manage clip data
    const [clipStart, setClipStart] = useState<number>(0);
    const [clipEnd, setClipEnd] = useState<number>(0);
    
    // Callback to handle clip trimming with performance optimization
    const trimClip = useCallback(async () => {
        try {
            // Call the API to trim the clip
            const response = await fetch(`/api/trim-clip`, {
                method: 'POST',
                body: JSON.stringify({ start: clipStart, end: clipEnd }),
                headers: {'Content-Type': 'application/json'}
            });

            if (!response.ok) throw new Error('Failed to trim clip');

            // Trigger success notification
            onSuccess('Clip trimmed successfully!');
        } catch (error) {
            console.error(error);
            // Trigger error notification
            onError('Error trimming clip. Please try again.');
        }
    }, [clipStart, clipEnd, onSuccess, onError]);

    return (
        <div>
            <input type="number" value={clipStart} onChange={(e) => setClipStart(+e.target.value)} placeholder="Start Time" />
            <input type="number" value={clipEnd} onChange={(e) => setClipEnd(+e.target.value)} placeholder="End Time" />
            <button onClick={trimClip}>Trim Clip</button>
        </div>
    );
};

export default ClipManipulationComponent;