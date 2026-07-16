const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;

/* Iconos simples sin dependencias externas, consistentes con el estilo cálido de la app */
const Plus = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    fontWeight: 800,
    lineHeight: 1,
    ...style
  }
}, "+");
const X = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    fontWeight: 700,
    lineHeight: 1,
    ...style
  }
}, "✕");
const Check = ({
  size = 16,
  color,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    fontWeight: 800,
    lineHeight: 1,
    color,
    ...style
  }
}, "✓");
const ChevronUp = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size * 0.8,
    lineHeight: 1,
    ...style
  }
}, "▲");
const ChevronDown = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size * 0.8,
    lineHeight: 1,
    ...style
  }
}, "▼");
const Trash2 = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    lineHeight: 1,
    ...style
  }
}, "🗑️");
const Settings = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    lineHeight: 1,
    ...style
  }
}, "⚙️");
const Volume2 = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    lineHeight: 1,
    ...style
  }
}, "🔊");
const Sparkles = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    lineHeight: 1,
    ...style
  }
}, "✨");
const MessageCircle = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    lineHeight: 1,
    ...style
  }
}, "💬");
const Calendar = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    lineHeight: 1,
    ...style
  }
}, "🗓️");
const Wind = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    lineHeight: 1,
    ...style
  }
}, "🌬️");
const ClipboardList = ({
  size = 16,
  style
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: size,
    lineHeight: 1,
    ...style
  }
}, "📋");

