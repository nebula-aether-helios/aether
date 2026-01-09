// Cycle: 79 - Boot Message Styling
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const HistoryItem = React.memo(({ item }) => {
    const isBoot = item.text && item.text.startsWith('[BOOT]');
    const color = isBoot ? '#ffaa00' : (item.isOutput ? '#888' : (item.kernel === 'PS' ? '#3b82f6' : '#00ffcc'));
    const glow = isBoot ? 'rgba(255, 170, 0, 0.3)' : (item.kernel === 'PS' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(0, 255, 204, 0.4)');

    return (
        <div style={{
            marginBottom: '4px',
            color: color,
            whiteSpace: 'pre-wrap',
            textShadow: item.isOutput && !isBoot ? 'none' : `0 0 5px ${glow}`,
            fontSize: '11px',
            fontWeight: isBoot ? '600' : 'normal'
        }}>
            <span style={{ opacity: 0.5, marginRight: '8px' }}>[{item.kernel}]</span>
            {item.text}
        </div>
    );
});

const Terminal = ({ onCommand, externalLogs = [] }) => {
    const [activeTab, setActiveTab] = useState('WSL');
    const [tabs, setTabs] = useState({
        WSL: { history: [{ id: 'init-wsl', text: 'WSL 2.0 [Ubuntu] Ready.', isOutput: true, kernel: 'WSL' }], path: '~' },
        PS: { history: [{ id: 'init-ps', text: 'Windows PowerShell v7.3.1', isOutput: true, kernel: 'PS' }], path: 'C:\\Users\\root' },
        AI: { history: [{ id: 'init-ai', text: 'AI_DEBUG_LEVEL: PRODUCTION', isOutput: true, kernel: 'AI' }], path: 'KERNEL' }
    });
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    // Sync external logs to AI tab
    useEffect(() => {
        if (externalLogs.length > 0) {
            setTabs(prev => {
                const newLogs = externalLogs
                    .filter(log => !prev.AI.history.some(p => p.id === log.id))
                    .map(log => ({ ...log, kernel: 'AI' }));
                if (newLogs.length === 0) return prev;
                return {
                    ...prev,
                    AI: { ...prev.AI, history: [...prev.AI.history, ...newLogs] }
                };
            });
        }
    }, [externalLogs]);

    const handleCommand = (cmd) => {
        if (!cmd.trim()) return;
        const args = cmd.trim().split(/\s+/);
        const main = args[0].toLowerCase();
        let response = null;
        let newPath = tabs[activeTab].path;

        if (onCommand) onCommand(cmd);

        // WSL Kernel Logic
        if (activeTab === 'WSL') {
            switch (main) {
                case 'help': response = 'ls, cd, pwd, clear, status, focus, mail, ping'; break;
                case 'cd':
                    newPath = args[1] === '..' ? '~' : `~/${args[1] || ''}`.replace('//', '/');
                    break;
                case 'ls': response = '.config  .agent_logs  workspace'; break;
                case 'pwd': response = `/root/${newPath.replace('~', '')}`; break;
                case 'clear':
                    setTabs(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], history: [] } }));
                    return;
                default: response = `bash: ${main}: command not found`;
            }
        }
        // PowerShell Kernel Logic (Cycle 28)
        else if (activeTab === 'PS') {
            switch (main) {
                case 'get-service': response = 'Status   Name               DisplayName\n------   ----               -----------\nRunning  AgentEngine        Agent Dynamic Runtime'; break;
                case 'ls': case 'dir': response = '    Directory: ' + newPath + '\n\nMode                 LastWriteTime         Length Name\n----                 -------------         ------ ----\nd-----         2026-01-09  01:00                .agent'; break;
                case 'clear':
                    setTabs(prev => ({ ...prev, [activeTab]: { ...prev[activeTab], history: [] } }));
                    return;
                default: response = `'${main}' is not recognized as a cmdlet.`;
            }
        }

        setTabs(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                path: newPath,
                history: [
                    ...prev[activeTab].history,
                    { id: uuidv4(), text: `${activeTab === 'WSL' ? 'root@OCTO8:' : 'PS '}${newPath}${activeTab === 'WSL' ? '$' : '>'} ${cmd}`, kernel: activeTab },
                    ...(response ? [{ id: uuidv4(), text: response, isOutput: true, kernel: activeTab }] : [])
                ]
            }
        }));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
        }
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [tabs[activeTab].history]);

    return (
        <div className="octo-glass glow-terminal-cyan" style={{
            gridArea: 'terminals',
            background: '#010101',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'var(--font-term)',
            padding: '0',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 10
        }}>
            <div className="scanline-overlay" />

            {/* Cycle 26: Tabs */}
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(0,255,204,0.1)' }}>
                {Object.keys(tabs).map(tab => (
                    <div
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '8px 16px',
                            fontSize: '10px',
                            cursor: 'pointer',
                            color: activeTab === tab ? (tab === 'PS' ? '#3b82f6' : '#00ffcc') : '#444',
                            background: activeTab === tab ? 'rgba(0,255,204,0.05)' : 'transparent',
                            borderRight: '1px solid rgba(255,255,255,0.05)',
                            borderBottom: activeTab === tab ? `1px solid ${tab === 'PS' ? '#3b82f6' : '#00ffcc'}` : 'none'
                        }}
                    >
                        {tab}_SHELL
                    </div>
                ))}
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
                {tabs[activeTab].history.map(item => (
                    <HistoryItem key={item.id} item={item} />
                ))}
                <div ref={bottomRef} />
            </div>

            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderTop: '1px solid rgba(0, 255, 204, 0.1)',
                padding: '10px 12px',
                fontSize: '11px'
            }}>
                <span style={{
                    color: activeTab === 'PS' ? '#3b82f6' : '#00ffcc',
                    textShadow: `0 0 5px ${activeTab === 'PS' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(0, 255, 204, 0.4)'}`,
                    fontWeight: 'bold'
                }}>
                    {activeTab === 'WSL' ? `root@OCTO8:${tabs[activeTab].path}$` : (activeTab === 'PS' ? `PS ${tabs[activeTab].path}>` : `[AI_KERNEL]>`)}
                </span>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    spellCheck={false}
                    autoComplete="off"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#fff',
                        flex: 1,
                        fontFamily: 'inherit',
                        fontSize: 'inherit',
                        caretColor: activeTab === 'PS' ? '#3b82f6' : '#00ffcc',
                        outline: 'none'
                    }}
                />
            </div>
        </div>
    );
};

export default Terminal;
