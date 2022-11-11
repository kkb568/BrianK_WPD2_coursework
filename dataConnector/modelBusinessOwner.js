const nedb = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class app {
    constructor() {
        this.db = new nedb();
        // this.db = new nedb({filename:dbFilePath,autoload:true});
    }

    addBusinessOwner(Name,Email,Password) {
        return new Promise((resolve,reject) => {
            const hashedPassword = bcrypt.hashSync(Password,saltRounds);
            this.db.insert({
                OwnerName:Name,
                OwnerEmail:Email,
                connectedCollaborators: [],
                password:hashedPassword
            }, function(error) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    }

    viewBusinessOwner(Name,Email) {
        return new Promise((resolve,reject) => {
            this.db.find({OwnerName:Name,OwnerEmail:Email},{_id:0,OwnerName:1,OwnerEmail:1,password:1}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                    console.log("Details: ", entry);
                }
            });
        });
    }

    editBusinessOwner(oldName,oldEmail,Name,Email) {
        return new Promise((resolve,reject) => {
            this.db.update({OwnerName:oldName, OwnerEmail:oldEmail},{$set:{OwnerName:Name, OwnerEmail:Email}}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }

    deleteBusinessOwner(Name,Email) {
        return new Promise((resolve,reject) => {
            this.db.remove({OwnerName:Name,OwnerEmail:Email}, {}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }

    addCollaboratorToOwner(ownerName,ownerEmail,name,email,business,category,services) {
        return new Promise((resolve,reject) => {
            this.db.update({OwnerName:ownerName, OwnerEmail:ownerEmail},{$push:{connectedCollaborators:{name:name,email:email,business:business,category:category,services:services}}},{},function(error,entry) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }

    viewConnectedCollaborators(ownerName,ownerEmail) {
        return new Promise((resolve,reject) => {
            this.db.find({OwnerName:ownerName,OwnerEmail:ownerEmail},{_id:0,connectedCollaborators:1,plans:1}, function(error,entry) {
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
            this.db.find({"connectedCollaborators.name":collName,"connectedCollaborators.email":collEmail},{_id:0,OwnerName:1,OwnerEmail:1}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }

    removeCollaboratorFromOwner(ownerName,ownerEmail,name,email) {
        return new Promise((resolve,reject) => {
            this.db.update({OwnerName:ownerName,OwnerEmail:ownerEmail},{$pull:{connectedCollaborators:{name:name,email:email}}},{},function(error,entry) {
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