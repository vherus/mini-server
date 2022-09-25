const { Prisma } = require('@prisma/client');
const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { createAccessToken, createRefreshToken } = require('./auth');
const { decode } = require('punycode');
const { user } = require('../utils/prisma');

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
    // user.refreshToken = refreshToke

    res.status(200).json({ data: accessToken });

  } catch (error) {
    console.log('error', error);
  }

};

const deleteUser = async (req, res) => {
  console.log('deleting user');
  // we have used array destructuring to seperate Bearer and the token
    // saves accessing via index
  const [_, token] = req.get('authorization').split(' ')
  console.log('token', token);

  try {
    // To verify give the token and secret decode phrase
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // i get back details stored in token, email/role/id whatever you want.
    console.log('decoded', decoded);

    // find the user attached to the email address in the token
    const foundUser = await prisma.user.findFirst({
      where: {
        email: decoded.email
      }
    })
    // should return the user info 
    console.log('found Admin', foundUser);

    // check for admin status
    if (foundUser.role === 'ADMIN') {
      await prisma.user.delete({
        where: {
          id: Number(req.params.id)
        }
      })

      return res.status(201).json({ msg: 'Deleted user '})
    }

    res.status(401).json({ msg: 'Not an Admin'})

  } catch (error) {
    res.status(500).json({ error, msg:'hi tom it didnt work' })
  }
}

module.exports = {
  getAllUsers,
  register,
  login,
  deleteUser
};
