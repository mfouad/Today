// divs
var svg = d3.select("#main");

// load data
var data = events;

function fixTime(arr)
{
    arr.forEach(function (d) {
        if (d.start > 22)
            return;
        
        var date = d3.time.hour.round(new Date());

        d.start = date.setHours(d.start);
        d.end = date.setHours(d.end);
    });
}

// draw table
var calendar = d3.chart.vcalendar();

calendar.width($("#main").width())
    .height(1000)
    .margin(60)
    .translate(0, 0)
    .dayStart(8);

fixTime(data);
calendar.data(data);
calendar(svg);



