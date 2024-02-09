const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
    datasources: { db: { url: process.env.DATABASE_URL } }
})
module.exports = {
    get_all_classroom: async (req, res) => {
        try {
            const data = await prisma.classroom.findMany()
            res.json({
                status: true,
                data: data,
                method: req.method,
                url: req.url
            })
        } catch (error) {
            res.send("classroom can't be displayed!")
        }
    },
    create_classroom: async (req, res) => {
        try {
            const { name, status } = req.body
            console.log(req.body)
            if (Object.keys(req.body).length === 2) {
                const data = await prisma.classroom.create({
                    data: {
                        name: name,
                        status: status,
                    },
                })
                res.json({
                    status: true,
                    data: data,
                    method: req.method,
                    message: 'classroom is created!',
                    url: req.url
                });
            } else {
                res.json({
                    status: false,
                    method: req.method,
                    message: 'classroom data is not complete!',
                    url: req.url
                });
            }
        } catch (error) {
            res.send("classroom can't be created!")
        }
    },
    get_one_classroom: async (req, res) => {
        const classroom_id = parseInt(req.params.id)
        try {
            const data = await prisma.classroom.findUnique({
                where: {
                    id: classroom_id,
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
                message: `id ${classroom_id} not found!`,
                url: req.url
            });
        }
    },
    edit_classroom: (req, res) => {

    },
}

