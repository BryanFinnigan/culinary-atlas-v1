# World Cuisine Explorer MVP

A starter Next.js MVP for a 2D interactive world cuisine map.

## What is included

- Next.js + React + TypeScript
- Tailwind CSS styling
- Interactive 2D world map using `react-simple-maps`
- Search by country
- Region filter
- Country cuisine detail panel
- JSON data file at `/data/cuisines.json`

## How to run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## How to deploy

1. Create a new GitHub repository.
2. Upload these files to the repository.
3. Go to Vercel.
4. Import the GitHub repository.
5. Deploy.

## How to add your full dataset

Update `/data/cuisines.json` using this structure:

```json
{
  "Japan": {
    "region": "East Asia",
    "cuisineSummary": "...",
    "flavorProfile": ["Umami-rich", "Savory"],
    "staples": ["Rice", "Soy sauce"],
    "signatureDishes": ["Sushi", "Ramen"],
    "popularBeverages": ["Green tea"],
    "snackCulture": "...",
    "diningTraditions": "...",
    "beginnerFoods": ["Miso soup"],
    "premiumFoods": ["Wagyu"],
    "exportFriendlyProducts": ["Matcha", "Ramen kits"]
  }
}
```

Important: the current map highlights only the sample countries with marker support. You can add more ISO numeric IDs in `components/WorldMap.tsx` as you expand the dataset.
