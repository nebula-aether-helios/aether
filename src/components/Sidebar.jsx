// Cycle: 23 - AI Execution Agency
import React, { useState, useEffect, useRef } from 'react';
import { TerminalIcon, PaperAirplaneIcon, PlusCircleIcon, MentionIcon } from '@primer/octicons-react';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';

const AntigravitySidebar = ({ onAIResponse, onExecuteSystem }) => {
    const [messages, setMessages] = useState([
        { id: 'init-1', type: 'system', text: '[IDE_AI]: System partition mounting...' },
        { id: 'init-2', type: 'system', text: '[IDE_AI]: WSL_ENV detected. Protocols active.' },
        { id: 'init-3', type: 'user', text: 'Status check.' },
        { id: 'init-4', type: 'system', text: '[IDE_AI]: Station 8.1 Active. Kernel link expanded.' },
    ]);
    const [inputValue, setInputValue] = useState('');
    const endRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const text = inputValue.trim();
        const newMessage = { id: uuidv4(), type: 'user', text };
        setMessages(prev => [...prev, newMessage]);
        setInputValue('');

        // Cycle 23: AI Agency Logic
        setTimeout(() => {
            let aiText = `[IDE_AI]: Processing query...`;
            let systemCmd = null;

            if (text.toLowerCase().includes('mail')) {
                aiText = `[IDE_AI]: Scanning outbound bridge. Surfacing panel 3.`;
                systemCmd = 'focus 3';
            } else if (text.toLowerCase().includes('system') || text.toLowerCase().includes('status')) {
                aiText = `[IDE_AI]: Kernel healthy. Monitoring partition 1.`;
                systemCmd = 'focus 1';
            } else if (text.toLowerCase().includes('focus')) {
                const id = text.match(/\d+/);
                if (id) {
                    aiText = `[IDE_AI]: Shifting focus to partition ${id[0]}.`;
                    systemCmd = `focus ${id[0]}`;
                }
            } else {
                aiText = `[IDE_AI]: Command "${text}" logged. No immediate system shift required.`;
            }

            setMessages(prev => [...prev, { id: uuidv4(), type: 'system', text: aiText }]);

            // Execute across bridges
            if (onAIResponse) onAIResponse(aiText);
            if (systemCmd && onExecuteSystem) onExecuteSystem(systemCmd);
        }, 800);
    };

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="octo-glass" style={{
            gridArea: 'sidebar',
            display: 'flex',
            flexDirection: 'column',
            borderRight: '1px solid rgba(255,255,255,0.05)',
            position: 'relative',
            zIndex: 20
        }}>
            <div style={{
                padding: '20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
            }}>
                <div style={{ color: '#ff0033' }}><TerminalIcon size={16} /></div>
                <span style={{ fontSize: '13px', letterSpacing: '2px', fontWeight: 600, color: '#fff' }}>
                    ANTIGRAVITY // IDE_AI
                </span>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '90%',
                                fontSize: '11px',
                                lineHeight: '1.6',
                                fontFamily: msg.type === 'system' ? 'var(--font-term)' : 'var(--font-main)',
                                color: msg.type === 'system' ? '#aaa' : '#fff',
                                background: msg.type === 'user' ? 'rgba(255,0,51,0.08)' : 'transparent',
                                padding: msg.type === 'user' ? '10px 14px' : '0',
                                borderRadius: '2px',
                                borderLeft: msg.type === 'system' ? '2px solid #ff0033' : 'none',
                                paddingLeft: msg.type === 'system' ? '12px' : '14px'
                            }}
                        >
                            {msg.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={endRef} />
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Query IDE_AI..."
                        style={{
                            width: '100%',
                            background: 'rgba(5,5,5,0.9)',
                            border: '1px solid rgba(255,0,51,0.3)',
                            borderRadius: '2px',
                            padding: '14px 12px',
                            color: 'white',
                            fontSize: '11px',
                            outline: 'none'
                        }}
                    />
                    <button type="submit" style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#ff0033',
                        cursor: 'pointer',
                        opacity: 0.8
                    }}>
                        <PaperAirplaneIcon size={14} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AntigravitySidebar;
