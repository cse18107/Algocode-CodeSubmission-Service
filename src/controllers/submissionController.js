async function pingRequest(req, res){
    console.log(this.testService);
    const response = await this.testService.pingCheck();
    return res.send({ data: response });
}

// TODO: add validation layer
async function createSubmission(req, res) {
    console.log("--------------->",req.body)
    const response = await this.submissionService.addSubmission(req.body);
    console.log(response);
    return res.status(201).send({
        error: {},
        data: response,
        success: true,
        message: 'Created submission successfully'
    })
}

module.exports = { pingRequest, createSubmission };