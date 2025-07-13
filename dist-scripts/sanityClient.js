"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanityClient = void 0;
const client_1 = require("@sanity/client");
exports.sanityClient = (0, client_1.createClient)({
    projectId: 'yrv186yu', // Replace with your Sanity Project ID
    dataset: 'production', // Replace with your Sanity Dataset
    apiVersion: '2025-07-12', // Use a specific API version
    useCdn: false, // Don't use CDN for writes
    token: process.env.SANITY_WRITE_TOKEN, // Ensure you have a token with write access
});
