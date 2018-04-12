import React from "react";
import { Camera, Permissions } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { View, StatusBar, TouchableOpacity, StyleSheet } from "react-native";

export default class CameraScreen extends React.Component {
  state = {
    permissionsGranted: false
  };

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.handlePermissionStatus);
  }

  handlePermissionStatus = ({ status }) =>
    this.setState({
      permissionsGranted: status === "granted"
    });

  dismiss = () => this.props.navigation.goBack();

  renderBlackScreen = () => <View style={styles.placeholder} />;

  renderCamera = () => (
    <Camera style={styles.camera}>
      <StatusBar hidden animated barStyle="dark-content" />
      <TouchableOpacity
        onPress={this.dismiss}
        style={styles.closeButton}
        hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
      >
        <Ionicons name="md-close" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.captureButtonWrapper}
        hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
      >
        <View style={styles.captureButton} />
      </TouchableOpacity>
    </Camera>
  );

  render() {
    const screenComponent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderBlackScreen();
    return (
      <View style={{ flex: 1, alignItems: "stretch" }}>{screenComponent}</View>
    );
  }
}

const styles = StyleSheet.create({
  placeholder: { flex: 1, backgroundColor: "black" },
  camera: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  closeButton: {
    marginRight: 16,
    marginTop: 16,
    alignSelf: "flex-end"
  },
  captureButtonWrapper: {
    marginRight: 16,
    marginTop: 16,
    borderColor: "white",
    borderWidth: 2,
    width: 64,
    height: 64,
    borderRadius: 64,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  captureButton: {
    backgroundColor: "white",
    width: 52,
    height: 52,
    borderRadius: 52
  }
});
