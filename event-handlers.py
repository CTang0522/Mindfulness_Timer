#This file will hold all python scripts run within the javascript section of the HTML Document
#In order to run this python code, we utilized the "py-script" library to defer scripting to a python file

#Necessary Imports
import js
from datetime import datetime
from time import *




#Updates the Current Time On the Main Site
def updateTime():
    time_string = strftime("%I:%M:%S")
    #js.document.getElementById("time").innerHTML = time_string






#Saves Each Event's Variables
class Event():
    def __init__(self, name, hours, minutes, start, notes):
        self.name=name
        self.hours=hours
        self.minutes=minutes
        self.start=start
        self.notes=notes
    



def startNewDay():
    xelem = js.document.getElementById('stuff')
    if xelem.style.visibility=="visible":
        if js.window.confirm("Do You Want To Start a New Day?"):
            js.location.reload()
    else:
        xelem.style.visibility="visible"

def clearForm():
    js.document.getElementById('eventName').value = ""
    js.document.getElementById('eventHours').value = 0
    js.document.getElementById('eventMinutes').value = 0
    js.document.getElementById('eventStartTime').value = ""
    js.document.getElementById('eventNotes').value = ""

def enterEvent():
    #Takes Values from Form Entering Data
    name = js.document.getElementById('eventName').value
    hours = int(js.document.getElementById('eventHours').value)
    minutes = int(js.document.getElementById('eventMinutes').value)
    startTime = js.document.getElementById('eventStartTime').value
    notes = js.document.getElementById('eventNotes').value
    if notes == "":
        notes = "No Notes"
    
    #Checking that necessary fields are filled in
    if name=="":
        js.alert("Enter an Event Name")
    elif (":" in name):
        js.alert("Please Do Not Use the ':' Character in Event Names")
    elif (hours==0 and minutes==0):
        js.alert("You Have Not Entered Estimated Duration of Event")
    elif (startTime==""):
        js.alert("You Have Not Entered a Start Time")
    else:
        currHour = (datetime.now().hour)
        currMin = (datetime.now().minute)
        startHour = startTime.split(":")[0]
        startMin = startTime.split(":")[1]

        if (int(startHour) < currHour or (int(startHour) == currHour and int(startMin) < currMin)):
            js.alert("Your Start Time Has Already Passed")
        else:
            x = Event(name,hours,minutes,startTime,notes)
            
            #Clears the Form Fields
            clearForm()
        

            js.addEventToList(name,hours,minutes,startTime,notes)
        