/* ---------- Paleta y tokens ----------
   Fondo:      #F5F7F3  (blanco cálido con un toque verde, baja saturación)
   Superficie: #FFFFFF
   Primario:   #5E8B6E  (salvia — calma, natural)
   Primario oscuro: #446A52
   Secundario: #6E82AC  (azul pizarra suave)
   Acento cálido (uso mínimo): #E0A458
   Texto:      #2E332F
   Texto tenue:#6E766F
   Suave/borde:#E4E8E1
------------------------------------- */
const COLORS = {
  bg: "#F5F7F3",
  surface: "#FFFFFF",
  primary: "#5E8B6E",
  primaryDark: "#446A52",
  secondary: "#6E82AC",
  warm: "#E0A458",
  text: "#2E332F",
  textMuted: "#6E766F",
  border: "#E4E8E1",
  danger: "#C97B6E"
};
const PROFILE_COLORS = ["#5E8B6E", "#6E82AC", "#E0A458", "#C97B6E", "#8B7BA8"];
const PROFILE_EMOJIS = ["🦊", "🐢", "🐧", "🐝", "🦋", "🐨", "🐬", "🦉"];
const PICTOGRAMS = {
  "Necesidades básicas": [{
    label: "Agua",
    emoji: "💧"
  }, {
    label: "Comida",
    emoji: "🍽️"
  }, {
    label: "Baño",
    emoji: "🚽"
  }, {
    label: "Dormir",
    emoji: "😴"
  }, {
    label: "Ayuda",
    emoji: "🆘"
  }, {
    label: "Dolor",
    emoji: "🤕"
  }, {
    label: "Descanso",
    emoji: "🛌"
  }],
  "Emociones": [{
    label: "Feliz",
    emoji: "😊"
  }, {
    label: "Triste",
    emoji: "😢"
  }, {
    label: "Enojado",
    emoji: "😠"
  }, {
    label: "Miedo",
    emoji: "😨"
  }, {
    label: "Cansado",
    emoji: "😪"
  }, {
    label: "Tranquilo",
    emoji: "😌"
  }],
  "Actividades": [{
    label: "Jugar",
    emoji: "🧸"
  }, {
    label: "Leer",
    emoji: "📖"
  }, {
    label: "Música",
    emoji: "🎵"
  }, {
    label: "Pantalla",
    emoji: "📱"
  }, {
    label: "Pasear",
    emoji: "🚶"
  }, {
    label: "Dibujar",
    emoji: "🎨"
  }],
  "Lugares": [{
    label: "Casa",
    emoji: "🏠"
  }, {
    label: "Escuela",
    emoji: "🏫"
  }, {
    label: "Parque",
    emoji: "🌳"
  }, {
    label: "Tienda",
    emoji: "🛒"
  }, {
    label: "Médico",
    emoji: "🏥"
  }, {
    label: "Coche",
    emoji: "🚗"
  }],
  "Personas": [{
    label: "Mamá",
    emoji: "👩"
  }, {
    label: "Papá",
    emoji: "👨"
  }, {
    label: "Amigo",
    emoji: "🧑‍🤝‍🧑"
  }, {
    label: "Maestro",
    emoji: "🧑‍🏫"
  }, {
    label: "Doctor",
    emoji: "👩‍⚕️"
  }, {
    label: "Familia",
    emoji: "👪"
  }],
  "Palabras": [{
    label: "Quiero",
    emoji: "👉"
  }, {
    label: "No quiero",
    emoji: "🚫"
  }, {
    label: "Más",
    emoji: "➕"
  }, {
    label: "Terminado",
    emoji: "✅"
  }, {
    label: "Sí",
    emoji: "👍"
  }, {
    label: "No",
    emoji: "👎"
  }, {
    label: "Por favor",
    emoji: "🙏"
  }, {
    label: "Gracias",
    emoji: "💛"
  }]
};
const LEVEL_CATEGORIES = {
  1: ["Necesidades básicas", "Emociones"],
  2: ["Necesidades básicas", "Emociones", "Actividades", "Lugares"],
  3: ["Necesidades básicas", "Emociones", "Actividades", "Lugares", "Personas", "Palabras"]
};
const DEFAULT_ROUTINES = {
  "Mañana": [{
    text: "Despertar",
    emoji: "⏰"
  }, {
    text: "Vestirse",
    emoji: "👕"
  }, {
    text: "Desayunar",
    emoji: "🍳"
  }, {
    text: "Cepillarse los dientes",
    emoji: "🪥"
  }, {
    text: "Preparar mochila",
    emoji: "🎒"
  }],
  "Tarde": [{
    text: "Comer",
    emoji: "🍽️"
  }, {
    text: "Tarea",
    emoji: "📚"
  }, {
    text: "Jugar",
    emoji: "🧸"
  }, {
    text: "Merienda",
    emoji: "🍎"
  }],
  "Noche": [{
    text: "Cenar",
    emoji: "🍽️"
  }, {
    text: "Baño",
    emoji: "🛁"
  }, {
    text: "Ponerse pijama",
    emoji: "👖"
  }, {
    text: "Cuento",
    emoji: "📖"
  }, {
    text: "Dormir",
    emoji: "😴"
  }]
};
const CHECKIN_EMOTIONS = [{
  label: "Feliz",
  emoji: "😊"
}, {
  label: "Tranquilo",
  emoji: "😌"
}, {
  label: "Normal",
  emoji: "😐"
}, {
  label: "Cansado",
  emoji: "😪"
}, {
  label: "Triste",
  emoji: "😢"
}, {
  label: "Enojado",
  emoji: "😠"
}, {
  label: "Ansioso",
  emoji: "😨"
}, {
  label: "Emocionado",
  emoji: "🤩"
}];
const SENSORY_STRATEGIES = [{
  text: "Auriculares con cancelación de ruido",
  emoji: "🎧"
}, {
  text: "Manta con peso",
  emoji: "🛌"
}, {
  text: "Buscar un lugar tranquilo",
  emoji: "🤫"
}, {
  text: "Pelota antiestrés / fidget",
  emoji: "🖐️"
}, {
  text: "Bajar la luz",
  emoji: "💡"
}, {
  text: "Música suave",
  emoji: "🎶"
}, {
  text: "Moverse (saltar, mecerse)",
  emoji: "🤸"
}, {
  text: "Abrazo de presión profunda",
  emoji: "🤗"
}];
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
function speak(text) {
  try {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  } catch (e) {/* silencioso */}
}
const STORAGE_PREFIX = "apoyoTEA_";
async function storageGet(key) {
  try {
    return localStorage.getItem(STORAGE_PREFIX + key);
  } catch (e) {
    return null;
  }
}
async function storageSet(key, value) {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, value);
  } catch (e) {/* silencioso */}
}
const ARASAAC_CACHE_PREFIX = "arasaacPicto_";
async function getArasaacImageUrl(word) {
  const cacheKey = ARASAAC_CACHE_PREFIX + word.toLowerCase().trim();
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) return cached === "null" ? null : cached;
  } catch (e) {/* sin caché disponible */}
  try {
    const res = await fetch(`https://api.arasaac.org/api/pictograms/es/bestsearch/${encodeURIComponent(word)}`);
    const json = await res.json();
    const id = json && json[0] && json[0]._id;
    const url = id ? `https://static.arasaac.org/pictograms/${id}/${id}_300.png` : null;
    try {
      localStorage.setItem(cacheKey, url === null ? "null" : url);
    } catch (e) {/* silencioso */}
    return url;
  } catch (e) {
    return null;
  }
}
function PictoVisual({
  word,
  emoji,
  useIllustrations,
  sizeClass
}) {
  const [src, setSrc] = useState(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let cancelled = false;
    setFailed(false);
    if (!useIllustrations) {
      setSrc(null);
      return;
    }
    getArasaacImageUrl(word).then(url => {
      if (!cancelled) setSrc(url);
    });
    return () => {
      cancelled = true;
    };
  }, [word, useIllustrations]);
  if (useIllustrations && src && !failed) {
    return /*#__PURE__*/React.createElement("img", {
      src: src,
      alt: word,
      onError: () => setFailed(true),
      className: `${sizeClass} object-contain`
    });
  }
  return /*#__PURE__*/React.createElement("span", {
    className: "text-3xl"
  }, emoji);
}
function defaultProfileData() {
  return {
    level: 2,
    useIllustrations: true,
    routines: JSON.parse(JSON.stringify(DEFAULT_ROUTINES)),
    routineDone: {},
    checkins: [],
    notes: [],
    customPictos: []
  };
}
function App() {
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
  const saveData = useCallback(next => {
    setData(next);
    if (currentId) storageSet(`data-${currentId}`, JSON.stringify(next));
  }, [currentId]);
  const saveProfiles = useCallback(next => {
    setProfiles(next);
    storageSet("profiles", JSON.stringify(next));
  }, []);
  if (profiles === null) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: COLORS.bg,
        minHeight: "100vh"
      },
      className: "flex items-center justify-center"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        color: COLORS.textMuted
      }
    }, "Cargando…"));
  }
  if (profiles.length === 0 || showAddProfile) {
    return /*#__PURE__*/React.createElement(OnboardingScreen, {
      onCreate: profile => {
        const next = [...profiles, profile];
        saveProfiles(next);
        setCurrentId(profile.id);
        setShowAddProfile(false);
      },
      onCancel: profiles.length > 0 ? () => setShowAddProfile(false) : null
    });
  }
  const current = profiles.find(p => p.id === currentId) || profiles[0];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.bg,
      minHeight: "100vh",
      color: COLORS.text
    },
    className: "font-sans pb-8"
  }, /*#__PURE__*/React.createElement(Header, {
    profiles: profiles,
    current: current,
    onSwitch: setCurrentId,
    onAddProfile: () => setShowAddProfile(true),
    onSettings: () => setShowSettings(true)
  }), showSettings && data && /*#__PURE__*/React.createElement(SettingsPanel, {
    profile: current,
    data: data,
    onSave: saveData,
    onClose: () => setShowSettings(false),
    onDeleteProfile: () => {
      const next = profiles.filter(p => p.id !== current.id);
      saveProfiles(next);
      setCurrentId(next[0] ? next[0].id : null);
      setShowSettings(false);
    }
  }), /*#__PURE__*/React.createElement(TabNav, {
    tab: tab,
    setTab: setTab
  }), /*#__PURE__*/React.createElement("main", {
    className: "max-w-3xl mx-auto px-4 mt-4"
  }, !data ? /*#__PURE__*/React.createElement("p", {
    style: {
      color: COLORS.textMuted
    }
  }, "Cargando datos…") : tab === "comunicacion" ? /*#__PURE__*/React.createElement(ComunicacionTab, {
    data: data,
    onSave: saveData
  }) : tab === "rutinas" ? /*#__PURE__*/React.createElement(RutinasTab, {
    data: data,
    onSave: saveData
  }) : tab === "regulacion" ? /*#__PURE__*/React.createElement(RegulacionTab, {
    data: data,
    onSave: saveData
  }) : /*#__PURE__*/React.createElement(SeguimientoTab, {
    data: data,
    onSave: saveData,
    profileName: current.name
  })));
}

