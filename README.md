# Hindu Literatuur Website

Een prachtige, responsive Next.js website voor het verkennen van heilige Hindoeïstische geschriften.

## Kenmerken

- 📚 Collectie van 4 belangrijke Hindoeïstische teksten
  - **Bhagavad Gita** - Volledige online versie met 18 hoofdstukken en 700 verzen
  - Ramayana - Download link
  - Upanishaden - Download link
  - Mahabharata - Download link
- 🎨 Mooie lineaire gradiënten voor elk boek
- 📱 Volledig responsive ontwerp
- 🎯 Lucide icons voor visuele elementen
- 🌓 Ondersteuning voor lichte en donkere modus
- 🔍 Bhagavad Gita Features:
  - Alle 18 hoofdstukken met volledige tekst
  - Originele Sanskrit tekst
  - Transliteratie (Romeinse schrift)
  - Vertalingen in het Engels
  - Woordbetekenissen
  - Hoofdstuksamenvattingen
  - Navigatie tussen hoofdstukken

## Technologieën

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Lucide React Icons

## Aan de slag

Eerst, installeer de dependencies:

```bash
npm install
```

Start vervolgens de development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser om de website te bekijken.

## Bouwen voor productie

```bash
npm run build
npm start
```

## Structuur

- `/app` - Next.js App Router pagina's en layout
  - `/gita` - Bhagavad Gita hoofdstukken overzicht
  - `/gita/chapter/[id]` - Individuele hoofdstukken met verzen
- `/components` - Herbruikbare React componenten
- `/lib` - Data, API clients en hulpfuncties

## API

De website gebruikt de [TheAum Bhagavad Gita API](https://bhagavadgita.theaum.org) voor de volledige Bhagavad Gita content. Deze API is gratis en vereist geen authenticatie.
