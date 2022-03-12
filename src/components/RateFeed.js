import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const RateView = styled.View``;
const FeedView = styled.View`
    height: 30px;
    overflow: hidden;
    padding: 5px;
    display: flex;
    justify-content: center;
    background-color: #BFFFF0;
`;
const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: black;
`;
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
                            fromId: props.fromRate,
                            toId: item.id,
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