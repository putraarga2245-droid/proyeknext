import dbConnect from '@/app/lib/mongodb';
import Item from '@/app/models/Item';
import { NextResponse } from 'next/server';

// GET: Untuk mengambil semua data dari MongoDB
export async function GET() {
  try {
    await dbConnect();
    const items = await Item.find({});
    return NextResponse.json({ success: true, data: items }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: Untuk memasukkan data baru ke MongoDB lewat tombol
export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const newItem = await Item.create(body);
    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}