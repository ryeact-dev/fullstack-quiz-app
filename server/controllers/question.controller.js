const { prisma } = require('../lib/utils/prismaClient');

const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

async function getAllQuestions(req, res, next) {
  const { count, page, subject } = req.query;

  try {
    const listOfQuestions = await prisma.question.findMany({
      where: {
        subjectId: subject,
      },
      skip: Number(page) * Number(count),
      take: Number(count),
      include: {
        subject: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalQuestions = await prisma.question.count({
      where: {
        subjectId: subject,
      },
    });

    const hasMore = listOfQuestions.length === Number(count);

    res.json({ questions: listOfQuestions, hasMore, totalQuestions });
  } catch (err) {
    err.title = 'Fetching Question';
    next(err);
  }
}

async function addQuestion(req, res, next) {
  try {
    // const foundQuestion = await prisma.question.findUnique({
    //   where: {
    //     question: req.body.question,
    //   },
    // });

    // if (foundQuestion.length > 0) {
    //   return res.status(400).send('Question already exists!');
    // }

    await prisma.question.create({
      data: req.body,
    });

    res.status(200).send('Question added successfully');
  } catch (err) {
    err.title = 'Adding Question';
    next(err);
  }
}

async function updateQuestion(req, res, next) {
  try {
    await prisma.question.update({
      where: {
        id: req.body.id,
      },
      data: req.body,
    });

    res.status(200).send('Question updated successfully');
  } catch (err) {
    err.title = 'Updating Question';
    next(err);
  }
}

async function deleteQuestion(req, res, next) {
  try {
    await prisma.question.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).send('Question deleted successfully');
  } catch (err) {
    err.title = 'Deleting Question';
    next(err);
  }
}

exports.getAllQuestions = getAllQuestions;
exports.addQuestion = addQuestion;
exports.updateQuestion = updateQuestion;
exports.deleteQuestion = deleteQuestion;