/* ---------------- Onboarding ---------------- */
function OnboardingScreen({
  onCreate,
  onCancel
}) {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState(PROFILE_EMOJIS[0]);
  const [color, setColor] = useState(PROFILE_COLORS[0]);
  const [level, setLevel] = useState(2);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.bg,
      minHeight: "100vh"
    },
    className: "flex items-center justify-center px-4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-3xl p-6 max-w-md w-full shadow-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement(Sparkles, {
    size: 22,
    style: {
      color: COLORS.primary
    }
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-semibold"
  }, "Crear un perfil")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-5",
    style: {
      color: COLORS.textMuted
    }
  }, "Cada persona de la familia tiene su propio espacio: comunicación, rutinas y seguimiento adaptados a su nivel."), /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-1"
  }, "Nombre"), /*#__PURE__*/React.createElement("input", {
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Ej. Mateo",
    style: {
      borderColor: COLORS.border
    },
    className: "w-full border rounded-xl px-3 py-2 mb-4 outline-none"
  }), /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Elige un símbolo"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, PROFILE_EMOJIS.map(e => /*#__PURE__*/React.createElement("button", {
    key: e,
    onClick: () => setEmoji(e),
    style: {
      borderColor: emoji === e ? COLORS.primary : COLORS.border,
      background: emoji === e ? "#EEF3EF" : COLORS.surface
    },
    className: "text-2xl border-2 rounded-xl w-12 h-12 flex items-center justify-center"
  }, e))), /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Color"), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mb-4"
  }, PROFILE_COLORS.map(c => /*#__PURE__*/React.createElement("button", {
    key: c,
    onClick: () => setColor(c),
    style: {
      background: c,
      outline: color === c ? `3px solid ${COLORS.text}` : "none",
      outlineOffset: 2
    },
    className: "w-9 h-9 rounded-full"
  }))), /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Nivel de apoyo inicial"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-2",
    style: {
      color: COLORS.textMuted
    }
  }, "Puedes cambiarlo cuando quieras desde ajustes. Solo afecta la complejidad mostrada, no es una etiqueta clínica."), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-6"
  }, [1, 2, 3].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => setLevel(l),
    style: {
      background: level === l ? COLORS.primary : COLORS.surface,
      color: level === l ? "#fff" : COLORS.text,
      borderColor: COLORS.border
    },
    className: "flex-1 border rounded-xl py-2 text-sm font-medium"
  }, l === 1 ? "Sencillo" : l === 2 ? "Medio" : "Avanzado"))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, onCancel && /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      borderColor: COLORS.border
    },
    className: "flex-1 border rounded-xl py-2.5 font-medium"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    disabled: !name.trim(),
    onClick: () => {
      const profile = {
        id: uid(),
        name: name.trim(),
        emoji,
        color
      };
      onCreate(profile);
      (async () => {
        const d = defaultProfileData();
        d.level = level;
        await storageSet(`data-${profile.id}`, JSON.stringify(d));
      })();
    },
    style: {
      background: !name.trim() ? COLORS.border : COLORS.primary,
      color: "#fff"
    },
    className: "flex-1 rounded-xl py-2.5 font-medium"
  }, "Crear perfil"))));
}

/* ---------------- Header ---------------- */
function Header({
  profiles,
  current,
  onSwitch,
  onAddProfile,
  onSettings
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border-b sticky top-0 z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 overflow-x-auto"
  }, profiles.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => onSwitch(p.id),
    style: {
      background: p.id === current.id ? p.color : COLORS.bg,
      color: p.id === current.id ? "#fff" : COLORS.text
    },
    className: "shrink-0 flex items-center gap-1.5 rounded-full pl-1.5 pr-3 py-1.5 text-sm font-medium"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-lg leading-none"
  }, p.emoji), p.name)), /*#__PURE__*/React.createElement("button", {
    onClick: onAddProfile,
    style: {
      borderColor: COLORS.border,
      color: COLORS.textMuted
    },
    className: "shrink-0 border border-dashed rounded-full w-9 h-9 flex items-center justify-center",
    "aria-label": "Añadir perfil"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: onSettings,
    style: {
      color: COLORS.textMuted
    },
    className: "shrink-0 w-9 h-9 flex items-center justify-center rounded-full",
    "aria-label": "Ajustes"
  }, /*#__PURE__*/React.createElement(Settings, {
    size: 20
  }))));
}

