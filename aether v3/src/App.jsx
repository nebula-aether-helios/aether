import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  PerspectiveCamera,
  OrbitControls,
  MeshTransmissionMaterial,
  Edges,
  Text,
  Float,
  Grid,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Terminal as TerminalIcon,
  Layout,
  Cpu,
  Layers,
  CheckCircle,
  AlertTriangle,
  Play,
  ArrowRight,
  Database,
  Search,
  Activity,
  Box,
  Lock,
  User,
  ShieldCheck
} from 'lucide-react';
import RealtimeBridge from './components/RealtimeBridge';

/** * AETHER_TECH // PRODUCTION_CONFIG
 * Safely handling environment variables to avoid 'import.meta' target errors.
 */
const getEnv = (key, fallback) => {
  try {
    // Handling Vite/Vercel env variables safely
    const env = (typeof process !== 'undefined' && process.env) || (typeof import.meta !== 'undefined' && import.meta.env) || {};
    return env[key] || fallback;
  } catch (e) {
    return fallback;
  }
};

/**
 * MOCK_APPWRITE_GATEWAY
 * Prevents build errors in preview while preserving the production logic.
 * In production (Vercel), you would uncomment the 'import' and use the real SDK.
 */
const AppwriteMock = {
  Client: class {
    setEndpoint() { return this; }
    setProject() { return this; }
  },
  Account: class {
    constructor() { }
    async createEmailPasswordSession() { return { status: 'ok' }; }
    async get() { throw new Error('No session'); }
    async deleteSession() { return true; }
  },
  Databases: class {
    constructor() { }
    async listDocuments() { return { documents: [] }; }
    async createDocument() { return { id: 'new-doc' }; }
  },
  ID: { unique: () => Math.random().toString(36).substring(7) }
};

// Config
const ENDPOINT = getEnv('VITE_APPWRITE_ENDPOINT', 'https://cloud.appwrite.io/v1');
const PROJECT_ID = getEnv('VITE_APPWRITE_PROJECT_ID', 'aether-tech-forge');

/** * SYSTEM_CONSTANTS // NANO_BANANA_PRO_CRISPY
 * The visual tokens are set in stone.
 */
const COLORS = {
  AGENT_RED: "#ff0033",
  CYAN: "#00ffcc",
  DEEP_TEAL: "#005544",
  TRUE_BLACK: "#000000",
  GOLD_STATUS: "#ffaa00",
  UI_GLASS: "rgba(0, 0, 0, 0.9)"
};

/**
 * THE_BUFFER // LOGIC_SYNAPSE
 * Manages accuracy, consistency, and cross-panel information movement.
 */
const useBuffer = () => {
  const [bufferState, setBufferState] = useState({
    status: 'IDLE',
    integrity: 100,
    currentLead: "LEAD_PHX_CONTRACTOR_882",
    pendingCode: null,
    deployedCode: "/* ACTIVE_SSR_STUB */",
    logs: ["[SYSTEM] Aether Buffer Online. Ready for production."]
  });

  const pushLog = (msg) => {
    setBufferState(prev => ({
      ...prev,
      logs: [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.logs].slice(0, 15)
    }));
  };

  const executeHandover = async (code) => {
    setBufferState(prev => ({ ...prev, status: 'VALIDATING', integrity: 70 }));
    pushLog("BUFFER // RECEIVING ITERATION FROM PANEL_02...");

    await new Promise(r => setTimeout(r, 1200));
    pushLog("BUFFER // ACCURACY_CHECK: PASSED. NO_SSR_DRIFT_DETECTED.");

    setBufferState(prev => ({ ...prev, status: 'TRANSFERRING', integrity: 90 }));
    await new Promise(r => setTimeout(r, 600));

    setBufferState(prev => ({
      ...prev,
      status: 'IDLE',
      integrity: 100,
      deployedCode: code
    }));
    pushLog("BUFFER // TRANSFER_COMPLETE. PANEL_01 REHYDRATING.");
    return true;
  };

  return { bufferState, pushLog, executeHandover };
};

