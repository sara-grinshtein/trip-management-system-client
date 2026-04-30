import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getStudentLocation } from "../services/teacher.service";
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { Location, Coordinate } from "../types/Location.types";
import styles from "./TeacherPage.module.css";
import { Link, useLocation } from "react-router-dom";

export default function TeacherPage() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.REACT_APP_GOOGLE_MAP_ID;

  //retrieve the teacherId from redux
  const teacherId = useSelector((state: RootState) => state.auth.user?.id);
  const [locations, setLocations] = useState<Location[]>([]);

  const locationPage = useLocation();
  console.log("teacherId:", teacherId);
  useEffect(() => {
    if (!teacherId) return;
    const fetchData = async () => {
      try {
        console.log("teacherId: " + teacherId);
        const data = await getStudentLocation(teacherId);
        setLocations(data);
        //print
        console.table(data);

      } catch (err) {
        console.error(err);
      }
    };
    const interval = setInterval(() => { fetchData() }, 3000);
    return () => {
      clearInterval(interval);
    };

  },
    [teacherId, locationPage.key]);

  const convertToDecimal = (coord?: Coordinate) => {
    if (!coord) return null;

    return coord.degrees + coord.minutes / 60 + coord.seconds / 3600;
  };

  const getCenter = () => {
    if (!locations.length) return null;

    const valid = locations
      .map(loc => {
        const lat = convertToDecimal(loc.latitude);
        const lng = convertToDecimal(loc.longitude);
        return lat && lng ? { lat, lng } : null;
      })
      .filter(Boolean) as { lat: number; lng: number }[];

    const avgLat = valid.reduce((sum, p) => sum + p.lat, 0) / valid.length;
    const avgLng = valid.reduce((sum, p) => sum + p.lng, 0) / valid.length;

    return { lat: avgLat, lng: avgLng };
  };

  return (
    <div className={styles.container}>
      <Link to="/list-students" className={styles.topButton}>
        רשימת התלמידות
      </Link>
      <h1 className={styles.title}>
        מפת מיקומי התלמידות:
      </h1>

      <p className={styles.description}>
        במפה זו תוכלי לצפות במיקומי התלמידות
      </p>

      <div className={styles.mapContainer}>
        <APIProvider apiKey={apiKey!} libraries={['marker']}>
          <Map
            mapId={mapId}
            center={getCenter()}
            defaultZoom={19}
            style={{ width: "100%", height: "100%" }}
          >

            {locations.map((loc: Location, index: number) => {
              const lat = convertToDecimal(loc.latitude);
              const lng = convertToDecimal(loc.longitude);

              if (lat == null || lng == null) return null;

              return (
                <AdvancedMarker
                  key={index}
                  position={{ lat, lng }}
                  anchorLeft="50%"
                  anchorTop="100%"
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                      style={{
                        background: "#f8b4b4",
                        border: "2px solid black",
                        padding: "4px 8px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        borderRadius: "4px",
                        whiteSpace: "nowrap",
                        marginBottom: "2px"
                      }}
                    >
                      {loc.ID}
                    </div>

                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderTop: "12px solid red"
                      }}
                    />
                  </div>
                </AdvancedMarker>
              );
            })}

          </Map>
        </APIProvider>
      </div>
    </div>
  );


}