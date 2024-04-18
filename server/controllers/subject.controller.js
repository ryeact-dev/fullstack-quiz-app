const { prisma } = require('../lib/utils/prismaClient');

const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;

async function getAllSubjects(req, res, next) {
  const { count, page } = req.query;

  try {
    const listOfSubjects = await prisma.subject.findMany({
      skip: Number(page) * Number(count),
      take: Number(count),
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalSubjects = await prisma.subject.count();

    const hasMore = listOfSubjects.length === Number(count);

    res.json({ subjects: listOfSubjects, hasMore, totalSubjects });
  } catch (err) {
    err.title = 'Fetching Question';
    next(err);
  }
}

async function addSubject(req, res, next) {
  try {
    const { title } = req.body;
    await prisma.subject.create({
      data: {
        title,
      },
    });
    res.status(201).send(`${title} added successfully`);
  } catch (err) {
    err.title = 'Adding Subject';
    next(err);
  }
}

async function updateSubject(req, res, next) {
  try {
    await prisma.subject.update({
      where: {
        id: req.body.id,
      },
      data: req.body,
    });
    res.status(201).send(`Subject updated successfully`);
  } catch (err) {
    err.title = 'Updating Subject';
    next(err);
  }
}

async function deleteSubject(req, res, next) {
  try {
    await prisma.subject.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send('Subject deleted successfully');
  } catch (err) {
    if (err.code === 'P2003') {
      return res.status(409).send('Cannot delete subject with questions');
    }
    err.title = 'Deleting Subject';
    next(err);
  }
}

exports.addSubject = addSubject;
exports.getAllSubjects = getAllSubjects;
exports.updateSubject = updateSubject;
exports.deleteSubject = deleteSubject;
