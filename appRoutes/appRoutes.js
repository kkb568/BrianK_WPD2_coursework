const express = require('express');
const router = express.Router();
const controller = require('../appControl/appControl');

router.get("/",controller.landing_page);
router.get("/about",controller.aboutPage);
router.get("/login",controller.loginPage);
router.get("/signup",controller.signupPage);
router.post("/BusinessOwnerPage",controller.newBusinessOwner);
router.post("/CollaboratorPage",controller.newCollaborator);
// router.get("/viewCollaborators",controller.viewCollaborator);
router.post("/updateBusinessOwner/:name/:email",controller.updateBusinessOwner);
router.post("/updateCollaborator/:name/:email/:services",controller.updateCollaborator);
// router.post("/deleteBusinessOwner/:name/:email",controller.deleteBusinessOwner);
router.use(controller.fileError);

router.use(function (req,res) {
    res.status(500);
    res.type();
    res.send('Internal server error')
});

module.exports = router;