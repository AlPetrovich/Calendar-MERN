/*
HOST + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/fieldsValidators");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  createUser
);

router.post(
  "/",
  [
    check("email", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña debe ser de 6 caracteres").isLength({
      min: 6,
    }),
    validarCampos,
  ],
  loginUser
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
