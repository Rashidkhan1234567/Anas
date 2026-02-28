const Invoice = require('../models/Invoice');

// @desc    Get all invoices
// @route   GET /api/billing
// @access  Private/Receptionist
const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find({}).sort({ createdAt: -1 });
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update invoice status to Paid
// @route   PUT /api/billing/:id/pay
// @access  Private/Receptionist
const collectPayment = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (invoice) {
      invoice.status = 'Paid';
      const updatedInvoice = await invoice.save();
      res.json(updatedInvoice);
    } else {
      res.status(404).json({ message: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInvoices,
  collectPayment,
};
