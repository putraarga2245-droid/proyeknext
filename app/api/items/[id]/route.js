import dbConnect from '@/app/lib/mongodb';
import Item from '@/app/models/Item';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const { id } = params;
    await Item.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: 'Data berhasil dihapus' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}