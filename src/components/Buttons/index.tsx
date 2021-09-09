import styled from 'styled-components';
import { Purple, MidDark } from 'components/Colors';

const handleColor = (color: string): string => {
  switch (color) {
    case 'purple':
      return Purple;
    case 'middark':
      return MidDark;
    case 'transparent':
      return 'transparent';
    default:
      return MidDark;
  }
};

export const Button = styled.button<{ color: string }>`
  min-width: 120px;
  min-height: 45px;
  border: none;
  font-size: 0.875em;
  padding: 7px 10px;
  border: 1px solid Purple;
  background-color: ${({ color }) => handleColor(color)};
  border-radius: 4px;
  color: white;
  width: 100%;
  cursor: pointer;

  &:focus {
    outline: 0;
  }
`;
