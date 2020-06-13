var budgetController = (function(){

    var x = 23;

    var add = function(a){
        return x+a;
    }

    return {
        publicTest: function(b){
            return add(b);
        }
    }

})();


var UIController = (function(){

})();

var controller = (function(budgetCtrl, UICtrl){

    var z = budgetCtrl.publicTest(5);
    return {
        anotherPublic:function(){
            console.log(z);
        }
    }

})(budgetController,UIController);

/*
In controller, we can not have budgetCtrl , we can directly use budgetController but why we change the name:
because in future if we change the name of budget Controller to somethng else, we dont have to change it eveywhere in controller ocde. Inside the scope of controller, it is known as budgetCtrl and thus we only will have to change the name inside last () if ever name changes.

Modules are getting implemented through closures and IIFE. IIFE is able to make the whole module private and closure enables the public return objects to access the private variables and functions
*/
