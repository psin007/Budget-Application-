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
        inputButton: '.add__btn',
        incomeContainer:'.income__list',
        expenseContainer:'.expenses__list'

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

        addListItems: function(obj,type){
            var html , newHtml,element;
            //create HTML strings with placeholder text

            if(type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'

            } else if(type === 'exp'){

                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }
            //placeholders are especially designed to be between %% so that we dont mix up

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%',obj.id); //html is a string here and replace is a method of string
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',obj.value);
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml); // before end so that the new expense or income is at last or after previous expenses or incomes
        },

        clearFields: function(){

            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue)
            //a list is returned from querySelectorAll
            //need to convert to array using slice

            fieldsArr = Array.prototype.slice.call(fields);

            //can use for loop as well here
            //current - current value
            //index - i
            //array - original array
            fieldsArr.forEach(function(current,index,array){ //this anonymous function is called on each element of array
                current.value = "";

            });
            fieldsArr[0].focus(); // to have cursor back at first element of fields array which is  description
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
            UICtrl.addListItems(newItem,input.type);
            // 4. Clear the fields
            UICtrl.clearFields();
            // 5. Calculate the budget

            // 6. Display the budget on UI
    };

    return{
        init: function(){ // to call eventListeners function
            console.log('Application has started.');
            setupEventListeners();
        }
    }


})(budgetController,UIController);

controller.init();
