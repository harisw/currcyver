import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const FeedView = styled.View`
    padding: 5px;
    height: 50px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    background-color: #BFFFF0;
`;

const Separator = styled.View`
    height: 2px;
    width: 100%;
    background-color: black;
`;

const CurrFeed = props => {
    return (
        <View>
            <FlatList
                data={props.currencies}
                keyExtractor={( { id }) => id}
                ItemSeparatorComponent={() => <Separator />}
                renderItem={( {item}) => (
                    <TouchableOpacity onPress={() =>
                    props.navigation.navigate('Currency', {
                        id: item.id,
                        currencyName: item.val
                    })}>
                        <FeedView>
                            <Text>{item.val} ({item.id})</Text>
                        </FeedView>
                    </TouchableOpacity>
                )} />
        </View>
    );
};

export default CurrFeed;