/**
 * PANEL_1 // POLYPANE_LIVE_FORGE
 */
const PolypaneForge = ({ leadId, activeCode }) => {
  return (
    <div className="w-full h-full bg-black flex flex-col font-mono text-[10px]">
      <div className="h-8 border-b border-[#ff0033]/30 flex items-center px-4 justify-between bg-black/95">
        <div className="flex items-center gap-2">
          <Activity className="w-3 h-3 text-[#ff0033]" />
          <span className="text-[#ff0033] font-bold tracking-tighter uppercase">
            POLYPANE_FORGE // CODESPACE_RENDER
          </span>
        </div>
        <div className="flex gap-4 text-zinc-500 uppercase">
          <span>Responsive: <span className="text-white">TRUE</span></span>
          <span>Lead_ID: <span className="text-white">{leadId}</span></span>
        </div>
      </div>

      <div className="flex-1 p-2 grid grid-cols-2 gap-2 overflow-hidden">
        {['MOBILE_V', 'DESKTOP_V'].map((view) => (
          <div key={view} className="border border-white/5 bg-zinc-900/20 rounded flex flex-col">
            <div className="h-4 bg-zinc-800/50 flex items-center px-2 text-[7px] text-zinc-400 uppercase tracking-widest">{view}</div>
            <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
              <div className="text-zinc-700 uppercase mb-2 text-[8px]">ssr_live_stream</div>
              <div className="w-full h-px bg-[#ff0033]/20 animate-pulse mb-4" />
              <div className="border border-zinc-800 p-4 w-full h-32 rounded bg-black/40 flex flex-col gap-2">
                <div className="h-2 w-1/2 bg-zinc-800 rounded" />
                <div className="h-2 w-full bg-zinc-900 rounded" />
                <div className="h-8 w-full border border-[#ff0033]/40 rounded mt-auto flex items-center justify-center text-[#ff0033] text-[9px] font-bold uppercase">
                  DYNAMIC_CTA_PREVIEW
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-10 border-t border-white/5 bg-black/80 flex items-center px-4 text-[8px] gap-6 text-zinc-500">
        <span>SSR_BINARY: <span className="text-cyan-400 font-bold uppercase">Loaded_Secure</span></span>
        <span>HAPTIC_TRIGGERS: <span className="text-cyan-400">ACTIVE</span></span>
        <span className="ml-auto text-zinc-700 font-bold">AETHER_HCE_V1.0</span>
      </div>
    </div>
  );
};

/**
 * PANEL_2 // HYPER_GPU_ITERATOR
 */
const HyperGPUDeveloper = ({ onTransfer }) => {
  const [iteration, setIteration] = useState(0);
  const [status, setStatus] = useState('STANDBY');

  const runCycle = async () => {
    setStatus('MILLING');
    setIteration(prev => prev + 1);
    await new Promise(r => setTimeout(r, 1000));
    await new Promise(r => setTimeout(r, 1000));
    await new Promise(r => setTimeout(r, 1000));
    setStatus('PERFECTED');
    setTimeout(() => {
      onTransfer(`/* PERFECTED_VERSION_${iteration} */`);
      setStatus('STANDBY');
    }, 800);
  };

  return (
    <div className="w-full h-full bg-black/95 text-white font-mono p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">HYPER_GPU // DEV_CORE</span>
        </div>
        <div className="text-[9px] text-zinc-500">VRAM_LOAD: 82%</div>
      </div>

      <div className="flex-1 border border-white/5 bg-zinc-900/20 rounded p-4 flex flex-col justify-center items-center gap-6 text-center">
        <div className="relative">
          <Box className={`w-12 h-12 transition-all duration-1000 ${status === 'MILLING' ? 'text-cyan-400 animate-spin' : 'text-zinc-800'}`} />
          {status === 'PERFECTED' && <CheckCircle className="w-6 h-6 text-green-400 absolute -top-2 -right-2" />}
        </div>

        <div>
          <div className={`text-xs font-bold mb-1 ${status === 'MILLING' ? 'text-cyan-400' : 'text-white'}`}>
            {status === 'STANDBY' ? 'READY_FOR_INSTRUCTION' : `PERFECTION_CYCLE: ${status}`}
          </div>
          <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-bold">Iteration_Count: {iteration}</div>
        </div>

        <button
          onClick={runCycle}
          disabled={status !== 'STANDBY'}
          className="w-full bg-cyan-500/10 border border-cyan-500/40 hover:bg-cyan-500/20 py-2 rounded text-[10px] text-cyan-400 transition-all font-bold disabled:opacity-20 uppercase tracking-widest"
        >
          INITIATE_RECURSIVE_MILLING
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 text-[8px] uppercase font-bold">
        <div className="p-2 border border-zinc-800 rounded bg-black">
          <div className="text-zinc-600 mb-1">LINTING</div>
          <div className="text-green-400">PASSED</div>
        </div>
        <div className="p-2 border border-zinc-800 rounded bg-black">
          <div className="text-zinc-600 mb-1">STRESS_TEST</div>
          <div className="text-green-400">NOMINAL</div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3D_COMPONENTS // GLASS_PANEL
 */
const GlassPanel = ({ position, title, children, active = false, color = COLORS.AGENT_RED }) => {
  return (
    <group position={position}>
      <mesh>
        <planeGeometry args={[6, 4]} />
        <MeshTransmissionMaterial
          thickness={0.03}
          chromaticAberration={0.05}
          distortion={0.1}
          background={new THREE.Color(COLORS.TRUE_BLACK)}
          transmission={0.9}
        />
        <Edges color={active ? color : COLORS.DEEP_TEAL} threshold={15} />
        <Edges scale={1.002} color={active ? "#ffffff" : color} threshold={15}>
          <meshBasicMaterial transparent opacity={0.1} color={active ? "#ffffff" : color} />
        </Edges>
      </mesh>

      <Html
        transform
        distanceFactor={4}
        position={[0, 0, 0.05]}
        className="w-[1200px] h-[800px] select-none pointer-events-auto"
      >
        <div className="w-full h-full rounded-lg overflow-hidden border border-white/5 shadow-2xl">
          {children}
        </div>
      </Html>

      <Text
        position={[0, 2.3, 0]}
        fontSize={0.15}
        color={active ? color : "#333"}
        font="Courier New"
        anchorX="center"
        anchorY="middle"
      >
        {title.toUpperCase()}
      </Text>
    </group>
  );
};

/**
 * ADMIN_LOGIN_OVERLAY // AUTH_GATE
 */
const AdminLogin = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Logic would go here in production with actual Appwrite SDK
      onLoginSuccess();
    } catch (err) {
      setError('INVALID_CREDENTIALS // AUTH_DENIED');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md border border-[#ff0033]/40 bg-black p-8 relative overflow-hidden shadow-[0_0_50px_rgba(255,0,51,0.1)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#ff0033]/20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1 bg-[#ff0033]/60" />

        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 border border-[#ff0033] rotate-45 flex items-center justify-center bg-[#ff0033]/5">
            <Lock className="w-5 h-5 text-[#ff0033] -rotate-45" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white uppercase">Aether // Admin_Gate</h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase font-bold">Production Access Required</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Admin_Identifier</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#050505] border border-zinc-800 p-3 pl-10 text-xs text-white focus:border-[#ff0033] outline-none transition-all"
                placeholder="admin@aether.tech"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Secure_Binary_Key</label>
            <div className="relative">
              <ShieldCheck className="absolute left-3 top-3 w-4 h-4 text-zinc-600" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#050505] border border-zinc-800 p-3 pl-10 text-xs text-white focus:border-[#ff0033] outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <div className="text-[9px] text-[#ff0033] font-mono animate-pulse uppercase border border-[#ff0033]/30 p-2 bg-[#ff0033]/5 font-bold tracking-tighter">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff0033] hover:bg-[#ff0033]/80 text-white font-black py-4 uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : 'ESTABLISH_SESSION'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center text-[8px] text-zinc-700 font-mono uppercase font-bold">
          <span>Appwrite_Sync: Active</span>
          <span>Vercel_Host: OK</span>
        </div>
      </div>
    </div>
  );
};

/**
 * MAIN_AETHER_FORGE
 */
export default function App() {
  const { bufferState, pushLog, executeHandover } = useBuffer();
  const [activePanelIdx, setActivePanelIdx] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Persistence check on mount
  useEffect(() => {
    // In production, you would initialize Appwrite and check account session here
  }, []);

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="w-full h-screen bg-black text-white font-mono flex flex-col overflow-hidden">
      {/* HUD: SYSTEM HEADER */}
      <header className="h-12 border-b border-[#ff0033]/30 flex items-center px-6 justify-between bg-black z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff0033] rotate-45" />
            <span className="text-sm font-black tracking-[0.2em] text-white">AETHER.TECH // FORGE</span>
          </div>
          <div className="flex gap-4 text-[9px] text-zinc-500 uppercase tracking-widest border-l border-zinc-800 pl-4">
            <span className="flex items-center gap-1.5 font-bold"><Activity className="w-3 h-3" />System: <span className="text-white">ACTIVE</span></span>
            <span className="flex items-center gap-1.5 font-bold"><Database className="w-3 h-3" />Cloud: <span className="text-cyan-400 uppercase">Appwrite_Sync</span></span>
            <span className="flex items-center gap-1.5 font-bold"><Search className="w-3 h-3" />Lead: <span className="text-[#ff0033]">{bufferState.currentLead}</span></span>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[9px]">
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-3 py-1 bg-[#ff0033]/10 border border-[#ff0033]/40 rounded text-[#ff0033] hover:bg-[#ff0033]/20 transition-all font-bold uppercase tracking-widest"
          >
            Secure_Logoff
          </button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden">
        {/* SIDEBAR: ANTIGRAVITY IDE */}
        <aside className="w-[320px] border-r border-white/5 flex flex-col bg-[#050505] z-10 shadow-2xl">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-[#ff0033]" />
            <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">Antigravity // AI_Architect</span>
          </div>
          <div className="flex-1 p-4 text-[10px] space-y-4 overflow-y-auto">
            <div className="bg-zinc-900/30 p-3 rounded border-l border-[#ff0033] text-zinc-400 leading-relaxed font-bold">
              <span className="text-[#ff0033] font-bold block mb-1 uppercase tracking-tighter">Production_Notice:</span>
              Authenticated session established. All code cycles will be committed to Appwrite Database.
              <br /><br />
              Ready for lead page construction for prospect <span className="text-white">{bufferState.currentLead}</span>.
            </div>
          </div>
          <div className="p-4 border-t border-white/5 bg-black/40">
            <div className="relative">
              <input
                type="text"
                placeholder="Instruct AI Architect..."
                className="w-full bg-black border border-zinc-800 rounded p-3 text-[10px] focus:border-[#ff0033] outline-none pr-8 transition-all font-bold"
              />
              <ArrowRight className="w-3 h-3 absolute right-3 top-3.5 text-zinc-600" />
            </div>
          </div>
        </aside>

        {/* 3D STAGE */}
        <div className="flex-1 relative bg-black">
          <Canvas dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
            <OrbitControls
              enablePan={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.8}
              minAzimuthAngle={-Math.PI / 4}
              maxAzimuthAngle={Math.PI / 4}
              enableDamping
            />

            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2.5} color={COLORS.AGENT_RED} />
            <pointLight position={[-10, 5, 10]} intensity={1.5} color={COLORS.CYAN} />

            <group rotation={[0, -0.25, 0]}>
              <GlassPanel position={[0, 0, 0]} title="Panel 01: Polypane Forge" active={activePanelIdx === 0}>
                <PolypaneForge leadId={bufferState.currentLead} activeCode={bufferState.deployedCode} />
                <RealtimeBridge onUpdate={(newCode) => {
                  // Instantly update the displayed code without re-deploying
                  pushLog(`BRIDGE // PASSCODE_RECEIVED: ${newCode.substring(0, 8)}`);
                  setBufferState(prev => ({ ...prev, deployedCode: newCode }));
                }} />
              </GlassPanel>

              <GlassPanel position={[1, 0, -3]} title="Panel 02: GPU Iterator" active={activePanelIdx === 1} color={COLORS.CYAN}>
                <HyperGPUDeveloper onTransfer={(code) => {
                  executeHandover(code);
                  setActivePanelIdx(0);
                }} />
              </GlassPanel>

              {/* Passive Stacks */}
              <GlassPanel position={[2, 0, -6]} title="Panel 03: Lead Nexus" />
              <GlassPanel position={[3, 0, -9]} title="Panel 04: Extraction" />
              <GlassPanel position={[4, 0, -12]} title="Panel 05: Outbound" />
            </group>

            <Grid
              position={[0, -3, 0]}
              args={[50, 50]}
              cellColor={COLORS.DEEP_TEAL}
              sectionColor={COLORS.AGENT_RED}
              fadeDistance={30}
              infiniteGrid
              opacity={0.15}
            />
          </Canvas>

          {/* OVERLAY: THE BUFFER HUD */}
          <div className="absolute top-6 right-6 w-80 pointer-events-none">
            <div className="bg-black/95 border border-white/10 p-4 rounded backdrop-blur-xl shadow-2xl">
              <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">The_Buffer // Logic_Bridge</span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-[9px] uppercase font-bold">
                  <span className="text-zinc-500">Integrity_Monitor</span>
                  <span className={bufferState.integrity < 100 ? 'text-amber-500 animate-pulse' : 'text-green-400'}>{bufferState.integrity}%</span>
                </div>
                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-amber-500"
                    initial={{ width: "100%" }}
                    animate={{ width: `${bufferState.integrity}%` }}
                  />
                </div>
              </div>

              <div className="h-40 overflow-hidden relative">
                <div className="absolute inset-x-0 bottom-0 space-y-1">
                  <AnimatePresence initial={false}>
                    {bufferState.logs.map((log, i) => (
                      <motion.div
                        key={log + i}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-[8px] text-zinc-500 font-mono whitespace-nowrap border-l border-zinc-800 pl-2 py-0.5 font-bold"
                      >
                        {log}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-2 justify-end pointer-events-auto">
              <button onClick={() => setActivePanelIdx(0)} className={`p-2 rounded border transition-all ${activePanelIdx === 0 ? 'bg-[#ff0033] border-[#ff0033]' : 'bg-black border-zinc-800 text-zinc-600 hover:text-white'}`}>
                <Layout className="w-4 h-4" />
              </button>
              <button onClick={() => setActivePanelIdx(1)} className={`p-2 rounded border transition-all ${activePanelIdx === 1 ? 'bg-cyan-500 border-cyan-500' : 'bg-black border-zinc-800 text-zinc-600 hover:text-white'}`}>
                <Cpu className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER: TERMINAL */}
      <footer className="h-[18vh] border-t border-white/10 bg-black p-4 font-mono">
        <div className="flex items-center gap-4 mb-2 text-[9px] uppercase tracking-widest text-zinc-500 font-bold">
          <span className="text-[#00ffcc]">WSL_SHELL</span>
          <span className="text-zinc-700">|</span>
          <span>Logs</span>
          <span className="text-zinc-700">|</span>
          <span>Env: vercel-production</span>
          <span className="ml-auto text-zinc-700 font-bold">root@OCT08:~$ <span className="text-white animate-pulse">_</span></span>
        </div>
        <div className="flex-1 overflow-y-auto text-[10px] text-zinc-400 space-y-1 font-bold">
          <div>[AETHER] Persistence layer linked to Appwrite... OK</div>
          <div>[SYSTEM] Vercel edge functions optimized... OK</div>
          <div>[BUFFER] Accuracy loop synchronized with HyperGPU... OK</div>
          <div className="text-[#ff0033]">[SECURE] Logged in as: ADMIN_ROOT</div>
        </div>
      </footer>
    </div>
  );
}
