const { Router } = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const router = Router();

// @desc LOGIN/Landing page
// @route GET /
router.get("/", ensureGuest, (req, res) => {
  res.render("login", {
    layout: "login",
  });
});

// @desc Dashboard
// @route GET /
router.get("/dashboard", ensureAuth, (req, res) => {
  res.render("dashboard", {
    layout: "main",
    name: req.user.firstName,
  });
});

router.get('/orders',ensureAuth, (req,res)=>{
  res.render("orders",{
    layout:'main'
  })
})

router.get('/contact',ensureAuth, (req,res)=>{
  res.render("contact",{
    layout:'main'
  })
})

router.get('/feedback',ensureAuth, (req,res)=>{
  res.render("feedback",{
    layout:'main'
  })
})

router.get('/profile',ensureAuth, (req,res)=>{
  res.render("profile",{
    layout:'main'
  })
})
module.exports = router;
