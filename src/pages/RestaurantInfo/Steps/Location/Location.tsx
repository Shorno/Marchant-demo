import { useEffect, useRef, useState } from 'react';
import { Button, Row, Col } from 'antd';
import { useFormContext } from 'react-hook-form';
import FormInput from '../../../../components/From/FromInput';
import './location.css';

// Declare global google variable
declare global {
    interface Window {
        google: typeof google;
        initMap: () => void;
    }
}

// Initialize map function (outside of component to prevent recreations)
function initMap(mapElement: HTMLElement, coordinates: { latitude: number; longitude: number }) {
    const map = new window.google.maps.Map(mapElement, {
        center: { lat: coordinates.latitude, lng: coordinates.longitude },
        zoom: 15,
    });

    const marker = new window.google.maps.Marker({
        position: { lat: coordinates.latitude, lng: coordinates.longitude },
        map: map,
    });

    return { map, marker };
}

export default function Location() {
    const { setValue } = useFormContext();
    const [coordinates, setCoordinates] = useState({ latitude: 23.6850, longitude: 90.3563 });
    const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);
    const googleMapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);

    useEffect(() => {
        // Load Google Maps script
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // Define the global initMap function
        window.initMap = () => {
            setGoogleMapsLoaded(true);
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (googleMapsLoaded && mapRef.current) {
            const { map, marker } = initMap(mapRef.current, coordinates);
            googleMapRef.current = map;
            markerRef.current = marker;
        }
    }, [googleMapsLoaded]);

    useEffect(() => {
        if (googleMapRef.current && markerRef.current) {
            const latLng = new window.google.maps.LatLng(coordinates.latitude, coordinates.longitude);
            googleMapRef.current.setCenter(latLng);
            markerRef.current.setPosition(latLng);
        }
    }, [coordinates]);

    const handleAutoDetect = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setValue('lat_coordinates', latitude);
                    setValue('lng_coordinates', longitude);
                    setCoordinates({ latitude, longitude });
                },
                (error) => {
                    console.error("Error detecting location:", error);
                    alert("Unable to detect location. Please allow location access and try again.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    return (
        <Row className='location' gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
            <Col span={10}>
                <FormInput
                    label="Latitude:"
                    name="lat_coordinates"
                    size="large"
                />
            </Col>
            <Col span={10}>
                <FormInput
                    label="Longitude:"
                    name="lng_coordinates"
                    size="large"
                />
            </Col>
            <Col span={4} style={{ textAlign: 'center' }}>
                <Button type="primary" style={{ marginTop: 21 }} onClick={handleAutoDetect}>
                    AUTO DETECT
                </Button>
            </Col>
            <Col span={24} className='map-div'>
                <div ref={mapRef} style={{ width: '100%', height: '100%' }}></div>
            </Col>
        </Row>
    );
}

