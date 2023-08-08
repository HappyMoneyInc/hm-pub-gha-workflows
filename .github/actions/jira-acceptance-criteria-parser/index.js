const core = require('@actions/core');

try {
    const descriptionJson = core.getInput('jira-description', { required: true });
    const descriptionObj = JSON.parse(descriptionJson);
    console.log("descriptionObj: "+ descriptionObj)
    let acceptanceCriteria = '\n';

    const bulletList = descriptionObj.content.find(item => item.type === 'bulletList');
    if (bulletList) {
        for (const listItem of bulletList.content) {
            const listItemContent = listItem.content[0].content[0];
            if (listItemContent.type === 'text') {
                console.log("found content: "+ listItemContent.text)
                acceptanceCriteria += `- [ ] ${listItemContent.text}\n`;
            }
        }
    }
    console.log("acceptanceCriteria: "+ acceptanceCriteria)

    core.setOutput('acceptance-criteria', acceptanceCriteria);
} catch (error) {
    core.setFailed(error.message);
}
