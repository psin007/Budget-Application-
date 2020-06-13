//BUDGET CONTROLLER
var budgetController = (function(){



})();

//UI CONTROLLER
var UIController = (function(){

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var ctrlAddItem = function(){

            // 1. Get the field input data

            // 2. Add the item to budget Controller

            // 3. Add the new item to UI

            // 4. Calculate the budget

            // 5. Display the budget on UI
        console.log("It works!!");
    }

    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(event){    // document as enter key is global
        if(event.keyCode === 13 || event.which ===13){ //which is used in older browsers
            ctrlAddItem();
        }
    });

})(budgetController,UIController);
