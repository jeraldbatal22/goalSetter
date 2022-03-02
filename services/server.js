const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path')
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

// ROUTER
const goalRouter = require('./routes/goalRoutes');
const userRouter = require('./routes/userRoutes');
const { protect } = require('./middleware/authMiddleware');

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

app.use('/api', userRouter)
app.use('/api', protect, goalRouter)

// Server Frontend 

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server is started on port ${PORT}`)
  connectDB();
})