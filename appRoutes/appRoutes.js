const express = require('express');
const router = express.Router();
const {login, createCookie, verify} = require('../auth/authOwner');
const controller = require('../appControl/appControl');

//Routes to the main four pages.
router.get("/",controller.landing_page);
router.get("/about",controller.aboutPage);
router.get("/login",controller.loginPage);
router.get("/signup",controller.signupPage);

//  Called when business owner creates a new business owner account.
router.post("/BusinessOwnerPage",
    controller.newBusinessOwner,
    createCookie,
    controller.viewCollaborators,
    controller.renderBusinessPage);
//  Called when collaborator creates a new collaborator account.
router.post("/CollaboratorPage",controller.newCollaborator);
router.post('/loginOwner',
    login,
    createCookie,
    controller.viewCollaborators,
    controller.renderBusinessPage);
//  Called when business owner updates his or her profile information.
router.post("/updateBusinessOwner/:name/:email",
    controller.updateBusinessOwner,
    controller.checkConnectedCollaborators,
    controller.viewCollaborators,
    controller.renderBusinessPage);
//  Called when collaborator edits hisor her profile information.
router.post("/updateCollaborator/:name/:email/:business/:category/:services",controller.updateCollaborator);
// Called when business owner connects to an existing collaborator.
router.post("/connectCollaborator/:ownerName/:ownerEmail/:name/:email/:business/:category/:services",
    controller.connectCollaborator,
    controller.viewBusinessOwner,
    controller.viewCollaborators,
    controller.viewPlans,
    controller.renderBusinessPage);
// Called when collaborator wants to view his or her connected business owner.
router.get("/checkConnectedOwners/:name/:email/:business/:category/:services",
    controller.viewPlanByColl,
    controller.checkOwners,
    controller.renderCollaboratorPage);
// Called when business owner wants to disconnects with an existing connected collaborator. 
router.get("/disconnectCollaborator/:ownerName/:ownerEmail/:name/:email",
    controller.deleteCollaboratorFromOwner,
    controller.viewBusinessOwner,
    controller.viewCollaborators,
    controller.renderBusinessPage);
// Called when business owner wants to view available collaborators and those who he or she has connected with, together with their respective plans.
router.get("/checkAvailableCollaborators/:ownerName/:ownerEmail",
    controller.viewCollaborators,
    controller.viewBusinessOwner,
    controller.viewOwnerConnections,
    controller.viewPlans,
    controller.renderBusinessPage);
router.get("/deleteBusinessOwner/:name/:email",controller.deleteBusinessOwner);
router.get("/deleteCollaborator/:name/:email",controller.deleteCollaborator);

//Routes to the 'Create plan' and 'edit plan' pages.
router.get("/addPlan/:ownerName/:ownerEmail/:name/:email",controller.createPlanPage);
router.get("/editPlan/:ownerName/:ownerEmail/:name/:email/:agenda/:tasks/:from/:to/:outcome",controller.editPlanPage);
//Rendering of the business and collaborator pages when plans are added, edited or deleted.
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
// Called when the collaborator clicks on the complete button.
router.get("/confirmComplete/:ownerName/:ownerEmail/:agenda/:tasks/:from/:to/:outcome",
    controller.confirmCompletion,
    controller.checkOwnerDetails,
    controller.checkOwners1)
router.get("/logout",verify,controller.logout);

//404 error functionality.
router.use(controller.fileError);

//Internal server error.
router.use(function (req,res) {
    res.status(500);
    res.type();
    res.send('Internal server error')
});

module.exports = router;