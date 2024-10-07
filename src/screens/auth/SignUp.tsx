import React, {useState, useRef} from 'react';
import {View, ViewStyle, TextInput, TouchableOpacity, Text} from 'react-native';
import {svg} from '../../assets/svg';
import {theme} from '../../constants';
import {components} from '../../components';
import {useAppNavigation} from '../../hooks';
import {homeIndicatorHeight} from '../../utils';

const SignUp: React.FC = (): JSX.Element => {
  const navigation = useAppNavigation();

  const [userName, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isCustomer, setIsCustomer] = useState<boolean>(true); // State for toggling tabs

  const inp1Ref = useRef<TextInput>(null);
  const inp2Ref = useRef<TextInput>(null);
  const inp3Ref = useRef<TextInput>(null);
  const inp4Ref = useRef<TextInput>(null);

  const renderStatusBar = () => <components.StatusBar />;

  const renderHeader = () => <components.Header goBack={true} />;

  const renderMainText = () => (
    <Text style={{marginBottom: 30, fontSize: 24, fontWeight: 'bold'}}>
      Sign up
    </Text>
  );

  const renderTab = () => (
    <View style={styles.tabContainer}>
      <TouchableOpacity
        style={[
          styles.tabButton,
          isCustomer ? styles.activeTab : styles.inactiveTab,
          isCustomer ? styles.activeTabBorder : {},
        ]}
        onPress={() => setIsCustomer(true)}
      >
        <Text style={styles.tabText}>Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.tabButton,
          !isCustomer ? styles.activeTab : styles.inactiveTab,
          !isCustomer ? styles.activeTabBorder : {},
        ]}
        onPress={() => setIsCustomer(false)}
      >
        <Text style={styles.tabText}>Vendor</Text>
      </TouchableOpacity>
    </View>
  );

  const renderInputFields = () => (
    <>
      <components.InputField
        type='username'
        innerRef={inp1Ref}
        value={userName}
        placeholder='Your Name'
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setUserName(text)}
      />
      <components.InputField
        type='email'
        value={email}
        checkIcon={true}
        innerRef={inp2Ref}
        placeholder='youremail@example.com'
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setEmail(text)}
      />
      <components.InputField
        type='password'
        value={password}
        eyeOffIcon={true}
        innerRef={inp3Ref}
        placeholder='••••••••'
        secureTextEntry={true}
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setPassword(text)}
      />
      <components.InputField
        type='password'
        eyeOffIcon={true}
        innerRef={inp4Ref}
        value={confirmPassword}
        placeholder='••••••••'
        secureTextEntry={true}
        containerStyle={{marginBottom: 14}}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      {/* Additional field for Vendor */}
      {!isCustomer && (
        <components.InputField
          type='businessName'
          innerRef={null}
          value={''} // Add state for business name if needed
          placeholder='Your Business Name'
          containerStyle={{marginBottom: 14}}
          onChangeText={(text) => {}} // Handle change if needed
        />
      )}
    </>
  );

  const renderButton = () => (
    <components.Button
      title='Sign up'
      containerStyle={{marginBottom: 20}}
      onPress={() => {
        if (isCustomer) {
          navigation.navigate('VerifyYourPhoneNumber', {userType: 'Customer'});
        } else {
          navigation.navigate('VerifyYourPhoneNumber', {userType: 'Vendor'});
        }
      }}
    />
  );

  const renderAlreadyHaveAccount = () => (
    <components.ParsedText
      parse={[
        {
          pattern: /Sign in./,
          style: {color: theme.colors.mainTurquoise},
          onPress: () => navigation.replace('SignIn'),
        },
      ]}
    >
      <Text>Already have an account? Sign in.</Text>
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
        {renderTab()}
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

const styles = {
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1, // Use flex to distribute space evenly
    alignItems: 'center', // Center the text
    borderWidth: 2, // Set a default border width
    borderColor: 'transparent', // Default to transparent
  },
  activeTab: {
    backgroundColor: theme.colors.mainTurquoise,
  },
  inactiveTab: {
    backgroundColor: theme.colors.lightGray,
  },
  activeTabBorder: {
    borderColor: theme.colors.mainTurquoise, // Use the same color as active background
  },
  tabText: {
    color: theme.colors.white,
  },
};

export default SignUp;
