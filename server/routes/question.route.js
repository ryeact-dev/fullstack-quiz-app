const express = require('express');
const {
  addQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/question.controller');

const router = express.Router();

router.get('/get-question', getAllQuestions);

router.post('/add-question', addQuestion);

router.patch('/update-question', updateQuestion);

router.delete('/delete-question/:id', deleteQuestion);

module.exports = router;
