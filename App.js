import { Constants } from "expo";
import { Platform } from "react-native";
import {
  StackNavigator,
  TabNavigator,
  withNavigationFocus
} from "react-navigation"; // Version can be specified in package.json

import HomeScreen from "./HomeScreen";
import CameraScreen from "./CameraScreen";
// import LikesScreen from './LikesScreen';
import CameraScreenPlaceholder from "./CameraScreenPlaceholder";

const MainStack = StackNavigator(
  {
    Home: {
      screen: HomeScreen
    }
  },
  {
    navigationOptions: {
      header: Platform.OS === "android" ? null : undefined
    }
  }
);

const Tabs = TabNavigator(
  {
    Home: { screen: MainStack },
    Camera: { screen: withNavigationFocus(CameraScreenPlaceholder) }
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      iconStyle: {
        width: 28 // hardcoded value for icons /shrug
      },
      activeTintColor: Platform.OS === "android" ? undefined : "#4830E5",
      style:
        Platform.OS === "android"
          ? {
              paddingTop: Constants.statusBarHeight,
              backgroundColor: "#4830E5"
            }
          : {},
      indicatorStyle: {
        backgroundColor: "white"
      }
    }
  }
);

export default StackNavigator(
  {
    Main: {
      screen: Tabs
    },
    CameraModal: {
      screen: CameraScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
