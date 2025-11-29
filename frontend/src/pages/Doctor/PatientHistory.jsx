import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdHistory } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

const ACCENT_1 = "#5e72e4";
const ACCENT_2 = "#825ee4";
const BG = "#f2f2f2";
const MUTED = "rgba(0,0,0,0.55)";

const styles = {
  page: {
    minHeight: "100vh",
    background: BG,
    fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
    color: "#111",
  },
  hero: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "28px 40px",
    color: "#fff",
    backgroundImage: `linear-gradient(90deg, rgba(94,114,228,0.92), rgba(130,94,228,0.92))`,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  heroTitle: { margin: 0, fontSize: 28, fontWeight: 700 },
  heroSub: { marginTop: 6, opacity: 0.95 },
  container: { padding: "24px 40px" },
  searchRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.09)",
    fontSize: 14,
    background: "#fff",
  },
  btnPrimary: {
    background: `linear-gradient(90deg, ${ACCENT_1}, ${ACCENT_2})`,
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },
  btnGhost: {
    background: "transparent",
    padding: "10px 14px",
    borderRadius: 8,
    border: "1px solid rgba(0,0,0,0.06)",
    cursor: "pointer",
  },
  card: {
    background: "#fff",
    borderRadius: 10,
    padding: 18,
    boxShadow: "0 6px 18px rgba(59,64,93,0.06)",
  },
  emptyState: { display: "flex", gap: 20, alignItems: "center", padding: 24 },
  emptyLeft: { flex: 1 },
  emptyActions: { marginTop: 14, display: "flex", gap: 10 },
  resultsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historyList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 12,
  },
  historyItem: {
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    alignItems: "flex-start",
  },
  histLeft: { flex: 1 },
  histTitle: { fontWeight: 700, fontSize: 15 },
  histNotes: { color: MUTED, marginTop: 8, whiteSpace: "pre-wrap" },
  histRight: { textAlign: "right", minWidth: 150, color: MUTED, fontSize: 13 },
};

export default function PatientHistory() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();
  const navigate = useNavigate();

  const getIdFromQuery = () => {
    try {
      const qs = new URLSearchParams(location.search);
      return qs.get("id");
    } catch (e) {
      return null;
    }
  };

  const initialId = getIdFromQuery();
  const [patientId, setPatientId] = useState(initialId || "");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log("Patient ID:", patientId);

  useEffect(() => {
    if (!patientId) {
      setHistory([]);
      setError(null);
      return;
    }

    const backendBase = "http://localhost:3000";
    const url = `${backendBase}/appointments/history/${patientId}`;

    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios
      .get(url, { headers, timeout: 12000 })
      .then((res) => {
        const payload = res.data;
        if (Array.isArray(payload)) setHistory(payload);
        else if (Array.isArray(payload?.history)) setHistory(payload.history);
        else if (payload && typeof payload === "object") setHistory([payload]);
        else setHistory([]);
      })
      .catch((err) => {
        console.error("History fetch error:", err);
        if (err.response) {
          setError(
            err.response.data?.message ||
              `Server returned ${err.response.status}`
          );
        } else if (
          err.code === "ERR_NETWORK" ||
          err.message === "Network Error"
        ) {
          setError(
            "Network error: cannot reach backend (is server running on port 3000?)."
          );
        } else {
          setError(err.message || "Unknown error");
        }
      })
      .finally(() => setLoading(false));
  }, [patientId, location.search]);

  const runSearch = () => {
    if (!patientId) return;

    navigate(`/doctor/patient-history?id=${patientId}`, { replace: true });
  };

  const clearSearch = () => {
    setPatientId("");
    navigate(`/doctor/patient-history`, { replace: true });
  };

  return (
    <div style={styles.page}>
      <div className="dashboard-title">
        <div className="text-lg-end">
          <CgProfile className="fs-1 m-2" />
          <span>{user?.name}</span>
        </div>

        <div className="d-flex align-items-center">
          <div className="icon-shape text-white shadow">
            <MdHistory />
          </div>
          <h4 style={{ fontSize: "30px", paddingLeft: "20px" }}>
            Patient History
          </h4>
        </div>

        <div className="col-xl-3 col-lg-6 mt-3">
          <div className="card card-stats mb-4 mb-xl-0">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title text-uppercase text-muted">
                    Records
                  </h5>
                  <span className="h2 font-weight-bold">{history.length}</span>
                </div>
                <div className="col-auto">
                  <div className="icon-shape bg-info text-white shadow">
                    <MdHistory />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.container}>
        <div style={styles.searchRow}>
          <input
            style={styles.input}
            placeholder="Enter or paste patient id"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value.trim())}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
          />
          <button
            style={styles.btnPrimary}
            onClick={runSearch}
            disabled={!patientId}
          >
            Search
          </button>
          <button style={styles.btnGhost} onClick={clearSearch}>
            Clear
          </button>
        </div>

        {!patientId ? (
          <div style={{ ...styles.card, ...styles.emptyState }}>
            <div style={styles.emptyLeft}>
              <h2 style={{ marginTop: 0 }}>No patient selected</h2>
              <p style={{ color: MUTED }}>
                This page expects a patient id in the URL, or you can search
                above.
              </p>

              <div style={styles.emptyActions}>
                <button
                  style={styles.btnPrimary}
                  onClick={() => navigate("/doctor/dashboard")}
                >
                  Return to Dashboard
                </button>
              </div>
            </div>

            <div style={{ width: 140, textAlign: "center" }}>
              <div style={{ fontSize: 40, opacity: 0.9 }}>📋</div>
            </div>
          </div>
        ) : (
          <div>
            <div style={styles.resultsHeader}>
              <div>
                <div style={{ fontSize: 13, color: MUTED }}>
                  Showing history for
                </div>
                <div style={{ fontWeight: 700, marginTop: 6 }}>
                  {history[0]?.patient_id?.name || patientId}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                {loading && <div style={{ color: MUTED }}>Loading...</div>}
                {!loading && error && (
                  <div style={{ color: "#c53030" }}>Error: {error}</div>
                )}
                {!loading && !error && (
                  <div style={{ color: MUTED }}>{history.length} record(s)</div>
                )}
              </div>
            </div>

            {!loading && !error && history.length === 0 && (
              <div
                style={{
                  ...styles.card,
                  marginTop: 12,
                  textAlign: "center",
                  color: MUTED,
                }}
              >
                <div>No history entries found for this patient.</div>
                <div style={{ marginTop: 8 }}>
                  If you expect data, verify the patient id or check the
                  appointments collection.
                </div>
              </div>
            )}

            {!loading && history.length > 0 && (
              <div style={styles.historyList}>
                {history.map((h, i) => (
                  <div
                    key={h._id || i}
                    style={{ ...styles.card, ...styles.historyItem }}
                  >
                    <div style={styles.histLeft}>
                      <div style={styles.histTitle}>
                        {h.title || h.problem || `Visit ${i + 1}`}
                      </div>
                      <div style={styles.histNotes}>
                        Notes:<br></br>
                        {h.notes || h.description || h.reason || "-"}
                      </div>
                    </div>

                    <div style={styles.histRight}>
                      {h.appointment_date && (
                        <div style={{ marginBottom: 6 }}>
                          {new Date(h.appointment_date).toLocaleDateString(
                            "en-GB"
                          )}
                        </div>
                      )}
                      {h.doctor_id && (
                        <div>{h.doctor_id.name || h.doctor_id}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
