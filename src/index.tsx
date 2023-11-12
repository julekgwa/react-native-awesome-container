import { Loader, Popup } from './common';
import React from 'react';
import type { GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';
import { View, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { moderateScale } from 'react-native-size-matters';

export enum PopupType {
  Danger = 'Danger',
  Success = 'Success',
  Warning = 'Warning',
}
export interface AwesomeContainerProps {
  showPopup?: boolean;
  popupType?: PopupType;
  popupTitle?: string;
  popupMessage?: string;
  onPressPopup?: (event: GestureResponderEvent) => void;
  onPressSecondaryButton?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  headerTextStyle?: TextStyle;
  isLoading?: boolean;
  buttonText?: string;
  secondaryButtonTextStyle?: TextStyle;
  secondaryButtonStyle?: ViewStyle;
  secondaryButtonText?: string;
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
  headerTextStyle,
  secondaryButtonText,
  secondaryButtonStyle,
  secondaryButtonTextStyle,
  onPressSecondaryButton,
}: AwesomeContainerProps) {
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
        type={!isConnectedToTheWifi ? PopupType.Warning : popupType || PopupType.Warning}
        title={!isConnectedToTheWifi ? 'No connection :(' : popupTitle}
        iconColor={iconColor}
        contentStyle={contentStyle}
        iconContentStyle={iconContentStyle}
        textBodyStyle={textBodyStyle}
        headerTextStyle={headerTextStyle}
        buttonStyle={buttonStyle}
        buttonTextStyle={buttonTextStyle}
        secondaryButtonText={secondaryButtonText}
        secondaryButtonStyle={secondaryButtonStyle}
        secondaryButtonTextStyle={secondaryButtonTextStyle}
        secondaryCallback={onPressSecondaryButton}
        textBody={!isConnectedToTheWifi ? 'No internet connection.' :popupMessage}
        callback={!isConnectedToTheWifi ? updateNet :onPressPopup}
        buttonText={buttonText || 'Close'}
      />

      {isLoading && <Loader color={spinnerColor} spinner={spinner} />}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: moderateScale(18),
  },
});
