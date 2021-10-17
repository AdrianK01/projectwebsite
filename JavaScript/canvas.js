//Written by Adrian Klimaszewski
let col1;
let col2;
let col3;
let type = 0;
let data = new Array;
let day1 = new Array;
let day2 = new Array;
let day3 = new Array;
let day4 = new Array;
let day5 = new Array;
let day6 = new Array;
let day7 = new Array;
let max1;
let max2;
let max3;
let weekDay = ["MON", "TUE", "WEN", "THU", "FRI", "SAT", "SUN"];
let drawing = document.querySelector('#visualisation');
let ctx = drawing.getContext("2d");

//Drawing on canvas

//Draws part of the pie chart
function drawPieSlice(cX, cY, radius, sAngle, eAngle, colour) {
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.moveTo(cX, cY);
    ctx.arc(cX, cY, radius, sAngle, eAngle);
    ctx.closePath();
    ctx.fill();
}
//Draws Pie Chart
function Piechart() {
    let cX = drawing.width / 2;
    let cY = drawing.height / 2;
    let radius = cY - 10;
    let pie1Value = max1 / (max1 + max2 + max3) * 100;
    let pie2Value = max2 / (max1 + max2 + max3) * 100;
    let pie3Value = max3 / (max1 + max2 + max3) * 100;
    //console.log(cX);
    //console.log(cY);
    //console.log(radius);
    let pie1End = max1 / (max1 + max2 + max3) * Math.PI * 2;
    let pie2End = pie1End + max2 / (max1 + max2 + max3) * Math.PI * 2;
    let pie3End = pie2End + max3 / (max1 + max2 + max3) * Math.PI * 2;
    drawPieSlice(cX, cY, radius, 0, pie1End, col1);
    drawPieSlice(cX, cY, radius, pie1End, pie2End, col2);
    drawPieSlice(cX, cY, radius, pie2End, pie3End, col3);
    ctx.font = "10px Arial";
    ctx.fillStyle = "white";
    let labelX1 = cX + (0.5 * radius) * Math.cos(pie1End / 2);
    let labelY1 = cY + (0.5 * radius) * Math.sin(pie1End / 2);
    let labelX2 = cX + (0.5 * radius) * Math.cos((pie1End + pie2End) / 2);
    let labelY2 = cY + (0.5 * radius) * Math.sin((pie1End + pie2End) / 2);
    let labelX3 = cX + (0.5 * radius) * Math.cos((pie2End + pie3End) / 2);
    let labelY3 = cY + (0.5 * radius) * Math.sin((pie2End + pie3End) / 2);
    ctx.fillText(pie1Value.toFixed(2) + "%", labelX1, labelY1);
    ctx.fillText(pie2Value.toFixed(2) + "%", labelX2, labelY2);
    ctx.fillText(pie3Value.toFixed(2) + "%", labelX3, labelY3);
    //console.log(labelX1);
    //console.log(labelY1);
}
//Draws rectangle
function drawRectangle(sX, sY, width, height, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(sX, sY, width, height);
    ctx.stroke();
}
//Draws bar chart
function Barchart() {
    let whatDay = 0; let j = 0;
    let a = 1;
    let unitSize = drawing.width / 30;
    let unitHeigth = drawing.height / 6;
    ctx.font = "10px Arial";
    //Draws bars
    for (i = unitSize * 2; i < drawing.width; i = i + unitSize) {
        console.log(i)
        if (a == 1) {
            drawRectangle(i, drawing.height - (unitHeigth * data[j] + unitHeigth / 2), unitSize, unitHeigth * data[j], col1); j++;
        }
        if (a == 2) {
            drawRectangle(i, drawing.height - (unitHeigth * data[j] + unitHeigth / 2), unitSize, unitHeigth * data[j], col2);
            j++;
        }
        if (a == 3) {
            drawRectangle(i, drawing.height - (unitHeigth * data[j] + unitHeigth / 2), unitSize, unitHeigth * data[j], col3);
            j++;
        }
        if (a == 4) {
            a = 0;
        }
        a++;
        //console.log(j);

    }
    j = 0;
    //Add name of days of the week
    ctx.fillStyle = 'black';
    for (i = unitSize * 2.5; i < drawing.width; i = i + 4 * unitSize) {
        ctx.fillText(weekDay[j], i, drawing.height - 10);
        j++;
    }
    //Add scale on the left side
    j = 0;
    for (i = unitHeigth / 2; i < drawing.height; i = i + unitHeigth) {
        ctx.fillText(j + "-", unitSize / 2, drawing.height - i + 2);
        j++;
    }

}
//Draws line
function drawLine(sX, sY, eX, eY, colour) {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
    ctx.closePath();
    ctx.strokeStyle = colour;
    ctx.stroke()
}
//Draws line graph
function Linechart() {
    let unitSize = drawing.width / 10;
    let unitHeigth = drawing.height / 6;
    let j = 0; let i = 0;
    for (i = unitSize * 2; i < drawing.width - unitSize; i = i + unitSize) {
        drawLine(i, drawing.height - (unitHeigth * data[j] + unitHeigth / 2), i + unitSize, drawing.height - (unitHeigth * data[j + 3] + unitHeigth / 2), col1);
        j++;
        drawLine(i, drawing.height - (unitHeigth * data[j] + unitHeigth / 2), i + unitSize, drawing.height - (unitHeigth * data[j + 3] + unitHeigth / 2), col2);
        j++;
        drawLine(i, drawing.height - (unitHeigth * data[j] + unitHeigth / 2), i + unitSize, drawing.height - (unitHeigth * data[j + 3] + unitHeigth / 2), col3);
        j++;

    }
    //Add scale on the left side
    j = 0;
    ctx.font = "10px Arial";
    ctx.fillStyle = "black";
    for (i = unitHeigth / 2; i < drawing.height; i = i + unitHeigth) {
        ctx.fillText(j + "-", unitSize / 2, drawing.height - i + 2);
        j++;
    }
    j = 0;
    //Add days of the weeks
    i = unitSize * 1.5 + 5;
    for (j = 0; j < 7; j++) {
        ctx.fillText(weekDay[j], i, drawing.height - 10);
        i = i + unitSize;
    }
}



