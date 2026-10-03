'use client';

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hay aku adalah Tiara AI asal Kelurahan Amen, Kabupaten Lebong Provinsi Bengkulu, namaku Tiara dan suka kucing, ini proyek Abang ku yg punya nama Abang ku panggil aja priv 🐾' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.result }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'Maaf Abang, ada kendala teknis: ' + data.error }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Gagal terhubung ke server 🐾' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col h-[100dvh] bg-pink-50 text-gray-800">
      {/* Header */}
      <header className="bg-pink-400 text-white p-4 shadow-md flex items-center justify-between shrink-0">
        <h1 className="text-lg font-bold flex items-center gap-2">
          <span>🐾</span> Tiara AI
        </h1>
        <span className="text-xs bg-pink-500 px-2 py-1 rounded-full">Online</span>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                msg.role === 'user'
                  ? 'bg-pink-500 text-white rounded-br-none'
                  : 'bg-white text-gray-700 border border-pink-200 rounded-bl-none'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white text-pink-400 p-3 rounded-2xl text-sm border border-pink-200 animate-pulse">
              Tiara sedang mengetik... 🐾
            </div>
          </div>
        )}
      </div>

      {/* Input Form - Diberi padding bawah ekstra agar aman di layar HP */}
      <form onSubmit={sendMessage} className="p-3 bg-white border-t border-pink-200 flex gap-2 shrink-0 pb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan ke Tiara..."
          className="flex-1 border border-pink-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-pink-500 bg-pink-50/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-pink-400 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-pink-500 transition disabled:opacity-50 shadow-sm"
        >
          Kirim
        </button>
      </form>
    </main>
  );
}