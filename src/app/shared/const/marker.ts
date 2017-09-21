import { GoogleMap, Size, Point, LatLngLiteral } from '@agm/core/services/google-maps-types';

export interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    cityName?: string; 
    size?: Size;
    scaledSize?: Size;
}