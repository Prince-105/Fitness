import { useState } from "react";

const QUICK_ACTIVITIES = [
  { name: "Walking", icon: "🚶", duration: 30, kcal: 150 },
  { name: "Running", icon: "🏃", duration: 30, kcal: 330 },
  { name: "Cycling", icon: "🚴", duration: 20, kcal: 160 },
  { name: "Swimming", icon: "🏊", duration: 30, kcal: 250 },
  { name: "Yoga", icon: "🧘", duration: 30, kcal: 120 },
  { name: "Weight Training", icon: "🏋️", duration: 45, kcal: 220 },
];
const ICON_MAP = Object.fromEntries(QUICK_ACTIVITIES.map((a) => [a.name, a.icon]));
const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snack"];
const MEAL_META = {
  Breakfast: {
    icon: "🍳",
    iconBg: "#fef3c7",
    iconColor: "#f59e0b",
    svg: (
      <svg width="18" height="18" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" />
      </svg>
    ),
  },
  Lunch: {
    icon: "🥗",
    iconBg: "#d1fae5",
    iconColor: "#10b981",
    svg: (
      <svg width="18" height="18" fill="none" stroke="#10b981" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  Dinner: {
    icon: "🌙",
    iconBg: "#ede9fe",
    iconColor: "#8b5cf6",
    svg: (
      <svg width="18" height="18" fill="none" stroke="#8b5cf6" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
      </svg>
    ),
  },
  Snack: {
    icon: "🍎",
    iconBg: "#fce7f3",
    iconColor: "#ec4899",
    svg: (
      <svg width="18" height="18" fill="none" stroke="#ec4899" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
  },
};
const NAV_ITEMS = [
  {
    label: "Home", id: "home",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>),
  },
  {
    label: "Food", id: "food",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8zM6 1v3M10 1v3M14 1v3" /></svg>),
  },
  {
    label: "Activity", id: "activity",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>),
  },
  {
    label: "Profile", id: "profile",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>),
  },
];
function getNow() {
  const d = new Date();
  let h = d.getHours(), m = d.getMinutes(), ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")} ${ampm}`;
}

