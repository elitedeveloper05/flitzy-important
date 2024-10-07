import React, {useState, useRef} from 'react';
import {View, ViewStyle, TextInput, TouchableOpacity, Text} from 'react-native';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';
import {homeIndicatorHeight} from '../../utils';

const VendorSignUp: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [businessName, setBusinessName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [referralCode, setReferralCode] = useState<string>(''); // Optional referral code

  const inp1Ref = useRef<TextInput>(null);
  const inp2Ref = useRef<TextInput>(null);
  const inp3Ref = useRef<TextInput>(null);
  const inp4Ref = useRef<TextInput>(null);
  const inp5Ref = useRef<TextInput>(null);

  const renderStatusBar = () => <components.StatusBar />;
  const renderHeader = () => <components.Header goBack={true} />;

  const renderMainText = () => (
    <Text style={{marginBottom: 30, fontSize: 24, fontWeight: 'bold'}}>
      Vendor Registration
    </Text>
  );

  const renderInputFields = () => (
    <>
      {/* Name Field */}
      <components.InputField
        type='username'
        innerRef={inp1Ref}
        value={userName}
        placeholder='Your Name'
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setUserName(text)}
      />

      {/* Email Field */}
      <components.InputField
        type='email'
        value={email}
        innerRef={inp2Ref}
        placeholder='youremail@example.com'
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Phone Number Field */}
      <components.InputField
        type='phone'
        value={phoneNumber}
        innerRef={inp3Ref}
        placeholder='Phone Number'
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setPhoneNumber(text)}
      />

      {/* Business Name Field */}
      <components.InputField
        type='businessName'
        innerRef={inp4Ref}
        value={businessName}
        placeholder='Your Business Name'
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setBusinessName(text)}
      />

      {/* Address Field */}
      <components.InputField
        value={address}
        innerRef={inp5Ref}
        placeholder='Business Address'
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setAddress(text)}
      />

      {/* Optional Referral Code Field */}
      <components.InputField
        value={referralCode}
        placeholder='Referral Code (Optional)'
        containerStyle={{marginBottom: 20}}
        onChangeText={(text) => setReferralCode(text)}
      />
    </>
  );

  const renderButton = () => (
    <components.Button
      title='Register'
      containerStyle={{marginBottom: 20}}
      onPress={() => {
        console.log('Vendor Details Saved:', {
          userName,
          email,
          phoneNumber,
          businessName,
          address,
          referralCode,
        });

        //use navigation here
      }}
    />
  );

  const renderAlreadyHaveAccount = () => (
    <components.ParsedText
      parse={[
        {
          pattern: /Sign in./,
          style: {color: theme.colors.mainTurquoise},
          onPress: () => navigation.navigate('SignIn'),
        },
      ]}
    >
      <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
        <Text>Already have an account? Sign in.</Text>
      </TouchableOpacity>
    </components.ParsedText>
  );

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
        {renderMainText()}
        {renderInputFields()}
        {renderButton()}
        {renderAlreadyHaveAccount()}
      </components.KAScrollView>
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

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: homeIndicatorHeight() === 0 ? 20 : 10,
        }}
      >
        <View style={{...styles}}>
          <svg.FacebookSvg />
        </View>
        <View style={{...styles}}>
          <svg.GoogleSvg />
        </View>
      </View>
    );
  };

  const renderHomeIndicator = () => <components.HomeIndicator />;

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

export default VendorSignUp;
