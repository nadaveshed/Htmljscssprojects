

var tempArr = [];

function parseText(text, caseSensitive, punc)
{   
    if (punc == false)
    {
        var punctuationless = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        var text = punctuationless.replace(/\s{2,}/g," ");
    }
    
    var arr = text.split(' ');
    var count=1;
    var match=false;
    var arr2 = [[]];
    
    for (var i=0; i<arr.length; i++)
    {
        count=1;
        
        for(var j=0; j<arr.length; j++)
        {
            if (caseSensitive == false)
            {
                if(arr[i].toLowerCase()==arr[j].toLowerCase() && i!=j)
                {
                    count++;
                }
            }
            else
            {
                if(arr[i]==arr[j] && i!=j)
                {
                    count++;
                }
            }
        }
                arr2 = [arr[i],count];
            tempArr.push(arr2);
            match=false;
    }
    
    var z=0;
    for(var i = 0; i<tempArr.length;i++)
    {       
        for(var j=0; j<tempArr.length;j++)
        {
            if (caseSensitive == false)
            {
                if(tempArr[i][0].toUpperCase()==tempArr[j][0].toUpperCase() && i!=j)
                {
                    tempArr.splice(j, 1);

                }
            }
            else
            {
                 if(tempArr[i][0]==tempArr[j][0] && i!=j)
                {
                    tempArr.splice(j, 1);
                }
            }
        }
    }
    console.log(tempArr);
}

var arr = tempArr;
console.log(tempArr);

function sortText(arr, word)
{
    var array = arr;
    if(word==true)
    {
        array.sort();
        console.log(array);
    }
    else if(word==false)
    {
        array.sort(compareSecondColumn);
        console.log(array);
    }
}

function compareSecondColumn(a, b) 
{
    if (a[1] === b[1]) 
    {
        return 0;
    }
    else 
    {
        return (a[1] < b[1]) ? -1 : 1;
    }
}