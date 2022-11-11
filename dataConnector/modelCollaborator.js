const nedb = require('nedb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class app1 {
    constructor(dbFilePath) {
        // this.db = new nedb();
        this.db = new nedb({filename:dbFilePath,autoload:true});
    }

    addCollaborator(Name,Email,Business,Category,Services,Password) {
        return new Promise((resolve,reject) => {
            const hashedPassword = bcrypt.hashSync(Password,saltRounds);
            this.db.insert({
                name:Name,
                email:Email,
                business:Business,
                category:Category,
                services:Services,
                password:hashedPassword
            }, function(error,entry){
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        })
    }

    viewCollaborator(Name,Email) {
        return new Promise((resolve,reject) => {
            this.db.find({name:Name,email:Email},{_id:0,name:1,email:1,business:1,category:1,services:1}, function (error,entry) {
                    if(error) {
                        reject(error);
                    }
                    else {
                        resolve(entry);
                    }
                })
        })
    }

    viewCollaborators() {
        return new Promise((resolve,reject) => {
            this.db.find({},{_id:0,name:1,email:1,business:1,category:1,services:1}, function (error,entry) {
                    if(error) {
                        reject(error);
                    }
                    else {
                        resolve(entry);
                    }
                })
        })
    }

    editCollaborator(oldName,oldEmail,oldBusiness,oldServices,Name,Email,Business,Services) {
        return new Promise((resolve,reject) => {
            this.db.update({name:oldName, email:oldEmail, business:oldBusiness, services:oldServices},{$set:{name:Name, email:Email, business:Business, services:Services}}, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                }
            });
        });
    }

    deleteCollaborator(Name,Email) {
        return new Promise((resolve,reject) => {
            this.db.remove({name:Name,email:Email}, {}, function(error,entry) {
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

module.exports = app1;