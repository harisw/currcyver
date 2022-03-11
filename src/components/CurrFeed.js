import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import Currency from "./Currency";

const FeedView = styled.View`
    height: 50px;
    overflow: hidden;
    margin-bottom: 10px;
`;

const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: #ced0ce;
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