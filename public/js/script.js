/* TIMER TEST
function init()
{
    updateTime();
    window.setInterval(updateTime,1000);
}


function updateTime()
{
    var time = document.getElementById('time');
    time.innerText = new Date().toLocaleString();
}


*/

var xhttp = new XMLHttpRequest(); //AJAX variable


// Timer variables
var local_timer;
var c = 0; // przechowuje czas spedzony na przerwie w sekundach
var m = 0; // liczba minut na przerwie
var cc = 0; // zmienna pomocnicza do przeliczania sekund na minuty
var on_break = false; // flaga czy ktos jest na przerwie
var user_status = "Available"; // status agenta 





//Timer functions
function update() // Wysylanie info ze ktos jest na przerwie do PHP
{
    $.post('take_break.php',{poststatus:user_status,posttime:c},function(data)
    
    {
        $('#result').html(data);
        
    });
    
    }
function timer_start()
{
        if(!on_break)
    {
        local_timer = setInterval(clock, 1000);
        user_status = "Break";
    }
    on_break = true;
    user_status = "Break";
    $("status").html = user_status;
    
    function clock()
    {
        if(c%60>9)document.getElementById("breaktime").innerHTML = m+":"+c%60;
        else document.getElementById("breaktime").innerHTML = m+":"+"0"+c%60;
        update();
     
     c++;
     cc++;
     if (cc == 60)
     {
         cc = 0;
         m++;
     }
    }

}
function timer_stop()
{
    if(on_break)clearInterval(local_timer);
    on_break = false;
    user_status = "Available";
    document.getElementById("status").innerHTML = user_status;
    if(c%60>9)document.getElementById("breaktime").innerHTML = m+":"+c%60;
    else document.getElementById("breaktime").innerHTML = m+":"+"0"+c%60;
}

function lunch_start()
{
    if(!on_break)
    {
        local_timer = setInterval(clock, 1000);
        user_status = "Lunch";
    }
    on_break = true;
    document.getElementById("status").innerHTML = user_status;
    
    function clock()
    {
        if(c%60>9)document.getElementById("breaktime").innerHTML = m+":"+c%60;
        else document.getElementById("breaktime").innerHTML = m+":"+"0"+c%60;
     
     c++;
     cc++;
     if (cc == 60)
     {
         cc = 0;
         m++;
     }
    }

}