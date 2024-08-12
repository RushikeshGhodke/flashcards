import { Router } from "express";
import {
  sayHello,
  getAllCards,
  deleteCard,
  addCard,
  editCard
} from "../controllers/card.controller.js";

const router = Router();

router.route("/hello").get(sayHello);
router.route("/getAllCards").get(getAllCards);
router.route("/deleteCard").delete(deleteCard);
router.route("/addCard").post(addCard);
router.route("/editCard").put(editCard);
// router.route("/listUsers").get(listUsers);
// router.route("/listUsersByNameAsc").get(listUsersByNameAsc);
// router.route("/listUsersByNameDesc").get(listUsersByNameDesc);
// router.route("/deleteUser").delete(deleteUser);
// router.route("/searchUser").post(searchUser);
// router.route("/editUser").put(editUser);
export default router;
