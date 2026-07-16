import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Home, MessageCircle, Calendar, Wind, ClipboardList, Settings,
  Plus, Trash2, Volume2, Check, ChevronLeft, ChevronRight, X,
  User, Sparkles, Pencil, Info, ChevronDown, ExternalLink
} from "lucide-react";

/* ---------- Temas de color ----------
   "Calma": paleta original, baja saturación, pensada para sensibilidad sensorial
   "Vibrante": colores más saturados y alegres, para quien busca más estímulo visual
   "Pastel": tonos suaves tipo arcoíris pastel, cálido y colorido sin ser intenso
------------------------------------- */
const THEMES = {
  calma: {
    bg: "#F5F7F3", surface: "#FFFFFF", primary: "#5E8B6E", primaryDark: "#446A52",
    secondary: "#6E82AC", warm: "#E0A458", text: "#2E332F", textMuted: "#6E766F",
    border: "#E4E8E1", danger: "#C97B6E",
  },
  vibrante: {
    bg: "#FFF8F0", surface: "#FFFFFF", primary: "#FF7A59", primaryDark: "#E85D3D",
    secondary: "#3FA7D6", warm: "#FFC93C", text: "#2E332F", textMuted: "#6E766F",
    border: "#FFE1D0", danger: "#E0525C",
  },
  pastel: {
    bg: "#FDF6FB", surface: "#FFFFFF", primary: "#E88AB5", primaryDark: "#C96A97",
    secondary: "#7FC4AC", warm: "#FFD37A", text: "#2E332F", textMuted: "#6E766F",
    border: "#F3E1EE", danger: "#E8918C",
  },
};

const THEME_LABELS = { calma: "Calma", vibrante: "Vibrante", pastel: "Pastel" };

const COLORS = { ...THEMES.calma };

function applyTheme(name) {
  Object.assign(COLORS, THEMES[name] || THEMES.calma);
}

const BUTTON_SIZES = {
  md: { tile: "py-4", icon: "w-11 h-11", label: "text-xs", grid: "grid-cols-3 sm:grid-cols-4", circle: "w-10 h-10", circleIcon: "w-6 h-6" },
  lg: { tile: "py-6", icon: "w-16 h-16", label: "text-sm", grid: "grid-cols-2 sm:grid-cols-3", circle: "w-14 h-14", circleIcon: "w-8 h-8" },
  xl: { tile: "py-8", icon: "w-24 h-24", label: "text-base", grid: "grid-cols-2", circle: "w-16 h-16", circleIcon: "w-10 h-10" },
};
const BUTTON_SIZE_LABELS = { md: "Mediano", lg: "Grande", xl: "Extra grande" };

const PROFILE_COLORS = ["#5E8B6E", "#6E82AC", "#E0A458", "#C97B6E", "#8B7BA8"];
const PROFILE_EMOJIS = ["🦊", "🐢", "🐧", "🐝", "🦋", "🐨", "🐬", "🦉"];

const PICTOGRAMS = {
  "Necesidades básicas": [
    { label: "Agua", emoji: "💧" }, { label: "Comida", emoji: "🍽️" },
    { label: "Baño", emoji: "🚽" }, { label: "Dormir", emoji: "😴" },
    { label: "Ayuda", emoji: "🆘" }, { label: "Dolor", emoji: "🤕" },
    { label: "Descanso", emoji: "🛌" },
  ],
  "Emociones": [
    { label: "Feliz", emoji: "😊" }, { label: "Triste", emoji: "😢" },
    { label: "Enojado", emoji: "😠" }, { label: "Miedo", emoji: "😨" },
    { label: "Cansado", emoji: "😪" }, { label: "Tranquilo", emoji: "😌" },
  ],
  "Actividades": [
    { label: "Jugar", emoji: "🧸" }, { label: "Leer", emoji: "📖" },
    { label: "Música", emoji: "🎵" }, { label: "Pantalla", emoji: "📱" },
    { label: "Pasear", emoji: "🚶" }, { label: "Dibujar", emoji: "🎨" },
  ],
  "Lugares": [
    { label: "Casa", emoji: "🏠" }, { label: "Escuela", emoji: "🏫" },
    { label: "Parque", emoji: "🌳" }, { label: "Tienda", emoji: "🛒" },
    { label: "Médico", emoji: "🏥" }, { label: "Coche", emoji: "🚗" },
    { label: "Trabajo", emoji: "🏢" }, { label: "Banco", emoji: "🏦" },
    { label: "Farmacia", emoji: "⚕️" },
  ],
  "Personas": [
    { label: "Mamá", emoji: "👩" }, { label: "Papá", emoji: "👨" },
    { label: "Amigo", emoji: "🧑‍🤝‍🧑" }, { label: "Maestro", emoji: "🧑‍🏫" },
    { label: "Doctor", emoji: "👩‍⚕️" }, { label: "Familia", emoji: "👪" },
    { label: "Jefe", emoji: "👔" }, { label: "Compañero de trabajo", emoji: "🧑‍💼" },
  ],
  "Vida adulta": [
    { label: "Trabajar", emoji: "💼" }, { label: "Dinero", emoji: "💰" },
    { label: "Medicación", emoji: "💊" }, { label: "Transporte", emoji: "🚌" },
    { label: "Trámite", emoji: "📄" }, { label: "Cocinar", emoji: "🍳" },
    { label: "Cita", emoji: "📅" }, { label: "Compras", emoji: "🛍️" },
  ],
  "Palabras": [
    { label: "Quiero", emoji: "👉" }, { label: "No quiero", emoji: "🚫" },
    { label: "Más", emoji: "➕" }, { label: "Terminado", emoji: "✅" },
    { label: "Sí", emoji: "👍" }, { label: "No", emoji: "👎" },
    { label: "Por favor", emoji: "🙏" }, { label: "Gracias", emoji: "💛" },
  ],
};

const LEVEL_CATEGORIES = {
  1: ["Necesidades básicas", "Emociones"],
  2: ["Necesidades básicas", "Emociones", "Actividades", "Lugares", "Vida adulta"],
  3: ["Necesidades básicas", "Emociones", "Actividades", "Lugares", "Personas", "Vida adulta", "Palabras"],
};

const ROUTINE_TEMPLATES = {
  "Vacía": [],
  "Rutina laboral": [
    { text: "Prepararse para el trabajo", emoji: "👔" },
    { text: "Viaje al trabajo", emoji: "🚌" },
    { text: "Trabajar", emoji: "💼" },
    { text: "Almuerzo", emoji: "🍽️" },
    { text: "Viaje a casa", emoji: "🚌" },
  ],
  "Vida independiente": [
    { text: "Tomar medicación", emoji: "💊" },
    { text: "Cocinar", emoji: "🍳" },
    { text: "Limpiar", emoji: "🧹" },
    { text: "Pagar cuentas", emoji: "💰" },
    { text: "Hacer compras", emoji: "🛍️" },
  ],
};

