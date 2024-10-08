import {View, Text} from 'react-native';
import React from 'react';

import {Stack} from '../hooks';
import {screens} from '../screens';
import TabNavigator from './TabNavigator';
import LocationScreen from '../screens/auth/LocationScreen'; // Ensure this import is correct
import NewUserScreen from '../screens/auth/NewUserScreen';
import Menulist from '../screens/Menulist';
import Home from '../screens/tabs/Home';

const StackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Onboarding'
        component={screens.Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='TabNavigator'
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Reviews'
        component={screens.Reviews}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='LeaveAReview'
        component={screens.LeaveAReview}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='OrderHistory'
        component={screens.OrderHistory}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='SignIn'
        component={screens.SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='NewPassword'
        component={screens.NewPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='SignUp'
        component={screens.SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='ConfirmationCode'
        component={screens.ConfirmationCode}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='SignUpaccountCreated'
        component={screens.SignUpaccountCreated}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='ForgotPassword'
        component={screens.ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='ForgotPasswordSentEmail'
        component={screens.ForgotPasswordSentEmail}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name='EditProfile'
        component={screens.EditProfile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Product'
        component={screens.Product}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Checkout'
        component={screens.Checkout}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='OrderSuccessful'
        component={screens.OrderSuccessful}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='OrderFailed'
        component={screens.OrderFailed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Menulist'
        component={Menulist}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='VerifyYourPhoneNumber'
        component={screens.VerifyYourPhoneNumber}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='TrackYourOrder'
        component={screens.TrackYourOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Promocodes'
        component={screens.Promocodes}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='Wallet'
        component={screens.Wallet}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name='AddANewCard'
        component={screens.AddANewCard}
        options={{headerShown: false}}
      />

      {/* Update this line to directly use the imported LocationScreen */}
      <Stack.Screen
        name='LocationScreen'
        component={LocationScreen} // Use the imported LocationScreen directly
        options={{headerShown: false}}
      />

      <Stack.Screen
        name='NewUserScreen'
        component={NewUserScreen} // Use the imported LocationScreen directly
        options={{headerShown: false}}
      />

      <Stack.Screen
        name='AddANewAddress'
        component={screens.AddANewCard}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name='Home'
        component={screens.Home}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
