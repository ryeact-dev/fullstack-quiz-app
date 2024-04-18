const express = require('express');
const {
  addSubject,
  getAllSubjects,
  updateSubject,
  deleteSubject,
} = require('../controllers/subject.controller');

const router = express.Router();

router.get('/all-subject', getAllSubjects);

router.post('/add-subject', addSubject);

router.patch('/update-subject', updateSubject);

router.delete('/delete-subject/:id', deleteSubject);

module.exports = router;
