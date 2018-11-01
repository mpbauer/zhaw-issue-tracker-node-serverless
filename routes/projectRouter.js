var express = require('express');
var router = express.Router();

const {check} = require('express-validator/check');
var projectController = require('../controllers/projectController');

// Project API
router.get('/', projectController.getAllProjects);
router.get('/:project_id', projectController.getProjectById);

router.post('/', [
    check('title').isLength({min: 1, max: 50}),
    check('description').isLength({min: 1, max: 150}),
    check('clientId').isUUID(),
    check('active').isBoolean()
], projectController.createProject);

router.put('/:project_id', [
    check('title').isLength({min: 1, max: 50}),
    check('description').isLength({min: 1, max: 150}),
    check('clientId').isUUID(),
    check('active').isBoolean()
], projectController.updateProjectById);

router.delete('/:project_id', projectController.deleteProjectById);

// Issue API
router.get('/:project_id/issues', projectController.getIssuesByProjectId);
router.get('/:project_id/issues/:issue_id', projectController.getIssueById);
router.post('/:project_id/issues', [
    check('title').isLength({min: 1, max: 50}),
    check('description').isLength({min: 1, max: 150}),
    check('dueDate').optional().isISO8601(),
    check('projectClientId').isUUID(),
    check('projectId').isUUID(),
    check('clientId').isUUID(),
    check('severity').isIn(['Minor', 'Major', 'Critical', 'Blocker']),
    check('status').isIn(['todo', 'in_progress', 'done'])
], projectController.createIssue);

router.put('/:project_id/issues/:issue_id', [
    check('title').isLength({min: 1, max: 50}),
    check('description').isLength({min: 1, max: 150}),
    check('dueDate').optional().isISO8601(),
    check('projectClientId').isUUID(),
    check('projectId').isUUID(),
    check('clientId').isUUID(),
    check('severity').isIn(['Minor', 'Major', 'Critical', 'Blocker']),
    check('status').isIn(['todo', 'in_progress', 'done'])
], projectController.updateIssueById);

router.delete('/:project_id/issues/:issue_id', projectController.deleteIssueById);

module.exports = router;
