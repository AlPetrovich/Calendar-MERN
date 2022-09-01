const { response } = require("express");
const Event = require("../models/Event");
const getEvents = async (req, res = response) => {
  const events = await Event.find().populate("user", "name");

  return res.json({
    ok: true,
    events,
  });
};

const createEvent = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const eventDb = await event.save();
    res.json({
      ok: true,
      event: eventDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador!",
    });
  }
};
const updateEvent = async (req, res = response) => {
  const eventID = req.params.id;
  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: `El evento ${eventID} no existe!`,
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: `No tiene autorizacion para actualizar el evento`,
      });
    }

    const newEvent = {
      ...req.body,
      user: req.uid,
    };

    const updatedEvent = await Event.findByIdAndUpdate(eventID, newEvent, {
      new: true,
    });
    res.json({
      ok: true,
      event: updatedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador!",
    });
  }
};
const deleteEvent = async (req, res = response) => {
  const eventID = req.params.id;
  try {
    const event = await Event.findById(eventID);
    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: `El evento ${eventID} no existe!`,
      });
    }

    if (event.user.toString() !== req.uid) {
      return res.status(401).json({
        ok: false,
        msg: `No tiene autorizacion para actualizar el evento`,
      });
    }

    await Event.findOneAndDelete(eventID);

    res.json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador!",
    });
  }
};
module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