/* ---------------- Settings ---------------- */
function SettingsPanel({
  profile,
  data,
  onSave,
  onClose,
  onDeleteProfile
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-20 flex items-end sm:items-center justify-center",
    style: {
      background: "rgba(46,51,47,0.35)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.surface
    },
    className: "w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-4"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-lg font-semibold"
  }, "Ajustes de ", profile.name), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Cerrar"
  }, /*#__PURE__*/React.createElement(X, {
    size: 20,
    style: {
      color: COLORS.textMuted
    }
  }))), /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Nivel de apoyo (complejidad mostrada)"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-6"
  }, [1, 2, 3].map(l => /*#__PURE__*/React.createElement("button", {
    key: l,
    onClick: () => onSave({
      ...data,
      level: l
    }),
    style: {
      background: data.level === l ? COLORS.primary : COLORS.bg,
      color: data.level === l ? "#fff" : COLORS.text
    },
    className: "flex-1 rounded-xl py-2 text-sm font-medium"
  }, l === 1 ? "Sencillo" : l === 2 ? "Medio" : "Avanzado"))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-6",
    style: {
      color: COLORS.textMuted
    }
  }, "Sencillo: menos categorías y toque único que habla al instante. Medio: frases cortas. Avanzado: vocabulario completo y frases largas."), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-1"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium"
  }, "Pictogramas ilustrados"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs",
    style: {
      color: COLORS.textMuted
    }
  }, "Usa imágenes reales del catálogo ARASAAC en vez de emoji. Si no hay conexión, se muestra el emoji.")), /*#__PURE__*/React.createElement("button", {
    onClick: () => onSave({
      ...data,
      useIllustrations: data.useIllustrations === false
    }),
    style: {
      background: data.useIllustrations !== false ? COLORS.primary : COLORS.border
    },
    className: "w-12 h-7 rounded-full relative shrink-0 ml-3",
    "aria-label": "Alternar pictogramas ilustrados"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      left: data.useIllustrations !== false ? 22 : 3,
      background: "#fff"
    },
    className: "absolute top-1 w-5 h-5 rounded-full transition-all"
  }))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-6",
    style: {
      color: COLORS.textMuted
    }
  }, "Pictogramas de ARASAAC (Gobierno de Aragón), Creative Commons BY-NC-SA."), !confirmDelete ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirmDelete(true),
    style: {
      color: COLORS.danger
    },
    className: "text-sm font-medium flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 16
  }), " Eliminar este perfil") : /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#FBF0EE",
      borderColor: COLORS.danger
    },
    className: "border rounded-xl p-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-3"
  }, "Esto borrará el perfil de ", profile.name, " y todos sus datos. ¿Continuar?"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setConfirmDelete(false),
    className: "flex-1 border rounded-lg py-1.5 text-sm",
    style: {
      borderColor: COLORS.border
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: onDeleteProfile,
    style: {
      background: COLORS.danger,
      color: "#fff"
    },
    className: "flex-1 rounded-lg py-1.5 text-sm font-medium"
  }, "Eliminar")))));
}

/* ---------------- Tab nav ---------------- */
function TabNav({
  tab,
  setTab
}) {
  const tabs = [{
    id: "comunicacion",
    label: "Comunicación",
    icon: MessageCircle
  }, {
    id: "rutinas",
    label: "Rutinas",
    icon: Calendar
  }, {
    id: "regulacion",
    label: "Regulación",
    icon: Wind
  }, {
    id: "seguimiento",
    label: "Seguimiento",
    icon: ClipboardList
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "max-w-3xl mx-auto px-4 mt-4"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-1.5 grid grid-cols-4 gap-1"
  }, tabs.map(t => {
    const Icon = t.icon;
    const active = tab === t.id;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setTab(t.id),
      style: {
        background: active ? COLORS.primary : "transparent",
        color: active ? "#fff" : COLORS.textMuted
      },
      className: "flex flex-col items-center gap-1 rounded-xl py-2.5 text-xs font-medium"
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 18
    }), t.label);
  })));
}

