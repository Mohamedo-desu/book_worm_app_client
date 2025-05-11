# Book Worm Mobile App

A modern mobile application built with React Native and Expo for book enthusiasts to manage their reading journey.

## Features

- Modern UI built with React Native and Expo
- Type-safe development with TypeScript
- State management using Zustand
- File system integration for local storage
- Image handling capabilities
- Deep linking support
- Offline support with MMKV storage
- Cross-platform compatibility (iOS & Android)

## Tech Stack

- React Native 0.76.7
- Expo SDK 52
- TypeScript
- Zustand for state management
- Expo Router for navigation
- React Navigation
- MMKV for local storage
- Expo File System
- Expo Image Picker

## Getting Started

### Prerequisites

- Node.js (LTS version)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Studio (for Android development)

### Installation

1. Clone the repository
2. Navigate to the mobile directory:
   ```bash
   cd mobile
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

1. Start the development server:

   ```bash
   npm start
   # or
   yarn start
   ```

2. Run on specific platform:
   ```bash
   # For iOS
   npm run ios
   # For Android
   npm run android
   ```

## Project Structure

- `/app` - Main application screens and navigation
- `/components` - Reusable UI components
- `/constants` - App-wide constants and configuration
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and helpers
- `/store` - Zustand store configuration
- `/assets` - Static assets like images and fonts

## Development

- The app uses TypeScript for type safety
- Follow the existing code style and patterns
- Use the provided hooks and components when possible
- Test your changes thoroughly before committing

## Testing

Run the test suite:

```bash
npm test
# or
yarn test
```

## Building for Production

1. Configure your app in `app.json`
2. Use EAS Build for creating production builds:
   ```bash
   eas build
   ```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

MIT License

Copyright (c) 2024 Book Worm App

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
