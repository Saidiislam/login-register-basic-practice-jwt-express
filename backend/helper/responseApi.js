module.exports = {
    errorGenerator : (status, message = 'SOMETHING WENT WRONG') => {
        return {error: true, success: false ,status:status, message:message  }
    },
    succResGenerator : (status, message = 'OK', data = null ) => {
        return {error: false, success: true ,status:status, message:message, objVal: data }
    }
}