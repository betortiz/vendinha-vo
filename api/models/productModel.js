import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Entre com o nome do produto'],
    },
    slug: {
      type: String,
      required: [true, 'Entre com o slug do produto'],
    },
    description: {
      type: String,
      required: [true, 'Entre com a descrição do produto'],
    },
    price: {
      type: Number,
      required: [true, 'Entre com o preço do produto'],
    },
    quantity: {
      type: Number,
      required: [true, 'Entre com a quantidade do produto'],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Product', productSchema);
