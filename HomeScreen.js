import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, Dimensions, StyleSheet } from "react-native";

import Post from "./Post";
import { getImagesPage } from "./photoRepository";

const screenWidth = Dimensions.get("window").width;
const postHeight = screenWidth + 52 + 47.5 + 0.5;

export default class HomeScreen extends React.Component {
  static navigationOptions = () => ({
    title: "Home",
    tabBarIcon: ({ tintColor }) => (
      <Ionicons name="md-home" size={32} color={tintColor} />
    )
  });

  state = { refreshing: true, images: [], pages: 0 };

  componentDidMount() {
    getImagesPage(this.state.pages).then(({ hits }) =>
      this.setState({
        images: hits,
        refreshing: false,
        pages: 1
      })
    );
  }

  getItemLayout = (data, index) => ({
    length: postHeight,
    offset: postHeight * index,
    index
  });

  getItemKey = item => `${item.id}`;

  handleRefresh = () => this.setState({ refreshing: true }, this.refresh);

  handleEndReached = () => {
    if (this.state.refreshing) {
      return;
    }
    getImagesPage(this.state.pages).then(this.handleNewData);
  };

  handleNewData = ({ hits, page }) => {
    if (page < this.state.pages) {
      return;
    }

    this.setState({
      images: [...this.state.images, ...hits],
      pages: this.state.pages + 1,
    });
  }

  refresh = () =>
    setTimeout(
      () =>
        this.setState({
          refreshing: false
        }),
      1000
    );

  renderItem = ({ item }) => <Post key={item.key} image={item} />;

  renderFlatList = () => (
    <FlatList
      style={styles.list}
      data={this.state.images}
      onEndReachedThreshold={0.5}
      renderItem={this.renderItem}
      onRefresh={this.handleRefresh}
      keyExtractor={this.getItemKey}
      refreshing={this.state.refreshing}
      getItemLayout={this.getItemLayout}
      onEndReached={this.handleEndReached}
    />
  );

  render() {
    return this.renderFlatList();
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "white"
  }
});