//Home Page 
function HomePage({ profile, activities, foodItems, darkMode }) {
  const calGoal = 2200;
  const caloriesBurned = activities.reduce((s, a) => s + a.kcal, 0);
  const caloriesConsumed = foodItems.reduce((s, f) => s + f.kcal, 0);
  const totalMinutes = activities.reduce((s, a) => s + a.duration, 0);
  const consumedPct = Math.min((caloriesConsumed / calGoal) * 100, 100);
  const burnedPct = Math.min((caloriesBurned / profile.calBurnGoal) * 100, 100);
  const remaining = calGoal - caloriesConsumed;

  const bg = darkMode ? "#0f172a" : "#f4f6f9";
  const cardBg = darkMode ? "#1e293b" : "#fff";
  const textPrimary = darkMode ? "#f1f5f9" : "#1a1a2e";
  const textMuted = darkMode ? "#64748b" : "#9ca3af";
  const border = darkMode ? "#334155" : "#eaeef3";
  const statBg = darkMode ? "#1e293b" : "#f8faff";
  const statBorder = darkMode ? "#334155" : "#e8edf8";

  // Motivational message
  const msg = caloriesBurned >= profile.calBurnGoal
    ? "🔥 Great workout today! Keep it up!"
    : caloriesBurned > 0
    ? "💪 You're making progress — keep moving!"
    : "👋 Log a workout to get started!";
  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: bg, transition: "background 0.2s" }}>
      {/* Green hero header */}
      <div style={{ background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)", padding: "28px 32px 36px" }}>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 4 }}>Welcome back</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 20 }}>
          Hi there! 👋 <span style={{ fontWeight: 700 }}>DemoUser</span>
        </div>
        {/* Motivation banner */}
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 18 }}>🔥</span>
          <span style={{ fontSize: 13, color: "#fff", fontWeight: 500 }}>{msg}</span>
        </div>
      </div>
      {/* Main content */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 32px 32px" }}>
        {/* Calorie card — pulled up into hero overlap */}
        <div style={{ background: cardBg, borderRadius: 20, padding: 24, border: `1px solid ${border}`, marginTop: -18, boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>
          {/* Calories Consumed */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, background: "#fef3c7", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🍔</div>
                <div>
                  <div style={{ fontSize: 11, color: textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Calories Consumed</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: textPrimary }}>{caloriesConsumed}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: textMuted }}>Limit</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: textPrimary }}>{calGoal}</div>
              </div>
            </div>
            <div style={{ height: 8, background: darkMode ? "#334155" : "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${consumedPct}%`, background: "#22c55e", borderRadius: 999, transition: "width 0.4s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600, background: "#dcfce7", padding: "2px 10px", borderRadius: 999 }}>
                {remaining > 0 ? `${remaining} kcal remaining` : "Limit reached!"}
              </span>
              <span style={{ fontSize: 12, color: textMuted }}>{Math.round(consumedPct)}%</span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: darkMode ? "#334155" : "#f0f0f0", marginBottom: 20 }} />
          {/* Calories Burned */}
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, background: "#fee2e2", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔥</div>
                <div>
                  <div style={{ fontSize: 11, color: textMuted, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.04em" }}>Calories Burned</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: textPrimary }}>{caloriesBurned}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: textMuted }}>Goal</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: textPrimary }}>{profile.calBurnGoal}</div>
              </div>
            </div>
            <div style={{ height: 8, background: darkMode ? "#334155" : "#e5e7eb", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${burnedPct}%`, background: "#ef4444", borderRadius: 999, transition: "width 0.4s" }} />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 6 }}>
              <span style={{ fontSize: 12, color: textMuted }}>{Math.round(burnedPct)}%</span>
            </div>
          </div>
        </div>
        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 16 }}>
          {/* Active */}
          <div style={{ background: statBg, border: `1px solid ${statBorder}`, borderRadius: 16, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, background: "#ede9fe", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" fill="none" stroke="#8b5cf6" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <span style={{ fontSize: 13, color: textMuted, fontWeight: 500 }}>Active</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: textPrimary }}>{totalMinutes}</div>
            <div style={{ fontSize: 12, color: textMuted, marginTop: 2 }}>minutes today</div>
          </div>
          {/* Workouts */}
          <div style={{ background: statBg, border: `1px solid ${statBorder}`, borderRadius: 16, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, background: "#fef3c7", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="16" height="16" fill="none" stroke="#f59e0b" strokeWidth="2" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <span style={{ fontSize: 13, color: textMuted, fontWeight: 500 }}>Workouts</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: textPrimary }}>{activities.length}</div>
            <div style={{ fontSize: 12, color: textMuted, marginTop: 2 }}>activities logged</div>
          </div>
        </div>
      </div>
    </main>
  );
}

//Add Food Modal 
function AddFoodModal({ onClose, onSave, darkMode }) {
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [meal, setMeal] = useState("Breakfast");
  const [error, setError] = useState("");
  const handleSave = () => {
    if (!name.trim()) { setError("Please enter a food name."); return; }
    setError("");
    onSave({ name: name.trim(), kcal: parseInt(kcal) || 100, meal });
    onClose();
  };
  const cardBg = darkMode ? "#1e293b" : "#fff";
  const inputBorder = darkMode ? "#334155" : "#e5e7eb";
  const inputBg = darkMode ? "#0f172a" : "#fff";
  const inputColor = darkMode ? "#f1f5f9" : "#1a1a2e";
  const labelColor = darkMode ? "#64748b" : "#6b7280";
  const titleColor = darkMode ? "#f1f5f9" : "#1a1a2e";
  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: cardBg, borderRadius: 18, padding: 28, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: titleColor }}>Add Food Entry</h3>
        {[
          { label: "Food Name", val: name, set: setName, type: "text", placeholder: "e.g. Oatmeal" },
          { label: "Calories (kcal)", val: kcal, set: setKcal, type: "number", placeholder: "200" },
        ].map(({ label, val, set, type, placeholder }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: labelColor, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
            <input type={type} value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder}
              style={{ width: "100%", padding: "10px 12px", border: `1px solid ${inputBorder}`, borderRadius: 10, fontSize: 14, color: inputColor, outline: "none", fontFamily: "inherit", background: inputBg, boxSizing: "border-box" }} />
          </div>
        ))}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: labelColor, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Meal</label>
          <select value={meal} onChange={(e) => setMeal(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${inputBorder}`, borderRadius: 10, fontSize: 14, color: inputColor, outline: "none", fontFamily: "inherit", background: inputBg, boxSizing: "border-box" }}>
            {MEAL_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        {error && <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 8, marginTop: -4 }}>{error}</p>}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 11, background: darkMode ? "#334155" : "#f3f4f6", color: darkMode ? "#94a3b8" : "#374151", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 1, padding: 11, background: "#22c55e", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Add Food</button>
        </div>
      </div>
    </div>
  );
}

