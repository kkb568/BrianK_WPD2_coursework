const appDAO = require('../dataConnector/modelBusinessOwner');
const appDAO1 = require('../dataConnector/modelCollaborator');
const db = new appDAO();
const db1 = new appDAO1();
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
        db.viewBusinessOwner(req.body.name)
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

// TO-DO
exports.viewCollaborators = async(req,res,next) => {
    try {
        db1.viewCollaborators()
        .then((list) => {
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
                'name': req.body.name,
                'email': req.body.email,
                'profile': res.locals.business,
                'collaboratorProfile': res.locals.collaborators
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
                'name':req.body.name,
                'email': req.body.email,
                'business': req.body.business,
                'services': req.body.services,
                'profile':list
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
        db.viewBusinessOwner(req.body.name)
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