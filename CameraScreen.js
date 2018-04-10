import React from 'react';
import { View, StatusBar, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';


export default class CameraScreen extends React.Component {
  state = {
    permissionsGranted: false,
  };
  
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === 'granted' });
  }
  
  dismiss = () => this.props.navigation.goBack();
  
  renderBlackScreen = () => <View style={{ flex: 1, backgroundColor: "black" }} />;
  
  renderCamera = () => (
    <Camera style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
      <StatusBar hidden animated barStyle="dark-content" />
      <TouchableOpacity
        onPress={this.dismiss}
        style={{ marginRight: 16, marginTop: 16, alignSelf: 'flex-end'}}
        hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
      >
        <Ionicons name="md-close" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginRight: 16, marginTop: 16, borderColor: 'white', borderWidth: 2, width: 64, height: 64, borderRadius: 64, marginBottom: 16, alignItems: 'center', justifyContent: 'center' }}
        hitSlop={{ top: 16, left: 16, right: 16, bottom: 16 }}
      >
        <View style={{ backgroundColor: 'white', width: 52, height: 52, borderRadius: 52 }} />
      </TouchableOpacity>
    </Camera>
  );
  
  render() {
    const screenComponent = this.state.permissionsGranted ? this.renderCamera() : this.renderBlackScreen();
    return (
      <View style={{ flex: 1, alignItems: 'stretch' }}>
        {screenComponent}
      </View>
    );
  }
}