
function ToDoItem(descript, dead)
{
    if(arguments.length>1)
    {
        if(typeof descript === "string")
        {
            if (dead instanceof Date)
            {
                dead.setMonth(dead.getMonth()-1);
                this.description = descript;
                this.deadline = new Date(dead);
                this.isDone = false;
                
				if(arguments.length>2)
					console.log("too much arguments-but the object was created");
            }else
                console.log("Deadline must be a date-object-not created");
        }else
            console.log("Description must be a string-object not created");
    }else
        console.log("Not enough arguments, object not created");
}

ToDoItem.prototype = 
{
    constructor : ToDoItem,
    toString : function()
	{
		if(arguments.length>0)
			console.log("too much arguments");
        return "description: "+this.description+", deadline: "+this.deadline+", is done: "+this.isDone;
    },
	
    isOutOfDate : function(now)
	{
		if(arguments.length>0)
		{
			if (now instanceof Date)
			{
				if(arguments.length>1)
					console.log("too much arguments-but we will do the function");
				return now > this.deadline;
			}else
				console.log("now is not a date-function did not made");
		}else
			console.log("not enough arguments-function did not made");
    },
	
    postpone : function(days)
	{
		if(arguments.length>0)
		{
			if (typeof days === "number")
			{
				this.deadline.setDate(this.deadline.getDate()+days);
				if(arguments.length>1)
					console.log("too much arguments, but the function was done");
			}else
				console.log("days is not a numberthe function was not made");
		}else
			console.log("not enough arguments function did not made");
    }
};

function ToDoList()
{
    this.toDo = [];
	if(arguments.length>0)
		console.log("too many arguments, but the item was created");
}

ToDoList.prototype = 
{
    constructor : ToDoList,
    
    toString : function()
	{
        if(arguments.length>0)
            console.log("Too much arguments-but the function will be done");
        retVal = "";
        this.toDo.forEach(function(item, index, list)
		{
			retVal = retVal+(index+1).toString()+") "+item.toString()+"\n";
        });
        return retVal;
    },
    
    addItem : function(item)
	{
        if(arguments.length>0)
		{
			if(item  instanceof ToDoItem)
			{
				this.toDo[this.toDo.length] = item;

				if(arguments.length>1)
					console.log("too many arguments-but the item was added");
			}else
				console.log("the item received is not an instance of ToDoItem-the item was not added");
		}else
			console.log("not enough arguments received-the item was no added");
    },
    
    getForDate : function(date)
	{
		if(arguments.length>0)
		{
			if(date instanceof Date)
			{
				if(arguments.length>1)
					console.log("too much arguments-but the function will be done");
				var res = this.toDo.filter(function(item,index,list) 
				{
					return  item.deadline.getTime() === date.getTime(); 
				});
				return res;

			}else
				console.log("the date received is not a Date");
		}else
			console.log("there is no date to look for the deadline of items in the array the function was not done");
    },
    
    getOutOfDate : function()
	{
		if(arguments.length>0)
			console.log("too many arguments but the function will be done");
        var res=this.toDo.filter(function(item,index,list)
		{
           return item.isOutOfDate(new Date());
		});
		return res;
    },
    postpone : function(index, days)
	{
		if(arguments.length>1)
		{
			if(typeof index === "number" && typeof days === "number")
			{
				if(this.toDo.length>index)
				{
					if(this.toDo[index]  instanceof ToDoItem)
					{
						this.toDo[index].postpone(days);
						if(arguments.length>2)
							console.log("too much arguments-but it's OK we did the function");
					}else
						console.log("the item in the array is not an instance of ToDoItem can't do the function");
				}else	
					console.log("the array is smaller then the index can't do the function")
			}else
				console.log("the index or days are not a number can't do the function")
		}else
			console.log("not enough arguments the function wasn't done");
    }
};
