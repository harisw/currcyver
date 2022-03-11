import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const RateView = styled.View`
    margin-left: 10px;
`;
const FeedView = styled.View`
    height: 30px;
    overflow: hidden;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
`;
const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: #ced0ce;
`
const RateFeed = props => {
    return (
        <RateView>
            <FlatList 
                data={props.rates}
                keyExtractor={( { id }) => id}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={( {item}) => (
                    <TouchableOpacity onPress={() =>
                        props.navigation.navigate('Rate', {
                            id: item.id,
                            currencyName: props.currencyName
                    })}>
                        <FeedView>
                            <Text>{item.val} {item.id}</Text>
                        </FeedView>
                    </TouchableOpacity>
                )}/>
        </RateView>
    );
};

export default RateFeed;