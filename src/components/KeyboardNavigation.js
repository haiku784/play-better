import React, { useEffect } from 'react';

/**
 * KeyboardNavigation component handles keyboard events to provide better navigation
 * for users relying on keyboard shortcuts, enhancing overall accessibility.
 *
 * @param {Object} props - Component properties.
 * @param {function} props.onUp - Function to call when the up arrow key is pressed.
 * @param {function} props.onDown - Function to call when the down arrow key is pressed.
 */
const KeyboardNavigation = ({ onUp, onDown }) => {
    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    onUp();
                    break;
                case 'ArrowDown':
                    onDown();
                    break;
                default:
                    break;
            }
        };

        // Attach keydown event listener
        window.addEventListener('keydown', handleKeyDown);

        // Cleanup event listener on unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onUp, onDown]);

    return null; // No UI rendering required
};

export default KeyboardNavigation;
