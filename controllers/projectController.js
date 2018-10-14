var AWS = require("aws-sdk");
const uuidv4 = require('uuid/v4');
const {validationResult} = require('express-validator/check');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

const ISSUE_TABLE = "issues";
const PROJECT_TABLE = "projects";

module.exports.deleteIssueById = function (req, res) {
    const projectId = req.params.project_id;
    const issueId = req.params.issue_id;
    if (!projectId || !issueId) {
        return res.sendStatus(400);
    }
    var params = {
        TableName: ISSUE_TABLE,
        Key: {
            "id": issueId,
        }
    };
    docClient.delete(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.sendStatus(204);
        }
    });
};

module.exports.updateIssueById = function (req, res) {
    const errors = validationResult(req);
    const projectId = req.params.project_id;
    const issueId = req.params.issue_id;
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()}).send();
    }
    if (!projectId || !issueId) {
        return res.sendStatus(400);
    }
    var params = {
        TableName: PROJECT_TABLE,
        Key: {id: projectId},
        UpdateExpression: "set #status = :status," +
            "#updatedAt = :updatedAt," +
            "#projectClientId = :projectClientId," +
            "#projectId = :projectId," +
            "#clientId = :clientId," +
            "#severity = :severity," +
            "#title = :title," +
            "#description = :description",
        ExpressionAttributeNames: {
            "#status": "status",
            "#updatedAt": "updatedAt",
            "#projectClientId": "projectClientId",
            "#projectId": "projectId",
            "#clientId": "clientId",
            "#severity": "severity",
            "#title": "title",
            "#description": "description"
        },
        ExpressionAttributeValues: {
            ":status": req.body.status,
            ":updatedAt": new Date().toISOString(),
            ":projectClientId": req.body.projectClientId,
            ":projectId": req.body.projectId,
            ":clientId": req.body.clientId,
            ":severity": req.body.severity,
            ":title": req.body.title,
            ":description": req.body.description
        },
        ReturnValues: "ALL_NEW"
    };
    docClient.update(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.status(200).json(data.Attributes).send();
        }
    });
};

module.exports.createIssue = function (req, res) {
    const projectId = req.params.project_id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()}).send();
    }
    if (!projectId) {
        return res.sendStatus(400);
    }
    console.log(req.body);
    let params = {
        TableName: ISSUE_TABLE,
        Item: {
            id: uuidv4(),
            status: req.body.status,
            dueDate: req.body.dueDate,
            createdAt: new Date().toISOString(),
            projectClientId: req.body.projectClientId,
            projectId: req.body.projectId,
            clientId: req.body.clientId,
            severity: req.body.severity,
            title: req.body.title,
            description: req.body.description
        }
    };
    docClient.put(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.status(201).json(params.Item).send();
        }
    });
};

module.exports.getIssueById = function (req, res) {
    const projectId = req.params.project_id;
    const issueId = req.params.issue_id;
    if (!projectId || !issueId) {
        return res.sendStatus(400);
    }
    console.log(projectId);
    console.log(issueId);
    var params = {
        TableName: ISSUE_TABLE,
        Key: {
            "id": issueId,
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.status(200).json(data.Item).send();
        }
    });
};

module.exports.getIssuesByProjectId = function (req, res) {
    const projectId = req.params.project_id;
    if (!projectId) {
        return res.sendStatus(400);
    }
    var params = {
        TableName: ISSUE_TABLE,
        FilterExpression: "projectId = :projectId",
        ExpressionAttributeValues: {
            ":projectId": projectId,
        }
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.status(200).json(data.Items).send();
        }
    });
};

module.exports.getProjectById = function (req, res) {
    const projectId = req.params.project_id;
    if (!projectId) {
        return res.sendStatus(400);
    }
    var params = {
        TableName: PROJECT_TABLE,
        Key: {
            "id": projectId
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.status(200).json(data.Item).send();
        }
    });
};

module.exports.getAllProjects = function (req, res) {
    const params = {
        TableName: PROJECT_TABLE
    };
    docClient.scan(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.status(200).json(data.Items).send();
        }
    });
};

module.exports.createProject = function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()}).send();
    }
    var params = {
        TableName: PROJECT_TABLE,
        Item: {
            id: uuidv4(),
            active: req.body.active,
            title: req.body.title,
            description: req.body.description,
            clientId: req.body.clientId,
            createdAt: new Date().toISOString()
        }
    };
    docClient.put(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.status(201).json(params.Item).send();
        }
    });
};

module.exports.updateProjectById = function (req, res) {
    const errors = validationResult(req);
    const projectId = req.params.project_id;
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    if (!projectId) {
        return res.sendStatus(400);
    }
    var params = {
        TableName: PROJECT_TABLE,
        Key: {id: projectId},
        UpdateExpression: "set #active = :active," +
            "#title = :title," +
            "#description = :description," +
            "#clientId = :clientId," +
            "#updatedAt = :updatedAt",
        ExpressionAttributeNames: {
            "#active": "active",
            "#title": "title",
            "#description": "description",
            "#clientId": "clientId",
            "#updatedAt": "updatedAt"
        },
        ExpressionAttributeValues: {
            ":active": req.body.active,
            ":title": req.body.title,
            ":description": req.body.description,
            ":clientId": req.body.clientId,
            ":updatedAt": new Date().toISOString()
        },
        ReturnValues: "ALL_NEW"
    };
    docClient.update(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.status(200).json(data.Attributes).send();
        }
    });
};

module.exports.deleteProjectById = function (req, res) {
    const projectId = req.params.project_id;
    if (!projectId) {
        return res.sendStatus(400);
    }
    var params = {
        TableName: PROJECT_TABLE,
        Key: {
            "id": projectId,
        }
    };
    docClient.delete(params, function (err, data) {
        if (err) {
            return res.status(500).json(err).send();
        } else {
            return res.sendStatus(204);
        }
    });
};
