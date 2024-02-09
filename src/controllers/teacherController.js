const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } }
})
module.exports = {
  get_all_teacher: async (req, res) => {
    try {
      const data = await prisma.teacher.findMany()
      res.json({
        status: true,
        data: data,
        method: req.method,
        url: req.url
      })
    } catch (error) {
      res.send("teacher can't be displayed!")
    }
  },
  create_teacher: async (req, res) => {
    try {
      const { name, classroom_id, status } = req.body
      if (Object.keys(req.body).length === 3) {
        const data = await prisma.teacher.create({
          data: {
            name: name,
            classroom_Id: classroom_id,
            status: status,
          },
        })
        res.json({
          status: true,
          data: data,
          method: req.method,
          message: 'teacher is created!',
          url: req.url
        });
      } else {
        res.json({
          status: false,
          method: req.method,
          message: 'teacher data is not complete!',
          url: req.url
        });
      }
    } catch (error) {
      console.log(error)
      res.send("teacher can't be created!")
    }
  },
  get_one_teacher: async (req, res) => {
    const teacher_id = parseInt(req.params.id)
    try {
      const data = await prisma.teacher.findUnique({
        where: {
          id: teacher_id,
        }
      })
      res.json({
        status: true,
        data: data,
        method: req.method,
        url: req.url
      });
    } catch (error) {
      res.json({
        status: false,
        method: req.method,
        message: `id ${teacher_id} not found!`,
        url: req.url
      });
    }
  },
  edit_teacher: async (req, res) => {
    // TODO edit teacher feature
    const { id, name, room, classroom, status } = req.body
    const updateteacher = await prisma.teacher.update({
      where: {
        id: id
      },
      data: {
        name: name,
        room: room,
        classroom: classroom,
        status: status,
      }
    })
  },
}

