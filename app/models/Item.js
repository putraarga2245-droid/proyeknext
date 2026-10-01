import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama wajib diisi'],
  },
  keterangan: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.models.Item || mongoose.model('Item', ItemSchema);