//Colour Handling
function Colour() {

    const colour1 = document.querySelector('#C1');
    const colour2 = document.querySelector('#C2');
    const colour3 = document.querySelector('#C3');
    const uni = document.querySelector('#Uni');
    const games = document.querySelector('#Games');
    const cooking = document.querySelector('#Cooking');
    //Basic Settings
    uni.style.backgroundColor = 'red';
    col1 = 'red';
    games.style.backgroundColor = 'blue';
    col2 = 'blue';
    cooking.style.backgroundColor = 'green';
    col3 = 'green';

    colour1.addEventListener('change', function () {
        console.log("First colour");
        uni.style.backgroundColor = 'red';
        col1 = 'red';
        games.style.backgroundColor = 'blue';
        col2 = 'blue';
        cooking.style.backgroundColor = 'green';
        col3 = 'green';
        console.log(col1 + " " + col2 + " " + col3 + " " + type);
        drawGraph()
    });
    colour2.addEventListener('change', function () {
        console.log("Second colour");
        uni.style.backgroundColor = 'orange';
        col1 = 'orange';
        games.style.backgroundColor = 'darkgreen';
        col2 = 'darkgreen';
        cooking.style.backgroundColor = 'darkblue';
        col3 = 'darkblue';
        console.log(col1 + " " + col2 + " " + col3 + " " + type);
        drawGraph()
    });
    colour3.addEventListener('change', function () {
        console.log("Third colour");
        uni.style.backgroundColor = 'black';
        col1 = 'black';
        games.style.backgroundColor = 'red';
        col2 = 'red';
        cooking.style.backgroundColor = 'goldenrod';
        col3 = 'goldenrod';
        console.log(col1 + " " + col2 + " " + col3 + " " + type);
        drawGraph()
    });
}

//Type of graph handling
function Type() {
    const type1 = document.querySelector('#T1');
    const type2 = document.querySelector('#T2');
    const type3 = document.querySelector('#T3');
    type = 1;
    type1.addEventListener('change', function () {
        console.log("First type");
        type = 1;
        console.log(col1 + " " + col2 + " " + col3 + " " + type);
        drawGraph()
    })
    type2.addEventListener('change', function () {
        console.log("Second type");
        type = 2;
        console.log(col1 + " " + col2 + " " + col3 + " " + type);
        drawGraph()
    })
    type3.addEventListener('change', function () {
        console.log("Third type");
        type = 3;
        console.log(col1 + " " + col2 + " " + col3 + " " + type);
        drawGraph()
    })
}

//Getting data from table
function Table() {
    const dataTable = document.querySelector('#table');
    var noRows = dataTable.rows.length;
    // console.log(noRows)
    for (var i = 1; i < noRows; i++) {
        var cellAccess = dataTable.rows.item(i).cells;
        var noCells = cellAccess.length
        //console.log(noCells);
        for (var j = 1; j < noCells; j++) {
            //console.log(cellAccess.item(j).innerHTML);
            var number = cellAccess.item(j).innerHTML;
            data.push(number);
        }
    }
    //console.log(data);
}

//Putting data in array for each day, calculating overall value of time spent on each activity
function DataManipulation() {
    for (var i = 0; i < 7; i++) {
        for (var j = 3 * i; j < i * 3 + 3; j++) {
            // console.log(data[j]);
            if (i == 0) { day1.push(parseInt(data[j])); }
            if (i == 1) { day2.push(parseInt(data[j])); }
            if (i == 2) { day3.push(parseInt(data[j])); }
            if (i == 3) { day4.push(parseInt(data[j])); }
            if (i == 4) { day5.push(parseInt(data[j])); }
            if (i == 5) { day6.push(parseInt(data[j])); }
            if (i == 6) { day7.push(parseInt(data[j])); }
        }
    }
    max1 = day1[0] + day2[0] + day3[0] + day4[0] + day5[0] + day6[0] + day7[0];
    max2 = day1[1] + day2[1] + day3[1] + day4[1] + day5[1] + day6[1] + day7[1];
    max3 = day1[2] + day2[2] + day3[2] + day4[2] + day5[2] + day6[2] + day7[2];
    /*  console.log(day1);
      console.log(day2);
      console.log(day3);
      console.log(day4);
      console.log(day5);
      console.log(day6);
      console.log(day7);
      console.log(max1);
      console.log(max2);
      console.log(max3) */
}
function drawGraph() {
    ctx.beginPath()
    ctx.clearRect(0, 0, 300, 300);
    if (type == 1) {
        Barchart();
    }
    if (type == 2) {
        Piechart();
    }
    if (type == 3) {
        Linechart();
    };

}


Colour();
Type();
Table();
DataManipulation();
Barchart();