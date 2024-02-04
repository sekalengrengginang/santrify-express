const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } }
  })
module.exports ={
    getSantri : async (req,res)=>{
        try {
          const data = await prisma.santri.findMany()
          res.json({
            status: true,
            data: data,
            method: req.method,
            url: req.url
          })
        } catch (error) {
          res.send("santri can't be displayed")
        }
    },
    postSantri: async (req,res)=>{
        try {
          const { name,room,classroom,status } = req.body
          if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            res.json({
              status: false,
              method: req.method,
              message: 'please enter santri data!',
              url: req.url
            });
          }else{
            const data = await prisma.santri.create({
              data: {
                name: name,
                room:room,
                classroom:classroom,
                status:status,
              },
            })
            res.json({
              status: true,
              data: data,
              method: req.method,
              message: 'santri is created!',
              url: req.url
            });
          }
        } catch (error) {
          res.send("santri can't be created!")
        }
    }
}

