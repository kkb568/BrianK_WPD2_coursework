const nedb = require('nedb');

class app {
    constructor() {
        this.db = new nedb();
    }

    addPlan(ownerName,ownerEmail,name,email,Agenda,Tasks,originFrom,From,originTo,To,Outcome) {
        return new Promise((resolve,reject) => {
            this.db.insert({
                ownerName:ownerName,
                ownerEmail:ownerEmail,
                collName:name,
                collEmail:email,
                agenda:Agenda,
                tasks:Tasks,
                originFrom:originFrom,
                from:From,
                originTo:originTo,
                to:To,
                outcome:Outcome,
                completed:'false'
            }, function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                    console.log("Inserted plan: ", entry)
                }
            });
        });
    }

    viewPlan(ownerName,ownerEmail,name,email) {
        return new Promise((resolve,reject) => {
            this.db.find({ownerName:ownerName,ownerEmail:ownerEmail,collName:name,collEmail:email},
            {_id:0,agenda:1,tasks:1,originFrom:1,from:1,originTo:1,to:1,outcome:1,completed:1},function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                    console.log("View: ", entry);
                }    
            });
        });
    }

    viewAllPlans(ownerName,ownerEmail) {
        return new Promise((resolve,reject) => {
            this.db.find({ownerName:ownerName,ownerEmail:ownerEmail},
            {_id:0,agenda:1,tasks:1,originFrom:1,from:1,originTo:1,to:1,outcome:1,completed:1},function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                    console.log("View: ", entry);
                }    
            });
        });
    }

    updatePlan(oldAgenda,oldTasks,oldFrom,oldTo,oldOutcome,Agenda,Tasks,originFrom,From,originTo,To,Outcome) {
        return new Promise((resolve,reject) => {
            this.db.update({agenda:oldAgenda,tasks:oldTasks,originFrom:oldFrom,originTo:oldTo,outcome:oldOutcome},
            {$set:{agenda:Agenda,tasks:Tasks,originFrom:originFrom,from:From,originTo:originTo,to:To,outcome:Outcome}}, 
            function(error,entry) {
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