const DEFAULT_ROUTINES = {
  "Mañana": [
    { text: "Despertar", emoji: "⏰" }, { text: "Vestirse", emoji: "👕" },
    { text: "Desayunar", emoji: "🍳" }, { text: "Cepillarse los dientes", emoji: "🪥" },
    { text: "Preparar mochila", emoji: "🎒" },
  ],
  "Tarde": [
    { text: "Comer", emoji: "🍽️" }, { text: "Tarea", emoji: "📚" },
    { text: "Jugar", emoji: "🧸" }, { text: "Merienda", emoji: "🍎" },
  ],
  "Noche": [
    { text: "Cenar", emoji: "🍽️" }, { text: "Baño", emoji: "🛁" },
    { text: "Ponerse pijama", emoji: "👖" }, { text: "Cuento", emoji: "📖" },
    { text: "Dormir", emoji: "😴" },
  ],
};

const CHECKIN_EMOTIONS = [
  { label: "Feliz", emoji: "😊" }, { label: "Tranquilo", emoji: "😌" },
  { label: "Normal", emoji: "😐" }, { label: "Cansado", emoji: "😪" },
  { label: "Triste", emoji: "😢" }, { label: "Enojado", emoji: "😠" },
  { label: "Ansioso", emoji: "😨" }, { label: "Emocionado", emoji: "🤩" },
];

const SENSORY_STRATEGIES = [
  { text: "Auriculares con cancelación de ruido", emoji: "🎧" },
  { text: "Manta con peso", emoji: "🛌" },
  { text: "Buscar un lugar tranquilo", emoji: "🤫" },
  { text: "Pelota antiestrés / fidget", emoji: "🖐️" },
  { text: "Bajar la luz", emoji: "💡" },
  { text: "Música suave", emoji: "🎶" },
  { text: "Moverse (saltar, mecerse)", emoji: "🤸" },
  { text: "Abrazo de presión profunda", emoji: "🤗" },
];

function resizeImageFile(file, maxSize = 200, quality = 0.72) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer el archivo"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("No se pudo procesar la imagen"));
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        const scale = Math.max(maxSize / img.width, maxSize / img.height);
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(img, (maxSize - w) / 2, (maxSize - h) / 2, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function uid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function speak(text, { onStart, onEnd } = {}) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 0.9;
    if (onStart) u.onstart = onStart;
    if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
    window.speechSynthesis.speak(u);
  } catch (e) { /* silencioso */ }
}

async function storageGet(key, shared = false) {
  try {
    const r = await window.storage.get(key, shared);
    return r ? r.value : null;
  } catch (e) {
    return null;
  }
}
async function storageSet(key, value, shared = false) {
  try {
    await window.storage.set(key, value, shared);
  } catch (e) { /* silencioso */ }
}

const ARASAAC_CACHE_PREFIX = "arasaacPicto_";

async function getArasaacImageUrl(word) {
  const cacheKey = ARASAAC_CACHE_PREFIX + word.toLowerCase().trim();
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached === "null" ? null : cached;
  } catch (e) { /* sin caché disponible */ }

  try {
    const res = await fetch(`https://api.arasaac.org/api/pictograms/es/bestsearch/${encodeURIComponent(word)}`);
    const json = await res.json();
    const id = json && json[0] && json[0]._id;
    const url = id ? `https://static.arasaac.org/pictograms/${id}/${id}_300.png` : null;
    try { localStorage.setItem(cacheKey, url === null ? "null" : url); } catch (e) { /* silencioso */ }
    return url;
  } catch (e) {
    return null;
  }
}

function PictoVisual({ word, emoji, useIllustrations, sizeClass }) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    if (!useIllustrations) { setSrc(null); return; }
    getArasaacImageUrl(word).then((url) => { if (!cancelled) setSrc(url); });
    return () => { cancelled = true; };
  }, [word, useIllustrations]);

  if (useIllustrations && src && !failed) {
    return (
      <img
        src={src}
        alt={word}
        draggable={false}
        onError={() => setFailed(true)}
        style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none", pointerEvents: "none" }}
        className={`${sizeClass} object-contain`}
      />
    );
  }
  return <span className="text-3xl">{emoji}</span>;
}

function defaultProfileData() {
  return {
    level: 2,
    useIllustrations: true,
    theme: "calma",
    buttonSize: "md",
    routines: JSON.parse(JSON.stringify(DEFAULT_ROUTINES)),
    routineDone: {},
    checkins: [],
    notes: [],
    customPictos: [],
  };
}

export default function App() {
  const [profiles, setProfiles] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState("comunicacion");
  const [showSettings, setShowSettings] = useState(false);
  const [showAddProfile, setShowAddProfile] = useState(false);

  useEffect(() => {
    (async () => {
      const raw = await storageGet("profiles");
      const list = raw ? JSON.parse(raw) : [];
      setProfiles(list);
      if (list.length > 0) setCurrentId(list[0].id);
    })();
  }, []);

  useEffect(() => {
    if (!currentId) return;
    (async () => {
      const raw = await storageGet(`data-${currentId}`);
      setData(raw ? JSON.parse(raw) : defaultProfileData());
    })();
  }, [currentId]);

  useEffect(() => {
    applyTheme(data ? data.theme : "calma");
  }, [data && data.theme]);

  const saveData = useCallback((next) => {
    setData(next);
    if (currentId) storageSet(`data-${currentId}`, JSON.stringify(next));
  }, [currentId]);

  const saveProfiles = useCallback((next) => {
    setProfiles(next);
    storageSet("profiles", JSON.stringify(next));
  }, []);

  if (profiles === null) {
    return (
      <div style={{ background: COLORS.bg, minHeight: "100vh" }} className="flex items-center justify-center">
        <p style={{ color: COLORS.textMuted }}>Cargando…</p>
      </div>
    );
  }

  if (profiles.length === 0 || showAddProfile) {
    return (
      <OnboardingScreen
        onCreate={(profile) => {
          const next = [...profiles, profile];
          saveProfiles(next);
          setCurrentId(profile.id);
          setShowAddProfile(false);
        }}
        onCancel={profiles.length > 0 ? () => setShowAddProfile(false) : null}
      />
    );
  }

  const current = profiles.find((p) => p.id === currentId) || profiles[0];

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text }} className="font-sans pb-8">
      <Header
        profiles={profiles}
        current={current}
        onSwitch={setCurrentId}
        onAddProfile={() => setShowAddProfile(true)}
        onSettings={() => setShowSettings(true)}
      />

      {showSettings && data && (
        <SettingsPanel
          profile={current}
          data={data}
          onSave={saveData}
          onClose={() => setShowSettings(false)}
          onDeleteProfile={() => {
            const next = profiles.filter((p) => p.id !== current.id);
            saveProfiles(next);
            setCurrentId(next[0] ? next[0].id : null);
            setShowSettings(false);
          }}
        />
      )}

      <TabNav tab={tab} setTab={setTab} />

      <main className="max-w-3xl mx-auto px-4 mt-4">
        {!data ? (
          <p style={{ color: COLORS.textMuted }}>Cargando datos…</p>
        ) : tab === "comunicacion" ? (
          <ComunicacionTab data={data} onSave={saveData} />
        ) : tab === "rutinas" ? (
          <RutinasTab data={data} onSave={saveData} />
        ) : tab === "regulacion" ? (
          <RegulacionTab data={data} onSave={saveData} />
        ) : tab === "seguimiento" ? (
          <SeguimientoTab data={data} onSave={saveData} profileName={current.name} />
        ) : (
          <InformacionTab />
        )}
      </main>
    </div>
  );
}

