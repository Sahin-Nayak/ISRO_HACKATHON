import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const StationMap = ({ stations }) => (
  <MapContainer center={[23.5937, 80.9629]} zoom={5} style={{ height: '500px' }}>
    <TileLayer
      attribution='&copy; OpenStreetMap'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {stations.map((s, i) => (
      <Marker key={i} position={[s.lat, s.lon]}>
        <Popup>{s.name}</Popup>
      </Marker>
    ))}
  </MapContainer>
);
