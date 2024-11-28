const express = require("express");
const router = express.Router();
const { ask, allQuestions} = require("../controller/questionController");

const authMiddleware = require("../middleware/authMiddleware");


router.post("/ask", authMiddleware, ask);
router.get("/all-questions",authMiddleware,allQuestions)

module.exports = router;
