const { Router } = require('express')
const router = Router()
const User = require('../models/user')
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post(
   '/registration',
   [ // midleware
      check('email', 'Некорректный email').isEmail(),
      check('password', 'Некорректный password').isLength({min: 6})
   ],
   async(req, res) => {
      try {
         const errors = validationResult(req)
         if(!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Не корректные данные при регистрации, убедитесь что длинна пароля не мение 6 символов'
            })
         }

         const { email, password } = req.body

         const isUsed = await User.findOne({email})

         if(isUsed) {
            return res.status(400).json({message: 'Пользователь с таким email уже существует!'})
         }

         const hashPassword = await bcrypt.hash(password, 12)

         const user = new User({
            email,
            password: hashPassword
         })

         await user.save()

         res.status(201).json({message: 'Пользователь создан!'})

      } catch (error) {
         res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
})

router.post(
   '/login',
   [
      check('email', 'Некорректный login или email').normalizeEmail().isEmail(),
      check('password', 'Некорректный login или email').exists()
   ],
   async(req, res) => {
      try {
         const errors = validationResult(req)
         if(!errors.isEmpty()) {
            return res.status(400).json({
               errors: errors.array(),
               message: 'Не корректные данные при регистрации'
            })
         }

         const { email, password } = req.body

         const user = await User.findOne({email})

         if(!user) {
            return res.status(400).json({message: 'Пользователя с таким именем не найдено!'})
         }

         const isMatch = await bcrypt.compare(password, user.password)

         if(!isMatch) {
            return res.status(400).json({message: 'Совпадений не найдено!'})
         }

         const token = jwt.sign(
            {userId: user.id},
            process.env.jwtSecret,
            {expiresIn: '1h'}
         )

         res.json({token, userId: user.id, email})

      } catch (error) {
         console.log('authRouts: ', error.message)
   }
})

module.exports = router