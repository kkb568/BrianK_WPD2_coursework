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
// TO BE CHECKED WHEN THERE IS PLANS.
router.post("/connectCollaborator/:ownerName/:ownerEmail/:name/:email/:business/:category/:services",
    controller.connectCollaborator,
    controller.viewBusinessOwner,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.get("/checkConnectedOwners/:name/:email/:business/:category/:services",
    controller.viewPlanByColl,
    controller.checkOwners,
    controller.renderCollaboratorPage);
router.get("/disconnectCollaborator/:ownerName/:ownerEmail/:name/:email",
    controller.deleteCollaboratorFromOwner,
    controller.viewBusinessOwner,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.get("/checkAvailableCollaborators/:ownerName/:ownerEmail",
    controller.viewCollaborators,
    controller.viewBusinessOwner,
    controller.viewOwnerConnections,
    controller.viewPlans,
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
router.post("/editPlan/:ownerName/:ownerEmail/:name/:email/:agenda/:tasks/:from/:to/:outcome",
    controller.editPlan,
    controller.viewBusinessOwner,
    controller.checkConnectedCollaborators1,
    controller.viewCollaborators,
    controller.renderBusinessPage);
router.get("/deletePlan/:ownerName/:ownerEmail/:agenda/:tasks/:from/:to/:outcome/:completed",
    controller.removePlan,
    controller.viewBusinessOwner,
    controller.checkConnectedCollaborators1,
    controller.viewCollaborators,
    controller.renderBusinessPage)
router.get("/confirmComplete/:ownerName/:ownerEmail/:agenda/:tasks/:from/:to/:outcome",
    controller.confirmCompletion,
    controller.checkOwnerDetails,
    controller.checkOwners1)
router.use(controller.fileError);

router.use(function (req,res) {
    res.status(500);
    res.type();
    res.send('Internal server error')
});

module.exports = router;