/* ---------------- Comunicación ---------------- */
function ComunicacionTab({
  data,
  onSave
}) {
  const [phrase, setPhrase] = useState([]);
  const level = data.level;
  const categories = LEVEL_CATEGORIES[level];
  const [addingCustom, setAddingCustom] = useState(false);
  const handleTap = picto => {
    if (level === 1) {
      speak(picto.label);
      return;
    }
    setPhrase(prev => [...prev, picto]);
  };
  const speakPhrase = () => {
    if (phrase.length === 0) return;
    speak(phrase.map(p => p.label).join(" "));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, level > 1 && /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-3 sticky top-[68px] z-[5]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "min-h-[40px] flex flex-wrap items-center gap-2 mb-2"
  }, phrase.length === 0 ? /*#__PURE__*/React.createElement("span", {
    className: "text-sm",
    style: {
      color: COLORS.textMuted
    }
  }, "Toca los pictogramas para armar una frase…") : phrase.map((p, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      background: COLORS.bg
    },
    className: "rounded-lg px-2 py-1 text-sm flex items-center gap-1"
  }, p.emoji, " ", p.label))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: speakPhrase,
    style: {
      background: COLORS.primary,
      color: "#fff"
    },
    className: "flex-1 rounded-xl py-2 font-medium flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Volume2, {
    size: 18
  }), " Hablar"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPhrase([]),
    style: {
      borderColor: COLORS.border
    },
    className: "border rounded-xl px-4"
  }, "Borrar"))), categories.map(cat => {
    const items = [...PICTOGRAMS[cat]];
    const custom = data.customPictos.filter(c => c.category === cat);
    return /*#__PURE__*/React.createElement("section", {
      key: cat
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-sm font-semibold mb-2",
      style: {
        color: COLORS.textMuted
      }
    }, cat), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 sm:grid-cols-4 gap-2"
    }, [...items, ...custom].map((p, i) => {
      const isCustom = !!p.id;
      return /*#__PURE__*/React.createElement("div", {
        key: cat + i,
        className: "relative"
      }, /*#__PURE__*/React.createElement("button", {
        onClick: () => handleTap(p),
        style: {
          background: COLORS.surface,
          borderColor: COLORS.border
        },
        className: "w-full border rounded-2xl py-4 flex flex-col items-center gap-1 active:scale-95 transition-transform"
      }, p.image ? /*#__PURE__*/React.createElement("img", {
        src: p.image,
        alt: p.label,
        className: "w-11 h-11 object-cover rounded-xl"
      }) : /*#__PURE__*/React.createElement(PictoVisual, {
        word: p.label,
        emoji: p.emoji,
        useIllustrations: data.useIllustrations !== false,
        sizeClass: "w-11 h-11"
      }), /*#__PURE__*/React.createElement("span", {
        className: "text-xs font-medium text-center leading-tight"
      }, p.label)), isCustom && /*#__PURE__*/React.createElement("button", {
        onClick: e => {
          e.stopPropagation();
          onSave({
            ...data,
            customPictos: data.customPictos.filter(c => c.id !== p.id)
          });
        },
        "aria-label": "Eliminar pictograma",
        style: {
          background: COLORS.surface,
          borderColor: COLORS.border,
          color: COLORS.danger
        },
        className: "absolute -top-2 -right-2 w-6 h-6 rounded-full border flex items-center justify-center"
      }, /*#__PURE__*/React.createElement(X, {
        size: 12
      })));
    })));
  }), level === 3 && /*#__PURE__*/React.createElement("button", {
    onClick: () => setAddingCustom(true),
    style: {
      borderColor: COLORS.border,
      color: COLORS.textMuted
    },
    className: "w-full border border-dashed rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-medium"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Añadir pictograma personalizado"), addingCustom && /*#__PURE__*/React.createElement(AddCustomPictoModal, {
    categories: categories,
    onCancel: () => setAddingCustom(false),
    onAdd: picto => {
      onSave({
        ...data,
        customPictos: [...data.customPictos, {
          ...picto,
          id: uid()
        }]
      });
      setAddingCustom(false);
    }
  }));
}
function AddCustomPictoModal({
  categories,
  onCancel,
  onAdd
}) {
  const [label, setLabel] = useState("");
  const [emoji, setEmoji] = useState("⭐");
  const [category, setCategory] = useState(categories[0]);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const handleFile = async e => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-20 flex items-end sm:items-center justify-center",
    style: {
      background: "rgba(46,51,47,0.35)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.surface
    },
    className: "w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6 max-h-[85vh] overflow-y-auto"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold mb-4"
  }, "Nuevo pictograma"), /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-1"
  }, "Palabra"), /*#__PURE__*/React.createElement("input", {
    value: label,
    onChange: e => setLabel(e.target.value),
    style: {
      borderColor: COLORS.border
    },
    className: "w-full border rounded-xl px-3 py-2 mb-3"
  }), /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-2"
  }, "Foto (opcional)"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-1"
  }, photo ? /*#__PURE__*/React.createElement("img", {
    src: photo,
    alt: "Vista previa",
    style: {
      borderColor: COLORS.border
    },
    className: "w-16 h-16 object-cover rounded-xl border"
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.bg,
      borderColor: COLORS.border
    },
    className: "w-16 h-16 rounded-xl border flex items-center justify-center text-2xl"
  }, emoji), /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      borderColor: COLORS.border
    },
    className: "border rounded-xl px-3 py-2 text-sm font-medium inline-block cursor-pointer"
  }, photo ? "Cambiar foto" : "Subir foto", /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*",
    onChange: handleFile,
    className: "hidden"
  })), photo && /*#__PURE__*/React.createElement("button", {
    onClick: () => setPhoto(null),
    className: "block text-xs mt-1",
    style: {
      color: COLORS.textMuted
    }
  }, "Quitar foto y usar emoji"))), error && /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-2",
    style: {
      color: COLORS.danger
    }
  }, error), /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-3",
    style: {
      color: COLORS.textMuted
    }
  }, "Ej. una foto de mamá, o de su comida favorita. Si subís una foto, se usa en vez del emoji."), !photo && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-1"
  }, "Emoji"), /*#__PURE__*/React.createElement("input", {
    value: emoji,
    onChange: e => setEmoji(e.target.value),
    style: {
      borderColor: COLORS.border
    },
    className: "w-full border rounded-xl px-3 py-2 mb-3"
  })), /*#__PURE__*/React.createElement("label", {
    className: "block text-sm font-medium mb-1"
  }, "Categoría"), /*#__PURE__*/React.createElement("select", {
    value: category,
    onChange: e => setCategory(e.target.value),
    style: {
      borderColor: COLORS.border
    },
    className: "w-full border rounded-xl px-3 py-2 mb-5"
  }, categories.map(c => /*#__PURE__*/React.createElement("option", {
    key: c,
    value: c
  }, c))), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      borderColor: COLORS.border
    },
    className: "flex-1 border rounded-xl py-2 font-medium"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    disabled: !label.trim(),
    onClick: () => onAdd({
      label: label.trim(),
      emoji,
      category,
      image: photo
    }),
    style: {
      background: !label.trim() ? COLORS.border : COLORS.primary,
      color: "#fff"
    },
    className: "flex-1 rounded-xl py-2 font-medium"
  }, "Añadir"))));
}

