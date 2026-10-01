'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [items, setItems] = useState([]);
  const [nama, setNama] = useState('');
  const [keterangan, setKeterangan] = useState('');

  // Ambil data saat halaman dibuka
  const fetchItems = async () => {
    try {
      const res = await fetch('/api/items');
      const json = await res.json();
      if (json.success) setItems(json.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Fungsi tombol "Simpan" untuk memasukkan data ke MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nama) return alert('Nama harus diisi!');

    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama, keterangan }),
      });
      const json = await res.json();
      if (json.success) {
        setNama('');
        setKeterangan('');
        fetchItems(); // Otomatis refresh daftar data
      } else {
        alert('Gagal menyimpan data');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fungsi tombol "Hapus"
  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;

    try {
      const res = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      const json = await res.json();
      if (json.success) {
        fetchItems(); // Otomatis refresh daftar data
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto' }}>
      <h2>Form Input MongoDB Atlas</h2>

      {/* Form dan Tombol Simpan */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Masukkan Nama..."
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          style={{ padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Masukkan Keterangan..."
          value={keterangan}
          onChange={(e) => setKeterangan(e.target.value)}
          style={{ padding: '8px' }}
        />
        <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Simpan ke Database
        </button>
      </form>

      <hr />

      {/* Daftar Data yang Masuk dari MongoDB */}
      <h3>Data dari MongoDB Atlas:</h3>
      <ul>
        {items.length === 0 ? (
          <p>Belum ada data tersimpan.</p>
        ) : (
          items.map((item) => (
            <li key={item._id} style={{ marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f4f4f4', padding: '8px' }}>
              <span><b>{item.nama}</b> ({item.keterangan})</span>
              <button 
                onClick={() => handleDelete(item._id)} 
                style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Hapus
              </button>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}