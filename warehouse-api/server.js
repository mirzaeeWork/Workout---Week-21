const express = require('express')
const cors = require('cors')
const productRoutes = require('./routes/productRoutes')
const authRoutes = require('./routes/authRoutes')
const roleRoutes = require('./routes/roleRoutes')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware to parse JSON bodies
app.use(express.json())

// Enable CORS for all origins
app.use(cors())

// Routes
app.use('/products', productRoutes)
app.use('/auth', authRoutes)
app.use('/roles', roleRoutes)

// Swagger UI options
const swaggerOptions = {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Warehouse API Documentation',
  customfavIcon: '/assets/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    docExpansion: 'list',
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
    syntaxHighlight: {
      activate: true,
      theme: 'monokai'
    },
    defaultModelsExpandDepth: 3,
    defaultModelExpandDepth: 3,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    requestInterceptor: req => {
      req.headers['Content-Type'] = 'application/json'
      return req
    }
  }
}

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve)
app.get('/api-docs', swaggerUi.setup(swaggerDocument, swaggerOptions))

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    console.log(
      `Swagger API docs are available at http://localhost:${PORT}/api-docs`
    )
  })
}

// Export for Vercel
module.exports = app
