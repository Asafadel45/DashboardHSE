// src/App.js
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState({
    tahun: "",
    bulan: "",
    manpower: "",
    manhour: "",
    alatberat: "",
    nearmiss: "",
    uauc: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ganti dengan konfigurasi Google Sheet kamu
  const SHEET_ID = "1jjCcH4NG2KmFjhoJrxsKLSPYYOOoiOfV6RQwhveHDdM";
  const API_KEY = "AIzaSyAKOUEfMYuVUnX2ko_-w8PoQYAGofGDuHE";
  const RANGE = "Sheet1!A2:G2"; // Pastikan urutan kolom sesuai

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        const result = await response.json();

        if (result.values && result.values.length > 0) {
          const row = result.values[0];
          setData({
            tahun: row[0] ?? "",
            bulan: row[1] ?? "",
            manpower: row[2] ?? "",
            manhour: row[3] ?? "",
            alatberat: row[4] ?? "",
            nearmiss: row[5] ?? "",
            uauc: row
