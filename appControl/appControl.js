const appDAO = require('../dataConnector/modelBusinessOwner');
const appDAO1 = require('../dataConnector/modelCollaborator');
const db = new appDAO();
const db1 = new appDAO1();
const dayjs = require('dayjs');
// const db = new appDAO('database/businessOwner.db');
// const db1 = new appDAO1('database/collaborator.db');

exports.landing_page = async(req,res) => {
    try {
        res.redirect('/index.html');
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.aboutPage = async(req,res) => {
    try {
        res.redirect('/About.html');
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.loginPage = async(req,res) => {
    try {
        res.redirect('/login.html');
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.signupPage = async(req,res) => {
    try {
        res.redirect('/signup.html');
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.newBusinessOwner = async(req,res,next) => {
    try {
        db.addBusinessOwner(
            req.body.name,
            req.body.email,
            req.body.password);
        db.viewBusinessOwner(req.body.name,req.body.email)
            .then((list) => {
                res.locals.business = list[0];
                next();
                console.log('Promise resolved.');
            })
            .catch((err) => {
                console.log('Promise rejected', err);
            })
    }
    catch (error) {
        console.log(error.message);
    }
}

exports.checkConnectedCollaborators = async(req,res,next) => {
    try {
        db.viewConnectedCollaborators(
            req.body.name,
            req.body.email
        )
        .then((list1) => {
            var i = list1[0].connectedCollaborators.length;
            if(i==0) {
                next();
            }
            else {
                res.locals.connected = list1[0].connectedCollaborators;
                next();
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.checkConnectedCollaborators1 = async(req,res,next) => {
    try {
        db.viewConnectedCollaborators(
            req.params.ownerName,
            req.params.ownerEmail
        )
        .then((list1) => {
            var i = list1[0].connectedCollaborators.length;
            if(i==0) {
                next();
            }
            else {
                res.locals.connected = list1[0].connectedCollaborators;
                next();
            }
        })
    } catch (error) {
        console.log(error.message);
    }
}

exports.viewCollaborators = async(req,res,next) => {
    try {
        db1.viewCollaborators()
        .then((list) => {
            console.log(list);
            res.locals.collaborators = list;
            next();
            console.log('Promise resolved.');
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

exports.renderBusinessPage = async(req,res) => {
    try {
        // console.log(res.locals.business);
        // console.log(res.locals.collaborators);
        res.render('businessOwnerPage', {
                'OwnerName': res.locals.business.name,
                'OwnerEmail': res.locals.business.email,
                'collaboratorProfile': res.locals.collaborators,
                'connected': res.locals.connected,
                'plans': res.locals.plans
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.newCollaborator = async(req,res) => {
    try {
        db1.addCollaborator(
            req.body.name,
            req.body.email,
            req.body.business,
            req.body.category,
            req.body.services,
            req.body.password
        );
        db1.viewCollaborator(req.body.name)
        .then((list) => {
            res.render('collaboratorPage', {
                'name': req.body.name,
                'email': req.body.email,
                'business': req.body.business,
                'category': req.body.category,
                'services': req.body.services,
                'profile': list
            })
            console.log('Promise resolved.');
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

exports.updateBusinessOwner = async(req,res,next) => {
    try {
        db.editBusinessOwner(
            req.params.name,
            req.params.email,
            req.body.name,
            req.body.email
        );
        db.viewBusinessOwner(req.body.name,req.body.email)
        .then((entry) => {
            res.locals.business = entry[0];
            next();
            console.log('Promise resolved.');
            console.log('Updated successfully.')
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.updateCollaborator = async(req,res) => {
    try {
        db1.editCollaborator(
            req.params.name,
            req.params.email,
            req.params.business,
            req.params.services,
            req.body.name,
            req.body.email,
            req.body.business,
            req.body.services
        );
        db1.viewCollaborator(req.body.name)
        .then((entry) => {
            res.render('collaboratorPage', {
                'name': req.body.name,
                'email': req.body.email,
                'business': req.body.business,
                'services': req.body.services,
                'profile':entry 
            });
            console.log('Promise resolved.');
            console.log('Updated successfully.')
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.connectCollaborator = async(req,res,next) => {
    try {
        db.addCollaboratorToOwner(
            req.params.ownerName,
            req.params.ownerEmail,
            req.params.name,
            req.params.email,
            req.params.business,
            req.params.category,
            req.params.services
        );
        db.viewConnectedCollaborators(
            req.params.ownerName,
            req.params.ownerEmail
        )
        .then((entry) => {
            res.locals.connected = entry[0].connectedCollaborators;
            next();
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.viewBusinessOwner = async(req,res,next) => {
    try {
        db.viewBusinessOwner(
            req.params.ownerName,
            req.params.ownerEmail
        )
        .then((entry) => {
            res.locals.business = entry[0];
            console.log(entry[0]);
            next();
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.checkOwners = async(req,res,next) => {
    try {
        db.viewOwnersByCollaborator(
            req.params.name,
            req.params.email
        )
        .then((record) => {
            if(record.length==0) {
                res.render('collaboratorPage', {
                    'name':req.params.name,
                    'email': req.params.email,
                    'business': req.params.business,
                    'category': req.params.category,
                    'services': req.params.services,
                    'profile':req.params,
                });
            }
            else {
                console.log("Record: ",record);
                res.render('collaboratorPage', {
                    'name':req.params.name,
                    'email': req.params.email,
                    'business': req.params.business,
                    'category': req.params.category,
                    'services': req.params.services,
                    'profile': req.params,
                    'connectedOwners':record
                })
            }
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.viewOwnerConnectionsAndPlans = async(req,res,next) => {
    try {
        db.viewConnectedCollaborators(
            req.params.ownerName,
            req.params.ownerEmail
        )
        .then((entry) => {
            res.locals.connected = entry[0].connectedCollaborators;
            if(entry[0].plans.length == 0) {
                next();
            }
            else {
                res.locals.plans = entry[0].plans
                next();
            }
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.deleteCollaboratorFromOwner = async(req,res,next) => {
    try {
        db.removeCollaboratorFromOwner(
            req.params.ownerName,
            req.params.ownerEmail,
            req.params.name,
            req.params.email
        );
        db.viewConnectedCollaborators(
            req.params.ownerName,
            req.params.ownerEmail
        )
        .then((entry) => {
            res.locals.connected = entry[0].connectedCollaborators;
            next();
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.createPlanPage = function(req,res) {
    res.render('createPlan', {
        OwnerName:req.params.ownerName,
        OwnerEmail:req.params.ownerEmail,
        name:req.params.name,
        email:req.params.email
    });
}

exports.editPlanPage = function(req,res) {
    res.render('editPlan', {
        OwnerName:req.params.ownerName,
        OwnerEmail:req.params.ownerEmail,
        name:req.params.name,
        email:req.params.email,
        agenda:req.params.agenda,
        tasks:req.params.tasks,
        from: req.params.from,
        to: req.params.to,
        outcome:req.params.outcome
    });
}

exports.addPlan = async(req,res,next) => {
    try {
        const fromDate = dayjs(req.body.from).format('dddd, MMMM D, YYYY');
        const toDate = dayjs(req.body.to).format('dddd, MMMM D, YYYY');
        db.addPlantoCollaborator(
            req.params.ownerName,
            req.params.ownerEmail,
            req.params.name,
            req.params.email,
            req.body.agenda,
            req.body.tasks,
            req.body.from,
            fromDate,
            req.body.to,
            toDate,
            req.body.outcome
        );
        db.viewPlan(
            req.params.ownerName,
            req.params.ownerEmail,
            req.params.name,
            req.params.email
        )
        .then((entry) => {
            res.locals.plans = entry[0].plans;
            next();
            // console.log(entry[0].plans[0].agenda);
        })
        .catch((err) => {
            console.log('Promise rejected', err);
        });
    } 
    catch (error) {
        console.log(error.message);
    }
}

exports.editPlan = async(req,res,next) => {
    try {
        db.viewSpecificPlan(
            req.params.ownerName,
            req.params.ownerEmail,
            req.params.name,
            req.params.email,
            req.params.agenda,
            req.params.tasks,
            req.params.outcome
        );
        // const fromDate = dayjs(req.body.from).format('dddd, MMMM D, YYYY');
        // const toDate = dayjs(req.body.to).format('dddd, MMMM D, YYYY');
        
        // db.viewPlan(
        //     req.params.ownerName,
        //     req.params.ownerEmail,
        //     req.params.name,
        //     req.params.email
        // )
        // .then((entry) => {
        //     res.locals.plans = entry[0].plans;
        //     next();
        //     // console.log(entry[0].plans[0].agenda);
        // })
        // .catch((err) => {
        //     console.log('Promise rejected', err);
        // });
    } 
    catch (error) {
        console.log(error.message);
    }
}

// exports.deleteBusinessOwner = async(req,res) => {
//     try {
//         db.deleteBusinessOwner(req.params.name,req.params.email);
//         console.log('Entry deleted successfully');
//         res.redirect('/signup.html');
//     } 
//     catch (error) {
//         console.log(error.message);
//     }
// }

exports.fileError = function(req,res) {
    res.status(404);
    res.render('404Error');
}