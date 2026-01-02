#!/bin/bash
# Vercel build script
echo "Installing backend dependencies..."
npm install

echo "Installing frontend dependencies..."
cd frontend
npm install

echo "Building React frontend..."
npm run build

echo "Build complete!"

