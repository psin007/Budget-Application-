//BUDGET CONTROLLER
var budgetController = (function(){

    var Expense = function(id, description,value){ //function constructor has capital name at start
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };


    Expense.prototype.calcPercentage = function(totalIncome){

        if(totalIncome > 0)
            this.percentage = Math.round((this.value / totalIncome)*100);
        else
            this.percentage = -1;

    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };

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

        deleteitem: function(type, id){
            var ids,index;
            //ids = [1 2 3 4 6 8]
            //id = 6
            //index = 3

            ids = data.allItems[type].map(function(current){
               return current.id; //id is an attribute of data.allItems[type]
            }); //create map to further find out index of id

            index = ids.indexOf(id); //return -1 if not found
            if (index !== -1){
                data.allItems[type].splice(index,1); // delete from data.allItems[type] array at starting from index position and total number of values deleted is 1
            }
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

        calculatePercentages: function(){

            /*
             expense a,b,c
                a = 20
                b = 10
                c = 40
                income = 100
                for a = 20/100 = 20%
                for b = 10%
                for c = 40 %
            */

            data.allItems.exp.forEach(function(cur){
                cur.calcPercentage(data.totals.inc);
            });

        },

        getPercentages: function(){
          var allPerc = data.allItems.exp.map(function(cur){
             return cur.getPercentage();
          }); //since map returns and we get new %
            return allPerc; // allPerc is an array
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
        percentageLabel:'.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel:'.item__percentage',
        dateLabel:'.budget__title--month'

    };


    var formatNumber = function(num, type){
            var numSplit,int,dec;
            /*
            + or - before number based on exp or inc
            exactly 2 decimal point eg 610.00
            comma separating the thousands eg + 2,000.00
            */

            num = Math.abs(num); //overriding the num variable
            num = num.toFixed(2); //to add 2 decimal points on num
            //it is now a string

            numSplit = num.split('.');

            int = numSplit[0];//a string

            if(int.length > 3){
                int = int.substr(0,int.length - 3) + ',' + int.substr(int.length - 3,3);
                //23501 ->23,510
            }
            dec = numSplit[1];


            return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;


    };

    var nodeListForEach = function(list,callback){
        for(var i = 0; i < list.length; i++){
                    callback(list[i],i);
        }

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
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div></div></div>'

            } else if(type === 'exp'){

                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'

            }
            //placeholders are especially designed to be between %% so that we dont mix up

            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%',obj.id); //html is a string here and replace is a method of string
            newHtml = newHtml.replace('%description%',obj.description);
            newHtml = newHtml.replace('%value%',formatNumber(obj.value, type));
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend',newHtml); // before end so that the new expense or income is at last or after previous expenses or incomes
        },

        deleteListItem:function(selectorId){

            //we can ony remove child -> so need to find parent
            //for that we need to move up and then come down

            var el = document.getElementById(selectorId);
            el.parentNode.removeChild(el);

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

            var type;
            obj.budget > 0 ? type = 'inc': type = 'exp';

            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp,'exp');

            if(obj.percentage > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages){

            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            //returns a node list


            nodeListForEach(fields,function(current,index){
                if(percentages[index] > 0)
                    current.textContent = percentages[index] + '%';
                else
                    current.textContent = '---';
            });
        },

        displayMonth:function(){

            var now,year,months,month;
            //var Christmas = new Date(2016,11,25);
            now = new Date();
            months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;


        },

        changedType: function(){

        var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);

            nodeListForEach(fields,function(cur){
                cur.classList.toggle('red-focus');
            });
            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
        },

        getDOMStrings: function(){
            return DOMstrings;
        }
    };

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

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        //event listener on container because of event delegation

        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);

    };

    var updateBudget = function(){
            // 1. Calculate the budget
            budgetCtrl.calculateBudget();
            // 2. Return the budget
            var budget = budgetCtrl.getBudget();
            // 3. Display the budget on UI
            UICtrl.displayBudget(budget);
    };

    var updatePercentages = function(){

        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. read percentages from budget controller
        var percentages = budgetController.getPercentages();

        // 3. Update the user interface
        UICtrl.displayPercentages(percentages);
    }

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

                // 6. calculate and update percentages
                updatePercentages();

            }
    };

    var ctrlDeleteItem = function(event){
        var itemId, splitId, type, id;
        //to know where event is fired
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        if(itemId){ //will be coerced to true if it exist which will only happen if any row of income or expense as decided by html file
            //item id will be like inc-0  or exp-0

            splitId = itemId.split('-');
            type = splitId[0];
            id = parseInt(splitId[1]); //id is a string here, thus convert to int

            //1. Delete the item from data structure
            budgetCtrl.deleteitem(type,id);
            //2. Delete the item from user interface
            UICtrl.deleteListItem(itemId); //itemId not split one
            //3. Update and show the new budget
            updateBudget();
            // 4. Calculate and update percentage
            updatePercentages();
        }
    }

    return{
        init: function(){ // to call eventListeners function
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc : 0,
                totalExp: 0,
                percentage : -1
            });
            UICtrl.displayMonth();
            setupEventListeners();
        }
    }


})(budgetController,UIController);

controller.init();
