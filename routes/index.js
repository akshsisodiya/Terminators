const { Router } = require("express")
const { ensureAuth, ensureGuest } = require('../middleware/auth')
const router = Router()

// @desc LOGIN/Landing page
// @route GET /
router.get('/', ensureGuest,  (req, res)=>{
    res.render('login', {
        layout: 'login'
    })
})

// @desc Dashboard
// @route GET /
router.get('/dashboard', ensureAuth,  (req, res)=>{
    res.render('dashboard',{
        name: req.user.firstName,
    })
})



module.exports = router