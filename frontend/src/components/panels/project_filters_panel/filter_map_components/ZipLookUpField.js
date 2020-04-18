import React, { useEffect } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { geo_service } from '../../../../services/geo_service';
import { setMapCenter } from '../../../../actions/map';
import { setZipCode, setLatLngCoordinates } from '../../../../actions/filters';
import { fetchGeoData, configGeoDataProps, setGeoDataCookies } from '../../../../utilities/geo_utilities';
import { connect } from 'react-redux';

const ZipLookUpField = (props) => {
    useEffect(() => {
        fetchGeoData().then(geo_data => {
            configGeoDataProps(geo_data).then(geo_data_props => {
                const lat_lng = {lat: geo_data_props.latitude, lng: geo_data_props.longitude};
                props.dispatch(setMapCenter(lat_lng));
                props.dispatch(setLatLngCoordinates(lat_lng));
                props.dispatch(setZipCode(geo_data_props.zipcode));
                setGeoDataCookies(geo_data_props);
            })
        });
    }, []);

    const setMapCenterWithZipCode = (zipcode) => {
        const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);
        
        if(isValidZip) {
            geo_service.fetchGeoDataByZipCode(zipcode).then(lat_lng => {
                if(lat_lng.hasOwnProperty('lat') && lat_lng.hasOwnProperty('lng')) {
                    props.dispatch(setMapCenter(lat_lng));
                    props.dispatch(setLatLngCoordinates(lat_lng));
                    const geo_data_props = {latitude: lat_lng.lat, longitude: lat_lng.lng, zipcode: zipcode};
                    setGeoDataCookies(geo_data_props);
                }
            });
        }
        props.dispatch(setZipCode(zipcode));
    }

    return (
        <InputGroup size="sm" className="my-2">
            <FormControl 
                aria-label="zipcode lookup" 
                value={props.zipcode}
                onChange={(e) => setMapCenterWithZipCode(e.target.value)}/>
        </InputGroup>
    );
}

const mapStateToProps = (state, ownProps) => {
    return { 
        ...ownProps,
        zipcode: state.filters.zipcode
    }
};

export default connect(mapStateToProps)(ZipLookUpField);