const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createAccessToken, createRefreshToken } = require('./auth')

const getAllUsers = async (req, res) => {
  console.log('hi tomus');

  const users = await prisma.user.findMany({});

  res.status(200).json({
    users,
  });
};

// register new user - needs checks for pass and email

const register = async (req, res) => {
  console.log('registering new user');

  const { email, password } = req.body;
  console.log('register req.body', req.body);

  try {
    // check if user exists
    const foundUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (foundUser)
      return res.status(409).json({ error: 'User exists already ' });

    const hashedPassword = await bcrypt.hash(password, 8);

    console.log('hased', hashedPassword);

    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    res.json({ data: createdUser });
  } catch (error) {
    console.log('error', error);

  }
};

// login

const login = async (req, res) => {
  
  console.log('logging you in');

  const { email, password } = req.body;
  console.log('req.body', req.body);

  try {
    // check if user exists
    // WHEN WE FIND THE USER IT FINDS THEIR HASHED PASSEDWORD IN THE DB
    const foundUser = await prisma.user.findFirst({
      where: {
        email
      },
    });
    
    if (!foundUser)
      return res.status(404).json({ error: 'User does not exist ' });
      console.log('found user', foundUser);

      // compare passworded entered and hashed password in db
    const passwordsMatch = await bcrypt.compare(password, foundUser.password);
    console.log('passwordsMatch', passwordsMatch);

    if (!passwordsMatch) {
      return res.status(401).json({ error: 'Invalid password.' });
    }

    const accessToken = createAccessToken(foundUser.email)

    // const refreshToken = createRefreshToken(foundUser.email)
    // user.refreshToken = refreshToken

    res.status(200).json({ data: accessToken });

  } catch (error) {
    console.log('error', error);
  }

};

const WelcomeFrontPage = async (req, res) => {
  console.log('welcome page loading');
  
  const token = req.get('authorization')
  console.log('token', token);

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  res.json({ message: `test`})

}

module.exports = {
  getAllUsers,
  register,
  login,
  WelcomeFrontPage
};
