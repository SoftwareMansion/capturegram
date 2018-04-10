import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  Easing,
  TouchableOpacity,
  Share,
  Animated
} from "react-native";
import { GestureHandler, DangerZone } from "expo";
import { Octicons, MaterialCommunityIcons } from "@expo/vector-icons";

import likeAnimation from "./likeAnimation";

const { Lottie } = DangerZone;
const { TapGestureHandler } = GestureHandler;

const screenWidth = Dimensions.get("window").width;

const imagePropType = PropTypes.shape({
  uri: PropTypes.string.isRequired
});

export default class Post extends React.Component {
  static propTypes = {
    image: PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      userImageURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired
    }).isRequired
  };

  state = {
    postLiked: false,
    animationOpacity: new Animated.Value(0),
    animationProgress: new Animated.Value(0)
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.postLiked && !this.state.postLiked) {
      this.animateDislike();
    } else if (!prevState.postLiked && this.state.postLiked) {
      this.animateLike();
    }
  };

  handleKebabPressed = () =>
    Share.share({
      url: this.props.image.largeImageURL
    });

  handlePictureDoubleTapped = () =>
    this.setState(({ postLiked }) => ({
      postLiked: !postLiked
    }));

  getOpacityAnimation = () =>
    Animated.sequence([
      Animated.timing(this.state.animationOpacity, {
        toValue: 0.6,
        duration: 50
      }),
      Animated.timing(this.state.animationOpacity, {
        toValue: 0,
        delay: 1000,
        duration: 200
      })
    ]);

  animateLike = () =>
    Animated.parallel([
      this.getOpacityAnimation(),
      Animated.sequence([
        Animated.timing(this.state.animationProgress, {
          duration: 1600,
          easing: Easing.linear(),
          toValue: 1
        })
      ])
    ]).start();

  animateDislike = () =>
    Animated.parallel([
      this.getOpacityAnimation(),
      Animated.sequence([
        Animated.timing(this.state.animationProgress, {
          duration: 1300,
          easing: Easing.linear(),
          toValue: 0
        })
      ])
    ]).start();

  renderHeader = () => (
    <View style={styles.header}>
      {this.renderUser()}
      <TouchableOpacity style={styles.kebab} onPress={this.handleKebabPressed}>
        <Octicons name="kebab-horizontal" size={28} color="#555" />
      </TouchableOpacity>
    </View>
  );

  renderUser = () => (
    <View style={styles.user}>
      <Image
        style={styles.userAvatar}
        source={
          this.props.image.userImageURL
            ? { uri: this.props.image.userImageURL }
            : null
        }
      />
      <Text style={styles.userName}>{this.props.image.user}</Text>
    </View>
  );

  renderFooter = () => (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.kebab}
        onPress={this.handlePictureDoubleTapped}
      >
        <MaterialCommunityIcons
          name={`heart${!this.state.postLiked ? "-outline" : ""}`}
          size={32}
          color="#555"
        />
      </TouchableOpacity>
    </View>
  );

  render() {
    if (!this.props.image.webformatURL) {
      return null;
    }
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <TapGestureHandler
          numberOfTaps={2}
          onActivated={this.handlePictureDoubleTapped}
        >
          <View>
            <Image
              style={styles.mainImage}
              source={{ uri: this.props.image.webformatURL }}
            />
            <Animated.View
              style={[
                styles.animation,
                { opacity: this.state.animationOpacity }
              ]}
            >
              <Lottie
                progress={this.state.animationProgress}
                style={styles.animationContent}
                source={likeAnimation}
              />
            </Animated.View>
          </View>
        </TapGestureHandler>
        {this.renderFooter()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    height: 52,
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  user: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  userAvatar: {
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: 18
  },
  userName: {
    fontWeight: "700"
  },
  kebab: {
    justifyContent: "center"
  },
  mainImage: {
    width: screenWidth,
    height: screenWidth
  },
  footer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#aaa"
  },
  animation: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  animationContent: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    padding: 100
  }
});

export const height = 52 + screenWidth + 47.5
