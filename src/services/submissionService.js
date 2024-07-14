const { fetchProblemDetails } = require('../apis/problemAdminApi');
const SubmissionProducer = require('../producers/submissionQueueProducer');

class SubmissionService {
    constructor (submissionRepository) {
        // inject here
        this.submissionRepository  = submissionRepository;
    }

    async pingCheck() {
        return 'pong'
    }

    async addSubmission(submissionPayload) {
        // Hit the problem admin service and fetch the problem details
        const problemId = submissionPayload.problemId;

        const problemAdminApiResponse = await fetchProblemDetails(problemId);

        if(!problemAdminApiResponse) {
            throw { message: "Not able to create submission" };
        }

        const languageCodeStub = problemAdminApiResponse.data.codeStubs.find(codeStub => codeStub.language.toLowerCase() === submissionPayload.language.toLowerCase());
        
        // console.log(languageCodeStub)

        submissionPayload.code = languageCodeStub.startSnippet + "\n\n" + submissionPayload + "\n\n" + languageCodeStub.endSnippet

        
        // we are going to create the entry in db
        const submission =
         await this.submissionRepository.createSubmission(submissionPayload);
        if(!submission){
            // TODO: add error handling here
            throw { message: "Not able to create submission"}
        }
        // console.log(submission);
        const response = await SubmissionProducer({
          [submission._id]: {
            code: submission.code,
            language: submission.language,
            inputCase: problemAdminApiResponse.data.testCases[0].input,
            outputCase: problemAdminApiResponse.data.testCases[0].output,
          },
        });
        return {queueResponse: response, submission};
    }
}

module.exports = SubmissionService;