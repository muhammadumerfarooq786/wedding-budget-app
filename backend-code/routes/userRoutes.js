import express from "express";
import {
  registerUser,
  checkEmail,
  loginUser,
  createNewEvent,
  userAllEvents,
  userSingleEvents,
  updateSingleEvent,
  deleteSingleEvent,
  eventAllGuest,
  createNewGuest,
  updateSingleGuest,
  deleteSingleGuest,
  userSingleGuest,
  createNewBudget,
  eventAllBudget,
  userSingleBudget,
  updateSingleBudget,
  deleteSingleBudget,
  createNewContact,
} from "../controller/UserController.js";

// DEFINE THE ROUTER
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/verifyemail").post(checkEmail);
router.route("/login").post(loginUser);
router.route("/getevents").get(userAllEvents);
router.route("/newevent").post(createNewEvent);
router.route("/fetch/event/").get(userSingleEvents);
router.route("/update/event").put(updateSingleEvent);
router.route("/delete/event").delete(deleteSingleEvent);
router.route("/get/guests").get(eventAllGuest);
router.route("/new/guest").post(createNewGuest);
router.route("/update/guest").put(updateSingleGuest);
router.route("/fetch/guest").get(userSingleGuest);
router.route("/delete/guest").delete(deleteSingleGuest);
router.route("/new/budget").post(createNewBudget);
router.route("/get/budget").get(eventAllBudget);
router.route("/fetch/budget").get(userSingleBudget);
router.route("/update/budget").put(updateSingleBudget);
router.route("/delete/budget").delete(deleteSingleBudget);
router.route("/contactus").post(createNewContact);

export default router;
