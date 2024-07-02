import { View, StyleSheet, Text } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { defaultStyles } from '@/constants/Styles';
import { useRouter } from 'expo-router';
import MapView from 'react-native-map-clustering';
import * as Location from 'expo-location';

interface Props {
    listings: any;
}

const INITIAL_REGION = {
    latitude: 37.33,
    longitude: -122,
    latitudeDelta: 9,
    longitudeDelta: 9,
  };
  

const ListingsMap = memo(({ listings }: Props) => {

const router = useRouter();
const mapRef = useRef<any>(null);

  // When the component mounts, locate the user
  useEffect(() => {
    onLocateMe();
  }, []);

const onMarkerSelected = (item: any) => {
    router.push(`/listing/${item.properties.id}`)
}

  // Focus the map on the user's location
  const onLocateMe = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 7,
      longitudeDelta: 7,
    };

    mapRef.current?.animateToRegion(region);
  };


const renderCluster = (cluster: any) => {
    const { id, geometry, onPress, properties } = cluster;

    const points = properties.point_count;

    return (
        <Marker
        key={`cluster-${id}`}
        onPress={onPress}
        coordinate={{
            longitude: geometry.coordinates[0],
            latitude: geometry.coordinates[1]
        }}
        >
            <View style={styles.marker}>
                <Text style={{
                    color: '#000',
                    textAlign: 'center',
                    fontFamily: 'mon-sb'
                }}>{points}</Text>
            </View>
        </Marker>
    )
}

return (
    <View style={defaultStyles.container}>
      <MapView  
        ref={mapRef}
        animationEnabled={false} 
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={INITIAL_REGION}
        clusterColor='#fff'
        clusterTextColor='#000'
        clusterFontFamily='mon-sb'
        renderCluster={renderCluster}
      >
        {listings.features.map((item: any) => (
            <Marker 
            key={item.properties.id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
                latitude: +item.properties.latitude,
                longitude: +item.properties.longitude,
            }}>
                <View style={styles.marker}>
                    <Text style={styles.markerText}>€ {item.properties.price}</Text>
                </View>
            </Marker>  
        ))}
      </MapView>
    </View>
  )
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    marker: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      elevation: 5,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
    markerText: {
      fontSize: 14,
      fontFamily: 'mon-sb',
    },
    locateBtn: {
      position: 'absolute',
      top: 70,
      right: 20,
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 10,
      elevation: 2,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: {
        width: 1,
        height: 10,
      },
    },
  });
  

export default ListingsMap