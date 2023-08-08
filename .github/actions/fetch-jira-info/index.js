const core = require('@actions/core');
const axios = require('axios');

async function run() {
    try {
        const jiraTicketKey = core.getInput('jira-ticket-key', { required: true });
        const jiraApiToken = process.env.JIRA_API_TOKEN;
        const jiraBaseUrl = process.env.JIRA_BASE_URL;
        const jiraUsername = process.env.JIRA_USERNAME;

        const response = await axios.get(`${jiraBaseUrl}/rest/api/3/issue/${jiraTicketKey}`, {
            auth: {
                username: jiraUsername,
                password: jiraApiToken
            }
        });

        const description = JSON.stringify(response.data.fields.description);

        core.setOutput('jira-description', description);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
