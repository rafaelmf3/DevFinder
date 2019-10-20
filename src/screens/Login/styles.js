import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    justify-content: center;
    align-items: stretch;
    background-color: #191970;
`

export const Form = styled.View`
    padding: 30px;
`;
export const Img = styled.Image`
    width: 100%;
    height: 200;
`;
export const Input = styled.TextInput`
    background-color: white;
    margin-top: 20;
    border-radius: 10;
    height: 40;
    padding-left: 10;
`;

export const Btn = styled.View`
    background-color: #00BFFF;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 20;
    border-radius: 10;
    height: 40;
`;
export const BtnText = styled.Text`
   color: white;

`;

