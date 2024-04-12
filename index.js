// Your code here

createEmployeeRecord= (row) => {
    return {
       firstName:row [0],
       familyName: row [1],
       title: row [2],
       payPerHour: row [3],
       timeInEvents:  [],
       timeOutEvents: []
    }
   }
   createEmployeeRecords = (employeeRowData) =>{
       return employeeRowData.map((row)=>{
           return createEmployeeRecord(row);
       });
   };
   
    createTimeInEvent = ( employee, dateStamp)=>{
       let [date, hour] = dateStamp.split(' ')
   
       employee.timeInEvents.push({
           type: "TimeIn",
           hour: parseInt(hour, 10),
           date,
       })
   
       return  employee
   }
    createTimeOutEvent = ( employee, dateStamp)=>{
       let [date, hour] = dateStamp.split(' ')
   
       employee.timeOutEvents.push({
           type: "TimeOut",
           hour: parseInt(hour, 10),
           date,
       })
   
       return  employee
   }
   hoursWorkedOnDate=( employee, workedDate)=> {
       let inEvent =  employee.timeInEvents.find(function(e){
           return e.date === workedDate
       })
       let outEvent =  employee.timeOutEvents.find(function(e){
           return e.date === workedDate
       })
       return (outEvent.hour - inEvent.hour) / 100
   }

   wagesEarnedOnDate = function(employee, earnDate){
    let Wage = hoursWorkedOnDate(employee, earnDate)
        * employee.payPerHour
    return parseFloat(Wage.toString())
}


allWagesFor = function(employee){
    let wageDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = wageDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}
   findEmployeeByFirstName=(srcArray,firstName)=>{
       return srcArray.find((rec)=>{
           return rec.firstName === firstName
       })
   
   }
   calculatePayroll = (arrayOfEmployeeRecords)=>{
    return arrayOfEmployeeRecords.reduce((memo, rec)=>{
        return memo + allWagesFor(rec)
    }, 0)
}

