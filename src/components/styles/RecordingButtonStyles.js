import styled from 'styled-components';

// Styled component for the recording button
export const RecordingButton = styled.button`
  background-color: #ff4757; // Bright red for visibility
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e84118; // Darker red on hover
  }

  &:active {
    background-color: #c23616; // Even darker on click
  }
`;
