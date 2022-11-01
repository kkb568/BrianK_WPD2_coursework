const nedb = require('nedb');

class app {
    constructor(dbFilePath) {
        // this.db = new nedb();
        this.db = new nedb({filename:dbFilePath,autoload:true});
    }

    addBusinessOwner(Name,Email,Password) {
        return new Promise((resolve,reject) => {
            let UserType = "Business owner";
            this.db.insert({
                name:Name,
                userType: UserType,
                email:Email,
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

    viewBusinessOwner(Name) {
        return new Promise((resolve,reject) => {
            this.db.find({name:Name},{_id:0,name:1,email:1}, function(error,entry) {
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
}

module.exports = app;