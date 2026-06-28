"use client";

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const countryNameById: Record<string, string> = {
  "392": "Japan",
  "410": "South Korea",
  "356": "India",
  "504": "Morocco"
};

const markerCoordinates: Record<string, [number, number]> = {
  Japan: [138, 37],
  "South Korea": [128, 36],
  India: [78, 22],
  Morocco: [-7, 31]
};

type WorldMapProps = {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
};

export default function WorldMap({ countries, selectedCountry, setSelectedCountry }: WorldMapProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-sky-50 shadow-xl">
      <ComposableMap projectionConfig={{ scale: 150 }} className="h-auto w-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const country = countryNameById[String(geo.id)];
              const isAvailable = country && countries.includes(country);
              const isSelected = country === selectedCountry;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => isAvailable && setSelectedCountry(country)}
                  aria-label={country || geo.properties.name}
                  style={{
                    default: {
                      fill: isSelected ? "#f4a261" : isAvailable ? "#a7f3d0" : "#d8e2dc",
                      stroke: "#ffffff",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: isAvailable ? "pointer" : "default"
                    },
                    hover: {
                      fill: isAvailable ? "#f4a261" : "#cbd5e1",
                      stroke: "#ffffff",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: isAvailable ? "pointer" : "default"
                    },
                    pressed: {
                      fill: "#e76f51",
                      outline: "none"
                    }
                  }}
                />
              );
            })
          }
        </Geographies>

        {countries.map((country) => {
          const coordinates = markerCoordinates[country];
          if (!coordinates) return null;
          return (
            <Marker key={country} coordinates={coordinates} onClick={() => setSelectedCountry(country)}>
              <circle r={selectedCountry === country ? 7 : 5} fill={selectedCountry === country ? "#e76f51" : "#14213d"} stroke="#fff" strokeWidth={2} />
              <text textAnchor="middle" y={-10} className="fill-ink text-[10px] font-bold">
                {country}
              </text>
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
