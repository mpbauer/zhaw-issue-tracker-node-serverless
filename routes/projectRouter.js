var express = require('express');
var router = express.Router();

const {check} = require('express-validator/check');
var projectController = require('../controllers/projectController');

// Project API
router.get('/', projectController.getAllProjects);
router.get('/:project_id', projectController.getProjectById);

router.post('/', [
    check('title').exists(),
    check('clientId').exists(),
    check('active').isBoolean()
], projectController.createProject);

router.put('/:project_id', [
    check('title').isLength({min: 1, max: 50}),
    check('clientId').isLength({min: 1, max: 50}),
    check('active').isBoolean()
], projectController.updateProjectById);

router.delete('/:project_id', projectController.deleteProjectById);

// Issue API
router.get('/:project_id/issues', projectController.getIssuesByProjectId);
router.get('/:project_id/issues/:issue_id', projectController.getIssueById);
router.post('/:project_id/issues', [
    check('title').isLength({min: 1, max: 50}),
    check('projectClientId').isLength({min: 1, max: 50}),
    check('projectId').isLength({min: 1, max: 50}),
    check('clientId').isLength({min: 1, max: 50}),
    check('priority').isIn(['minor', 'major', 'critical', 'blocker']),
    check('done').isBoolean()
], projectController.createIssue);

router.put('/:project_id/issues/:issue_id', [
    check('title').isLength({min: 1, max: 50}),
    check('projectClientId').isLength({min: 1, max: 50}),
    check('projectId').isLength({min: 1, max: 50}),
    check('clientId').isLength({min: 1, max: 50}),
    check('priority').isIn(['minor', 'major', 'critical', 'blocker']),
    check('done').isBoolean()
], projectController.updateIssueById);

router.delete('/:project_id/issues/:issue_id', projectController.deleteIssueById);

module.exports = router;