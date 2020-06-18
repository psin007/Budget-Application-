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

    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){ //cur is either Expense or Income object
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems:{
            exp:[],
            inc:[]
        },
        totals:{
            exp:0,
            inc:0
        },
        budget:0,
        percentage: -1
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

        calculateBudget: function(){

            //calculate total income and expense
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate budget: income - expense
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else{
                data.percentage = -1;
            }
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc : data.totals.inc,
                totalExp: data.totals.exp,
                percentage : data.percentage
            }
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
        expenseContainer:'.expenses__list',
        budgetLabel:'.budget__value',
        incomeLabel:'.budget__income--value',
        expenseLabel:'.budget__expenses--value',
        percentageLabel:'.budget__expenses--percentage'

    };

    return{
        getinput: function(){
            return{
                type:document.querySelector(DOMstrings.inputType).value, //check html to value check
                description:document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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

        displayBudget: function(obj){
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;

            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
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

    var updateBudget = function(){
            // 1. Calculate the budget
            budgetCtrl.calculateBudget();
            // 2. Return the budget
            var budget = budgetCtrl.getBudget();
            // 3. Display the budget on UI
            UICtrl.displayBudget(budget);
    };

    var ctrlAddItem = function(){

            var input,newItem;

            // 1. Get the field input data
            input = UICtrl.getinput();

            if(input.description !== ""  && !isNaN(input.value) && input.value > 0) {
                // 2. Add the item to budget Controller
                newItem = budgetCtrl.addItem(input.type,input.description,input.value)
                // 3. Add the new item to UI
                UICtrl.addListItems(newItem,input.type);
                // 4. Clear the fields
                UICtrl.clearFields();
                // 5. Calculate an dUpdate Budget
                updateBudget();
            }


    };

    return{
        init: function(){ // to call eventListeners function
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc : 0,
                totalExp: 0,
                percentage : -1

            });
            setupEventListeners();
        }
    }


})(budgetController,UIController);

controller.init();
