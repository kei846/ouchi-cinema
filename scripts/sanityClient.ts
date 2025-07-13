import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config();

export const sanityClient = createClient({
  projectId: 'yrv186yu', // Replace with your Sanity Project ID
  dataset: 'production', // Replace with your Sanity Dataset
  apiVersion: '2025-07-12', // Use a specific API version
  useCdn: false, // Don't use CDN for writes
  token: process.env.SANITY_WRITE_TOKEN, // Ensure you have a token with write access
});