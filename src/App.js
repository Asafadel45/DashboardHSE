import React, { useEffect, useState } from "react";
import logo from "./logo.png"; 
import bgImage from "./bg.jpg"; // ganti dengan nama file gambar kamu (taruh di folder src)

// Google Sheets config
const SHEET_ID = "1jjCcH4NG2KmFjhoJrxsKLSPYYOOoiOfV6RQwhveHDdM";
const API_KEY = "AIzaSyAKOUdyrsx3rEKVEujtdgBVTSL-35F8JK0";
const RANGE = "Data!A2:G2";

// --- Icons ---
const UsersIcon = () => (/* ... sama seperti sebelumnya ... */);
const ClockIcon = () => (/* ... */);
const TruckIcon = () => (/* ... */);
const AlertIcon = () => (/* ... */);
const ShieldIcon = () => (/* ... */);
const CalendarIcon = () => (/* ... */);

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
