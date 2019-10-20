import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 0 41px;
    margin: 10px;
    flex-direction: row;
    justify-content: center;
    width: 100%;
`;

export const InfoLeft = styled.View`
    flex: 1;
`;

export const InfoRight = styled.View`
    flex: 1;
`;

export const Txt = styled.Text`
    color: white;
    margin-left: -10px;
`;

export const Line = styled.View`
    height: 2px;
    background-color: grey;
    margin:0 40px;
`;

export const Title = styled.Text`
    color: white;
    font-weight: bold;
    margin-left: -10px;
`;

export const TxtRight = styled.Text`
    text-align: right;
    margin-right: 10px;
    color: white;
`;
