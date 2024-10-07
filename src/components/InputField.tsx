import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const InputField = ({value, placeholder, onChangeText, containerStyle}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        style={styles.input}
        placeholderTextColor='#A9A9A9' // Optional: change placeholder text color
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 14, // Maintain spacing between fields
  },
  input: {
    height: 50,
    borderWidth: 0, // Remove the border
    borderRadius: 8, // Optional: Add rounded corners
    padding: 10, // Add padding for better text placement
    backgroundColor: '#F5F5F5', // Light background for better visibility
    color: '#000', // Text color
  },
});

export default InputField;
