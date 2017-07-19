/* Enneagram Test enneagramma.ru
 by Nicholas Stepanov*/

var answered = 0;

var count = new Array();
var ansArr = new Array();
var objArr = new Array();



function renderQuiz() {
    for (var i =0; i < 10; i++)
    {
        count[i] = 0;
    }
    for (var i = 1; i < questions.length; i++)
    {
        ansArr[i] = false;
    }

    document.writeln('<div id="quiz" align="left">')
    for(i=0;i<questions.length;i++) {
        document.writeln('<p class="question" style="font-weight:bold" align="center">' + questions[i] + ' <span id="result_' + i + '"></span></p>');
        for(j=0;j<choices[i].length;j++) {
            document.writeln('<input type="radio" align ="center" name="answer_' + i + '" value="' + choices[i][j] + '" id="answer_' + i + '_' + j + '" class="question_' + i + '" onclick="submitAnswer(' + i + ',this, \'question_' + i + '\', \'label_' + i + '_' + j + '\')" /><label id="label_' + i + '_' + j + '" for="answer_' + i + '_' + j + '"> ' + choices[i][j] + '</label><br /><br>');
         
        }
        document.writeln('<br>');
    }

    document.writeln('<p align="center"><input type="submit" value="Узнать Результат Теста" onclick="showScore()" /> </p><p style="display:none"></p></div>');
   

    
}


function submitAnswer(questionId, obj, classId, labelId) {

    if (!ansArr[questionId])
    {
    getResult(questionId, obj);

    answered++;
    objArr[questionId] = obj;
        ansArr[questionId] = true;
    }
    else
    {
        letResult(questionId, objArr[questionId]);
        getResult(questionId, obj);
        objArr[questionId] = obj;
    }
}

function showScore()
 {
     var responseMsg = "";
     var alertMsg = "\v";
     var i, n;
     var fool = true;
    if(answered != 6) {
        alert("Ответьте на все вопросы!");
        return false;
    }
     for (i = 1; i < count.length; i++)
     {
         if (count[i] >= 6)
         {
             responseMsg += "Очень вероятно, что вы относитесь к Типу " + i;
             alertMsg += response[i-1];
          
             openInNewTab();
             fool = false;
           
             break;
         }
     }
     if (fool)
     {
         for (i = 1; i < count.length; i++)
         {
             if (count[i] >=5)
             {
                 responseMsg += "Вероятно, что вы относитесь к Типу" + i;
                 alertMsg += response[i-1];
                 
                 openInNewTab();
                 fool = false;
                 
                 break;
             }
             
         }
     }
         if (fool)
         {
             for (i = 1; i < count.length; i++)
             {
                 if (count[i] >=4)
                 {
                     responseMsg += "Вы можете относиться к Типу " + i + ", но посмотрите и на Типы ";
                     alertMsg += response[i-1];
                     for (n = 1; n < count.length; n++)
                     {
                         var t;
                         if(n == i)
                             n++;
                         if (count[n] >=3)
                         {
                             t = n;
                             responseMsg += t + " и ";
                        alertMsg += "\v\v" + response[n-1];
                             for (n = 1; n < count.length; n++)
                             {
                                if (n==t)
                                    n++;
                                 if(n == i)
                                     n++;
                                 if (count[n] >=3)
                                 {
                                     t = n;
                                     responseMsg += n + ".";
                                     alertMsg += "\v\v" + response[n-1];
                                     break;
                                    
                                 }
                             }
                         }
                     }
                  
                     openInNewTab();
                     fool = false;
                  
                    break;
                 }
                 
             }
         if (fool)
         {
         responseMsg += "Ваши результаты неопределенные и противоречивые, посмотрите на описания всех типов, но обратите особое внимание на Типы 6 и 9."
             alertMsg+= response[5] + response[8];
             openInNewTab();
             
         }
             
    }
     

     function openInNewTab()
     {
         var resultHTML = '<html><head><title>Результат Теста</title></head><style>body {background-image:url("bg.jpg");}</style><body><div align= center><h1 { color: rgb(180, 134, 8); font-family: \'Droid serif\', serif; font-size: 36px; font-weight: 400; font-style: italic; line-height: 44px; margin: 0 0 12px; text-align: center; }>' + responseMsg + '</h1></div>';
         resultHTML+= alertMsg + response[10] + '</body></html>';
         var win = window.open('about:blank', '_blank', height=500 , top=100, width=1500);
         win.document.write(resultHTML);
         win.focus();
     }


 }
/*
function disableQuestion(classId) {
    var alltags=document.all? document.all : document.getElementsByTagName("*")
    for (i=0; i<alltags.length; i++) {
        if (alltags[i].className == classId) {
            alltags[i].disabled = true;
        }
    }
}

function enableQuestion(classId) {
    var alltags=document.all? document.all : document.getElementsByTagName("*")
    for (i=0; i<alltags.length; i++) {
        if (alltags[i].className == classId) {
            alltags[i].disabled = false;
        }
    }
}
*/
function getResult(questionId, obj)
{
    if (questionId >= 3 && questionId < 6)
    {
        if (obj.value == choices[questionId][1])
        {
            count[1]++;
            count[3]++;
            count[5]++;
        }
        else if (obj.value == choices[questionId][0])
        {
            count[2]++;
            count[7]++;
            count[9]++;
        }
        else if (obj.value == choices[questionId][2])
        {
            count[4]++;
            count[6]++;
            count[8]++;
        }
    }
    if (questionId < 3)
    {
        if (obj.value == choices[questionId][0])
        {
            count[3]++;
            count[7]++;
            count[8]++;
        }
        else   if (obj.value == choices[questionId][1])
        {
            count[4]++;
            count[5]++;
            count[9]++;
        }
        else  if (obj.value == choices[questionId][2])
        {
            count[1]++;
            count[2]++;
            count[6]++;
        }
    }
}

function letResult(questionId, obj)
{
    if (questionId >= 3 && questionId < 6)
    {
        if (obj.value == choices[questionId][1])
        {
            count[1]--;
            count[3]--;
            count[5]--;
        }
        else if (obj.value == choices[questionId][0])
        {
            count[2]--;
            count[7]--;
            count[9]--;
        }
        else if (obj.value == choices[questionId][2])
        {
            count[4]--;
            count[6]--;
            count[8]--;
        }
    }
    if (questionId < 3)
    {
        if (obj.value == choices[questionId][0])
        {
            count[3]--;
            count[7]--;
            count[8]--;
        }
        else   if (obj.value == choices[questionId][1])
        {
            count[4]--;
            count[5]--;
            count[9]--;
        }
        else  if (obj.value == choices[questionId][2])
        {
            count[1]--;
            count[2]--;
            count[6]--;
        }
    }
}







