/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.99968253968254, "KoPercent": 3.1746031746031746E-4};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.23731700680272108, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [2.857142857142857E-5, 500, 1500, "GetJogosPorSeguir"], "isController": false}, {"data": [0.9781714285714286, 500, 1500, "AcederPaginaLogin"], "isController": false}, {"data": [5.428571428571429E-4, 500, 1500, "LikePost"], "isController": false}, {"data": [0.9998, 500, 1500, "CarregarLandingPage"], "isController": false}, {"data": [0.9960571428571429, 500, 1500, "CarregarPaginaSeguirJogos"], "isController": false}, {"data": [3.4285714285714285E-4, 500, 1500, "GetPostsJogo"], "isController": false}, {"data": [0.0, 500, 1500, "GetGrupo"], "isController": false}, {"data": [0.0, 500, 1500, "AcederLandingPage"], "isController": true}, {"data": [0.003914285714285714, 500, 1500, "GetPerfil"], "isController": false}, {"data": [2.5714285714285715E-4, 500, 1500, "GetJogosSeguidos"], "isController": false}, {"data": [0.0, 500, 1500, "GetPostsPopulares"], "isController": false}, {"data": [3.4285714285714285E-4, 500, 1500, "AcederFeed"], "isController": true}, {"data": [9.142857142857143E-4, 500, 1500, "DislikePost"], "isController": false}, {"data": [1.1428571428571428E-4, 500, 1500, "SeguirJogos"], "isController": false}, {"data": [0.004, 500, 1500, "RealizarLogin"], "isController": false}, {"data": [2.2857142857142857E-4, 500, 1500, "CriarPublicacao"], "isController": false}, {"data": [0.9986, 500, 1500, "CarregarFeed"], "isController": false}, {"data": [2.857142857142857E-5, 500, 1500, "AcederListaJogos"], "isController": true}, {"data": [0.0023142857142857145, 500, 1500, "Logout"], "isController": false}, {"data": [0.9964, 500, 1500, "AcederCriarPublicacao"], "isController": false}, {"data": [0.0016, 500, 1500, "GetJogosPopulares"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 315000, 1, 3.1746031746031746E-4, 6109.8293111111025, 5, 42837, 5835.0, 12999.900000000001, 13523.0, 13842.0, 81.65061778412665, 151.33455281933104, 15.473345419082813], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetJogosPorSeguir", 17500, 0, 0.0, 11399.958057142774, 1088, 22453, 12296.0, 13950.0, 14054.0, 14172.990000000002, 4.549372914437474, 36.70800403591119, 0.8219081925497389], "isController": false}, {"data": ["AcederPaginaLogin", 17500, 0, 0.0, 113.92268571428515, 38, 6392, 60.5, 94.0, 333.9500000000007, 1453.7700000000368, 4.595921343038519, 5.435215572675435, 0.6687424610475969], "isController": false}, {"data": ["LikePost", 17500, 0, 0.0, 9514.687142857125, 203, 20108, 9539.0, 13274.9, 13566.0, 13865.0, 4.5859562819477375, 0.9315223697706341, 0.8598668028652007], "isController": false}, {"data": ["CarregarLandingPage", 17500, 0, 0.0, 45.55577142857131, 37, 695, 41.0, 54.0, 57.0, 86.0, 4.581016320721403, 5.417588637103144, 0.6665736638549697], "isController": false}, {"data": ["CarregarPaginaSeguirJogos", 17500, 0, 0.0, 78.41634285714301, 38, 1143, 57.0, 88.0, 119.0, 461.9900000000016, 4.550611511174872, 5.381631386750751, 0.6621495265283749], "isController": false}, {"data": ["GetPostsJogo", 17500, 0, 0.0, 11387.996228571403, 407, 19374, 11527.0, 13758.0, 13891.0, 14109.0, 4.57266009144275, 27.07706720694932, 0.8171843718105696], "isController": false}, {"data": ["GetGrupo", 17500, 0, 0.0, 7571.851942857147, 2326, 31269, 7691.5, 10493.9, 11888.600000000006, 13400.0, 4.545919764256394, 1.1586768149130067, 0.8035268333304758], "isController": false}, {"data": ["AcederLandingPage", 17500, 1, 0.005714285714285714, 33643.41680000013, 8461, 92324, 32158.5, 44413.8, 48748.850000000006, 57955.47000000009, 4.540674453620643, 58.96437875148902, 4.7800749261556605], "isController": true}, {"data": ["GetPerfil", 17500, 0, 0.0, 4830.0017714285705, 225, 42718, 4572.0, 5987.0, 6901.0, 9596.950000000008, 4.567568696233191, 2.4235861050318945, 0.8028929348847407], "isController": false}, {"data": ["GetJogosSeguidos", 17500, 0, 0.0, 6313.371428571428, 458, 26512, 5991.0, 8546.0, 9615.95, 12605.920000000013, 4.5494143084019365, 14.093476484743604, 0.8441296080042655], "isController": false}, {"data": ["GetPostsPopulares", 17500, 0, 0.0, 9586.54274285711, 2479, 27069, 9435.0, 13276.0, 13662.95, 14050.970000000005, 4.546034312427897, 26.920500252840686, 0.8168655405143876], "isController": false}, {"data": ["AcederFeed", 17500, 0, 0.0, 11447.802514285706, 447, 19422, 11576.0, 13832.0, 13966.95, 14186.990000000002, 4.572605130724249, 32.484383175573015, 1.4825243197270024], "isController": true}, {"data": ["DislikePost", 17500, 0, 0.0, 7684.052228571425, 203, 17745, 6881.0, 11426.0, 12501.0, 13550.990000000002, 4.602563391105586, 0.9348956888183222, 0.786570892034646], "isController": false}, {"data": ["SeguirJogos", 17500, 0, 0.0, 12447.114971428518, 492, 22714, 13329.0, 14004.0, 14092.95, 14213.0, 4.555620086275635, 1.1744958034929371, 1.0499280667588378], "isController": false}, {"data": ["RealizarLogin", 17500, 0, 0.0, 5119.792514285726, 561, 40649, 4598.0, 7104.9, 8635.95, 10424.980000000003, 4.58044078497762, 2.429100788477077, 1.176421803172963], "isController": false}, {"data": ["CriarPublicacao", 17500, 0, 0.0, 12319.775771428513, 346, 19415, 12856.5, 13819.0, 13968.0, 14139.0, 4.563530869026664, 1.1765353021709368, 1.7291503683421345], "isController": false}, {"data": ["CarregarFeed", 17500, 0, 0.0, 59.63891428571411, 38, 1124, 51.0, 84.0, 86.0, 240.0, 4.573097434675263, 5.408223626359124, 0.6654214040689591], "isController": false}, {"data": ["AcederListaJogos", 17500, 0, 0.0, 11478.53285714286, 1139, 22542, 12387.0, 14028.0, 14131.0, 14253.0, 4.5493232426744195, 42.0877111024089, 1.4838612920441954], "isController": true}, {"data": ["Logout", 17500, 0, 0.0, 6140.9465714285525, 167, 42837, 5350.0, 9534.0, 10618.0, 12060.0, 4.618944959068229, 0.9382231948107341, 0.8886056220082433], "isController": false}, {"data": ["AcederCriarPublicacao", 17500, 0, 0.0, 67.65731428571442, 38, 1757, 52.0, 86.0, 89.0, 423.9700000000048, 4.563901003510552, 5.397347768800078, 0.6640832514873753], "isController": false}, {"data": ["GetJogosPopulares", 17500, 1, 0.005714285714285714, 5295.645200000023, 5, 23840, 4970.5, 6771.0, 7754.850000000002, 11480.590000000066, 4.556606989001913, 9.104515995008692, 0.863214104124198], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, 100.0, 3.1746031746031746E-4], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 315000, 1, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GetJogosPopulares", 17500, 1, "Non HTTP response code: java.net.BindException/Non HTTP response message: Address already in use: connect", 1, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
