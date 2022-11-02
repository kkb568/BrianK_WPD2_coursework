const nedb = require('nedb');

class app {
    constructor() {
        this.db = new nedb();
        // this.db = new nedb({filename:dbFilePath,autoload:true});
    }

    addBusinessOwner(Name,Email,Password) {
        return new Promise((resolve,reject) => {
            this.db.insert({
                name:Name,
                email:Email,
                connectedCollaborators: [],
                password:Password
            }, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                    console.log('Entry inserted.');
                }
            });
        });
    }

    viewBusinessOwner(Name,Email) {
        return new Promise((resolve,reject) => {
            this.db.find({name:Name,email:Email},{_id:0,name:1,email:1}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }

    editBusinessOwner(oldName,oldEmail,Name,Email) {
        return new Promise((resolve,reject) => {
            this.db.update({name:oldName, email:oldEmail},{$set:{name:Name, email:Email}}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }

    // deleteBusinessOwner(Name,Email) {
    //     return new Promise((resolve,reject) => {
    //         this.db.remove({name:Name,email:Email}, {}, function(error,entry) {
    //             if(error) {
    //                 reject(error);
    //             }
    //             else {
    //                 resolve(entry);
    //             }
    //         });
    //     });
    // }

    addCollaboratorToOwner(ownerName,ownerEmail,name,email,business,category,services) {
        return new Promise((resolve,reject) => {
            this.db.update({name:ownerName, email:ownerEmail},{$push:{connectedCollaborators:{name:name,email:email,business:business,category:category,services:services}}},{},function(error,entry) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                    // console.log(entry);
                }
            });
        });
    }

    viewConnectedCollaborators(ownerName,ownerEmail) {
        return new Promise((resolve,reject) => {
            this.db.find({name:ownerName,email:ownerEmail},{_id:0,connectedCollaborators:1}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }

    viewOwnersByCollaborator(collName,collEmail) {
        return new Promise((resolve,reject) => {
            this.db.find({"connectedCollaborators.name":collName,"connectedCollaborators.email":collEmail},{_id:0,name:1,email:1}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }
}

module.exports = app;