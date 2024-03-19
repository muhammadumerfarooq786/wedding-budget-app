import express from "express";
import {
  createNewIdea,
  loginAdmin,
  adminAllIdeas,
  adminSingleIdea,
  updateSingleIdea,
  deleteSingleIdea,
  adminDashboardValues,
  allIdeasList,
} from "../controller/AdminController.js";
const router = express.Router();

router.route("/login").post(loginAdmin);
router.route("/new/idea").post(createNewIdea);
router.route("/get/idea").get(adminAllIdeas);
router.route("/fetch/idea").get(adminSingleIdea);
router.route("/update/idea").put(updateSingleIdea);
router.route("/delete/idea").delete(deleteSingleIdea);
router.route("/dashboard/values").get(adminDashboardValues);
router.route("/get/allidea").get(allIdeasList);

export default router;
