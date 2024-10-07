import React, {useState} from 'react';
import {View, ViewStyle} from 'react-native';

import {text} from '../../text';
import {theme} from '../../constants';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';
import {homeIndicatorHeight} from '../../utils';

const NewUserScreen: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>(''); // New state for referral code

  const renderStatusBar = () => {
    return <components.StatusBar />;
  };

  const renderHeader = () => {
    return <components.Header goBack={true} />;
  };

  const renderWelcome = () => {
    return (
      <text.H1 style={{marginBottom: 14}}>
        It Seems You're New to Flitzy!
      </text.H1>
    );
  };

  const renderDescription = () => {
    return (
      <text.T16 style={{marginBottom: 30}}>
        Fill in the details below and let us take care of your garden!
      </text.T16>
    );
  };

  const renderInputFields = () => {
    return (
      <React.Fragment>
        <components.InputField
          value={name}
          placeholder='Your Name'
          onChangeText={(text) => setName(text)}
          containerStyle={{marginBottom: 14}}
        />

        <components.InputField
          type='email'
          value={email}
          placeholder='Email Address'
          onChangeText={(text) => setEmail(text)}
          containerStyle={{marginBottom: 14}}
        />

        <components.InputField
          value={address}
          placeholder='Your Address'
          onChangeText={(text) => setAddress(text)}
          containerStyle={{marginBottom: 14}}
        />

        {/* Referral Code Field */}
        <components.InputField
          value={referralCode}
          placeholder='Referral Code (Optional)'
          onChangeText={(text) => setReferralCode(text)}
          containerStyle={{marginBottom: 20}}
        />
      </React.Fragment>
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
        {renderButton()}
      </components.KAScrollView>
    );
  };

  const renderButton = () => {
    return (
      <components.Button
        title='Save Details'
        containerStyle={{marginBottom: 20}}
        onPress={() => {
          console.log('User Details Saved:', {
            name,
            email,
            address,
            referralCode,
          });
          navigation.navigate('LocationScreen'); // Navigate to MenuList after saving
        }}
      />
    );
  };

  const renderFooter = () => {
    const containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginTop: 10,
      marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
    };

    return <View style={{...containerStyle}} />;
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

export default NewUserScreen;
