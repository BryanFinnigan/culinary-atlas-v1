"use client";

import { useMemo, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Map country codes to cuisine names for all available cuisines
const countryNameById: Record<string, string> = {
  "12": "Algeria",
  "32": "Argentina",
  "36": "Australia",
  "40": "Austria",
  "50": "Bangladesh",
  "56": "Belgium",
  "68": "Bolivia",
  "76": "Brazil",
  "124": "Canada",
  "152": "Chile",
  "156": "China",
  "170": "Colombia",
  "188": "Costa Rica",
  "191": "Croatia",
  "192": "Cuba",
  "203": "Czech Republic",
  "208": "Denmark",
  "214": "Dominican Republic",
  "218": "Ecuador",
  "356": "India",
  "392": "Japan",
  "410": "South Korea",
  "504": "Morocco",
};

// Approximate center coordinates for countries
const markerCoordinates: Record<string, [number, number]> = {
  Algeria: [2, 28],
  Argentina: [-63, -38],
  Australia: [133, -27],
  Austria: [14, 47],
  Bangladesh: [90, 24],
  Belgium: [4, 50],
  Bolivia: [-63, -16],
  Brazil: [-51, -14],
  Canada: [-95, 56],
  Chile: [-71, -30],
  China: [104, 35],
  Colombia: [-74, 4],
  "Costa Rica": [-83, 10],
  Croatia: [15, 45],
  Cuba: [-77, 21],
  "Czech Republic": [15, 49],
  Denmark: [10, 56],
  "Dominican Republic": [-70, 19],
  Ecuador: [-78, -1],
  India: [78, 20],
  Japan: [138, 36],
  "South Korea": [127, 37],
  Morocco: [-6, 32],
};

type MapExplorerProps = {
  countries: string[];
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
};

export default function MapExplorer({ countries, selectedCountry, setSelectedCountry }: MapExplorerProps) {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Group countries by region for legend
  const regionGroups = useMemo(() => {
    const groups: Record<string, string[]> = {};
    countries.forEach((country) => {
      // You'll need to access region data from your cuisines.json
      // For now, we'll use a simple categorization
      const regions: Record<string, string> = {
        Algeria: "North Africa",
        Argentina: "South America",
        Australia: "Oceania",
        Austria: "Western Europe",
        Bangladesh: "South Asia",
        Belgium: "Western Europe",
        Bolivia: "South America",
        Brazil: "South America",
        Canada: "North America",
        Chile: "South America",
        China: "East Asia",
        Colombia: "South America",
        "Costa Rica": "Central America",
        Croatia: "Balkans",
        Cuba: "Caribbean",
        "Czech Republic": "Central Europe",
        Denmark: "Northern Europe",
        "Dominican Republic": "Caribbean",
        Ecuador: "South America",
        India: "South Asia",
        Japan: "East Asia",
        "South Korea": "East Asia",
        Morocco: "North Africa",
      };

      const region = regions[country] || "Other";
      if (!groups[region]) groups[region] = [];
      groups[region].push(country);
    });
    return groups;
  }, [countries]);

  const handleZoom = (newZoom: number) => {
    setZoom(newZoom);
  };

  return (
    <div className="space-y-4">
      {/* Map Controls */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => handleZoom(Math.max(1, zoom - 0.5))}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            aria-label="Zoom out"
          >
            −
          </button>
          <div className="flex items-center px-4 text-sm font-medium text-slate-600">
            {(zoom * 100).toFixed(0)}%
          </div>
          <button
            onClick={() => handleZoom(Math.min(4, zoom + 0.5))}
            className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            setZoom(1);
            setPosition({ x: 0, y: 0 });
          }}
          className="rounded-lg bg-saffron px-4 py-2 text-sm font-semibold text-ink hover:bg-orange-400"
        >
          Reset View
        </button>
      </div>

      {/* Interactive Map */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-sky-50 shadow-xl">
        <ComposableMap projection="geoEqualEarth" className="h-auto w-full" style={{ height: "500px" }}>
          <ZoomableGroup zoom={zoom} center={[position.x, position.y]}>
            <Geographies geography={geoUrl}>
              {({ geographies }: { geographies: any[] }) =>
                geographies.map((geo: any) => {
                  const country = countryNameById[String(geo.id)];
                  const isAvailable = country && countries.includes(country);
                  const isSelected = country === selectedCountry;

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => isAvailable && setSelectedCountry(country)}
                      onMouseEnter={() => {
                        if (isAvailable) {
                          (geo as any).style = { outline: "none" };
                        }
                      }}
                      aria-label={country || geo.properties.name}
                      style={{
                        default: {
                          fill: isSelected ? "#e76f51" : isAvailable ? "#a7f3d0" : "#d8e2dc",
                          stroke: "#ffffff",
                          strokeWidth: 0.75,
                          outline: "none",
                          cursor: isAvailable ? "pointer" : "default",
                          transition: "all 0.2s ease",
                        },
                        hover: {
                          fill: isAvailable ? "#f4a261" : "#cbd5e1",
                          stroke: "#ffffff",
                          strokeWidth: 0.75,
                          outline: "none",
                          cursor: isAvailable ? "pointer" : "default",
                        },
                        pressed: {
                          fill: "#e76f51",
                          stroke: "#ffffff",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Markers for available countries */}
            {countries.map((country) => {
              const coordinates = markerCoordinates[country];
              if (!coordinates) return null;
              const isMarkerSelected = selectedCountry === country;
              return (
                <Marker
                  key={country}
                  coordinates={coordinates}
                  onClick={() => setSelectedCountry(country)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    r={isMarkerSelected ? 6 : 4}
                    fill={isMarkerSelected ? "#e76f51" : "#14213d"}
                    stroke="#fff"
                    strokeWidth={2}
                    style={{ transition: "all 0.2s ease" }}
                  />
                </Marker>
              );
            })}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      {/* Legend - Regional Groupings */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-bold text-ink">Cuisines by Region</h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(regionGroups).map(([region, regionCountries]) => (
            <div key={region} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <h4 className="mb-3 font-semibold text-saffron">{region}</h4>
              <div className="flex flex-wrap gap-2">
                {regionCountries.map((country) => (
                  <button
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      selectedCountry === country
                        ? "bg-saffron text-ink shadow"
                        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-orange-50"
                    }`}
                  >
                    {country}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
