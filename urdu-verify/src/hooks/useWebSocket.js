import { useEffect, useRef, useCallback } from "react";
import { useStore } from "../store/useStore";

const WS_URL = import.meta.env.VITE_WS_URL || "ws://localhost:8000/ws";

export function useWebSocket() {
  const wsRef = useRef(null);
  const { setResult, setWsLog } = useStore();

  useEffect(() => {
    connect();
    return () => {
      if (wsRef.current) wsRef.current.close();
    };
    // eslint-disable-next-line
  }, []);

  const connect = () => {
    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => setWsLog("WebSocket connected to FastAPI", "ok");

      ws.onmessage = (e) => {
        try {
          const data = JSON.parse(e.data);
          if (data.type === "result") setResult(data.payload);
          if (data.type === "log") setWsLog(data.msg, data.level || "info");
        } catch {
          setWsLog(e.data, "info");
        }
      };

      ws.onerror = () => setWsLog("WebSocket error — using HTTP fallback", "warn");
      ws.onclose = () => {
        setWsLog("WebSocket disconnected — reconnecting in 5s", "warn");
        setTimeout(connect, 5000);
      };
    } catch {
      setWsLog("WebSocket unavailable — HTTP mode", "warn");
    }
  };

  const sendMessage = useCallback((payload) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  }, []);

  return { sendMessage };
}
