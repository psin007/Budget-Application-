//BUDGET CONTROLLER
var budgetController = (function(){



})();

//UI CONTROLLER
var UIController = (function(){

    //if in future, CSS class names are changed, we will only have to change it here and not all over the code
    var DOMstrings = {
        inputType:'.add__type',
        inputDescription:'.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'

    };

    return{
        getinput: function(){
            return{
                type:document.querySelector(DOMstrings.inputType).value, //check html to value check
                description:document.querySelector(DOMstrings.inputDescription).value,
                value:document.querySelector(DOMstrings.inputValue).value
                //to return 3 variables, better have an object which has all these three attributes
            }
        },
        getDOMStrings: function(){
            return DOMstrings;
        }
    }

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListeners = function(){
            var DOM = UICtrl.getDOMStrings(); // this is required only for event listener

            document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);

            document.addEventListener('keypress',function(event){    // document as enter key is global
                if(event.keyCode === 13 || event.which ===13){ //which is used in older browsers
                ctrlAddItem();
            }
        });
    };


    var ctrlAddItem = function(){

            // 1. Get the field input data
            var input = UICtrl.getinput();

            // 2. Add the item to budget Controller

            // 3. Add the new item to UI

            // 4. Calculate the budget

            // 5. Display the budget on UI
    };

    return{
        init: function(){ // to call eventListeners function
            console.log('Application has started.');
            setupEventListeners();
        }
    }


})(budgetController,UIController);

controller.init(); //only line of code that is outside
