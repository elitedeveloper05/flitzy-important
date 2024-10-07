import React, {useEffect, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, MapEvent, Region} from 'react-native-maps';
import * as Location from 'expo-location';
import {components} from '../../components';
import {theme} from '../../constants';

type LocationCoords = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

const LocationScreen: React.FC = (): JSX.Element => {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [originalLocation, setOriginalLocation] =
    useState<LocationCoords | null>(null); // Store original user location
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [addressDetails, setAddressDetails] = useState({
    flatNo: '',
    street: '',
    area: '',
    landmark: '',
  });

  // Create a ref for the MapView to control its region
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const userCoords: LocationCoords = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01, // Adjust to your desired zoom level
        longitudeDelta: 0.01,
      };

      setLocation(userCoords);
      setOriginalLocation(userCoords); // Save the original location
      setSelectedLocation(userCoords); // Set initial marker location to user's location
    })();
  }, []);

  const handleMapPress = (event: MapEvent): void => {
    const newLocation = {
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    };
    setSelectedLocation(newLocation); // Update only the selected location
  };

  const resetToUserLocation = async () => {
    if (originalLocation) {
      // Animate the map to the user's current location smoothly
      if (mapRef.current) {
        mapRef.current.animateToRegion(originalLocation, 1000); // 1000ms animation duration
      }
      setSelectedLocation(originalLocation); // Reset marker to original location
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setAddressDetails((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <components.SmartView>
      <components.Header goBack={true} />

      {/* App Name */}
      <Text style={styles.appName}>Flitzy</Text>
      <Text style={styles.locline}>Choose your Location</Text>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        {location && (
          <MapView
            ref={mapRef} // Attach the ref to the MapView
            style={styles.map}
            region={location as Region}
            onPress={handleMapPress}
          >
            {/* Marker for the user's current location - conditionally rendered */}
            {location &&
              !selectedLocation && ( // Only show current location if no new location is selected
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                  title='Your Location'
                  pinColor={theme.colors.mainTurquoise} // Pin color from theme
                />
              )}

            {/* Marker for the selected location */}
            {selectedLocation && (
              <Marker
                coordinate={selectedLocation}
                title='Selected Location'
                pinColor={theme.colors.mainTurquoise} // Pin color from theme
              />
            )}
          </MapView>
        )}

        {/* User Location Icon */}
        <TouchableOpacity
          style={styles.locationIconContainer}
          onPress={resetToUserLocation}
        >
          <Text style={styles.locationIconText}>📍</Text>
        </TouchableOpacity>
      </View>

      {/* Address Details Section */}
      <ScrollView contentContainerStyle={styles.formContainer}>
        <components.InputField
          type='text'
          value={addressDetails.flatNo}
          placeholder='Flat No / Door No'
          onChangeText={(value) => handleInputChange('flatNo', value)}
          containerStyle={{marginBottom: 14}}
        />
        <components.InputField
          type='text'
          value={addressDetails.street}
          placeholder='Street'
          onChangeText={(value) => handleInputChange('street', value)}
          containerStyle={{marginBottom: 14}}
        />
        <components.InputField
          type='text'
          value={addressDetails.area}
          placeholder='Area'
          onChangeText={(value) => handleInputChange('area', value)}
          containerStyle={{marginBottom: 14}}
        />
        <components.InputField
          type='text'
          value={addressDetails.landmark}
          placeholder='Landmark'
          onChangeText={(value) => handleInputChange('landmark', value)}
          containerStyle={{marginBottom: 14}}
        />

        {/* Save Location Button */}
        <components.Button
          title='Save Location'
          containerStyle={{marginTop: 20}}
          onPress={() => {
            console.log('Location Saved:', selectedLocation, addressDetails);
          }}
        />
      </ScrollView>
    </components.SmartView>
  );
};

const styles = StyleSheet.create({
  appName: {
    fontSize: 34,
    fontWeight: 'bold',
    color: theme.colors.mainTurquoise,
    textAlign: 'center',
    // marginVertical: 10, // Add some spacing above and below the name
  },
  mapContainer: {
    height: Dimensions.get('window').height * 0.4, // Map takes up 40% of the screen height
    borderBottomWidth: 1,
    borderColor: theme.colors.lightGray,
    position: 'relative', // Ensure the location icon is positioned on top
  },
  map: {
    flex: 1,
  },
  locationIconContainer: {
    position: 'absolute',
    bottom: 10, // Adjust to place the icon at the bottom right
    right: 10, // Adjust to place the icon at the bottom right
    backgroundColor: theme.colors.white,
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  locationIconText: {
    fontSize: 24, // Temporary text-based icon for now
  },
  formContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: theme.colors.white,
  },
  locline: {
    fontSize: 29,
    fontWeight: 'bold',
    color: theme.colors.mainTurquoise,
    textAlign: 'center',
    // marginVertical: 10, // Add some spacing above and below the name
  },
});

export default LocationScreen;
