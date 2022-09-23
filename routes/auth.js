const { Router } = require("express");
const { isBuffer } = require("lodash");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

const router = Router();

// @desc Auth with GOogle
// @route GET /auth/google
router.get(
  "/google",
  ensureGuest,
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// @desc Google auth callback
// @route GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// @desc Logout User
// @route /auth/logout
router.get("/logout", ensureAuth, (req, res) => {
  req.logout(req.user, (err) => {
    if (err) return err;
    res.redirect("/");
  });
});

module.exports = router;
