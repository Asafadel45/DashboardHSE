// src/App.js
import React, { useEffect, useState } from "react";
import "./index.css";

// --- Konfigurasi Google Sheet ---
const SHEET_ID = "MASUKKAN_SHEET_ID_ANDA";
const API_KEY = "MASUKKAN_API_KEY_ANDA";
const RANGE = "Sheet1!A2:G2"; // ambil 1 baris data

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
