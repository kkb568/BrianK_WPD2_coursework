const nedb = require('nedb');

class app {
    constructor(dbFilePath) {
        // this.db = new nedb();
        this.db = new nedb({filename:dbFilePath,autoload:true});
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

    viewPlanByCollaborator(name,email) {
        return new Promise((resolve,reject) => {
            this.db.find({collName:name,collEmail:email},
            {_id:0,agenda:1,tasks:1,from:1,to:1,outcome:1,completed:1},function(error,entry) {
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

    viewPlansByOwner(ownerName,ownerEmail) {
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

    viewCollByPlan(Agenda,Tasks,From,To,Outcome) {
        return new Promise((resolve,reject) => {
            this.db.find({agenda:Agenda,tasks:Tasks,from:From,to:To,outcome:Outcome},
            {_id:0,collName:1,collEmail:1},function(error,entry) {
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

    viewOwnerByPlan(Agenda,Tasks,From,To,Outcome) {
        return new Promise((resolve,reject) => {
            this.db.find({agenda:Agenda,tasks:Tasks,from:From,to:To,outcome:Outcome},
            {_id:0,ownerName:1,ownerEmail:1},function(error,entry) {
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

    deletePlan(Agenda,Tasks,From,To,Outcome,Completed) {
        return new Promise((resolve,reject) => {
            this.db.remove({agenda:Agenda,tasks:Tasks,from:From,to:To,outcome:Outcome,completed:Completed},{},function(error,entry) {
                if(error) {
                    reject(error);
                }
                else {
                    resolve(entry);
                } 
            });
        });
    }

    setCompletion(ownerName,ownerEmail,Agenda,Tasks,From,To,Outcome) {
        return new Promise((resolve,reject) => {
            this.db.update({ownerName:ownerName,ownerEmail:ownerEmail,agenda:Agenda,tasks:Tasks,from:From,to:To,outcome:Outcome},
            {$set:{completed:'true'}},function(error,entry) {
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