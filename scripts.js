var allEvents = []

function removeElem(id){
    let element = document.getElementById(id);
    if (window.confirm("You Want to Remove "+element.innerHTML)){
        name = id.split("Elem")[1]
        element.parentNode.removeChild(element);
        for (let i = 0; i<allEvents.length; i++) {
            if (allEvents[i][0] === name){
                allEvents.splice(i,1)
            }
        }
    }
}

function removeElemNoAlert(id){
    let element = document.getElementById(id);
    name = id.split("Elem")[1]
    element.parentNode.removeChild(element);
    for (let i = 0; i<allEvents.length; i++) {
        if (allEvents[i][0] === name){
            allEvents.splice(i,1)
        }
    }
    
}

//Updates Clock
window.addEventListener("load", () => {
    clock()
    function clock() {
        const today = new Date();
        const hours = today.getHours()
        const mins = today.getMinutes()
        const secs = today.getSeconds()


        const hour = hours < 10 ? "0" + hours : hours;
        const min = mins < 10 ? "0" + mins : mins;
        const sec = secs < 10 ? "0" + secs : secs;


        const time = hour+":"+min+":"+sec
        document.getElementById("time").innerHTML = time
        checkTimes()
        adjustTimers()
        setTimeout(clock, 1000);
    }


})

//Checks if the Next Event Starting Time Has Passed
//If it Has, Removes The Event from the All Events List and Creates a new Timer
function checkTimes(){
    if (allEvents.length > 0) {
        let first = allEvents[0];
        const hour = first[3].split(":")[0]
        const min = first[3].split(":")[1]

        const currHour = document.getElementById("time").innerHTML.split(":")[0]
        const currMin = document.getElementById("time").innerHTML.split(":")[1]

        if (hour < currHour || (hour === currHour && min <= currMin)) {
            alert("Time For You To: " + first[0] + "\nNotes: "+first[4])
            removeElemNoAlert("listElem"+first[0])
            document.getElementById('activeTimers').innerHTML += "<li class='activeTimer' onclick='cancelTimer(\""+first[0]+"\")'>"+first[0]+": "+first[1]+":"+first[2]+":00</li><br>"
        }
        

    }
    
}

function cancelTimer(name){
    let timerList = document.getElementById("activeTimers").querySelectorAll("li")
    if (timerList.length > 0){
        timerList.forEach(ele => {
            if (ele.innerHTML.split(":")[0] === name) {
                if (window.confirm("Are Your Sure You Want To Cancel Timer: "+name)) {
                    ele.parentNode.removeChild(ele)
                }
            }
        })
    }
}

//Counts Down Each Timer
function adjustTimers() {
    let timerList = document.getElementById("activeTimers").querySelectorAll("li")
    if(timerList.length>0){
        timerList.forEach(ele => {
            
            x = ele.innerHTML.split(":")
            let hours = parseInt(x[1])
            let mins = parseInt(x[2])
            let sec = parseInt(x[3])

            if (sec === 0 && mins === 0 && hours === 0){
                alert("Times Up For "+x[0])
                ele.parentNode.removeChild(ele)
            } else {
                if (sec > 0) {
                    sec = sec-1
                } else if (mins > 0) {
                    mins = mins - 1
                    sec = 59
                } else if (hours > 0) {
                    hours = hours - 1
                    mins = 59
                    sec = 59
                }


                if (hours < 10) {
                    hours = "0"+String(hours)
                } else {
                    hours = String(hours)
                }

                if (mins < 10) {
                    mins = "0"+String(mins)
                } else {
                    mins = String(mins)
                }

                if (sec < 10) {
                    sec = "0"+String(sec)
                } else {
                    sec = String(sec)
                }
                ele.innerHTML = x[0]+": "+hours+":"+mins+":"+sec
            }

            
        })
    }
}

function addEventToList(name, hours, minutes, startTime, notes){
    document.getElementById('listOfEvents').innerHTML = ""
    let newEvent = [name, hours, minutes, startTime, notes]
    allEvents.push(newEvent)

    allEvents.sort(sortFunction)

    for (let i = 0; i < allEvents.length; i++) {
        let element = allEvents[i]
        let name = element[0]
        let hours = element[1]
        let min = element[2]
        let start = element[3]
        let notes = element[4]
        document.getElementById('listOfEvents').innerHTML += ("<li class='listOfEventsItem' id='listElem"+name+"' onclick=\"removeElem(\'listElem"+name+"\')\">"+name+", "+hours+" Hours "+min+" Minutes, Start Time: "+start+" Notes: "+ notes +"</li>")
    }
    

}

//Custom Sorting Function to Allow Us to Sort the List of All Events for the Day by Starting Hour and Minute
function sortFunction(a,b){
    let aHours = parseInt(a[3].split(":")[0])
    let aMin = parseInt(a[3].split(":")[1])
    let bHours = parseInt(b[3].split(":")[0])
    let bMin = parseInt(b[3].split(":")[1])

    if (aHours === bHours && aMin === bMin){
        return 0
    } else if (aHours < bHours || (aHours === bHours && aMin < bMin)){
        return -1
    } else {
        return 1
    }
}