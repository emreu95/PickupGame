import React, { Component } from 'react';
import PropTypes, { func } from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import Geolocation from 'geolocation';
import { NavigationAction, NavigationActions } from 'react-navigation';
import MapView from 'react-native-maps';

class MapPage extends Component {

    constructor(){
        super();
        this.state = {
            lats: 0,
            long: 0,
        }
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params.cord.latitude);
        console.log(this.props.navigation.state.params.cord.longitude);
        this.setState({
            lats: this.props.navigation.state.params.cord.latitude,
            long: this.props.navigation.state.params.cord.longitude,
        })
    }

    render() {

        return (
            <View style={styles.containor}>
                <MapView
                    style={styles.mapView}
                    initialRegion={{
                        latitude: this.state.lats,
                        longitude: this.state.long,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
                    <MapView.Marker
                        coordinate={{latitude: this.state.lats, longitude: this.state.long}}
                        title={'ME'}
                    />
                </MapView>
            </View>
        );
    }
}

MapPage.propTypes = {

};

const styles = StyleSheet.create({
    containor: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    mapView: {
        flex: 1,
        
    }
})

export default MapPage;