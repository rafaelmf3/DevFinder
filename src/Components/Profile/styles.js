import styled from 'styled-components/native';

export const Line = styled.View`
    height: 2px;
    background-color: grey;
    margin: 0 40px -2px;
    `;

export const Container = styled.View`
    padding: 0 20px;
    margin: 10px;
    height: 150px;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
`;

export const ContainerProfile = styled.View`
     flex: 1;
     flex-direction: row;
     align-items: center;
     justify-content: space-between;
`;

export const ImgPerfil = styled.Image`
    height: 70px;
    width: 70px;
    border-width: 1px;
    border-color: grey;
    border-radius: 3px;
`;

export const ContainerInfo = styled.View`
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;

`;

export const FooterProfile = styled.View`
    height: 90;
    align-items: center;
`;

export const Txt = styled.Text`
    color: white;

`;
