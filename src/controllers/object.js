import _object from '../models/object'
import version from '../models/version'
import sequelize from '../services/sequelize'
import transformer from '../transformers/ObjectTransformer'
import moment from 'moment'

const controller = {
    /**
     * Initialize relationship between object & version
     * Object = storing key
     * Version = storing value
     * TODO: find a way to better establshing relationship between models
     */
    initRelation() {
        _object.hasMany(version)
        version.belongsTo(_object)
    },
    /**
     * Entry point to get a key value pair.
     */
    getByKeyWithTimestamp(req, res) {
        controller.getByKeyWithTimestampResponse(req).then(response => {
            res.send(response)
        })
    },
    /**
     * Getting a key value pair from database
     */
    getByKeyWithTimestampResponse(req) {
        const key = req.params.key
        const timestamp = req.query.timestamp
        controller.initRelation()
        return _object
            .findOne({
                where: {
                    key: key
                },
                include: [controller.getVersion(timestamp)]
            })
            .then(response => {
                return transformer.transformObject(response)
            })
    },
    /**
     * Generate condition to retrieve a value based on timestamp
     * If timestamp is not provided, latest value will be retrieved
     */
    getVersion(timestamp) {
        let condition = {
            model: version,
            limit: 1,
            order: [
                ['createdAt', 'DESC']
            ]
        }
        if (timestamp) {
            condition['where'] = {
                createdAt: {
                    $lte: moment.unix(timestamp).utc()
                }
            }
        }
        return condition
    },
    /**
     * Entry point to create/update a key
     */
    createOrUpdate(req, res) {
        controller
            .createOrUpdateResponse(req)
            .then(response => {
                res.send(response)
            })
            .catch(error => {
                res.send(error)
            })
    },
    /**
     * Function to determine whether we should create an object or just key instance to database.
     * 1. If provided key exists, create version instance
     * 2. If key does not exists, create both object & version instance
     */
    createOrUpdateResponse(req) {
        const key = Object.keys(req.body)[0]
        const value = req.body[key]
        controller.initRelation()
        return sequelize.sync().then(() => {
            return _object.findOne({ where: { key: key } }).then(obj => {
                if (obj) {
                    return controller.createObjectVersion(obj, value)
                } else {
                    return controller.createObject(key, value)
                }
            })
        })
    },
    /**
     * Create object & version instance to database
     */
    createObject(key, val) {
        return _object
            .create({
                key: key,
                versions: [{ value: val }]
            }, { include: [version] })
            .then(response => {
                return transformer.transformObject(response)
            })
    },
    /**
     * Create version instance to database
     */
    createObjectVersion(obj, val) {
        return version
            .create({
                objectId: obj.id,
                value: val
            }, { include: [_object] })
            .then(response => {
                return transformer.transformVersion(obj, response)
            })
    }
}

export default controller