import styled from 'styled-components';
import { H2 } from 'src/components/Headers';

export const Container = styled.main`
  padding: 2em;
`;

export const FakeTextArea = styled.input`
  border-radius: 8px;
  outline: none;
  padding: 10px;
  width: 100%;
`;

export const Subtitle = styled.div`
  font-size: 14px;
  color: #cdd4e2;
  margin-top: 10px;
  margin-bottom: 20px;
`;

export const BoldH2 = styled(H2)`
  font-weight: 700;
  margin-bottom: 15px;
`;

export const Label = styled.label`
  margin-bottom: 10px;
  display: block;
`;

export const InputContainer = styled.div`
  margin-bottom: 15px;
`;

export const PasswordInput = styled(FakeTextArea)`
  height: 50px;
`;

export const Bottom = styled.div`
  margin-top: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button:first-child {
    margin-right: 20px;
  }
`;
