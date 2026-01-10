import React, { useEffect, useState } from 'react';

/**
 * Aether Forge - Polypage Realtime Bridge (V2 - Stabilized)
 * Configures Panel 1 to listen for "Passcode" updates from the Appwrite Buffer.
 * Uses Global Appwrite SDK via CDN to resolve build-time dependency errors.
 * Ensures 'runfor.me' stays instantly live with the latest iteration.
 */

// Helper to safely access environment variables in ES2015+
const getEnv = (key) => {
    try {
        // Fallback chain for different build environments
        return window?.process?.env?.[key] || window?.[key] || "";
    } catch (e) {
        return "";
    }
};

const APPWRITE_ENDPOINT = 'https://cloud.appwrite.io/v1';
const PROJECT_ID = getEnv('VITE_APPWRITE_PROJECT_ID');
const DATABASE_ID = 'aether-forge-db';
const COLLECTION_ID = 'polypage-buffer';
const DOCUMENT_ID = 'current-passcode';

const RealtimeBridge = ({ onUpdate }) => {
    const [status, setStatus] = useState('Initializing Bridge...');
    const [sdkReady, setSdkReady] = useState(false);

    useEffect(() => {
        // 1. Inject Appwrite SDK via CDN to solve "Could not resolve appwrite" error
        if (!window.Appwrite) {
            const script = document.createElement('script');
            script.src = "https://cdn.jsdelivr.net/npm/appwrite@14.0.0";
            script.async = true;
            script.onload = () => setSdkReady(true);
            document.body.appendChild(script);
        } else {
            setSdkReady(true);
        }
    }, []);

    useEffect(() => {
        if (!sdkReady || !window.Appwrite) return;

        const { Client, Databases } = window.Appwrite;
        const client = new Client()
            .setEndpoint(APPWRITE_ENDPOINT)
            .setProject(PROJECT_ID);

        const databases = new Databases(client);

        // 2. Initial Fetch (Sync state on load)
        const fetchInitialState = async () => {
            try {
                const doc = await databases.getDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID);
                if (onUpdate) onUpdate(doc.passcode);
                setStatus('Active: Syncing with Panel 2');
            } catch (error) {
                console.error('Buffer Fetch Failed:', error);
                setStatus('Ready: Awaiting first iteration');
            }
        };

        fetchInitialState();

        // 3. Realtime Subscription (The WebSocket Hook)
        const unsubscribe = client.subscribe(
            `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents.${DOCUMENT_ID}`,
            (response) => {
                // Check for update events specifically
                if (response.events.some(e => e.includes('.update'))) {
                    const newPasscode = response.payload.passcode;
                    console.log('🚀 New Passcode Received:', newPasscode);

                    if (onUpdate) onUpdate(newPasscode);
                    setStatus(`Sync Success: Applied ${newPasscode.substring(0, 8)}`);
                }
            }
        );

        return () => unsubscribe();
    }, [sdkReady, onUpdate]);

    return (
        <div className="fixed bottom-6 right-6 p-4 bg-zinc-950/90 border border-emerald-500/40 rounded-xl shadow-2xl backdrop-blur-md z-[9999]">
            <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.includes('Active') ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${status.includes('Active') ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-emerald-500 mb-0.5">
                        Aether Forge Bridge
                    </span>
                    <span className="text-[11px] font-mono text-zinc-300 leading-none">
                        {status}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RealtimeBridge;
