import React from "react";
import { Camera, Permissions, FileSystem } from "expo";
import { Ionicons } from '@expo/vector-icons';
import { View, Image, StyleSheet, FlatList } from "react-native";

export default class GalleryScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Gallery',
      tabBarIcon: ({ tintColor }) => (
        <Ionicons name="md-camera" size={32} color={tintColor} />
      ),
    };
  };

  state = {
    photos: [],
  };

  async componentDidMount() {
    const photos = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'photos');
    this.setState({ photos });
  }

  renderPhoto(photoUri) {
    return (
      <Image
        key={photoUri}
        style={styles.photo}
        source={{
          uri: `${FileSystem.documentDirectory}photos/${photoUri}`,
        }}
      />
    );
  }

  render() {
    return (
      <FlatList
        style={styles.list}
        data={this.state.photos}
        renderItem={this.renderPhoto}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "white",
  },
  photo: {
    margin: 5,
    width: 150,
    height: 150,
  }
});
