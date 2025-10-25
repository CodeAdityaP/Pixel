import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  Productname: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    default: 'New'
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'gaming'
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 100
  }
}, {
  timestamps: true
});

// Index for better query performance
productSchema.index({ id: 1 });
productSchema.index({ Productname: 'text', description: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ tags: 1 });

// Virtual for product summary
productSchema.virtual('summary').get(function() {
  return {
    id: this.id,
    name: this.Productname,
    price: this.price,
    image: this.image,
    tags: this.tags,
    inStock: this.inStock
  };
});

// Method to check if product is available
productSchema.methods.isAvailable = function() {
  return this.inStock && this.stockQuantity > 0;
};

// Method to reduce stock
productSchema.methods.reduceStock = function(quantity = 1) {
  if (this.stockQuantity >= quantity) {
    this.stockQuantity -= quantity;
    if (this.stockQuantity === 0) {
      this.inStock = false;
    }
    return this.save();
  }
  throw new Error('Insufficient stock');
};

// Method to add stock
productSchema.methods.addStock = function(quantity = 1) {
  this.stockQuantity += quantity;
  if (this.stockQuantity > 0) {
    this.inStock = true;
  }
  return this.save();
};

// Transform JSON output
productSchema.methods.toJSON = function() {
  const productObject = this.toObject();
  productObject.id = productObject._id;
  delete productObject._id;
  delete productObject.__v;
  return productObject;
};

const Product = mongoose.model('Product', productSchema);

export default Product;
