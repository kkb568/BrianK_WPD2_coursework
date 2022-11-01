const nedb = require('nedb');

class app1 {
    constructor() {
        this.db = new nedb();
        // this.db = new nedb({filename:dbFilePath,autoload:true});
    }

    addCollaborator(Name,Email,Business,Category,Services,Password) {
        return new Promise((resolve,reject) => {
            this.db.insert({
                name:Name,
                email:Email,
                business:Business,
                category:Category,
                services:Services,
                password:Password
            }, function(error,entry){
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                    console.log('Entry inserted.');
                }
            });
        })
    }

    viewCollaborator(Name) {
        return new Promise((resolve,reject) => {
            this.db.find({name:Name},{_id:0,name:1,email:1,business:1,category:1,services:1}, function (error,entry) {
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
}

module.exports = app1;