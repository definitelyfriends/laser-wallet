import styled from 'styled-components';
import { Purple, MidDark } from 'components/Colors';

const handleColor = (color: string): string => {
  switch (color) {
    case 'purple':
      return Purple;
    case 'middark':
      return MidDark;
    default:
      return '';
  }
};

export const Button = styled.button<{ color: string }>`
  min-width: 200px;
  border: none;
  font-size: 0.875em;
  padding: 7px 10px;
  background-color: ${({ color }) => handleColor(color)};

  &:focus {
    outline: 0;
  }
`;
