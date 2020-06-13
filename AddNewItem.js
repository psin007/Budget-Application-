//BUDGET CONTROLLER
var budgetController = (function(){

        var Expense = function(id, description,value){ //function constructor has capital name at start
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function(id, description,value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        }
    };

    return {
        addItem: function(type,des,val){
            var newItem,ID;
            //ID should be unique and in future we are to delete as well so last element + 1
            //[1 2 3 4 5]
            //[1 2 4 6 8]
            //ID = last ID  + 1
                //name of array eg a
                //a[last index].id+1 where a = data.allItems[type] = data.allItems[inc] or [exp]
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }

            else
                ID = 0;

            if(type === 'exp'){
                newItem = new Expense(ID,des,val)
            } else if(type === 'inc'){
                newItem = new Income(ID,des,val)
            }

            //push it into our data structure
            data.allItems[type].push(newItem); // [type] as name inc and exp is same for type and totals variables
            //return the new element
            return newItem;
        },

        testing:
            function(){
                console.log(data);
            }
    }

})();



    var Expense = function(id, description,value){ //function constructor has capital name at start
        this.id = id;
        this.description = description;
        this.value = value;
    }



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

            var input,newItem;

            // 1. Get the field input data
            input = UICtrl.getinput();
            // 2. Add the item to budget Controller
            newItem = budgetCtrl.addItem(input.type,input.description,input.value)
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

controller.init();