/* ---------------- Rutinas ---------------- */
function RutinasTab({
  data,
  onSave
}) {
  const routineNames = Object.keys(data.routines);
  const [active, setActive] = useState(routineNames[0]);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [newEmoji, setNewEmoji] = useState("⭐");
  const steps = data.routines[active] || [];
  const doneMap = data.routineDone[active] || {};
  const toggleDone = idx => {
    const nextDone = {
      ...doneMap,
      [idx]: !doneMap[idx]
    };
    onSave({
      ...data,
      routineDone: {
        ...data.routineDone,
        [active]: nextDone
      }
    });
  };
  const resetDay = () => {
    onSave({
      ...data,
      routineDone: {
        ...data.routineDone,
        [active]: {}
      }
    });
  };
  const removeStep = idx => {
    const nextSteps = steps.filter((_, i) => i !== idx);
    onSave({
      ...data,
      routines: {
        ...data.routines,
        [active]: nextSteps
      }
    });
  };
  const moveStep = (idx, dir) => {
    const target = idx + dir;
    if (target < 0 || target >= steps.length) return;
    const next = [...steps];
    [next[idx], next[target]] = [next[target], next[idx]];
    onSave({
      ...data,
      routines: {
        ...data.routines,
        [active]: next
      }
    });
  };
  const addStep = () => {
    if (!newText.trim()) return;
    onSave({
      ...data,
      routines: {
        ...data.routines,
        [active]: [...steps, {
          text: newText.trim(),
          emoji: newEmoji
        }]
      }
    });
    setNewText("");
    setNewEmoji("⭐");
    setAdding(false);
  };
  const doneCount = Object.values(doneMap).filter(Boolean).length;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, routineNames.map(r => /*#__PURE__*/React.createElement("button", {
    key: r,
    onClick: () => setActive(r),
    style: {
      background: active === r ? COLORS.secondary : COLORS.surface,
      color: active === r ? "#fff" : COLORS.text,
      borderColor: COLORS.border
    },
    className: "border flex-1 rounded-xl py-2 text-sm font-medium"
  }, r))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-3 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-medium",
    style: {
      color: COLORS.textMuted
    }
  }, doneCount, " de ", steps.length, " completado", steps.length !== 1 ? "s" : ""), /*#__PURE__*/React.createElement("button", {
    onClick: resetDay,
    className: "text-sm font-medium",
    style: {
      color: COLORS.secondary
    }
  }, "Reiniciar día")), /*#__PURE__*/React.createElement("ol", {
    className: "space-y-2"
  }, steps.map((s, idx) => {
    const done = !!doneMap[idx];
    return /*#__PURE__*/React.createElement("li", {
      key: idx,
      style: {
        background: COLORS.surface,
        borderColor: COLORS.border
      },
      className: "border rounded-2xl p-3 flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => toggleDone(idx),
      style: {
        background: done ? COLORS.primary : COLORS.bg,
        borderColor: COLORS.border
      },
      className: "w-10 h-10 shrink-0 rounded-full border flex items-center justify-center",
      "aria-label": done ? "Marcar como pendiente" : "Marcar como hecho"
    }, done ? /*#__PURE__*/React.createElement(Check, {
      size: 18,
      color: "#fff"
    }) : /*#__PURE__*/React.createElement(PictoVisual, {
      word: s.text,
      emoji: s.emoji,
      useIllustrations: data.useIllustrations !== false,
      sizeClass: "w-6 h-6"
    })), /*#__PURE__*/React.createElement("span", {
      className: `flex-1 font-medium ${done ? "line-through" : ""}`,
      style: {
        color: done ? COLORS.textMuted : COLORS.text
      }
    }, s.text), /*#__PURE__*/React.createElement("button", {
      onClick: () => moveStep(idx, -1),
      "aria-label": "Subir",
      style: {
        color: COLORS.textMuted
      }
    }, /*#__PURE__*/React.createElement(ChevronUp, {
      size: 18
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => moveStep(idx, 1),
      "aria-label": "Bajar",
      style: {
        color: COLORS.textMuted
      }
    }, /*#__PURE__*/React.createElement(ChevronDown, {
      size: 18
    })), /*#__PURE__*/React.createElement("button", {
      onClick: () => removeStep(idx),
      "aria-label": "Eliminar paso",
      style: {
        color: COLORS.danger
      }
    }, /*#__PURE__*/React.createElement(Trash2, {
      size: 16
    })));
  })), !adding ? /*#__PURE__*/React.createElement("button", {
    onClick: () => setAdding(true),
    style: {
      borderColor: COLORS.border,
      color: COLORS.textMuted
    },
    className: "w-full border border-dashed rounded-2xl py-3 flex items-center justify-center gap-2 text-sm font-medium"
  }, /*#__PURE__*/React.createElement(Plus, {
    size: 16
  }), " Añadir paso a ", active) : /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-3 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    value: newEmoji,
    onChange: e => setNewEmoji(e.target.value),
    style: {
      borderColor: COLORS.border
    },
    className: "w-16 border rounded-xl px-2 py-2 text-center"
  }), /*#__PURE__*/React.createElement("input", {
    value: newText,
    onChange: e => setNewText(e.target.value),
    placeholder: "Nombre del paso",
    style: {
      borderColor: COLORS.border
    },
    className: "flex-1 border rounded-xl px-3 py-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setAdding(false),
    style: {
      borderColor: COLORS.border
    },
    className: "flex-1 border rounded-xl py-2 text-sm font-medium"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    onClick: addStep,
    style: {
      background: COLORS.primary,
      color: "#fff"
    },
    className: "flex-1 rounded-xl py-2 text-sm font-medium"
  }, "Guardar"))));
}
const INTENSITY_LEVELS = [{
  value: 1,
  label: "Poco",
  dots: 1
}, {
  value: 2,
  label: "Medio",
  dots: 2
}, {
  value: 3,
  label: "Mucho",
  dots: 3
}];

