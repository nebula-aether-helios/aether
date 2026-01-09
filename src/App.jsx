// Cycle: 78 - Terminal Boot Sync
import React, { useState, useCallback, useRef, useEffect } from 'react';
import AntigravitySidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import Stage3D from './components/Stage3D';
import './index.css';

function App() {
  const [activePanel, setActivePanel] = useState(0);
  const [externalLogs, setExternalLogs] = useState([]);
  const terminalRef = useRef(null);

  const addTerminalLog = useCallback((text) => {
    setExternalLogs(prev => [...prev, { id: Date.now() + Math.random(), text, isOutput: true }]);
  }, []);

  // Cycle 78: Boot Phase Terminal Sync
  useEffect(() => {
    const bootMessages = [
      { delay: 200, msg: '[BOOT]: Kernel initialization...' },
      { delay: 800, msg: '[BOOT]: Mounting system partitions...' },
      { delay: 1600, msg: '[BOOT]: WSL_IRW detected. Protocols active.' },
      { delay: 2400, msg: '[BOOT]: Loading Ether layer...' },
      { delay: 3200, msg: '[BOOT]: Station 8.1 Active. Kernel link expanded.' },
      { delay: 4200, msg: '[BOOT]: Cinematic perspective locked.' },
      { delay: 5000, msg: '[BOOT]: System ready. OCTO8 OPERATIONAL.' }
    ];
    const timers = bootMessages.map(({ delay, msg }) =>
      setTimeout(() => addTerminalLog(msg), delay)
    );
    return () => timers.forEach(t => clearTimeout(t));
  }, [addTerminalLog]);

  const executeSystemAction = useCallback((cmd) => {
    // Shared execution logic
    if (cmd.startsWith('focus ')) {
      const id = parseInt(cmd.split(' ')[1]);
      if (!isNaN(id) && id >= 0 && id < 5) setActivePanel(id);
    }
  }, []);

  return (
    <>
      <AntigravitySidebar
        onAIResponse={(response) => addTerminalLog(`[IDE_AI_SYNC]: ${response}`)}
        onExecuteSystem={executeSystemAction}
      />
      <Stage3D activePanel={activePanel} />
      <Terminal
        externalLogs={externalLogs}
        onCommand={(cmd) => {
          // Terminal user input still drives the stage
          executeSystemAction(cmd);
          // Cycle 14 Legacy Bridge
          if (cmd.startsWith('mail')) setActivePanel(3);
          if (cmd.startsWith('top') || cmd.startsWith('df')) setActivePanel(1);
        }}
      />
    </>
  );
}

export default App;
