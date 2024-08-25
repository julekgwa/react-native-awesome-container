import { Loader, Popup } from './common';
import React from 'react';
import type {
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { View, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { moderateScale } from 'react-native-size-matters';

export type AwesomeContainerProps = {
  showPopup?: boolean;
  popupType?: 'Danger' | 'Success' | 'Warning';
  popupTitle?: string;
  popupMessage?: string;
  onPressPopup?: (event: GestureResponderEvent) => void;
  onPressSecondaryButton?: (event: GestureResponderEvent) => void;
  children: React.ReactNode;
  headerTextStyle?: StyleProp<TextStyle>;
  isLoading?: boolean;
  buttonText?: string;
  secondaryButtonTextStyle?: StyleProp<TextStyle>;
  secondaryButtonStyle?: StyleProp<ViewStyle>;
  secondaryButtonText?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  iconContentStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
  textBodyStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  spinnerColor?: string;
  loaderOverlay?: boolean;
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
};

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
  loaderOverlay,
  overlayStyle,
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
    <>
      <View style={[styles.main, style]}>
        {!isLoading || loaderOverlay ? children : null}

        <Popup
          visible={showPopup || !isConnectedToTheWifi}
          type={!isConnectedToTheWifi ? 'Warning' : popupType || 'Warning'}
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
          textBody={
            !isConnectedToTheWifi ? 'No internet connection.' : popupMessage
          }
          callback={!isConnectedToTheWifi ? updateNet : onPressPopup}
          buttonText={buttonText || 'Close'}
        />

        {isLoading && !loaderOverlay && (
          <Loader color={spinnerColor} spinner={spinner} />
        )}
      </View>
      {isLoading && loaderOverlay && (
        <View style={[styles.loaderContainer, overlayStyle]}>
          <Loader color={spinnerColor} spinner={spinner} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: moderateScale(18),
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
