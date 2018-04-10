import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

class LikesScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Likes',
      tabBarIcon: ({ tintColor }) => <Ionicons name="md-heart" size={32} color={tintColor} />
    };
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'stretch' }}>
        <Text>Likes!</Text>
      </View>
    );
  }
}

export default StackNavigator({
  Likes: {
    screen: LikesScreen,
  },
});