/* ---------------- Onboarding ---------------- */
function OnboardingScreen({ onCreate, onCancel }) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(PROFILE_EMOJIS[0]);
  const [color, setColor] = useState(PROFILE_COLORS[0]);
  const [level, setLevel] = useState(2);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }} className="flex items-center justify-center px-4">
      <div style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-3xl p-6 max-w-md w-full shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles size={22} style={{ color: COLORS.primary }} />
          <h1 className="text-xl font-semibold">Crear un perfil</h1>
        </div>
        <p className="text-sm mb-5" style={{ color: COLORS.textMuted }}>
          Cada persona de la familia tiene su propio espacio: comunicación, rutinas y seguimiento adaptados a su nivel.
        </p>

        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Mateo"
          style={{ borderColor: COLORS.border }}
          className="w-full border rounded-xl px-3 py-2 mb-4 outline-none"
        />

        <label className="block text-sm font-medium mb-2">Elige un símbolo</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {PROFILE_EMOJIS.map((e) => (
            <button
              key={e}
              onClick={() => setEmoji(e)}
              style={{
                borderColor: emoji === e ? COLORS.primary : COLORS.border,
                background: emoji === e ? "#EEF3EF" : COLORS.surface,
              }}
              className="text-2xl border-2 rounded-xl w-12 h-12 flex items-center justify-center"
            >
              {e}
            </button>
          ))}
        </div>

        <label className="block text-sm font-medium mb-2">Color</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {PROFILE_COLORS.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              style={{ background: c, outline: color === c ? `3px solid ${COLORS.text}` : "none", outlineOffset: 2 }}
              className="w-9 h-9 rounded-full"
            />
          ))}
        </div>

        <label className="block text-sm font-medium mb-2">Nivel de apoyo inicial</label>
        <p className="text-xs mb-2" style={{ color: COLORS.textMuted }}>
          Puedes cambiarlo cuando quieras desde ajustes. Solo afecta la complejidad mostrada, no es una etiqueta clínica.
        </p>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((l) => (
            <button
              key={l}
              onClick={() => setLevel(l)}
              style={{
                background: level === l ? COLORS.primary : COLORS.surface,
                color: level === l ? "#fff" : COLORS.text,
                borderColor: COLORS.border,
              }}
              className="flex-1 border rounded-xl py-2 text-sm font-medium"
            >
              {l === 1 ? "Sencillo" : l === 2 ? "Medio" : "Avanzado"}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          {onCancel && (
            <button onClick={onCancel} style={{ borderColor: COLORS.border }} className="flex-1 border rounded-xl py-2.5 font-medium">
              Cancelar
            </button>
          )}
          <button
            disabled={!name.trim()}
            onClick={() => {
              const profile = { id: uid(), name: name.trim(), emoji, color };
              onCreate(profile);
              (async () => {
                const d = defaultProfileData();
                d.level = level;
                await storageSet(`data-${profile.id}`, JSON.stringify(d));
              })();
            }}
            style={{ background: !name.trim() ? COLORS.border : COLORS.primary, color: "#fff" }}
            className="flex-1 rounded-xl py-2.5 font-medium"
          >
            Crear perfil
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Header ---------------- */
function Header({ profiles, current, onSwitch, onAddProfile, onSettings }) {
  return (
    <header style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border-b sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          {profiles.map((p) => (
            <button
              key={p.id}
              onClick={() => onSwitch(p.id)}
              style={{
                background: p.id === current.id ? p.color : COLORS.bg,
                color: p.id === current.id ? "#fff" : COLORS.text,
              }}
              className="shrink-0 flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5 text-sm font-medium"
            >
              <span className="text-lg leading-none">{p.emoji}</span>
              {p.name}
            </button>
          ))}
          <button
            onClick={onAddProfile}
            style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
            className="shrink-0 border border-dashed rounded-full w-9 h-9 flex items-center justify-center"
            aria-label="Añadir perfil"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={onSettings}
          style={{ color: COLORS.textMuted }}
          className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full"
          aria-label="Ajustes"
        >
          <Settings size={20} />
        </button>
      </div>
    </header>
  );
}

/* ---------------- Settings ---------------- */
function SettingsPanel({ profile, data, onSave, onClose, onDeleteProfile }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="fixed inset-0 z-20 flex items-end sm:items-center justify-center" style={{ background: "rgba(46,51,47,0.35)" }}>
      <div style={{ background: COLORS.surface }} className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Ajustes de {profile.name}</h2>
          <button onClick={onClose} aria-label="Cerrar"><X size={20} style={{ color: COLORS.textMuted }} /></button>
        </div>

        <label className="block text-sm font-medium mb-2">Nivel de apoyo (complejidad mostrada)</label>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3].map((l) => (
            <button
              key={l}
              onClick={() => onSave({ ...data, level: l })}
              style={{
                background: data.level === l ? COLORS.primary : COLORS.bg,
                color: data.level === l ? "#fff" : COLORS.text,
              }}
              className="flex-1 rounded-xl py-2 text-sm font-medium"
            >
              {l === 1 ? "Sencillo" : l === 2 ? "Medio" : "Avanzado"}
            </button>
          ))}
        </div>
        <p className="text-xs mb-6" style={{ color: COLORS.textMuted }}>
          Sencillo: menos categorías y toque único que habla al instante. Medio: frases cortas. Avanzado: vocabulario completo y frases largas.
        </p>

        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-sm font-medium">Pictogramas ilustrados</p>
            <p className="text-xs" style={{ color: COLORS.textMuted }}>Usa imágenes reales del catálogo ARASAAC en vez de emoji. Si no hay conexión, se muestra el emoji.</p>
          </div>
          <button
            onClick={() => onSave({ ...data, useIllustrations: data.useIllustrations === false })}
            style={{ background: data.useIllustrations !== false ? COLORS.primary : COLORS.border }}
            className="w-12 h-7 rounded-full relative shrink-0 ml-3"
            aria-label="Alternar pictogramas ilustrados"
          >
            <span
              style={{ left: data.useIllustrations !== false ? 22 : 3, background: "#fff" }}
              className="absolute top-1 w-5 h-5 rounded-full transition-all"
            />
          </button>
        </div>
        <p className="text-xs mb-6" style={{ color: COLORS.textMuted }}>
          Pictogramas de ARASAAC (Gobierno de Aragón), Creative Commons BY-NC-SA.
        </p>

        <label className="block text-sm font-medium mb-2">Tamaño de los botones</label>
        <div className="flex gap-2 mb-6">
          {Object.keys(BUTTON_SIZES).map((s) => (
            <button
              key={s}
              onClick={() => onSave({ ...data, buttonSize: s })}
              style={{
                background: (data.buttonSize || "md") === s ? COLORS.primary : COLORS.bg,
                color: (data.buttonSize || "md") === s ? "#fff" : COLORS.text,
              }}
              className="flex-1 rounded-xl py-2 text-sm font-medium"
            >
              {BUTTON_SIZE_LABELS[s]}
            </button>
          ))}
        </div>

        <label className="block text-sm font-medium mb-2">Tema de color</label>
        <div className="flex gap-3 mb-6">
          {Object.keys(THEMES).map((t) => (
            <button
              key={t}
              onClick={() => onSave({ ...data, theme: t })}
              className="flex-1 flex flex-col items-center gap-1.5"
              aria-label={`Tema ${THEME_LABELS[t]}`}
            >
              <span
                style={{
                  background: `linear-gradient(135deg, ${THEMES[t].primary} 50%, ${THEMES[t].secondary} 50%)`,
                  outline: (data.theme || "calma") === t ? `3px solid ${COLORS.text}` : `2px solid ${THEMES[t].border}`,
                  outlineOffset: 2,
                }}
                className="w-11 h-11 rounded-full"
              />
              <span className="text-xs font-medium">{THEME_LABELS[t]}</span>
            </button>
          ))}
        </div>

        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} style={{ color: COLORS.danger }} className="text-sm font-medium flex items-center gap-1.5">
            <Trash2 size={16} /> Eliminar este perfil
          </button>
        ) : (
          <div style={{ background: "#FBF0EE", borderColor: COLORS.danger }} className="border rounded-xl p-3">
            <p className="text-sm mb-3">Esto borrará el perfil de {profile.name} y todos sus datos. ¿Continuar?</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(false)} className="flex-1 border rounded-lg py-1.5 text-sm" style={{ borderColor: COLORS.border }}>Cancelar</button>
              <button onClick={onDeleteProfile} style={{ background: COLORS.danger, color: "#fff" }} className="flex-1 rounded-lg py-1.5 text-sm font-medium">Eliminar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- Tab nav ---------------- */