//AI Food Snap Modal 
function AiFoodSnapModal({ onClose, onSave, darkMode }) {
  const [desc, setDesc] = useState("");
  const [meal, setMeal] = useState("Breakfast");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSnap = async () => {
    if (!desc.trim()) { setError("Please describe your food."); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: `Estimate the calories for this food: "${desc}". Respond ONLY with a JSON object like: {"name": "Food Name", "kcal": 250}. No preamble, no markdown.` }]
        })
      });
      const data = await res.json();
      const text = data.content.map(i => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      onSave({ name: parsed.name || desc.trim(), kcal: parsed.kcal || 100, meal });
      onClose();
    } catch {
      setError("Could not estimate calories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardBg = darkMode ? "#1e293b" : "#fff";
  const inputBorder = darkMode ? "#334155" : "#e5e7eb";
  const inputBg = darkMode ? "#0f172a" : "#fff";
  const inputColor = darkMode ? "#f1f5f9" : "#1a1a2e";
  const labelColor = darkMode ? "#64748b" : "#6b7280";
  const titleColor = darkMode ? "#f1f5f9" : "#1a1a2e";
  const mutedColor = darkMode ? "#64748b" : "#9ca3af";

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: cardBg, borderRadius: 18, padding: 28, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg, #22c55e, #16a34a)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></svg>
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: titleColor }}>AI Food Snap</h3>
        </div>
        <p style={{ fontSize: 12, color: mutedColor, marginBottom: 20 }}>Describe your food and AI will estimate the calories.</p>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: labelColor, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Food Description</label>
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. A bowl of oatmeal with banana and honey" rows={3}
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${inputBorder}`, borderRadius: 10, fontSize: 14, color: inputColor, outline: "none", fontFamily: "inherit", background: inputBg, boxSizing: "border-box", resize: "none" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: labelColor, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Meal</label>
          <select value={meal} onChange={(e) => setMeal(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: `1px solid ${inputBorder}`, borderRadius: 10, fontSize: 14, color: inputColor, outline: "none", fontFamily: "inherit", background: inputBg, boxSizing: "border-box" }}>
            {MEAL_TYPES.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        {error && <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 8, marginTop: -4 }}>{error}</p>}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 11, background: darkMode ? "#334155" : "#f3f4f6", color: darkMode ? "#94a3b8" : "#374151", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSnap} disabled={loading}
            style={{ flex: 1, padding: 11, background: loading ? "#86efac" : "#22c55e", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: loading ? "not-allowed" : "pointer" }}>
            {loading ? "Estimating…" : "✨ Snap"}
          </button>
        </div>
      </div>
    </div>
  );
}

//Add Activity Modal 
function AddActivityModal({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [kcal, setKcal] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    if (!name.trim()) { setError("Please enter an activity name."); return; }
    setError("");
    const trimmed = name.trim();
    onSave({ name: trimmed, icon: ICON_MAP[trimmed] || "⚡", duration: parseInt(duration) || 30, kcal: parseInt(kcal) || 100 });
    onClose();
  };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 28, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#1a1a2e" }}>Add Custom Activity</h3>
        {[
          { label: "Activity Name", val: name, set: setName, type: "text", placeholder: "e.g. Rock Climbing" },
          { label: "Duration (minutes)", val: duration, set: setDuration, type: "number", placeholder: "30" },
          { label: "Calories Burned", val: kcal, set: setKcal, type: "number", placeholder: "200" },
        ].map(({ label, val, set, type, placeholder }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#6b7280", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
            <input type={type} value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: 10, fontSize: 14, color: "#1a1a2e", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
        ))}
        {error && <p style={{ fontSize: 12, color: "#ef4444", marginBottom: 8, marginTop: -4 }}>{error}</p>}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 11, background: "#f3f4f6", color: "#374151", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 1, padding: 11, background: "#22c55e", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Add Activity</button>
        </div>
      </div>
    </div>
  );
}

//Edit Profile Modal 
function EditProfileModal({ profile, onClose, onSave }) {
  const [age, setAge] = useState(String(profile.age));
  const [weight, setWeight] = useState(String(profile.weight));
  const [height, setHeight] = useState(String(profile.height));
  const [goal, setGoal] = useState(profile.goal);
  const handleSave = () => {
    onSave({ age: parseInt(age) || profile.age, weight: parseInt(weight) || profile.weight, height: parseInt(height) || profile.height, goal });
    onClose();
  };
  const GOALS = ["Maintain Weight", "Lose Weight", "Gain Muscle", "Improve Fitness"];
  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#1e293b", borderRadius: 18, padding: 28, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.4)", border: "1px solid #334155" }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#f1f5f9" }}>Edit Profile</h3>
        {[
          { label: "Age (years)", val: age, set: setAge, type: "number", placeholder: "30" },
          { label: "Weight (kg)", val: weight, set: setWeight, type: "number", placeholder: "75" },
          { label: "Height (cm)", val: height, set: setHeight, type: "number", placeholder: "175" },
        ].map(({ label, val, set, type, placeholder }) => (
          <div key={label} style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</label>
            <input type={type} value={val} onChange={(e) => set(e.target.value)} placeholder={placeholder}
              style={{ width: "100%", padding: "10px 12px", border: "1px solid #334155", borderRadius: 10, fontSize: 14, color: "#f1f5f9", outline: "none", fontFamily: "inherit", background: "#0f172a", boxSizing: "border-box" }} />
          </div>
        ))}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>Goal</label>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}
            style={{ width: "100%", padding: "10px 12px", border: "1px solid #334155", borderRadius: 10, fontSize: 14, color: "#f1f5f9", outline: "none", fontFamily: "inherit", background: "#0f172a", boxSizing: "border-box" }}>
            {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={{ flex: 1, padding: 11, background: "#334155", color: "#94a3b8", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          <button onClick={handleSave} style={{ flex: 1, padding: 11, background: "#22c55e", color: "#fff", border: "none", borderRadius: 10, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

//Activity Item 
function ActivityItem({ activity, onDelete, darkMode }) {
  const [hovered, setHovered] = useState(false);
  const bg = hovered ? "#f0fdf4" : darkMode ? "#1e293b" : "#fafafa";
  const borderColor = hovered ? "#bbf7d0" : darkMode ? "#334155" : "#f3f4f6";
  const iconBg = darkMode ? "#1e3a5f" : "#eff6ff";
  const textPrimary = darkMode ? "#f1f5f9" : "#1a1a2e";
  const textMuted = darkMode ? "#64748b" : "#9ca3af";
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, border: `1px solid ${borderColor}`, background: bg, transition: "all 0.15s" }}>
      <div style={{ width: 36, height: 36, background: iconBg, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
        {activity.icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{activity.name}</div>
        <div style={{ fontSize: 11, color: textMuted }}>{activity.time}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: textPrimary }}>{activity.duration} min</div>
        <div style={{ fontSize: 11, color: textMuted }}>{activity.kcal} kcal</div>
      </div>
      <button onClick={() => onDelete(activity.id)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex", alignItems: "center", flexShrink: 0 }}>
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6M9 6V4h6v2" />
        </svg>
      </button>
    </div>
  );
}

//Food Log Page 
function FoodLogPage({ darkMode, foodItems, setFoodItems }) {
  const [nextFoodId, setNextFoodId] = useState(4);
  const [showAddFood, setShowAddFood] = useState(false);
  const [showAiSnap, setShowAiSnap] = useState(false);
  const [activeMealFilter, setActiveMealFilter] = useState(null);
  const bg = darkMode ? "#0f172a" : "#f4f6f9";
  const cardBg = darkMode ? "#1e293b" : "#fff";
  const textPrimary = darkMode ? "#f1f5f9" : "#1a1a2e";
  const textMuted = darkMode ? "#64748b" : "#9ca3af";
  const border = darkMode ? "#1f2937" : "#eaeef3";
  const chipBg = darkMode ? "#1f2937" : "#f3f4f6";
  const chipBorder = darkMode ? "#374151" : "#e5e7eb";
  const chipColor = darkMode ? "#d1d5db" : "#374151";
  const itemBorder = darkMode ? "#1f2937" : "#f0f0f0";
  const addFood = ({ name, kcal, meal }) => {
    setFoodItems((prev) => [...prev, { id: nextFoodId, name, kcal, meal }]);
    setNextFoodId((n) => n + 1);
  };

  const deleteFood = (id) => setFoodItems((prev) => prev.filter((f) => f.id !== id));
  const totalKcal = foodItems.reduce((s, f) => s + f.kcal, 0);
  const mealsWithItems = MEAL_TYPES.filter((m) => foodItems.some((f) => f.meal === m))
    .filter((m) => !activeMealFilter || m === activeMealFilter);
  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: bg, transition: "background 0.2s" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "28px 32px 20px" }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: textPrimary }}>Food Log</h1>
          <p style={{ fontSize: 13, color: textMuted, marginTop: 2 }}>Track your daily intake</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <span style={{ display: "block", fontSize: 12, color: textMuted }}>Today's Total</span>
          <strong style={{ fontSize: 22, fontWeight: 700, color: "#22c55e" }}>{totalKcal} kcal</strong>
        </div>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 20, padding: "0 32px 32px", overflow: "hidden" }}>
        <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid ${border}`, display: "flex", flexDirection: "column", gap: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: textPrimary, marginBottom: 16 }}>Quick Add</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
            {MEAL_TYPES.map((m) => {
              const meta = MEAL_META[m];
              const isActive = activeMealFilter === m;
              return (
                <button key={m} onClick={() => setActiveMealFilter(isActive ? null : m)}
                  style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 999, background: isActive ? "#e8fdf0" : chipBg, border: `1px solid ${isActive ? "#86efac" : chipBorder}`, fontSize: 12, fontWeight: 500, color: isActive ? "#16a34a" : chipColor, cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}>
                  <span>{meta.icon}</span> {m.toLowerCase()}
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: "auto" }}>
            <button onClick={() => setShowAddFood(true)}
              style={{ width: "100%", padding: "14px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add Food Entry
            </button>
            <button onClick={() => setShowAiSnap(true)}
              style={{ width: "100%", padding: "14px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01" /></svg>
              AI Food Snap
            </button>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
          {mealsWithItems.length === 0 && (
            <div style={{ background: cardBg, borderRadius: 16, padding: 40, border: `1px solid ${border}`, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🍽️</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary, marginBottom: 6 }}>No food logged yet</div>
              <div style={{ fontSize: 12, color: textMuted }}>Add your first meal using the buttons on the left.</div>
            </div>
          )}
          {mealsWithItems.map((mealName) => {
            const meta = MEAL_META[mealName];
            const items = foodItems.filter((f) => f.meal === mealName);
            const mealTotal = items.reduce((s, f) => s + f.kcal, 0);
            return (
              <div key={mealName} style={{ background: cardBg, borderRadius: 16, border: `1px solid ${border}`, overflow: "hidden" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: meta.iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{meta.svg}</div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>{mealName}</div>
                      <div style={{ fontSize: 11, color: textMuted }}>{items.length} item{items.length !== 1 ? "s" : ""}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: textPrimary }}>{mealTotal} kcal</div>
                </div>
                <div style={{ borderTop: `1px solid ${itemBorder}` }}>
                  {items.map((food, idx) => (
                    <div key={food.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 20px", borderTop: idx === 0 ? "none" : `1px solid ${itemBorder}` }}>
                      <span style={{ fontSize: 13, color: textPrimary, fontWeight: 500 }}>{food.name}</span>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 13, color: textMuted, fontWeight: 500 }}>{food.kcal} kcal</span>
                        <button onClick={() => deleteFood(food.id)} style={{ background: "none", border: "none", color: "#f87171", cursor: "pointer", padding: 4, borderRadius: 6, display: "flex", alignItems: "center" }}>
                          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6M9 6V4h6v2" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {showAddFood && <AddFoodModal onClose={() => setShowAddFood(false)} onSave={addFood} darkMode={darkMode} />}
      {showAiSnap && <AiFoodSnapModal onClose={() => setShowAiSnap(false)} onSave={addFood} darkMode={darkMode} />}
    </main>
  );
}

//Profile Page 
function ProfilePage({ profile, onEdit, darkMode }) {
  const fields = [
    { label: "Age", value: `${profile.age} years`, icon: (<svg width="20" height="20" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>) },
    { label: "Weight", value: `${profile.weight} kg`, icon: (<svg width="20" height="20" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" /><line x1="5" y1="5" x2="19" y2="5" /></svg>) },
    { label: "Height", value: `${profile.height} cm`, icon: (<svg width="20" height="20" fill="none" stroke="#34d399" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>) },
    { label: "Goal", value: profile.goal, icon: (<svg width="20" height="20" fill="none" stroke="#fb923c" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>) },
  ];
  const bg = darkMode ? "#0f172a" : "#f4f6f9";
  const cardBg = darkMode ? "#1e293b" : "#fff";
  const fieldBg = darkMode ? "#0f172a" : "#f8fafc";
  const fieldBorder = darkMode ? "#1e293b" : "#e5e7eb";
  const cardBorder = darkMode ? "#334155" : "#e5e7eb";
  const textPrimary = darkMode ? "#f1f5f9" : "#1a1a2e";
  const textMuted = darkMode ? "#64748b" : "#9ca3af";
  const editBtnBg = darkMode ? "#1e293b" : "#f3f4f6";
  const editBtnHover = darkMode ? "#334155" : "#e5e7eb";
  const editBtnColor = darkMode ? "#f1f5f9" : "#374151";
  const editBtnBorder = darkMode ? "#334155" : "#d1d5db";
  const iconBgMap = darkMode
    ? { Age: "#1e3a5f", Weight: "#2d1f4e", Height: "#0f2d22", Goal: "#2d1505" }
    : { Age: "#dbeafe", Weight: "#ede9fe", Height: "#d1fae5", Goal: "#ffedd5" };

  return (
    <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: bg, transition: "background 0.2s" }}>
      <div style={{ padding: "28px 32px 20px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: textPrimary }}>Profile</h1>
        <p style={{ fontSize: 13, color: textMuted, marginTop: 2 }}>Manage your settings</p>
      </div>
      <div style={{ padding: "0 32px 32px", flex: 1, overflowY: "auto" }}>
        <div style={{ background: cardBg, borderRadius: 20, padding: 32, border: `1px solid ${cardBorder}`, width: "100%", boxSizing: "border-box", transition: "background 0.2s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28 }}>
            <div style={{ width: 60, height: 60, borderRadius: 16, background: "linear-gradient(135deg, #22c55e, #16a34a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            </div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: textPrimary }}>Your Profile</div>
              <div style={{ fontSize: 12, color: textMuted, marginTop: 3 }}>Member since {profile.joinDate}</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
            {fields.map(({ label, value, icon }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 14, background: fieldBg, borderRadius: 14, padding: "18px 20px", border: `1px solid ${fieldBorder}`, transition: "background 0.2s" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, background: iconBgMap[label] || (darkMode ? "#1e293b" : "#f3f4f6"), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: textMuted, fontWeight: 500, marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: textPrimary }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={onEdit}
            style={{ width: "100%", padding: "15px", background: editBtnBg, color: editBtnColor, border: `1px solid ${editBtnBorder}`, borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = editBtnHover}
            onMouseLeave={(e) => e.currentTarget.style.background = editBtnBg}>
            Edit Profile
          </button>
        </div>
      </div>
    </main>
  );
}

//Sidebar 
function Sidebar({ activeNav, onNavChange, darkMode, onToggleDark }) {
  return (
    <aside style={{ width: 200, background: darkMode ? "#111827" : "#fff", display: "flex", flexDirection: "column", padding: "20px 0", borderRight: `1px solid ${darkMode ? "#1f2937" : "#eaeef3"}`, flexShrink: 0, transition: "background 0.2s" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px 24px", fontWeight: 700, fontSize: 16, color: darkMode ? "#fff" : "#1a1a2e" }}>
        <div style={{ width: 32, height: 32, background: "#22c55e", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🏃</div>
        FitTrack
      </div>
      <nav style={{ flex: 1, padding: "0 12px" }}>
        {NAV_ITEMS.map(({ label, id, icon }) => {
          const isActive = activeNav === id;
          return (
            <div key={id} onClick={() => onNavChange(id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, fontSize: 14, color: isActive ? "#16a34a" : darkMode ? "#9ca3af" : "#6b7280", background: isActive ? "#e8fdf0" : "transparent", fontWeight: isActive ? 600 : 400, cursor: "pointer", marginBottom: 2, transition: "all 0.15s" }}>
              {icon}{label}
            </div>
          );
        })}
      </nav>
      <div style={{ padding: "16px 20px", borderTop: `1px solid ${darkMode ? "#1f2937" : "#eaeef3"}` }}>
        <div onClick={onToggleDark} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: darkMode ? "#9ca3af" : "#6b7280", cursor: "pointer", marginBottom: 12 }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#ef4444", cursor: "pointer", padding: "8px 0" }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = "0.75"}
          onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
          onClick={() => alert("Logged out!")}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          Logout
        </div>
      </div>
    </aside>
  );
}

//Chip 
function Chip({ act, darkMode, onAdd }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button onClick={onAdd} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 999, background: hovered ? "#e8fdf0" : darkMode ? "#1f2937" : "#f3f4f6", border: `1px solid ${hovered ? "#86efac" : darkMode ? "#374151" : "#e5e7eb"}`, fontSize: 13, color: hovered ? "#16a34a" : darkMode ? "#d1d5db" : "#374151", cursor: "pointer", fontWeight: 500, transition: "all 0.15s", transform: hovered ? "translateY(-1px)" : "none", fontFamily: "inherit" }}>
      {act.icon} {act.name}
    </button>
  );
}

//Main App 
export default function FitTrackApp() {
  const [activeNav, setActiveNav] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profile, setProfile] = useState({ age: 30, weight: 75, height: 175, goal: "Maintain Weight", joinDate: "22/01/2026", calBurnGoal: 400 });
  const [activities, setActivities] = useState([
    { id: 1, name: "Walking", icon: "🚶", duration: 30, kcal: 150, time: "03:58 PM" },
    { id: 2, name: "Running", icon: "🏃", duration: 30, kcal: 330, time: "03:58 PM" },
    { id: 3, name: "Cycling", icon: "🚴", duration: 10, kcal: 80, time: "03:58 PM" },
    { id: 4, name: "Running", icon: "🏃", duration: 10, kcal: 110, time: "03:58 PM" },
  ]);
  const [foodItems, setFoodItems] = useState([
    { id: 1, name: "Toast & Milk", kcal: 400, meal: "Breakfast" },
    { id: 2, name: "Pizza", kcal: 300, meal: "Dinner" },
    { id: 3, name: "Tea & Snacks", kcal: 200, meal: "Snack" },
  ]);
  const [nextId, setNextId] = useState(5);
  const totalMinutes = activities.reduce((s, a) => s + a.duration, 0);
  const addActivity = ({ name, icon, duration, kcal }) => { setActivities((prev) => [...prev, { id: nextId, name, icon, duration, kcal, time: getNow() }]); setNextId((n) => n + 1); };
  const deleteActivity = (id) => setActivities((prev) => prev.filter((a) => a.id !== id));
  const bg = darkMode ? "#0f172a" : "#f4f6f9";
  const cardBg = darkMode ? "#1e293b" : "#fff";
  const textPrimary = darkMode ? "#f1f5f9" : "#1a1a2e";
  const textMuted = darkMode ? "#64748b" : "#9ca3af";
  const border = darkMode ? "#1f2937" : "#eaeef3";

  const renderMain = () => {
    if (activeNav === "home") return (
      <HomePage
        profile={profile}
        activities={activities}
        foodItems={foodItems}
        darkMode={darkMode}
      />
    );
    if (activeNav === "profile") return <ProfilePage profile={profile} onEdit={() => setShowEditProfile(true)} darkMode={darkMode} />;
    if (activeNav === "food") return <FoodLogPage darkMode={darkMode} foodItems={foodItems} setFoodItems={setFoodItems} />;
    return (
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", padding: "28px 32px 20px" }}>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: textPrimary }}>Activity Log</h1>
            <p style={{ fontSize: 13, color: textMuted, marginTop: 2 }}>Track your workouts</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ display: "block", fontSize: 12, color: textMuted }}>Active Today</span>
            <strong style={{ fontSize: 22, fontWeight: 700, color: "#2563eb" }}>{totalMinutes} min</strong>
          </div>
        </div>
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: "0 32px 32px", overflow: "hidden" }}>
          <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid ${border}`, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: textPrimary, marginBottom: 16 }}>Quick Add</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {QUICK_ACTIVITIES.map((act) => (<Chip key={act.name} act={act} darkMode={darkMode} onAdd={() => addActivity(act)} />))}
            </div>
            <button onClick={() => setShowModal(true)}
              style={{ width: "100%", padding: "14px", background: "#22c55e", color: "#fff", border: "none", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: "auto" }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              Add Custom Activity
            </button>
          </div>
          <div style={{ background: cardBg, borderRadius: 16, padding: 24, border: `1px solid ${border}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ width: 36, height: 36, background: "#eff6ff", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#3b82f6" }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: textPrimary }}>Today's Activities</div>
                <div style={{ fontSize: 12, color: textMuted }}>{activities.length} logged</div>
              </div>
            </div>
            <div style={{ flex: 1, overflowY: "auto", marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
              {activities.length === 0 ? (
                <div style={{ textAlign: "center", color: textMuted, fontSize: 13, padding: "32px 0" }}>No activities yet — add one above!</div>
              ) : (
                activities.map((a) => <ActivityItem key={a.id} activity={a} onDelete={deleteActivity} darkMode={darkMode} />)
              )}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16, paddingTop: 14, borderTop: `1px solid ${border}`, fontSize: 13, color: textMuted, fontWeight: 500 }}>
              <span>Total Active Time</span>
              <strong style={{ fontSize: 15, fontWeight: 700, color: "#2563eb" }}>{totalMinutes} minutes</strong>
            </div>
          </div>
        </div>
      </main>
    );
  };
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", background: bg, color: textPrimary, overflow: "hidden", transition: "background 0.2s" }}>
      <Sidebar activeNav={activeNav} onNavChange={setActiveNav} darkMode={darkMode} onToggleDark={() => setDarkMode((d) => !d)} />
      {renderMain()}
      {showModal && <AddActivityModal onClose={() => setShowModal(false)} onSave={addActivity} />}
      {showEditProfile && <EditProfileModal profile={profile} onClose={() => setShowEditProfile(false)} onSave={(updated) => setProfile((p) => ({ ...p, ...updated }))} />}
    </div>
  );
}
