const express = require('express');
const router = express.Router();
const controller = require('../appControl/appControl');

router.get("/",controller.landing_page);
router.get("/about",controller.aboutPage);
router.get("/login",controller.loginPage);
router.get("/signup",controller.signupPage);

router.post("/BusinessOwnerPage",
    controller.newBusinessOwner,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.post("/CollaboratorPage",controller.newCollaborator);
router.post("/updateBusinessOwner/:name/:email",
    controller.updateBusinessOwner,
    controller.checkConnectedCollaborators,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.post("/updateCollaborator/:name/:email/:business/:services",controller.updateCollaborator);
router.post("/connectCollaborator/:ownerName/:ownerEmail/:name/:email/:business/:category/:services",
    controller.connectCollaborator,
    controller.viewBusinessOwner,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.get("/checkConnectedOwners/:name/:email/:business/:category/:services",controller.checkOwners);
router.get("/disconnectCollaborator/:ownerName/:ownerEmail/:name/:email",
    controller.deleteCollaboratorFromOwner,
    controller.viewBusinessOwner,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.get("/checkAvailableCollaborators/:ownerName/:ownerEmail",
    controller.viewCollaborators,
    controller.viewBusinessOwner,
    controller.viewOwnerConnectionsAndPlans,
    controller.renderBusinessPage);
// router.post("/deleteBusinessOwner/:name/:email",controller.deleteBusinessOwner);

router.get("/addPlan/:ownerName/:ownerEmail/:name/:email",controller.createPlanPage);
router.get("/editPlan/:ownerName/:ownerEmail/:name/:email/:agenda/:tasks/:from/:to/:outcome",controller.editPlanPage);
router.post("/addPlan/:ownerName/:ownerEmail/:name/:email",
    controller.addPlan,
    controller.viewBusinessOwner,
    controller.checkConnectedCollaborators1,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.post("/editPlan/:ownerName/:ownerEmail/:name/:email/:agenda/:tasks/:outcome",
    controller.editPlan,
    controller.viewBusinessOwner,
    controller.checkConnectedCollaborators1,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.use(controller.fileError);

router.use(function (req,res) {
    res.status(500);
    res.type();
    res.send('Internal server error')
});

module.exports = router;