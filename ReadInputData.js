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
        getDOMStrings: function(){ // to expose inputButton to be used in Controller
            return DOMstrings;
        }
    }

})();


//GLOBAL APP CONTROLLER
var controller = (function(budgetCtrl, UICtrl){

    var DOM = UICtrl.getDOMStrings();

    var ctrlAddItem = function(){

            // 1. Get the field input data
            var input = UICtrl.getinput();
            console.log(input);

            // 2. Add the item to budget Controller

            // 3. Add the new item to UI

            // 4. Calculate the budget

            // 5. Display the budget on UI
    }

    document.querySelector(DOM.inputButton).addEventListener('click',ctrlAddItem);

    document.addEventListener('keypress',function(event){    // document as enter key is global
        if(event.keyCode === 13 || event.which ===13){ //which is used in older browsers
            ctrlAddItem();
        }
    });

})(budgetController,UIController);
