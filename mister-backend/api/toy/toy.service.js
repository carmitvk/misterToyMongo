const logger = require('../../services/logger.service')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query() {
    // const criteria = _buildCriteria(filterBy)
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find().toArray()
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.aggregate([
            {
                $match: { '_id': ObjectId(toyId) }
            },
            {
                $addFields: {
                    stringId: {
                        $toObjectId: "$_id"
                    }
                }
            },

            // {
            //     $lookup:
            //     {
            //         localField: 'reviewIds',
            //         from: 'review',
            //         foreignField: '_id',
            //         as: 'reviews'
            //     }
            // },
            {
                $lookup:
                {
                    from: "review",
                    let: { vid: "$reviewIds" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: ["$_id", {
                                        $map: {
                                            input: "$$vid",
                                            in: { $toObjectId: "$$this" }
                                        }
                                    }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "reviews"
                }
            },
        ]).toArray()
        // const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy[0]
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        // peek only updatable fields!
        toy._id = ObjectId(toy._id);//TODO verify if fields with uppercase is ok
        const toyToSave = { ...toy }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const toyToAdd = { ...toy };
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.txt) {
//         const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
//         criteria.$or = [
//             {
//                 username: txtCriteria
//             },
//             {
//                 fullname: txtCriteria
//             }
//         ]
//     }
//     if (filterBy.minBalance) {
//         criteria.balance = { $gte: filterBy.minBalance }
//     }
//     return criteria
// }





