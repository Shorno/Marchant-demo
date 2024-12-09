import { useEffect, useRef, useState } from 'react';
import { Button, Row, Col } from 'antd';
import FormInput from '../../../../components/From/FromInput';
import { useFormContext } from 'react-hook-form';

export default function Location() {
    const { setValue } = useFormContext();
    const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }>({ latitude: 23.6850, longitude: 90.3563});

    const mapRef = useRef<google.maps.Map | null>(null);
    const markerRef = useRef<google.maps.Marker | null>(null);

    // Function to initialize the map and marker
    const initMap = () => {
        if (!mapRef.current) {
            mapRef.current = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: { lat: coordinates.latitude, lng: coordinates.longitude },
                zoom: 15,
            });

            markerRef.current = new google.maps.Marker({
                position: { lat: coordinates.latitude, lng: coordinates.longitude },
                map: mapRef.current,
            });
        }
    };


    useEffect(() => {
        if (window.google) {
            initMap();
        }
    }, [coordinates]);

    useEffect(() => {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

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
        <Row gutter={{ xs: 24, xl: 24, lg: 24, md: 24 }}>
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
                <Button type="primary" style={{ marginTop: 16 }} onClick={handleAutoDetect}>
                    Auto Detect
                </Button>
            </Col>
            <Col span={24} style={{ height: 400, marginTop: 16 }}>
                <div id="map" style={{ width: '100%', height: '100%' }}></div>
            </Col>
        </Row>
    );
}
