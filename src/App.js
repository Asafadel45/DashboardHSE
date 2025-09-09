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
        );
        const result = await res.json();

        if (result.values && result.values.length > 0) {
          const row = result.values[0];
          setData({
            tahun: row[0] ?? "",
            bulan: row[1] ?? "",
            manpower: row[2] ?? "",
            manhour: row[3] ?? "",
            alatberat: row[4] ?? "",
            nearmiss: row[5] ?? "",
            uauc: row[6] ?? "",
          });
        } else {
          setError("Sheet kosong atau range tidak ditemukan.");
        }
      } catch (err) {
        console.error(err);
        setError("Gagal mengambil data dari Google Sheets.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <header className="header">
        <h1>HSSE Statistik Board Digital</h1>
      </header>

      {loading && <p className="loading">Sedang memuat data...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="dashboard">
          <div className="card">Tahun: {dat
