# Capio Test App

React Native app built with Expo.

## Tech Stack

React Native, Expo, TypeScript, Axios, React Navigation, Context API

## Features

- User login with username/password
- Profile management with phone number updates
- Real-time data synchronization
- Token refresh using Axios interceptors


## Installation

```bash
git clone https://github.com/reezla/capio-test.git
cd capio-test
npm install
npm start
```

## Project Structure

- `app/` - Screen components and navigation
- `api/` - API client and service functions
- `context/` - Authentication context
- `components/` - Reusable components

## API Endpoints

- POST /login - User authentication
- GET /account - Fetch user data
- PATCH /account - Update user information
- POST /refresh - Refresh access token

## Development

The app connects to localhost:3000. 
Change baseURL in api/apiClient.ts for different environments.
