const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'src')));

// MongoDB Connection
// Note: Special characters in password need to be URL encoded
// @ symbol = %40
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Admin:Osmania%401304@cluster0.cqams.mongodb.net/ouce-fest?appName=Cluster0&retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ MongoDB Error:', err));

// Registration Schema
const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    event: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        default: '100'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    ipAddress: String,
    userAgent: String
});

const Registration = mongoose.model('Registration', registrationSchema);

// Routes

/**
 * POST /api/register - Save new registration
 */
app.post('/api/register', async (req, res) => {
    try {
        const { name, event, amount, timestamp, paymentStatus } = req.body;

        // Validation
        if (!name || !event) {
            return res.status(400).json({
                success: false,
                error: 'Name and event are required'
            });
        }

        const registration = new Registration({
            name,
            event,
            amount,
            paymentStatus: paymentStatus || 'pending',
            timestamp: timestamp || new Date(),
            ipAddress: req.ip,
            userAgent: req.get('user-agent')
        });

        await registration.save();

        console.log(`✅ Registration saved: ${name} - ${event}`);

        res.json({
            success: true,
            message: 'Registration saved successfully',
            id: registration._id,
            data: registration
        });
    } catch (error) {
        console.error('❌ Error saving registration:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/registrations - Get all registrations (Admin)
 */
app.get('/api/registrations', async (req, res) => {
    try {
        const registrations = await Registration.find()
            .sort({ timestamp: -1 });

        res.json({
            success: true,
            count: registrations.length,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/registrations/:event - Get registrations by event
 */
app.get('/api/registrations/:event', async (req, res) => {
    try {
        const registrations = await Registration.find({
            event: req.params.event
        }).sort({ timestamp: -1 });

        res.json({
            success: true,
            count: registrations.length,
            event: req.params.event,
            data: registrations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * GET /api/stats - Get registration statistics
 */
app.get('/api/stats', async (req, res) => {
    try {
        const total = await Registration.countDocuments();
        const byEvent = await Registration.aggregate([
            {
                $group: {
                    _id: '$event',
                    count: { $sum: 1 }
                }
            }
        ]);

        const byStatus = await Registration.aggregate([
            {
                $group: {
                    _id: '$paymentStatus',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            success: true,
            total,
            byEvent,
            byStatus
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * DELETE /api/registrations/:id - Delete registration (Admin)
 */
app.delete('/api/registrations/:id', async (req, res) => {
    try {
        const registration = await Registration.findByIdAndDelete(req.params.id);
        
        if (!registration) {
            return res.status(404).json({
                success: false,
                error: 'Registration not found'
            });
        }

        res.json({
            success: true,
            message: 'Registration deleted'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: err.message
    });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════╗
║   🎉 OUCE FEST Server Running          ║
║   Port: ${PORT}                          
║   MongoDB: ${MONGO_URI}
║   Environment: ${process.env.NODE_ENV || 'development'}
╚════════════════════════════════════════╝
    `);
});