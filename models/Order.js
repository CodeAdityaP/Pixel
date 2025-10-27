import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  orderNumber: {
    type: String,
    required: true
  },
  items: [{
    productId: {
      type: String,
      required: true
    },
    productName: {
      type: String,
      required: true
    },
    productImage: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  shippingAddress: {
    name: {
      type: String,
      required: [true, 'Shipping name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Shipping email is required'],
      lowercase: true,
      trim: true
    },
    address: {
      type: String,
      required: [true, 'Shipping address is required'],
      trim: true
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    zipCode: {
      type: String,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    }
  },
  totalAmount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: 0
  },
  shippingCost: {
    type: Number,
    default: 0,
    min: 0
  },
  taxAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  discountAmount: {
    type: Number,
    default: 0,
    min: 0
  },
  paymentMethod: {
    type: String,
    enum: ['cash_on_delivery', 'credit_card', 'debit_card', 'paypal', 'stripe'],
    default: 'cash_on_delivery'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  trackingNumber: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  },
  deliveryDate: {
    type: Date
  },
  cancelledAt: {
    type: Date
  },
  cancellationReason: {
    type: String,
    maxlength: [200, 'Cancellation reason cannot exceed 200 characters']
  }
}, {
  timestamps: true
});

// Index for better query performance (only if indexes don't already exist)
if (!orderSchema.indexes().find(idx => idx[0].orderNumber)) {
  orderSchema.index({ orderNumber: 1 });
}
if (!orderSchema.indexes().find(idx => idx[0].user && idx[0].createdAt)) {
  orderSchema.index({ user: 1, createdAt: -1 });
}
if (!orderSchema.indexes().find(idx => idx[0].status)) {
  orderSchema.index({ status: 1 });
}
if (!orderSchema.indexes().find(idx => idx[0].paymentStatus)) {
  orderSchema.index({ paymentStatus: 1 });
}

// Pre-save middleware to generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    
    this.orderNumber = `ORD-${year}${month}${day}-${random}`;
  }
  next();
});

// Virtual for order summary
orderSchema.virtual('summary').get(function() {
  return {
    orderNumber: this.orderNumber,
    totalItems: this.items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: this.totalAmount,
    status: this.status,
    createdAt: this.createdAt
  };
});

// Method to calculate total items
orderSchema.methods.getTotalItems = function() {
  return this.items.reduce((sum, item) => sum + item.quantity, 0);
};

// Method to update status with timestamp
orderSchema.methods.updateStatus = function(newStatus, notes = '') {
  this.status = newStatus;
  this.notes = notes;
  
  if (newStatus === 'cancelled') {
    this.cancelledAt = new Date();
  }
  
  if (newStatus === 'delivered') {
    this.deliveryDate = new Date();
  }
  
  return this.save();
};

// Method to add tracking number
orderSchema.methods.addTracking = function(trackingNumber) {
  this.trackingNumber = trackingNumber;
  this.status = 'shipped';
  return this.save();
};

// Method to cancel order
orderSchema.methods.cancelOrder = function(reason = '') {
  this.status = 'cancelled';
  this.cancelledAt = new Date();
  this.cancellationReason = reason;
  return this.save();
};

// Static method to get order statistics
orderSchema.statics.getOrderStats = function(userId = null) {
  const match = userId ? { user: userId } : {};
  
  return this.aggregate([
    { $match: match },
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        totalAmount: { $sum: '$totalAmount' }
      }
    }
  ]);
};

// Static method to get recent orders
orderSchema.statics.getRecentOrders = function(limit = 10, userId = null) {
  const match = userId ? { user: userId } : {};
  
  return this.find(match)
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('user', 'name email');
};

// Transform JSON output
orderSchema.methods.toJSON = function() {
  const orderObject = this.toObject();
  orderObject.id = orderObject._id;
  delete orderObject._id;
  delete orderObject.__v;
  return orderObject;
};

const Order = mongoose.model('Order', orderSchema);

export default Order;
