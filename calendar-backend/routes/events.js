/*
    HOST + /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/fieldsValidators");
const { validarJWT } = require("../middlewares/validarJWT");
const router = Router();

router.use(validarJWT);

router.get("/", getEvents);
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  createEvent
);
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de finalizacion es obligatoria").custom(isDate),
    validarCampos,
  ],
  updateEvent
);
router.delete("/:id", deleteEvent);

module.exports = router;
