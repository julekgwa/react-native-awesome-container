import { Colors } from '../colors';

import React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { scale, verticalScale } from 'react-native-size-matters';

import { POPUP_TYPE } from '../constants';
import { Text } from 'react-native';
import { TickIcon } from './svg/TickIcon';
import { CloseIcon } from './svg/CloseIcon';
import type {
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { InfoIcon } from './svg/InfoIcon';

interface Props {
  visible?: boolean;
  type?: 'Danger' | 'Success' | 'Warning';
  title?: string;
  textBody?: string;
  buttonText?: string;
  secondaryButtonText?: string;
  contentStyle?: StyleProp<ViewStyle>;
  iconContentStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
  textBodyStyle?: StyleProp<TextStyle>;
  headerTextStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  secondaryButtonTextStyle?: StyleProp<TextStyle>;
  secondaryButtonStyle?: StyleProp<ViewStyle>;
  callback?: (event: GestureResponderEvent) => void;
  secondaryCallback?: (event: GestureResponderEvent) => void;
}

const renderIcon = (type: string, color?: string) => {
  switch (true) {
    case type === POPUP_TYPE.Success:
      return <TickIcon color={color} />;

    case type === POPUP_TYPE.Danger:
      return <CloseIcon color={color} />;
    default:
      return <InfoIcon color={color} />;
  }
};

const getIconBgColor = (type: string | undefined) => {
  switch (true) {
    case type === POPUP_TYPE.Success:
      return Colors.SoftGreen;

    case type === POPUP_TYPE.Danger:
      return Colors.VerySoftRed;
    default:
      return Colors.VividYellow;
  }
};

export const Popup = ({
  visible,
  type,
  title,
  textBody,
  buttonText,
  secondaryButtonText,
  secondaryButtonStyle,
  secondaryButtonTextStyle,
  headerTextStyle,
  contentStyle,
  textBodyStyle,
  buttonStyle,
  buttonTextStyle,
  iconColor,
  iconContentStyle,
  callback = () => {},
  secondaryCallback = () => {},
}: Props) => {
  return (
    <Modal backdropOpacity={0.3} isVisible={visible}>
      <View style={styles.dialog}>
        <View
          style={[
            styles.imageContainer,
            {
              backgroundColor: getIconBgColor(type),
            },
            iconContentStyle,
          ]}
        >
          {type && <View>{renderIcon(type, iconColor)}</View>}
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.Title, headerTextStyle]}>{title}</Text>
          <View
            style={[
              styles.underline,
              {
                backgroundColor: getIconBgColor(type),
              },
            ]}
          />
        </View>
        <View style={[styles.Content, contentStyle]}>
          <Text style={[styles.Desc, textBodyStyle]}>{textBody}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.Button, buttonStyle]}
              onPress={callback}
            >
              <Text
                style={[
                  styles.TextButton,
                  { color: getIconBgColor(type) },
                  buttonTextStyle,
                ]}
              >
                {buttonText}
              </Text>
            </TouchableOpacity>
            {secondaryButtonText && (
              <TouchableOpacity
                style={[styles.Button, secondaryButtonStyle]}
                onPress={secondaryCallback}
              >
                <Text
                  style={[
                    styles.TextButton,
                    { color: getIconBgColor(type) },
                    secondaryButtonTextStyle,
                  ]}
                >
                  {secondaryButtonText}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 80,
    position: 'absolute',
    top: 0,
  },
  Content: {
    padding: 20,
    alignItems: 'center',
  },
  Title: {
    fontWeight: '600',
    fontSize: verticalScale(18),
    textTransform: 'capitalize',
    color: Colors.Black,
  },
  Desc: {
    textAlign: 'center',
    color: Colors.Black,
  },
  Success: {
    backgroundColor: Colors.SoftGreen,
    shadowColor: Colors.SoftGreen,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  Danger: {
    backgroundColor: Colors.VerySoftRed,
    shadowColor: Colors.VerySoftRed,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  Network: {
    shadowColor: Colors.LightGray,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  Button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 10,
  },
  imageContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(100 / 2),
    left: -30,
    top: -30,
    width: scale(100),
    height: scale(100),
  },
  TextButton: {
    fontWeight: '500',
    fontSize: verticalScale(16),
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  dialog: {
    padding: scale(20),
    marginBottom: verticalScale(40),
    borderRadius: scale(5),
    backgroundColor: Colors.White,
    overflow: 'hidden',
    position: 'relative',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(60),
  },
  underline: {
    height: scale(2),
    width: '15%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: verticalScale(10),
  },
});
