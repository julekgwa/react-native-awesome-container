import { Loader, Popup } from './common';
import React from 'react';
import type { GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import { View, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

interface Props {
  showPopup?: boolean;
  popupType?: 'Danger' | 'Success' | 'Warning';
  popupTitle?: string;
  popupMessage?: string;
  onPressPopup?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  isLoading?: boolean;
  buttonText?: string;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  iconContentStyle?: ViewStyle;
  iconColor?: string;
  textBodyStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  spinnerColor?: string;
  spinner?:
    | 'CircleFade'
    | 'Plane'
    | 'Chase'
    | 'Bounce'
    | 'Wave'
    | 'Pulse'
    | 'Flow'
    | 'Swing'
    | 'Circle'
    | 'Grid'
    | 'Fold'
    | 'Wander';
}

export function Container({
  showPopup,
  popupType,
  popupTitle,
  popupMessage,
  onPressPopup,
  children,
  isLoading,
  buttonText,
  style,
  contentStyle,
  iconColor,
  iconContentStyle,
  textBodyStyle,
  buttonStyle,
  buttonTextStyle,
  spinner,
  spinnerColor,
}: Props) {
  const [isConnectedToTheWifi, setIsConnectedToTheWifi] = React.useState(true);
  const updateNet = () => setIsConnectedToTheWifi(true);

  React.useEffect(
    () =>
      NetInfo.addEventListener((state) => {
        setIsConnectedToTheWifi(!!state.isConnected);
      }),
    []
  );

  return (
    <View style={[styles.main, style]}>
      {!isLoading && children}

      <Popup
        visible={showPopup || !isConnectedToTheWifi}
        type={popupType || 'Warning'}
        title={popupTitle}
        iconColor={iconColor}
        contentStyle={contentStyle}
        iconContentStyle={iconContentStyle}
        textBodyStyle={textBodyStyle}
        buttonStyle={buttonStyle}
        buttonTextStyle={buttonTextStyle}
        textBody={popupMessage}
        callback={onPressPopup || updateNet}
        buttonText={buttonText || 'Close'}
      />

      {isLoading && <Loader color={spinnerColor} spinner={spinner} />}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {},
});
