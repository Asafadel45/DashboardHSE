import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import bgImage from "./bg.jpg"; // pastikan ada di folder src

// Google Sheets config
const SHEET_ID = "1jjCcH4NG2KmFjhoJrxsKLSPYYOOoiOfV6RQwhveHDdM";
const API_KEY = "AIzaSyAKOUdyrsx3rEKVEujtdgBVTSL-35F8JK0";
const RANGE = "Data!A2:G2";

// --- Icons ---
const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <path d="M16 8h5v6" />
    <circle cx="5.5" cy="18.5" r="1.5" />
    <circle cx="18.5" cy="18.5" r="1.5" />
  </svg>
);

const AlertIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l7 4v6c0 5-3.58 9.74-7 11-3.42-1.26-7-6-7-11V6l7-4z" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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
          gap:20px;
          background: rgba(255,255,255,0.9);
          padding:18px 24px;
          border-radius:12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
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

      <div className="app">
        <div className="overlay"></div>
        <header className="header">
          <img src={logo} alt="Logo" className="logo" />
          <div>
            <div className="title-big">HK-PP — Dashboard HSSE</div>
            <div className="subtitle">Proyek Peningkatan Jalan Paket F di KIPP 1B</div>
          </div>
        </header>

        <main className="container">
          {loading && <div className="loading">Mengambil data...</div>}
          {error && <div className="error">Error: {error}</div>}

          <section className="grid">
            <Card title="Tahun" value={data.tahun} Icon={CalendarIcon} color="#7f1d1d" />
            <Card title="Bulan" value={data.bulan} Icon={CalendarIcon} color="#b91c1c" />
            <Card title="Man Power" value={data.manpower} Icon={UsersIcon} color="#dc2626" />
            <Card title="Man Hour" value={data.manhour} Icon={ClockIcon} color="#ef4444" />
            <Card title="Alat Berat" value={data.alatberat} Icon={TruckIcon} color="#fb7185" />
            <Card title="Near Miss" value={data.nearmiss} Icon={AlertIcon} color="#f43f5e" />
            <Card title="UA/UC" value={data.uauc} Icon={ShieldIcon} color="#b91c1c" />
          </section>
        </main>
      </div>
    </>
  );
}
