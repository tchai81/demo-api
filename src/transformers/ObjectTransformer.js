import moment from 'moment'

const transformObject = (object, showTimestamp = true) => {
    if (object && object['versions'].length) {
        let formatted = {
            key: object['key'],
            value: object['versions'][0]['value']
        }

        if (showTimestamp) {
            formatted['timestamp'] = moment(object['versions'][0]['createdAt']).unix()
        }
        return formatted
    }
    return null
}

const transformVersion = (object, version) => {
    if (object && version) {
        return {
            key: object['key'],
            value: version['value'],
            timestamp: moment(version['createdAt']).unix()
        }
    }
    return null
}

export default { transformObject, transformVersion }