/* ---------------- Regulación ---------------- */
function RegulacionTab({
  data,
  onSave
}) {
  const [breathing, setBreathing] = useState(false);
  const [phase, setPhase] = useState("Inhala");
  const [pace, setPace] = useState(4);
  const timerRef = useRef(null);
  const [triedToday, setTriedToday] = useState({});
  const [pendingEmotion, setPendingEmotion] = useState(null);
  useEffect(() => {
    if (!breathing) {
      clearInterval(timerRef.current);
      return;
    }
    setPhase("Inhala");
    let current = "Inhala";
    timerRef.current = setInterval(() => {
      current = current === "Inhala" ? "Exhala" : "Inhala";
      setPhase(current);
    }, pace * 1000);
    return () => clearInterval(timerRef.current);
  }, [breathing, pace]);
  const toggleTried = i => setTriedToday(prev => ({
    ...prev,
    [i]: !prev[i]
  }));
  const saveEmotion = (emo, intensity) => {
    const entry = {
      id: uid(),
      date: new Date().toISOString(),
      emotion: emo.label,
      emoji: emo.emoji,
      intensity,
      note: ""
    };
    onSave({
      ...data,
      checkins: [entry, ...data.checkins].slice(0, 200)
    });
    setPendingEmotion(null);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold mb-3",
    style: {
      color: COLORS.textMuted
    }
  }, "¿Cómo te sientes ahora?"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-2"
  }, CHECKIN_EMOTIONS.map(e => /*#__PURE__*/React.createElement("button", {
    key: e.label,
    onClick: () => setPendingEmotion(e),
    style: {
      background: COLORS.bg
    },
    className: "rounded-xl py-3 flex flex-col items-center gap-1 active:scale-95 transition-transform"
  }, /*#__PURE__*/React.createElement(PictoVisual, {
    word: e.label,
    emoji: e.emoji,
    useIllustrations: data.useIllustrations !== false,
    sizeClass: "w-9 h-9"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-medium"
  }, e.label))))), pendingEmotion && /*#__PURE__*/React.createElement(IntensityModal, {
    emotion: pendingEmotion,
    useIllustrations: data.useIllustrations !== false,
    onCancel: () => setPendingEmotion(null),
    onConfirm: intensity => saveEmotion(pendingEmotion, intensity)
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-6 flex flex-col items-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold mb-4 self-start",
    style: {
      color: COLORS.textMuted
    }
  }, "Ejercicio de respiración"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 160,
      height: 160,
      borderRadius: "9999px",
      background: `radial-gradient(circle at 35% 30%, ${COLORS.primary}, ${COLORS.primaryDark})`,
      transform: breathing ? phase === "Inhala" ? "scale(1.15)" : "scale(0.85)" : "scale(1)",
      transition: `transform ${pace}s ease-in-out`
    },
    className: "flex items-center justify-center mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-white font-semibold text-lg"
  }, breathing ? phase : "Listo")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs",
    style: {
      color: COLORS.textMuted
    }
  }, "Ritmo"), [3, 4, 6].map(s => /*#__PURE__*/React.createElement("button", {
    key: s,
    onClick: () => setPace(s),
    style: {
      background: pace === s ? COLORS.secondary : COLORS.bg,
      color: pace === s ? "#fff" : COLORS.text
    },
    className: "rounded-full w-9 h-9 text-xs font-medium"
  }, s, "s"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setBreathing(b => !b),
    style: {
      background: breathing ? COLORS.danger : COLORS.primary,
      color: "#fff"
    },
    className: "rounded-xl px-6 py-2.5 font-medium"
  }, breathing ? "Detener" : "Comenzar")), /*#__PURE__*/React.createElement("section", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold mb-3",
    style: {
      color: COLORS.textMuted
    }
  }, "Herramientas sensoriales"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, SENSORY_STRATEGIES.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => toggleTried(i),
    style: {
      background: triedToday[i] ? "#EEF3EF" : COLORS.bg
    },
    className: "w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-left"
  }, /*#__PURE__*/React.createElement(PictoVisual, {
    word: s.text,
    emoji: s.emoji,
    useIllustrations: data.useIllustrations !== false,
    sizeClass: "w-7 h-7"
  }), /*#__PURE__*/React.createElement("span", {
    className: "flex-1 text-sm font-medium"
  }, s.text), triedToday[i] && /*#__PURE__*/React.createElement(Check, {
    size: 16,
    style: {
      color: COLORS.primary
    }
  }))))));
}
function IntensityModal({
  emotion,
  useIllustrations,
  onCancel,
  onConfirm
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-20 flex items-end sm:items-center justify-center",
    style: {
      background: "rgba(46,51,47,0.35)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: COLORS.surface
    },
    className: "w-full sm:max-w-sm rounded-t-3xl sm:rounded-3xl p-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-1"
  }, /*#__PURE__*/React.createElement(PictoVisual, {
    word: emotion.label,
    emoji: emotion.emoji,
    useIllustrations: useIllustrations,
    sizeClass: "w-9 h-9"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-semibold"
  }, emotion.label)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm mb-5",
    style: {
      color: COLORS.textMuted
    }
  }, "¿Con qué intensidad lo sientes?"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mb-4"
  }, INTENSITY_LEVELS.map(lvl => /*#__PURE__*/React.createElement("button", {
    key: lvl.value,
    onClick: () => onConfirm(lvl.value),
    style: {
      background: COLORS.bg,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl py-4 flex flex-col items-center gap-2 active:scale-95 transition-transform"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex gap-1"
  }, Array.from({
    length: 3
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 8,
      height: 8,
      borderRadius: "9999px",
      background: i < lvl.dots ? COLORS.secondary : COLORS.border
    }
  }))), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-medium"
  }, lvl.label)))), /*#__PURE__*/React.createElement("button", {
    onClick: onCancel,
    style: {
      borderColor: COLORS.border
    },
    className: "w-full border rounded-xl py-2 text-sm font-medium"
  }, "Cancelar")));
}

