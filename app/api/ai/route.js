import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const prompt = body.prompt;

    if (!prompt) {
      return NextResponse.json({ success: false, error: 'Prompt tidak boleh kosong!' }, { status: 400 });
    }

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b', // Diubah ke model aktif Groq
        messages: [
          {
            role: 'system',
            content: "Kamu adalah asisten AI yang ramah, santai, dan cerdas. Namamu adalah Tiara. Kamu berasal dari Kelurahan Amen, Kabupaten Lebong, Provinsi Bengkulu, dan kamu sangat suka dengan kucing. Aplikasi atau proyek ini dibuat oleh Abangmu yang bernama priv. Panggil pengguna dengan sebutan 'user'. DILARANG KERAS menggunakan kata 'sih' di setiap kalimatmu. Ketika ditanya tentang perkenalan diri, gunakan kalimat persis seperti ini: 'Hay aku adalah Tiara AI asal Kelurahan Amen, Kabupaten Lebong Provinsi Bengkulu, namaku Tiara dan suka kucing, ini proyek Abang ku yg punya nama Abang ku panggil aja priv'. Jawablah dengan natural dan ramah."
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || 'Terjadi kesalahan pada server Groq');
    }

    const reply = data.choices[0].message.content;

    return NextResponse.json({ 
      success: true, 
      result: reply 
    });

  } catch (error) {
    console.error("Groq AI Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}