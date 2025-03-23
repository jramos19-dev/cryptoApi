# Crypto Tracker

A Vue.js application that displays real-time cryptocurrency data using the Coinranking API.

## Features
- Real-time cryptocurrency price tracking
- Detailed view for each cryptocurrency
- 24-hour price change indicators
- Market cap information
- Responsive design with Tailwind CSS

## Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cryptoapi
```

2. Create a `.env` file in the root directory:
```bash
VITE_COINRANKING_API_KEY=your_api_key_here
VITE_API_URL=https://api.coinranking.com/v2
```

3. Install dependencies:
```bash
npm install
```

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Environment Variables
- `VITE_COINRANKING_API_KEY`: Your Coinranking API key (get it from [Coinranking](https://developers.coinranking.com/create-account))
- `VITE_API_URL`: The Coinranking API base URL

## Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run serve`: Preview production build

## Dependencies
- Vue 3
- Vue Router
- Axios
- Tailwind CSS
- Vite

## Project Structure
```
cryptoapi/
├── src/
│   ├── components/    # Reusable Vue components
│   ├── views/         # Page components
│   ├── helpers/       # Utility functions and API calls
│   ├── App.vue        # Root component
│   ├── main.js        # Application entry point
│   └── router.js      # Route definitions
├── public/           # Static assets
└── index.html        # HTML entry point
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License
MIT 