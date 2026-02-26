const line1Data = [
 { productionEntry: "24947", itemCode: "38070" , description1 : "Boars Head Pork and Beef franks 4/1" , description2 : "Cooked WIP for FP - 28162", pounds : 5000 ,startTime : "2024-06-01T08:00:00Z", endTime : "2024-06-01T12:00:00Z" },
  { productionEntry: "24948", itemCode: "38070" , description1 : "Aldi Cocktails 4- 1" , description2 : "Cooked WIP for FP - 28162" ,pounds : 5000, startTime : "2024-06-01T08:00:00Z", endTime : "2024-06-01T12:00:00Z" },
  { productionEntry: "24949", itemCode: "38070" , description1 : "Brinkers Jalapeno Cheddar" , description2 : "Cooked WIP for FP - 28162" ,pounds : 5000 , startTime : "2024-06-01T08:00:00Z", endTime : null }, 
]

const line2Data = [
    
 { productionEntry: "24947", itemCode: "38070" , description1 : "Boars Head Pork and Beef franks 4/1" , description2 : "Cooked WIP for FP - 28162", pounds : 5000 ,startTime : "2024-06-01T08:00:00Z", endTime : "2024-06-01T12:00:00Z" },
  { productionEntry: "24948", itemCode: "38070" , description1 : "Aldi Cocktails 4- 1" , description2 : "Cooked WIP for FP - 28162" ,pounds : 5000, startTime : "2024-06-01T08:00:00Z", endTime : "2024-06-01T12:00:00Z" },
 

]

const getData = (lineNumber) => {
    switch(lineNumber){
        case 1:
            return line1Data
        case 2: 
            return line2Data
    }
}

module.exports = {
    getData
}