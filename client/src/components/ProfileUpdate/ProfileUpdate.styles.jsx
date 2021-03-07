import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  max-width: 500px;
  display: flex;
  justify-content: space-evenly;
  margin: auto;
`;

export const ToggleButton = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  background: var(--dark-color-a);
  color: var(--light-color);
  border: 0;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100%;
  background: var(--dark-color-a);
  color: var(--light-color);
  margin: auto 10px;
`;
