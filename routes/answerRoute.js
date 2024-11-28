const express = require("express");
const router = express.Router();
const { answer , allAnswers} = require("../controller/answerController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/postanswer", authMiddleware, answer);
router.get("/:questionId/answers",authMiddleware,allAnswers)

module.exports = router;