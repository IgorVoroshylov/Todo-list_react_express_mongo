const jwt = require('jsonwebtoken')

// middleware for todosRouts, который будет проверять по jwt авторизован ли пользователь, если да, то изыймать из него id
module.exports = (req, res, next) => {
   if(req.method === 'OPTIONS') return next()

   try {
      const token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.jwtSecret)

      req.user = decoded

      next()
   } catch (error) {
      res.status(400).json({message: 'Нет авторизации'})
   }
}