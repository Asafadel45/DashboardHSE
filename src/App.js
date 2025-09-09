import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import bgImage from "./bg.jpg"; // ganti sesuai nama file background Anda

// Google Sheets config
const SHEET_ID = "1jjCcH4NG2KmFjhoJrxsKLSPYYOOoiOfV6RQwhveHDdM";
const API_KEY = "AIzaSyAKOUdyrsx3rEKVEujtdgBVTSL-35F8JK0";
const RANGE = "Data!A2:G2";

// --- Icons ---
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-5-4M9 20H4v-2a4 4 0 015-4m4-4a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const TruckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zm10 2a2 2 0 100-4 2 2 0 000 4zm-6-2h4v-3H5a2 2 0 00-2 2v1h10zM13 6h5l3 5v4h-8V6z" />
  </svg>
);

const AlertIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="32" height="32">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v11a2 2 0 002 2z" />
  </svg>
);

// --- Card component ---
function Card({ title, value, Icon, color }) {
  return (
    <div className="card" style={{ borderTopColor: color }}>
      <div className="card-icon" style={{ color }}>
        <Icon />
      </div>
      <div className="card-title">{title}</div>
      <div className="card-value">{value ?? "-"}</div>
    </div>
  );
}

// --- Main App ---
export default function App() {
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

  useEffect(() => {
    let cancelled = false;
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        if (!res.ok) {
          throw new Error("Gagal mengambil data. HTTP " + res.status);
        }
        const json = await res.json();
        if (!cancelled) {
          if (json.values && json.values.length > 0) {
            const row = json.values[0];
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
        }
      } catch (err) {
        if (!cancelled) setError(String(err.message ?? err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <style>{`
        :root { font-family: Inter, Roboto, Arial, sans-serif; }
        .app {
          min-height: 100vh;
          background-image: url(${bgImage});
          background-size: cover;
          background-position: center;
          display:flex;
          flex-direction:column;
          align-items:center;
          position: relative;
        }
        .overlay {
          position: absolute;
          inset: 0;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(2px);
          z-index: 0;
        }
        .header, .container {
          position: relative;
          z-index: 1;
        }
        .header {
          width:100%;
          max-width:1100px;
          margin-top:28px;
          display:flex;
          align-items:center;
          justify-content:center;
          gap:20px;
          background: rgba(255,255,255,0.9);
          padding:18px 24px;
          border-radius:12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
          text-align:center;
        }
        .logo { width:96px; height:auto; object-fit:contain; }
        .title-big { font-size:22px; font-weight:700; color:#7f1d1d; }
        .subtitle { font-size:13px; color:#4b1111; opacity:0.9; margin-top:4px; }
        .container { width:100%; max-width:1100px; margin:28px 16px; padding:20px; border-radius:12px; }
        .grid { display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:18px; }
        .card {
          background: #fff;
          border-radius:12px;
          padding:18px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          border-top:8px solid #b91c1c;
          display:flex;
          flex-direction:column;
          align-items:center;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 18px 30px rgba(0,0,0,0.14); }
        .card-icon { margin-bottom:10px; }
        .card-title { color:#374151; font-weight:600; font-size:15px; margin-bottom:6px; }
        .card-value { font-size:28px; font-weight:800; color:#111827; }
        .loading { padding:10px 14px; background:rgba(255,255,255,0.9); border-radius:10px; }
        .error { color:#7f1d1d; background:#ffeaea; padding:10px 14px; border-radius:8px; border:1px solid rgba(127,29,29,0.15); }
      `}</style>