function TabNav({ tab, setTab }) {
  const tabs = [
    { id: "comunicacion", label: "Comunicación", icon: MessageCircle },
    { id: "rutinas", label: "Rutinas", icon: Calendar },
    { id: "regulacion", label: "Regulación", icon: Wind },
    { id: "seguimiento", label: "Seguimiento", icon: ClipboardList },
    { id: "info", label: "Información", icon: Info },
  ];
  return (
    <nav className="max-w-3xl mx-auto px-4 mt-4">
      <div style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-1.5 flex gap-1 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{ background: active ? COLORS.primary : "transparent", color: active ? "#fff" : COLORS.textMuted }}
              className="flex-1 shrink-0 min-w-[64px] flex flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-medium"
            >
              <Icon size={18} />
              {t.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

/* ---------------- Comunicación ---------------- */
function ComunicacionTab({ data, onSave }) {
  const [phrase, setPhrase] = useState([]);
  const level = data.level;
  const categories = LEVEL_CATEGORIES[level];
  const [addingCustom, setAddingCustom] = useState(false);
  const size = BUTTON_SIZES[data.buttonSize || "md"];
  const [speaking, setSpeaking] = useState(false);
  const [justTapped, setJustTapped] = useState(null);

  const handleTap = (picto) => {
    if (level === 1) {
      setJustTapped(picto.label);
      speak(picto.label, {
        onStart: () => setSpeaking(true),
        onEnd: () => { setSpeaking(false); setJustTapped(null); },
      });
      return;
    }
    setPhrase((prev) => [...prev, picto]);
  };

  const speakPhrase = () => {
    if (phrase.length === 0) return;
    speak(phrase.map((p) => p.label).join(" "), {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    });
  };

  return (
    <div className="space-y-4">
      {level > 1 && (
        <div style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-3 sticky top-[68px] z-[5]">
          <div className="min-h-[40px] flex flex-wrap items-center gap-2 mb-2">
            {phrase.length === 0 ? (
              <span className="text-sm" style={{ color: COLORS.textMuted }}>Toca los pictogramas para armar una frase…</span>
            ) : (
              phrase.map((p, i) => (
                <span key={i} style={{ background: COLORS.bg }} className="rounded-lg px-2 py-1 text-sm flex items-center gap-1">
                  {p.emoji} {p.label}
                </span>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={speakPhrase}
              style={{ background: speaking ? COLORS.primaryDark : COLORS.primary, color: "#fff" }}
              className="flex-1 rounded-xl py-2 font-medium flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <Volume2 size={18} className={speaking ? "animate-pulse" : ""} /> {speaking ? "Hablando…" : "Hablar"}
            </button>
            <button
              onClick={() => setPhrase([])}
              style={{ borderColor: COLORS.border }}
              className="border rounded-xl px-4"
            >
              Borrar
            </button>
          </div>
        </div>
      )}

      {categories.map((cat) => {
        const items = [...PICTOGRAMS[cat]];
        const custom = data.customPictos.filter((c) => c.category === cat);
        return (
          <section key={cat}>
            <h3 className="text-sm font-semibold mb-2" style={{ color: COLORS.textMuted }}>{cat}</h3>
            <div className={`grid ${size.grid} gap-2`}>
              {[...items, ...custom].map((p, i) => {
                const isCustom = !!p.id;
                return (
                  <div key={cat + i} className="relative">
                    <button
                      onClick={() => handleTap(p)}
                      style={{
                        background: justTapped === p.label ? COLORS.bg : COLORS.surface,
                        borderColor: justTapped === p.label ? COLORS.primary : COLORS.border,
                        borderWidth: justTapped === p.label ? 2 : 1,
                      }}
                      className={`w-full border rounded-2xl ${size.tile} flex flex-col items-center gap-1 active:scale-95 transition-transform`}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.label}
                          draggable={false}
                          style={{ WebkitTouchCallout: "none", WebkitUserSelect: "none", userSelect: "none", pointerEvents: "none" }}
                          className={`${size.icon} object-cover rounded-xl`}
                        />
                      ) : (
                        <PictoVisual word={p.label} emoji={p.emoji} useIllustrations={data.useIllustrations !== false} sizeClass={size.icon} />
                      )}
                      <span className={`${size.label} font-medium text-center leading-tight`}>{p.label}</span>
                    </button>
                    {isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSave({ ...data, customPictos: data.customPictos.filter((c) => c.id !== p.id) });
                        }}
                        aria-label="Eliminar pictograma"
                        style={{ background: COLORS.surface, borderColor: COLORS.border, color: COLORS.danger }}
                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full border flex items-center justify-center"
                      >
                        <X size={12} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      {level === 3 && (
        <button
          onClick={() => setAddingCustom(true)}
          style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
          className="w-full border border-dashed rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-medium"
        >
          <Plus size={16} /> Añadir pictograma personalizado
        </button>
      )}

      {addingCustom && (
        <AddCustomPictoModal
          categories={categories}
          onCancel={() => setAddingCustom(false)}
          onAdd={(picto) => {
            onSave({ ...data, customPictos: [...data.customPictos, { ...picto, id: uid() }] });
            setAddingCustom(false);
          }}
        />
      )}
    </div>
  );
}

function AddCustomPictoModal({ categories, onCancel, onAdd }) {
  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState("⭐");
  const [category, setCategory] = useState(categories[0]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const handleFile = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try {
      setError("");
      const dataUrl = await resizeImageFile(file);
      setPhoto(dataUrl);
    } catch (err) {
      setError("No se pudo cargar la foto. Probá con otra imagen.");
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex items-end sm:items-center justify-center" style={{ background: "rgba(46,51,47,0.35)" }}>
      <div style={{ background: COLORS.surface }} className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto">
        <h3 className="font-semibold mb-4">Nuevo pictograma</h3>

        <label className="block text-sm font-medium mb-1">Palabra</label>
        <input value={label} onChange={(e) => setLabel(e.target.value)} style={{ borderColor: COLORS.border }} className="w-full border rounded-xl px-3 py-2 mb-3" />

        <label className="block text-sm font-medium mb-2">Foto (opcional)</label>
        <div className="flex items-center gap-3 mb-1">
          {photo ? (
            <img src={photo} alt="Vista previa" style={{ borderColor: COLORS.border }} className="w-16 h-16 object-cover rounded-xl border" />
          ) : (
            <div style={{ background: COLORS.bg, borderColor: COLORS.border }} className="w-16 h-16 rounded-xl border flex items-center justify-center text-2xl">
              {emoji}
            </div>
          )}
          <div className="flex-1">
            <label style={{ borderColor: COLORS.border }} className="border rounded-xl px-3 py-2 text-sm font-medium inline-block cursor-pointer">
              {photo ? "Cambiar foto" : "Subir foto"}
              <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
            </label>
            {photo && (
              <button onClick={() => setPhoto(null)} className="block text-xs mt-1" style={{ color: COLORS.textMuted }}>
                Quitar foto y usar emoji
              </button>
            )}
          </div>
        </div>
        {error && <p className="text-xs mb-2" style={{ color: COLORS.danger }}>{error}</p>}
        <p className="text-xs mb-3" style={{ color: COLORS.textMuted }}>
          Ej. una foto de mamá, o de su comida favorita. Si subís una foto, se usa en vez del emoji.
        </p>

        {!photo && (
          <>
            <label className="block text-sm font-medium mb-1">Emoji</label>
            <input value={emoji} onChange={(e) => setEmoji(e.target.value)} style={{ borderColor: COLORS.border }} className="w-full border rounded-xl px-3 py-2 mb-3" />
          </>
        )}

        <label className="block text-sm font-medium mb-1">Categoría</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ borderColor: COLORS.border }} className="w-full border rounded-xl px-3 py-2 mb-5">
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="flex gap-2">
          <button onClick={onCancel} style={{ borderColor: COLORS.border }} className="flex-1 border rounded-xl py-2 font-medium">Cancelar</button>
          <button
            disabled={!label.trim()}
            onClick={() => onAdd({ label: label.trim(), emoji, category, image: photo })}
            style={{ background: !label.trim() ? COLORS.border : COLORS.primary, color: "#fff" }}
            className="flex-1 rounded-xl py-2 font-medium"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Rutinas ---------------- */
function RutinasTab({ data, onSave }) {
  const routineNames = Object.keys(data.routines);
  const [active, setActive] = useState(routineNames[0]);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [newEmoji, setNewEmoji] = useState("⭐");
  const [addingRoutine, setAddingRoutine] = useState(false);

  const steps = data.routines[active] || [];
  const doneMap = data.routineDone[active] || {};

  const toggleDone = (idx) => {
    const nextDone = { ...doneMap, [idx]: !doneMap[idx] };
    onSave({ ...data, routineDone: { ...data.routineDone, [active]: nextDone } });
  };

  const resetDay = () => {
    onSave({ ...data, routineDone: { ...data.routineDone, [active]: {} } });
  };

  const removeStep = (idx) => {
    const nextSteps = steps.filter((_, i) => i !== idx);
    onSave({ ...data, routines: { ...data.routines, [active]: nextSteps } });
  };

  const moveStep = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= steps.length) return;
    const next = [...steps];
    [next[idx], next[target]] = [next[target], next[idx]];
    onSave({ ...data, routines: { ...data.routines, [active]: next } });
  };

  const addStep = () => {
    if (!newText.trim()) return;
    onSave({ ...data, routines: { ...data.routines, [active]: [...steps, { text: newText.trim(), emoji: newEmoji }] } });
    setNewText(""); setNewEmoji("⭐"); setAdding(false);
  };

  const doneCount = Object.values(doneMap).filter(Boolean).length;

  const createRoutine = (name, steps) => {
    onSave({
      ...data,
      routines: { ...data.routines, [name]: steps },
      routineDone: { ...data.routineDone, [name]: {} },
    });
    setActive(name);
    setAddingRoutine(false);
  };

  const deleteRoutine = (name) => {
    const nextRoutines = { ...data.routines };
    const nextDone = { ...data.routineDone };
    delete nextRoutines[name];
    delete nextDone[name];
    onSave({ ...data, routines: nextRoutines, routineDone: nextDone });
    const remaining = Object.keys(nextRoutines);
    setActive(remaining[0]);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 flex-1 overflow-x-auto">
          {routineNames.map((r) => (
            <button
              key={r}
              onClick={() => setActive(r)}
              style={{ background: active === r ? COLORS.secondary : COLORS.surface, color: active === r ? "#fff" : COLORS.text, borderColor: COLORS.border }}
              className="border shrink-0 rounded-xl px-4 py-2 text-sm font-medium"
            >
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={() => setAddingRoutine(true)}
          style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
          className="shrink-0 border border-dashed rounded-xl w-10 h-10 flex items-center justify-center"
          aria-label="Añadir rutina"
        >
          <Plus size={16} />
        </button>
      </div>

      {addingRoutine && (
        <AddRoutineModal
          existingNames={routineNames}
          onCancel={() => setAddingRoutine(false)}
          onCreate={createRoutine}
        />
      )}

      {!["Mañana", "Tarde", "Noche"].includes(active) && (
        <button onClick={() => deleteRoutine(active)} className="text-xs font-medium flex items-center gap-1" style={{ color: COLORS.danger }}>
          <Trash2 size={13} /> Eliminar rutina "{active}"
        </button>
      )}

      <div style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-3 flex items-center justify-between">
        <span className="text-sm font-medium" style={{ color: COLORS.textMuted }}>{doneCount} de {steps.length} completado{steps.length !== 1 ? "s" : ""}</span>
        <button onClick={resetDay} className="text-sm font-medium" style={{ color: COLORS.secondary }}>Reiniciar día</button>
      </div>

      <ol className="space-y-2">
        {steps.map((s, idx) => {
          const done = !!doneMap[idx];
          return (
            <li key={idx} style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-3 flex items-center gap-3">
              <button
                onClick={() => toggleDone(idx)}
                style={{ background: done ? COLORS.primary : COLORS.bg, borderColor: COLORS.border }}
                className={`${BUTTON_SIZES[data.buttonSize || "md"].circle} shrink-0 rounded-full border flex items-center justify-center`}
                aria-label={done ? "Marcar como pendiente" : "Marcar como hecho"}
              >
                {done ? <Check size={18} color="#fff" /> : <PictoVisual word={s.text} emoji={s.emoji} useIllustrations={data.useIllustrations !== false} sizeClass={BUTTON_SIZES[data.buttonSize || "md"].circleIcon} />}
              </button>
              <span className={`flex-1 font-medium ${done ? "line-through" : ""}`} style={{ color: done ? COLORS.textMuted : COLORS.text }}>
                {s.text}
              </span>
              <button onClick={() => moveStep(idx, -1)} aria-label="Subir" style={{ color: COLORS.textMuted }}><ChevronLeft className="rotate-90" size={18} /></button>
              <button onClick={() => moveStep(idx, 1)} aria-label="Bajar" style={{ color: COLORS.textMuted }}><ChevronRight className="rotate-90" size={18} /></button>
              <button onClick={() => removeStep(idx)} aria-label="Eliminar paso" style={{ color: COLORS.danger }}><Trash2 size={16} /></button>
            </li>
          );
        })}
      </ol>

      {!adding ? (
        <button onClick={() => setAdding(true)} style={{ borderColor: COLORS.border, color: COLORS.textMuted }} className="w-full border border-dashed rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-medium">
          <Plus size={16} /> Añadir paso a {active}
        </button>
      ) : (
        <div style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-3 space-y-2">
          <div className="flex gap-2">
            <input value={newEmoji} onChange={(e) => setNewEmoji(e.target.value)} style={{ borderColor: COLORS.border }} className="w-16 border rounded-xl px-2 py-2 text-center" />
            <input value={newText} onChange={(e) => setNewText(e.target.value)} placeholder="Nombre del paso" style={{ borderColor: COLORS.border }} className="flex-1 border rounded-xl px-3 py-2" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setAdding(false)} style={{ borderColor: COLORS.border }} className="flex-1 border rounded-xl py-2 text-sm font-medium">Cancelar</button>
            <button onClick={addStep} style={{ background: COLORS.primary, color: "#fff" }} className="flex-1 rounded-xl py-2 text-sm font-medium">Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddRoutineModal({ existingNames, onCancel, onCreate }) {
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("Vacía");

  return (
    <div className="fixed inset-0 z-20 flex items-end sm:items-center justify-center" style={{ background: "rgba(46,51,47,0.35)" }}>
      <div style={{ background: COLORS.surface }} className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6">
        <h3 className="font-semibold mb-4">Nueva rutina</h3>

        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Ej. "Trabajo", "Fin de semana"'
          style={{ borderColor: COLORS.border }}
          className="w-full border rounded-xl px-3 py-2 mb-4"
        />

        <label className="block text-sm font-medium mb-2">Empezar desde</label>
        <div className="space-y-2 mb-5">
          {Object.keys(ROUTINE_TEMPLATES).map((t) => (
            <button
              key={t}
              onClick={() => setTemplate(t)}
              style={{
                background: template === t ? "#EEF3EF" : COLORS.bg,
                borderColor: template === t ? COLORS.primary : COLORS.border,
              }}
              className="w-full border rounded-xl px-3 py-2.5 text-left text-sm font-medium"
            >
              {t}
              {t !== "Vacía" && (
                <span className="block text-xs font-normal mt-0.5" style={{ color: COLORS.textMuted }}>
                  {ROUTINE_TEMPLATES[t].map((s) => s.text).join(" · ")}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={onCancel} style={{ borderColor: COLORS.border }} className="flex-1 border rounded-xl py-2 font-medium">Cancelar</button>
          <button
            disabled={!name.trim() || existingNames.includes(name.trim())}
            onClick={() => onCreate(name.trim(), ROUTINE_TEMPLATES[template])}
            style={{ background: (!name.trim() || existingNames.includes(name.trim())) ? COLORS.border : COLORS.primary, color: "#fff" }}
            className="flex-1 rounded-xl py-2 font-medium"
          >
            Crear
          </button>
        </div>
      </div>
    </div>
  );
}

const INTENSITY_LEVELS = [
  { value: 1, label: "Poco", dots: 1 },
  { value: 2, label: "Medio", dots: 2 },
  { value: 3, label: "Mucho", dots: 3 },
];

/* ---------------- Regulación ---------------- */
function RegulacionTab({ data, onSave }) {
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState("Inhala");
  const [pace, setPace] = useState(4);
  const timerRef = useRef(null);
  const [triedToday, setTriedToday] = useState({});
  const [pendingEmotion, setPendingEmotion] = useState(null);

  useEffect(() => {
    if (!breathing) { clearInterval(timerRef.current); return; }
    setPhase("Inhala");
    let current = "Inhala";
    timerRef.current = setInterval(() => {
      current = current === "Inhala" ? "Exhala" : "Inhala";
      setPhase(current);
    }, pace * 1000);
    return () => clearInterval(timerRef.current);
  }, [breathing, pace]);

  const toggleTried = (i) => setTriedToday((prev) => ({ ...prev, [i]: !prev[i] }));

  const saveEmotion = (emo, intensity) => {
    const entry = {
      id: uid(), date: new Date().toISOString(),
      emotion: emo.label, emoji: emo.emoji, intensity, note: "",
    };
    onSave({ ...data, checkins: [entry, ...data.checkins].slice(0, 200) });
    setPendingEmotion(null);
  };

  return (
    <div className="space-y-6">
      <section style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: COLORS.textMuted }}>¿Cómo te sientes ahora?</h3>
        <div className={`grid ${BUTTON_SIZES[data.buttonSize || "md"].grid} gap-2`}>
          {CHECKIN_EMOTIONS.map((e) => (
            <button
              key={e.label}
              onClick={() => setPendingEmotion(e)}
              style={{ background: COLORS.bg }}
              className={`rounded-xl ${BUTTON_SIZES[data.buttonSize || "md"].tile} flex flex-col items-center gap-1 active:scale-95 transition-transform`}
            >
              <PictoVisual word={e.label} emoji={e.emoji} useIllustrations={data.useIllustrations !== false} sizeClass={BUTTON_SIZES[data.buttonSize || "md"].icon} />
              <span className="text-[11px] font-medium">{e.label}</span>
            </button>
          ))}
        </div>
      </section>

      {pendingEmotion && (
        <IntensityModal
          emotion={pendingEmotion}
          useIllustrations={data.useIllustrations !== false}
          onCancel={() => setPendingEmotion(null)}
          onConfirm={(intensity) => saveEmotion(pendingEmotion, intensity)}
        />
      )}

      <section style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-6 flex flex-col items-center">
        <h3 className="text-sm font-semibold mb-4 self-start" style={{ color: COLORS.textMuted }}>Ejercicio de respiración</h3>
        <div
          style={{
            width: 160, height: 160, borderRadius: "9999px",
            background: `radial-gradient(circle at 35% 30%, ${COLORS.primary}, ${COLORS.primaryDark})`,
            transform: breathing ? (phase === "Inhala" ? "scale(1.15)" : "scale(0.85)") : "scale(1)",
            transition: `transform ${pace}s ease-in-out`,
          }}
          className="flex items-center justify-center mb-4"
        >
          <span className="text-white font-semibold text-lg">{breathing ? phase : "Listo"}</span>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs" style={{ color: COLORS.textMuted }}>Ritmo</span>
          {[3, 4, 6].map((s) => (
            <button
              key={s}
              onClick={() => setPace(s)}
              style={{ background: pace === s ? COLORS.secondary : COLORS.bg, color: pace === s ? "#fff" : COLORS.text }}
              className="rounded-full w-9 h-9 text-xs font-medium"
            >
              {s}s
            </button>
          ))}
        </div>

        <button
          onClick={() => setBreathing((b) => !b)}
          style={{ background: breathing ? COLORS.danger : COLORS.primary, color: "#fff" }}
          className="rounded-xl px-6 py-2.5 font-medium"
        >
          {breathing ? "Detener" : "Comenzar"}
        </button>
      </section>

      <section style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: COLORS.textMuted }}>Herramientas sensoriales</h3>
        <div className="space-y-2">
          {SENSORY_STRATEGIES.map((s, i) => (
            <button
              key={i}
              onClick={() => toggleTried(i)}
              style={{ background: triedToday[i] ? "#EEF3EF" : COLORS.bg }}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left"
            >
              <PictoVisual word={s.text} emoji={s.emoji} useIllustrations={data.useIllustrations !== false} sizeClass="w-7 h-7" />
              <span className="flex-1 text-sm font-medium">{s.text}</span>
              {triedToday[i] && <Check size={16} style={{ color: COLORS.primary }} />}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function IntensityModal({ emotion, useIllustrations, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-20 flex items-end sm:items-center justify-center" style={{ background: "rgba(46,51,47,0.35)" }}>
      <div style={{ background: COLORS.surface }} className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6">
        <div className="flex items-center gap-2 mb-1">
          <PictoVisual word={emotion.label} emoji={emotion.emoji} useIllustrations={useIllustrations} sizeClass="w-9 h-9" />
          <h3 className="font-semibold">{emotion.label}</h3>
        </div>
        <p className="text-sm mb-5" style={{ color: COLORS.textMuted }}>¿Con qué intensidad lo sientes?</p>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {INTENSITY_LEVELS.map((lvl) => (
            <button
              key={lvl.value}
              onClick={() => onConfirm(lvl.value)}
              style={{ background: COLORS.bg, borderColor: COLORS.border }}
              className="border rounded-2xl py-4 flex flex-col items-center gap-2 active:scale-95 transition-transform"
            >
              <span className="flex gap-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      width: 8, height: 8, borderRadius: "9999px",
                      background: i < lvl.dots ? COLORS.secondary : COLORS.border,
                    }}
                  />
                ))}
              </span>
              <span className="text-xs font-medium">{lvl.label}</span>
            </button>
          ))}
        </div>
        <button onClick={onCancel} style={{ borderColor: COLORS.border }} className="w-full border rounded-xl py-2 text-sm font-medium">
          Cancelar
        </button>
      </div>
    </div>
  );
}

/* ---------------- Seguimiento ---------------- */
function SeguimientoTab({ data, onSave, profileName }) {
  const [newNote, setNewNote] = useState("");

  const addNote = () => {
    if (!newNote.trim()) return;
    const entry = { id: uid(), date: new Date().toISOString(), text: newNote.trim() };
    onSave({ ...data, notes: [entry, ...data.notes] });
    setNewNote("");
  };

  const removeNote = (id) => onSave({ ...data, notes: data.notes.filter((n) => n.id !== id) });
  const removeCheckin = (id) => onSave({ ...data, checkins: data.checkins.filter((c) => c.id !== id) });

  const counts = {};
  const intensitySums = {};
  data.checkins.forEach((c) => {
    counts[c.emotion] = (counts[c.emotion] || 0) + 1;
    intensitySums[c.emotion] = (intensitySums[c.emotion] || 0) + (c.intensity || 2);
  });
  const maxCount = Math.max(1, ...Object.values(counts));

  const IntensityDots = ({ level }) => (
    <span className="inline-flex gap-0.5 align-middle">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          style={{
            width: 6, height: 6, borderRadius: "9999px",
            background: i < (level || 0) ? COLORS.secondary : COLORS.border,
            display: "inline-block",
          }}
        />
      ))}
    </span>
  );

  const fmtDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short" }) + " · " +
      d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="space-y-6">
      <section style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: COLORS.textMuted }}>Resumen emocional de {profileName}</h3>
        {Object.keys(counts).length === 0 ? (
          <p className="text-sm" style={{ color: COLORS.textMuted }}>Aún no hay registros. Usa la pestaña Regulación para registrar el estado de ánimo.</p>
        ) : (
          <div className="space-y-2">
            {Object.entries(counts).map(([label, count]) => {
              const emoji = CHECKIN_EMOTIONS.find((e) => e.label === label)?.emoji || "🙂";
              const avgIntensity = Math.round(intensitySums[label] / count);
              return (
                <div key={label} className="flex items-center gap-2">
                  <span className="w-24 text-sm shrink-0">{emoji} {label}</span>
                  <div style={{ background: COLORS.bg }} className="flex-1 rounded-full h-3 overflow-hidden">
                    <div style={{ width: `${(count / maxCount) * 100}%`, background: COLORS.secondary }} className="h-full rounded-full" />
                  </div>
                  <span className="text-xs w-5 text-right" style={{ color: COLORS.textMuted }}>{count}</span>
                  <IntensityDots level={avgIntensity} />
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: COLORS.textMuted }}>Notas para terapia / familia</h3>
        <div className="flex gap-2 mb-4">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Escribe una observación…"
            style={{ borderColor: COLORS.border }}
            className="flex-1 border rounded-xl px-3 py-2"
            onKeyDown={(e) => e.key === "Enter" && addNote()}
          />
          <button onClick={addNote} style={{ background: COLORS.primary, color: "#fff" }} className="rounded-xl px-4 font-medium">Añadir</button>
        </div>
        {data.notes.length === 0 ? (
          <p className="text-sm" style={{ color: COLORS.textMuted }}>No hay notas todavía.</p>
        ) : (
          <ul className="space-y-2">
            {data.notes.map((n) => (
              <li key={n.id} style={{ background: COLORS.bg }} className="rounded-xl p-3 flex items-start gap-2">
                <div className="flex-1">
                  <p className="text-xs mb-1" style={{ color: COLORS.textMuted }}>{fmtDate(n.date)}</p>
                  <p className="text-sm">{n.text}</p>
                </div>
                <button onClick={() => removeNote(n.id)} aria-label="Eliminar nota"><Trash2 size={15} style={{ color: COLORS.danger }} /></button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: COLORS.textMuted }}>Historial de registros</h3>
        {data.checkins.length === 0 ? (
          <p className="text-sm" style={{ color: COLORS.textMuted }}>Sin registros aún.</p>
        ) : (
          <ul className="space-y-2 max-h-72 overflow-y-auto">
            {data.checkins.map((c) => (
              <li key={c.id} className="flex items-center gap-2 text-sm">
                <PictoVisual word={c.emotion} emoji={c.emoji} useIllustrations={data.useIllustrations !== false} sizeClass="w-5 h-5" />
                <span className="flex-1">{c.emotion}</span>
                <IntensityDots level={c.intensity} />
                <span style={{ color: COLORS.textMuted }} className="text-xs">{fmtDate(c.date)}</span>
                <button onClick={() => removeCheckin(c.id)} aria-label="Eliminar registro"><Trash2 size={14} style={{ color: COLORS.danger }} /></button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

/* ---------------- Información sobre TEA ---------------- */
const INFO_SECTIONS = [
  {
    id: "que-es",
    title: "¿Qué es el TEA?",
    icon: "🧩",
    content: [
      "El Trastorno del Espectro Autista (TEA) es una condición del neurodesarrollo que afecta la forma en que una persona se comunica, interactúa socialmente, y percibe y responde al entorno sensorial.",
      "Se lo llama \"espectro\" porque se manifiesta de manera muy distinta en cada persona: hay quienes necesitan apoyo intensivo en la vida diaria, y quienes viven de forma autónoma. No hay dos personas autistas iguales.",
      "No es una enfermedad que se \"cura\", sino una forma diferente de procesar el mundo. Con los apoyos adecuados, cada persona puede desarrollar su potencial y bienestar.",
    ],
  },
  {
    id: "senales",
    title: "Señales generales",
    icon: "🔍",
    content: [
      "Estas son características que suelen observarse, agrupadas por área. No son una lista de diagnóstico: solo un profesional especializado puede evaluar y diagnosticar.",
      "• Comunicación: diferencias en el lenguaje verbal o no verbal, dificultad para iniciar o sostener conversaciones, comprensión literal del lenguaje.",
      "• Interacción social: dificultad para interpretar señales sociales o compartir intereses, preferencia por jugar o estar solo/a.",
      "• Comportamientos e intereses: rutinas o intereses muy intensos y específicos, movimientos repetitivos (aleteo, balanceo), necesidad de previsibilidad.",
      "• Sensorial: hiper o hiposensibilidad a sonidos, luces, texturas, olores o al tacto.",
    ],
  },
  {
    id: "consejos",
    title: "Consejos prácticos para familias y docentes",
    icon: "💡",
    content: [
      "• Anticipar los cambios: avisar con tiempo antes de una transición o cambio de planes, usando apoyos visuales cuando sea posible.",
      "• Comunicación clara y concreta: frases simples, directas, evitando el doble sentido, el sarcasmo o las metáforas sin explicación.",
      "• Respetar las necesidades sensoriales: permitir pausas, auriculares, o un espacio tranquilo cuando el entorno resulta abrumador.",
      "• Validar las emociones: nombrar lo que la persona podría estar sintiendo sin minimizarlo ni corregirlo.",
      "• Apoyarse en los intereses: usar los temas que le generan entusiasmo como puente para aprender o conectar con otros.",
      "• Rutinas predecibles: una estructura clara del día reduce la ansiedad y da seguridad (podés usar la pestaña Rutinas para esto).",
      "• Escuchar a la persona autista: sus propias preferencias y límites son la mejor guía, más que cualquier suposición externa.",
    ],
  },
  {
    id: "recursos",
    title: "Recursos y organizaciones de apoyo",
    icon: "🤝",
    content: [],
    links: [
      { name: "APAdeA — Asociación Argentina de Padres de Autistas", url: "https://apadea.org.ar/", desc: "Orientación a familias, talleres, apoyo legal y programas de empleabilidad." },
      { name: "PANAACEA", url: "https://www.panaacea.org/", desc: "Concientización, capacitación, intervención e investigación sobre TEA." },
      { name: "Autismored", url: "https://autismored.org/", desc: "Plataforma gratuita que conecta familias con profesionales y recursos por geolocalización." },
      { name: "RedEA", url: "https://redea.org.ar/", desc: "Red de organizaciones de autismo que trabajan por la inclusión y los derechos." },
    ],
  },
];

function InformacionTab() {
  const [openId, setOpenId] = useState(INFO_SECTIONS[0].id);

  return (
    <div className="space-y-4">
      <div style={{ background: "#EEF3EF", borderColor: COLORS.primary }} className="border rounded-2xl p-4">
        <p className="text-sm" style={{ color: COLORS.text }}>
          Esta información es general y educativa. No reemplaza una evaluación profesional. Si sospechás que alguien podría estar en el espectro autista, consultá con un profesional de la salud especializado en neurodesarrollo.
        </p>
      </div>

      {INFO_SECTIONS.map((section) => {
        const open = openId === section.id;
        return (
          <section key={section.id} style={{ background: COLORS.surface, borderColor: COLORS.border }} className="border rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpenId(open ? null : section.id)}
              className="w-full flex items-center gap-3 p-4 text-left"
            >
              <span className="text-2xl">{section.icon}</span>
              <span className="flex-1 font-semibold">{section.title}</span>
              <ChevronDown size={18} style={{ color: COLORS.textMuted, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {open && (
              <div className="px-4 pb-4 space-y-3">
                {section.content.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed" style={{ color: COLORS.text }}>{p}</p>
                ))}
                {section.links && (
                  <div className="space-y-2">
                    {section.links.map((link) => (
                      <a
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: COLORS.bg, borderColor: COLORS.border }}
                        className="border rounded-xl p-3 flex items-start gap-2"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-semibold flex items-center gap-1" style={{ color: COLORS.primaryDark }}>
                            {link.name} <ExternalLink size={13} />
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: COLORS.textMuted }}>{link.desc}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
