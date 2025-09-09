import React, { useEffect, useState } from "react";
import logo from "./logo.png";
import bgImage from "./bg.jpg";

// Google Sheets config
const SHEET_ID = "1jjCcH4NG2KmFjhoJrxsKLSPYYOOoiOfV6RQwhveHDdM";
const API_KEY = "AIzaSyAKOUdyrsx3rEKVEujtdgBVTSL-35F8JK0";
const RANGE = "Data!A2:G2";

// --- Icons (emoji sederhana supaya tidak error build) ---
const UsersIcon = () => <span>👥</span>;
const ClockIcon = () => <span>⏰</span>;
const TruckIcon = () => <span>🚚</span>;
const AlertIcon = () => <span>⚠️</span>;
const ShieldIcon = () => <span>🛡️</span>;
const CalendarIcon = () => <span>📅</span>;

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
              nearmiss: row
