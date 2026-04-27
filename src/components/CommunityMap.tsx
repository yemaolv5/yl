/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { type Merchant } from '../data';

interface CommunityMapProps {
  merchants: Merchant[];
}

export default function CommunityMap({ merchants }: CommunityMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Fix for default icons
    const ICON_BASE_URL = 'https://unpkg.com/leaflet@1.9.4/dist/images/';
    const defaultIcon = L.icon({
      iconUrl: `${ICON_BASE_URL}marker-icon.png`,
      iconRetinaUrl: `${ICON_BASE_URL}marker-icon-2x.png`,
      shadowUrl: `${ICON_BASE_URL}marker-shadow.png`,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Initialize map if not already done
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: [40.8123, 111.6765],
        zoom: 15,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapInstance.current);

      // Try to locate the user
      mapInstance.current.locate({ setView: true, maxZoom: 16 });
      
      const userIcon = L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      mapInstance.current.on('locationfound', (e) => {
        if (mapInstance.current) {
          L.marker(e.latlng, { icon: userIcon }).addTo(mapInstance.current).bindPopup('您在这里');
        }
      });
    }

    // Clear existing merchant markers before adding new ones
    const map = mapInstance.current;
    
    // Create markers for merchants
    const markers: L.Marker[] = [];
    merchants.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], { icon: defaultIcon })
        .addTo(map)
        .bindPopup(`
          <div style="font-family: inherit;">
            <h4 style="margin:0 0 4px;font-weight:bold;">${m.name}</h4>
            <p style="margin:0;font-size:10px;color:#666;">${m.address}</p>
            <p style="margin:4px 0 0;font-size:11px;color:#dc2626;font-weight:bold;">${m.distance}</p>
          </div>
        `);
      markers.push(marker);
    });

    // Cleanup function
    return () => {
      markers.forEach(m => m.remove());
    };
  }, [merchants]);

  // Handle entire map destruction on unmount
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner relative z-10">
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
}
