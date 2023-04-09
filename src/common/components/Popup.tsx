import PropTypes from 'prop-types';

import { Colors } from '../colors';

import React from 'react';

import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { scale, verticalScale } from 'react-native-size-matters';

import { POPUP_TYPE } from '../constants';
import { Text } from 'react-native';
import { TickIcon } from './svg/TickIcon';
import { CloseIcon } from './svg/CloseIcon';
import { WifiIcon } from './svg/WifiIcon';
import type { GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';

interface Props {
  visible?: boolean;
  type?: string;
  title?: string;
  textBody?: string;
  buttonText?: string;
  contentStyle?: ViewStyle;
  iconContentStyle?: ViewStyle;
  iconColor?: string;
  textBodyStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  callback?: (event: GestureResponderEvent) => void;
}

const renderIcon = (type: string, color?: string) => {
  switch (true) {
    case type === POPUP_TYPE.Success:
      return <TickIcon color={color} />;

    case type === POPUP_TYPE.Danger:
      return <CloseIcon color={color} />;
    default:
      return <WifiIcon color={color} />;
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
  contentStyle,
  textBodyStyle,
  buttonStyle,
  buttonTextStyle,
  iconColor,
  iconContentStyle,
  callback = () => {},
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
          <Text style={[styles.Title]}>{title}</Text>
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
        </View>
      </View>
    </Modal>
  );
};

Popup.propTypes = {
  buttonText: PropTypes.string,
  callback: PropTypes.func,
  textBody: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  visible: PropTypes.bool,
};

Popup.defaultProps = {
  visible: false,
  callback: () => {},
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
    width: '100%',
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
});
