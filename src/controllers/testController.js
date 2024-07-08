const testService = require('../services/testService');

async function pingRequest(req, res){
    console.log(this.testService);
    const response = await testService.pingCheck();
    return res.send({data: 'pong'});
}

module.exports = {pingRequest}