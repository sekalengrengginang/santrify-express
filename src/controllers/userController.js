const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  get_all_user: async (req, res) => {
    try {
      const data = await prisma.user.findMany();
      res.json({
        status: true,
        data: data,
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.send("user can't be displayed!");
    }
  },
  create_user: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (Object.keys(req.body).length === 3) {
        const hashedPass = await bcrypt.hash(password, 10);
        const data = await prisma.user.create({
          data: {
            name: name,
            email: email,
            password: hashedPass,
          },
        });
        res.json({
          status: true,
          data: data,
          method: req.method,
          message: "user is created!",
          url: req.url,
        });
      } else {
        res.json({
          status: false,
          method: req.method,
          message: "user data is not complete!",
          url: req.url,
        });
      }
    } catch (error) {
      res.send("user can't be created!");
    }
  },
  get_one_user: async (req, res) => {
    const user_id = parseInt(req.params.id);
    try {
      const data = await prisma.user.findUnique({
        where: {
          id: user_id,
        },
      });
      res.json({
        status: true,
        data: data,
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.json({
        status: false,
        method: req.method,
        message: `id ${user_id} not found!`,
        url: req.url,
      });
    }
  },
  edit_user: async (req, res) => {
    // TODO edit user feature
    const { name, room, password } = req.body;
    const updateuser = await prisma.user.update({
      where: {
        name: name,
      },
      data: {
        name: name,
        room: room,
        classroom: password,
      },
    });
    res.json({
      status: true,
      data: updateuser,
      method: req.method,
      url: req.url,
    });
  },
  login_user: async (req, res) => {
    const { email, password } = req.body;
    if (!email) {
      res.send("please enter email!");
    } else if (!password) {
      res.send("please enter password");
    } else {
      const findUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!findUser) return res.send("user not found");

      if (!findUser.password) return res.send("password is not set");

      const checkPass = await bcrypt.compare(password, findUser?.password);
      if (checkPass) {
        const userData = {
          id: findUser.id,
          name: findUser.name,
          email: findUser.email,
        };

        const accessToken = jwt.sign(userData, process.env.JWT_TOKEN);

        res.cookie("token", accessToken),
          res.json({
            status: true,
            data: {
              id: findUser.id,
              name: findUser.name,
              email: findUser.email,
            },
            accessToken: accessToken,
            method: req.method,
            url: req.url,
          });
      } else {
        res.json({
          status: false,
          message: "wrong password!",
          method: req.method,
          url: req.url,
        });
      }
    }
  },
};
