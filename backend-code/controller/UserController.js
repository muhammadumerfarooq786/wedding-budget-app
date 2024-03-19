import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import eventModel from "../models/eventModel.js";
import "colors";
import bcrypt from "bcrypt";
import guestModel from "../models/guestModel.js";
import budgetModel from "../models/budgetModel.js";
import contactModel from "../models/conatctModel.js";

export const userSingleEmail = asyncHandler(async (req, res) => {
  const allNews = await User.find({ _id: req.params.userid });
  if (allNews) {
    res.status(201).json(allNews);
  } else {
    throw new Error("Error While Getting Department");
  }
});

export const updateSingleGuest = asyncHandler(async (req, res) => {
  const _id = req.body.params.guestid;
  const name = req.body.params.name;
  const email = req.body.params.email;
  const phone = req.body.params.phone;
  const address = req.body.params.address;
  const seats = req.body.params.seats;

  const eventUpdate = await guestModel.findByIdAndUpdate(
    { _id: _id },
    {
      name: name,
      email: email,
      phone: phone,
      address: address,
      seats: seats,
    },
    function (err, docs) {
      if (err) {
        console.log("error");
      } else {
        console.log("success");
      }
    }
  );
  if (eventUpdate) {
    res.status(201).json(eventUpdate);
  } else {
    console.log("error");
    throw new Error("Error While Updating Event.");
  }
});

export const updateSingleEvent = asyncHandler(async (req, res) => {
  console.log(req.body.params);
  const userid = req.body.params.userid;
  const eventid = req.body.params.eventid;
  const title = req.body.params.title;
  const description = req.body.params.description;

  const eventUpdate = await eventModel.findByIdAndUpdate(
    { _id: eventid, userid: userid },
    {
      title: title,
      description: description,
    },
    function (err, docs) {
      if (err) {
        console.log("error");
      } else {
        console.log("success");
      }
    }
  );
  if (eventUpdate) {
    res.status(201).json(eventUpdate);
  } else {
    console.log("error");
    throw new Error("Error While Updating Event.");
  }
});

export const updateSingleBudget = asyncHandler(async (req, res) => {
  console.log(req.body.params);
  const _id = req.body.params.budgetid;
  const name = req.body.params.name;
  const price = req.body.params.price;
  const quantity = req.body.params.quantity;
  const total = req.body.params.total;
  const status = req.body.params.status;

  const eventUpdate = await budgetModel.findByIdAndUpdate(
    { _id: _id },
    {
      name: name,
      price: price,
      quantity: quantity,
      total: total,
      status: status,
    },
    function (err, docs) {
      if (err) {
        console.log("error");
      } else {
        console.log("success");
      }
    }
  );
  if (eventUpdate) {
    res.status(201).json(eventUpdate);
  } else {
    console.log("error");
    throw new Error("Error While Updating Event.");
  }
});

export const deleteSingleGuest = asyncHandler(async (req, res) => {
  const _id = req.query.guestId;

  const eventDelete = await guestModel.findByIdAndDelete(
    { _id: _id },
    function (err, docs) {
      if (err) {
        console.log("");
      } else {
        console.log("");
      }
    }
  );
  if (eventDelete) {
    res.status(201).json(allNews);
  } else {
    throw new Error("Error While Deleting News");
  }
});

export const deleteSingleBudget = asyncHandler(async (req, res) => {
  const _id = req.query.budgetId;

  const eventDelete = await budgetModel.findByIdAndDelete(
    { _id: _id },
    function (err, docs) {
      if (err) {
        console.log("");
      } else {
        console.log("");
      }
    }
  );
  if (eventDelete) {
    res.status(201).json(allNews);
  } else {
    throw new Error("Error While Deleting News");
  }
});

export const deleteSingleEvent = asyncHandler(async (req, res) => {
  const eventid = req.query.eventid;

  const eventDelete = await eventModel.findByIdAndDelete(
    { _id: eventid },
    function (err, docs) {
      if (err) {
        console.log("");
      } else {
        console.log("");
      }
    }
  );
  if (eventDelete) {
    res.status(201).json(allNews);
  } else {
    throw new Error("Error While Deleting News");
  }
});

export const userAllEvents = asyncHandler(async (req, res) => {
  const allEvents = await eventModel
    .find({ userid: req.query.userid })
    .sort({ updatedAt: -1 });
  if (allEvents) {
    res.status(201).json(allEvents);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const eventAllGuest = asyncHandler(async (req, res) => {
  const event = await guestModel
    .find({ eventid: req.query.eventid })
    .sort({ updatedAt: -1 });
  if (event) {
    res.status(201).json(event);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const eventAllBudget = asyncHandler(async (req, res) => {
  const event = await budgetModel
    .find({ eventid: req.query.eventid })
    .sort({ updatedAt: -1 });
  if (event) {
    res.status(201).json(event);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const userSingleEvents = asyncHandler(async (req, res) => {
  console.log(req.query);
  const EventData = await eventModel
    .find({ userid: req.query.userid, _id: req.query.eventid })
    .sort({ updatedAt: -1 });
  if (EventData) {
    res.status(201).json(EventData);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const userSingleGuest = asyncHandler(async (req, res) => {
  console.log(req.query);
  const EventData = await guestModel
    .find({ _id: req.query.guestid })
    .sort({ updatedAt: -1 });
  if (EventData) {
    res.status(201).json(EventData);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const userSingleBudget = asyncHandler(async (req, res) => {
  console.log(req.query);
  const EventData = await budgetModel
    .find({ _id: req.query.budgetid })
    .sort({ updatedAt: -1 });
  if (EventData) {
    res.status(201).json(EventData);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const createNewEvent = asyncHandler(async (req, res) => {
  const newEvent = new eventModel(req.body);
  newEvent
    .save()
    .then((result) => {
      console.log("added successfully");
      res.status(201).json(result);
    })
    .catch((err) => {
      throw new Error(`Error Occures: ${err}`);
    });
});

export const createNewBudget = asyncHandler(async (req, res) => {
  const newEvent = new budgetModel(req.body);
  newEvent
    .save()
    .then((result) => {
      console.log("added successfully");
      res.status(201).json(result);
    })
    .catch((err) => {
      throw new Error(`Error Occures: ${err}`);
    });
});

export const createNewContact = asyncHandler(async (req, res) => {
  const newEvent = new contactModel(req.body);
  newEvent
    .save()
    .then((result) => {
      console.log("added successfully");
      res.status(201).json(result);
    })
    .catch((err) => {
      throw new Error(`Error Occures: ${err}`);
    });
});

export const createNewGuest = asyncHandler(async (req, res) => {
  const newGuest = new guestModel(req.body);
  newGuest
    .save()
    .then((result) => {
      console.log("added successfully");
      res.status(201).json(result);
    })
    .catch((err) => {
      throw new Error(`Error Occures: ${err}`);
    });
});

export const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (isUser) {
    res.status(400); // bad request
    throw new Error("User already registered");
  }
  const userCreated = await User.create(req.body);
  if (userCreated) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password, role } = req.body;
  const isUser = await User.findOne({ email, password, role });

  if (isUser) {
    res.status(201);
    res.json(isUser);
  }
  console.log("Incorrect Details");
  res.status(400); // bad request
  throw new Error("Incorrrect Credentials!");
});

export const checkEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const isUser = await User.findOne({ email });

  if (isUser) {
    res.status(400); // bad request
    throw new Error("Email already exists!");
  }
  res.json({ success: true });
});
