import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import FormData from "form-data";
import axios from "axios";
import "colors";
import ideaModel from "../models/ideaModel.js";

export const loginAdmin = asyncHandler(async (req, res) => {
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

export const createNewIdea = asyncHandler(async (req, res) => {
  const newIdea = new ideaModel(req.body);
  newIdea
    .save()
    .then((result) => {
      console.log("added successfully");
      res.status(201).json(result);
    })
    .catch((err) => {
      throw new Error(`Error Occures: ${err}`);
    });
});

export const adminAllIdeas = asyncHandler(async (req, res) => {
  const event = await ideaModel
    .find({ userid: req.query.userid, category: req.query.category })
    .sort({ updatedAt: -1 });
  if (event) {
    res.status(201).json(event);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const allIdeasList = asyncHandler(async (req, res) => {
  const event = await ideaModel
    .find({ category: req.query.category })
    .sort({ updatedAt: -1 });
  if (event) {
    res.status(201).json(event);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const adminSingleIdea = asyncHandler(async (req, res) => {
  console.log(req.query);
  const EventData = await ideaModel
    .find({ _id: req.query.ideaid })
    .sort({ updatedAt: -1 });
  if (EventData) {
    res.status(201).json(EventData);
  } else {
    throw new Error("Error While Getting All Events");
  }
});

export const updateSingleIdea = asyncHandler(async (req, res) => {
  console.log(req.body.params);
  const _id = req.body.params.ideaid;
  const title = req.body.params.title;
  const image = req.body.params.image;
  const description = req.body.params.description;

  const eventUpdate = await ideaModel.findByIdAndUpdate(
    { _id: _id },
    {
      title: title,
      image: image,
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

export const deleteSingleIdea = asyncHandler(async (req, res) => {
  const _id = req.query.ideaId;

  const eventDelete = await ideaModel.findByIdAndDelete(
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
    res.status(201).json();
  } else {
    throw new Error("Error While Deleting News");
  }
});

export const adminDashboardValues = asyncHandler(async (req, res) => {
  // Fetch all users with the role "member"
  const memberUsers = await User.countDocuments({ role: "member" });

  // Fetch all ideas with the category "photo_idea"
  const photoIdeas = await ideaModel.countDocuments({ category: "photo_idea" });

  // Get the total length of ideas
  const totalIdeas = await ideaModel.countDocuments();

  if (memberUsers && photoIdeas) {
    const data = {
      memberusers: memberUsers,
      photoideas: photoIdeas,
      remainingideas: totalIdeas - photoIdeas,
    };
    res.status(201).json(data);
  } else {
    throw new Error("Error while getting users and ideas");
  }
});
