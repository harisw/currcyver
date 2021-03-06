import React from "react";
import { View, ActivityIndicator } from 'react-native';
import styled from "styled-components/native";

const LoadingWrap = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Loading = () => {
    return (
        <LoadingWrap>
            <ActivityIndicator size="large"
            animating={true}
            style={{height:100}} />
        </LoadingWrap>
    );
};

export default Loading;