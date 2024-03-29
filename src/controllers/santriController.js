const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } }
})
module.exports = {
  get_all_santri: async (req, res) => {
    try {
      const data = await prisma.santri.findMany()
      res.json({
        status: true,
        data: data,
        method: req.method,
        url: req.url
      })
    } catch (error) {
      res.send("santri can't be displayed!")
    }
  },
  create_santri: async (req, res) => {
    try {
      const { name, classroom_id, status } = req.body
      if (Object.keys(req.body).length === 3) {
        const data = await prisma.santri.create({
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
          message: 'santri is created!',
          url: req.url
        });
      } else {
        res.json({
          status: false,
          method: req.method,
          message: 'santri data is not complete!',
          url: req.url
        });
      }
    } catch (error) {
      console.log(error)
      res.send("santri can't be created!")
    }
  },
  get_one_santri: async (req, res) => {
    const santri_id = parseInt(req.params.id)
    try {
      const data = await prisma.santri.findUnique({
        where: {
          id: santri_id,
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
        message: `id ${santri_id} not found!`,
        url: req.url
      });
    }
  },
  edit_santri: async (req, res) => {
    // TODO edit santri feature
    const { id, name, room, classroom, status } = req.body
    const updateSantri = await prisma.santri.update({
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

