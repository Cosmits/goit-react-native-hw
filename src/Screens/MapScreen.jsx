import React from 'react'
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useRoute } from "@react-navigation/native";

export default MapScreen = () => {

  const route = useRoute();
  const title = route?.params?.title

  const { latitude, longitude } = route?.params?.geolocation

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")} >
        <Marker
          title="I am here"
          coordinate={{ latitude: latitude, longitude: longitude }}
          description={title} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  
  mapStyle: {
    width: '100%',
    height: '100%',
  },
});