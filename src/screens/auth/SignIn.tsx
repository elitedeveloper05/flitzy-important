import React, {useState} from 'react';
import {View, Text, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';

import {text} from '../../text';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';
import {homeIndicatorHeight} from '../../utils';

const SignIn: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [otpVisible, setOtpVisible] = useState<boolean>(false); // To control OTP field visibility
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} />;
  };

  const renderWelcome = () => {
    return <text.H1 style={{marginBottom: 14}}>Welcome To Flitzy!</text.H1>;
  };

  const renderDescription = () => {
    return (
      <text.T16 style={{marginBottom: 30}}>
        Enter your Phone number to continue
      </text.T16>
    );
  };

  const renderInputFields = () => {
    return (
      <React.Fragment>
        {/* <components.InputField
          type='email'
          value={email}
          checkIcon={true}
          placeholder='jordanhebert@mail.com'
          onChangeText={(text) => setEmail(text)}
          containerStyle={{marginBottom: 14}}
        /> */}

        {/* Phone Number Input Field */}
        <components.InputField
          type='phone'
          value={phoneNumber}
          placeholder='Phone Number'
          onChangeText={(text) => setPhoneNumber(text)}
          containerStyle={{marginBottom: 14}}
        />

        {/* Conditionally Render OTP Field */}
        {otpVisible && (
          <components.InputField
            type='number'
            value={otp}
            placeholder='Enter OTP'
            onChangeText={(text) => setOtp(text)}
            containerStyle={{marginBottom: 20}}
          />
        )}
      </React.Fragment>
    );
  };

  const renderGetOtpLink = () => {
    const textStyles: TextStyle = {
      ...theme.fonts.textStyle_14,
      color: theme.colors.mainTurquoise,
    };

    return (
      <Text
        onPress={() => setOtpVisible(true)} // Show OTP field when clicked
        style={{...textStyles}}
      >
        Get OTP
      </Text>
    );
  };

  const renderRememberMe = () => {
    return (
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => setRememberMe(!rememberMe)}
      >
        <View
          style={{
            width: 18,
            height: 18,
            backgroundColor: '#E6EFF8',
            borderRadius: 4,
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {rememberMe && (
            <View
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: theme.colors.mainTurquoise,
              }}
            />
          )}
        </View>
        <text.T14>Remember me</text.T14>
      </TouchableOpacity>
    );
  };

  const renderAdditionalButtons = () => {
    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 40,
    };

    return (
      <View style={{...containerStyle}}>
        {renderRememberMe()}
        {renderGetOtpLink()}
      </View>
    );
  };

  const renderContent = () => {
    const styles: ViewStyle = {
      flexGrow: 1,
      backgroundColor: theme.colors.white,
      paddingHorizontal: 20,
      marginHorizontal: 20,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      justifyContent: 'center',
      marginTop: 10,
    };

    return (
      <components.KAScrollView contentContainerStyle={{...styles}}>
        {renderWelcome()}
        {renderDescription()}
        {renderInputFields()}
        {renderAdditionalButtons()}
        {renderButton()}
        {renderDonTHaveAccount()}
      </components.KAScrollView>
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title='Proceed'
        containerStyle={{marginBottom: 20}}
        onPress={() => {
          navigation.navigate('NewUserScreen');
        }}
      />
    );
  };

  const renderDonTHaveAccount = () => {
    return (
      <components.ParsedText
        parse={[
          {
            pattern: /Sign up as Vendor./,
            style: {color: theme.colors.mainTurquoise},
            onPress: () => navigation.navigate('SignUp'),
          },
        ]}
      >
        Want to Colloborate with us ?Sign up as Vendor.
      </components.ParsedText>
    );
  };

  const renderFooter = () => {
    const styles: ViewStyle = {
      backgroundColor: theme.colors.white,
      width: '48%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    };

    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
    };

    return (
      <View style={{...containerStyle}}>
        <View style={{...styles}}>
          <svg.FacebookSvg />
        </View>
        <View style={{...styles}}>
          <svg.GoogleSvg />
        </View>
      </View>
    );
  };

  const renderHomeIndicator = () => {
    return <components.HomeIndicator />;
  };

  return (
    <components.SmartView>
      {renderStatusBar()}
      {renderHeader()}
      {renderContent()}
      {renderFooter()}
      {renderHomeIndicator()}
    </components.SmartView>
  );
};

export default SignIn;
