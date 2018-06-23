import Sequelize from 'sequelize'
import _object from '../models/object'
import version from '../models/version'
import sequelize from '../services/sequelize'
import transformer from '../transformers/ObjectTransformer'
import moment from 'moment'

const controller = {
    getByKeyAndTimestamp(req, res) {
        const key = req.params.key
        const timestamp = req.query.timestamp
        controller.initRelation()
        _object
            .findOne({
                where: {
                    key: key
                },
                include: [controller.getVersionCondition(timestamp)]
            })
            .then(response => {
                res.send(transformer.transformObject(response, false))
            })
    },
    createOrUpdate(req, res) {
        const key = Object.keys(req.body)[0]
        const value = req.body[key]
        controller.initRelation()
        sequelize.sync().then(() => {
            _object
                .findOne({ where: { key: key } })
                .then(obj => {
                    if (obj) {
                        return controller.createObjectVersion(obj, value)
                    } else {
                        return controller.createObject(key, value)
                    }
                })
                .then(result => {
                    res.send(result)
                })
                .catch(Sequelize.ValidationError, error => {
                    res.send(error)
                })
        })
    },
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
    createObjectVersion(obj, val) {
        return version
            .create({
                objectId: obj.id,
                value: val
            }, { include: [_object] })
            .then(response => {
                return transformer.transformVersion(obj, response)
            })
    },
    getVersionCondition(timestamp) {
        let versionCondition = {
            model: version,
            limit: 1,
            order: [
                ['createdAt', 'DESC']
            ]
        }
        if (timestamp) {
            versionCondition['where'] = {
                createdAt: {
                    $lte: moment.unix(timestamp).utc()
                }
            }
        }
        return versionCondition
    },
    initRelation() {
        _object.hasMany(version)
        version.belongsTo(_object)
    }
}

export default controller