/* ---------------- Seguimiento ---------------- */
function SeguimientoTab({
  data,
  onSave,
  profileName
}) {
  const [newNote, setNewNote] = useState("");
  const addNote = () => {
    if (!newNote.trim()) return;
    const entry = {
      id: uid(),
      date: new Date().toISOString(),
      text: newNote.trim()
    };
    onSave({
      ...data,
      notes: [entry, ...data.notes]
    });
    setNewNote("");
  };
  const removeNote = id => onSave({
    ...data,
    notes: data.notes.filter(n => n.id !== id)
  });
  const removeCheckin = id => onSave({
    ...data,
    checkins: data.checkins.filter(c => c.id !== id)
  });
  const counts = {};
  const intensitySums = {};
  data.checkins.forEach(c => {
    counts[c.emotion] = (counts[c.emotion] || 0) + 1;
    intensitySums[c.emotion] = (intensitySums[c.emotion] || 0) + (c.intensity || 2);
  });
  const maxCount = Math.max(1, ...Object.values(counts));
  const IntensityDots = ({
    level
  }) => /*#__PURE__*/React.createElement("span", {
    className: "inline-flex gap-0.5 align-middle"
  }, Array.from({
    length: 3
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 6,
      height: 6,
      borderRadius: "9999px",
      background: i < (level || 0) ? COLORS.secondary : COLORS.border,
      display: "inline-block"
    }
  })));
  const fmtDate = iso => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short"
    }) + " · " + d.toLocaleTimeString("es-ES", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold mb-3",
    style: {
      color: COLORS.textMuted
    }
  }, "Resumen emocional de ", profileName), Object.keys(counts).length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: COLORS.textMuted
    }
  }, "Aún no hay registros. Usa la pestaña Regulación para registrar el estado de ánimo.") : /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, Object.entries(counts).map(([label, count]) => {
    const emoji = CHECKIN_EMOTIONS.find(e => e.label === label)?.emoji || "🙂";
    const avgIntensity = Math.round(intensitySums[label] / count);
    return /*#__PURE__*/React.createElement("div", {
      key: label,
      className: "flex items-center gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-24 text-sm shrink-0"
    }, emoji, " ", label), /*#__PURE__*/React.createElement("div", {
      style: {
        background: COLORS.bg
      },
      className: "flex-1 rounded-full h-3 overflow-hidden"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: `${count / maxCount * 100}%`,
        background: COLORS.secondary
      },
      className: "h-full rounded-full"
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-xs w-5 text-right",
      style: {
        color: COLORS.textMuted
      }
    }, count), /*#__PURE__*/React.createElement(IntensityDots, {
      level: avgIntensity
    }));
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold mb-3",
    style: {
      color: COLORS.textMuted
    }
  }, "Notas para terapia / familia"), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2 mb-4"
  }, /*#__PURE__*/React.createElement("input", {
    value: newNote,
    onChange: e => setNewNote(e.target.value),
    placeholder: "Escribe una observación…",
    style: {
      borderColor: COLORS.border
    },
    className: "flex-1 border rounded-xl px-3 py-2",
    onKeyDown: e => e.key === "Enter" && addNote()
  }), /*#__PURE__*/React.createElement("button", {
    onClick: addNote,
    style: {
      background: COLORS.primary,
      color: "#fff"
    },
    className: "rounded-xl px-4 font-medium"
  }, "Añadir")), data.notes.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: COLORS.textMuted
    }
  }, "No hay notas todavía.") : /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2"
  }, data.notes.map(n => /*#__PURE__*/React.createElement("li", {
    key: n.id,
    style: {
      background: COLORS.bg
    },
    className: "rounded-xl p-3 flex items-start gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs mb-1",
    style: {
      color: COLORS.textMuted
    }
  }, fmtDate(n.date)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm"
  }, n.text)), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeNote(n.id),
    "aria-label": "Eliminar nota"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 15,
    style: {
      color: COLORS.danger
    }
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: COLORS.surface,
      borderColor: COLORS.border
    },
    className: "border rounded-2xl p-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-semibold mb-3",
    style: {
      color: COLORS.textMuted
    }
  }, "Historial de registros"), data.checkins.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "text-sm",
    style: {
      color: COLORS.textMuted
    }
  }, "Sin registros aún.") : /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 max-h-72 overflow-y-auto"
  }, data.checkins.map(c => /*#__PURE__*/React.createElement("li", {
    key: c.id,
    className: "flex items-center gap-2 text-sm"
  }, /*#__PURE__*/React.createElement(PictoVisual, {
    word: c.emotion,
    emoji: c.emoji,
    useIllustrations: data.useIllustrations !== false,
    sizeClass: "w-5 h-5"
  }), /*#__PURE__*/React.createElement("span", {
    className: "flex-1"
  }, c.emotion), /*#__PURE__*/React.createElement(IntensityDots, {
    level: c.intensity
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: COLORS.textMuted
    },
    className: "text-xs"
  }, fmtDate(c.date)), /*#__PURE__*/React.createElement("button", {
    onClick: () => removeCheckin(c.id),
    "aria-label": "Eliminar registro"
  }, /*#__PURE__*/React.createElement(Trash2, {
    size: 14,
    style: {
      color: COLORS.danger
    }
  })))))));
}
const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl).render(/*#__PURE__*/React.createElement(App, null));
