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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3758673469387755, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.061642857142857145, 500, 1500, "GetJogosPorSeguir"], "isController": false}, {"data": [1.0, 500, 1500, "AcederPaginaLogin"], "isController": false}, {"data": [0.2042857142857143, 500, 1500, "LikePost"], "isController": false}, {"data": [1.0, 500, 1500, "CarregarLandingPage"], "isController": false}, {"data": [1.0, 500, 1500, "CarregarPaginaSeguirJogos"], "isController": false}, {"data": [0.07278571428571429, 500, 1500, "GetPostsJogo"], "isController": false}, {"data": [0.2948571428571429, 500, 1500, "GetGrupo"], "isController": false}, {"data": [2.1428571428571427E-4, 500, 1500, "AcederLandingPage"], "isController": true}, {"data": [0.37157142857142855, 500, 1500, "GetPerfil"], "isController": false}, {"data": [0.2832857142857143, 500, 1500, "GetJogosSeguidos"], "isController": false}, {"data": [0.10314285714285715, 500, 1500, "GetPostsPopulares"], "isController": false}, {"data": [0.056, 500, 1500, "AcederFeed"], "isController": true}, {"data": [0.2522142857142857, 500, 1500, "DislikePost"], "isController": false}, {"data": [0.04385714285714286, 500, 1500, "SeguirJogos"], "isController": false}, {"data": [0.3692857142857143, 500, 1500, "RealizarLogin"], "isController": false}, {"data": [0.07385714285714286, 500, 1500, "CriarPublicacao"], "isController": false}, {"data": [1.0, 500, 1500, "CarregarFeed"], "isController": false}, {"data": [0.043, 500, 1500, "AcederListaJogos"], "isController": true}, {"data": [0.32671428571428573, 500, 1500, "Logout"], "isController": false}, {"data": [1.0, 500, 1500, "AcederCriarPublicacao"], "isController": false}, {"data": [0.3365, 500, 1500, "GetJogosPopulares"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 126000, 0, 0.0, 1178.934412698395, 37, 32626, 1467.0, 1816.9000000000015, 1898.0, 2005.0, 84.15911683689963, 155.80915935583042, 15.948773606298309], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetJogosPorSeguir", 7000, 0, 0.0, 1880.6712857142886, 372, 10001, 1853.0, 2320.800000000001, 2712.8499999999995, 2928.0, 4.693485241335659, 37.873036085484124, 0.847944110983493], "isController": false}, {"data": ["AcederPaginaLogin", 7000, 0, 0.0, 54.45799999999997, 37, 212, 50.0, 82.0, 85.0, 105.96999999999935, 4.6869298266170745, 5.5428437695637465, 0.6819849064120548], "isController": false}, {"data": ["LikePost", 7000, 0, 0.0, 1616.145285714283, 198, 32626, 1583.0, 1964.0, 2079.95, 2520.0, 4.719881760219218, 0.9587259825445288, 0.8849778300411034], "isController": false}, {"data": ["CarregarLandingPage", 7000, 0, 0.0, 40.47557142857153, 37, 158, 40.0, 42.0, 43.0, 50.98999999999978, 4.687403740816037, 5.54340422864084, 0.6820538646304585], "isController": false}, {"data": ["CarregarPaginaSeguirJogos", 7000, 0, 0.0, 53.932428571428645, 37, 240, 50.0, 82.0, 84.0, 89.0, 4.694561752600619, 5.551869416405616, 0.6830954112670823], "isController": false}, {"data": ["GetPostsJogo", 7000, 0, 0.0, 1858.724285714284, 358, 18125, 1840.5, 2231.0, 2520.8999999999996, 2846.0, 4.711149338722888, 27.84896687229151, 0.8419339150256724], "isController": false}, {"data": ["GetGrupo", 7000, 0, 0.0, 1451.6789999999992, 144, 5131, 1428.0, 1800.0, 1897.0, 2213.0, 4.688791510875987, 1.195092367518196, 0.8287805307310093], "isController": false}, {"data": ["AcederLandingPage", 7000, 0, 0.0, 7487.1985714285665, 1179, 32781, 7416.5, 8951.900000000001, 9377.8, 10123.919999999998, 4.683831347277323, 60.699202108284496, 4.9308302659814], "isController": true}, {"data": ["GetPerfil", 7000, 0, 0.0, 1333.4890000000041, 159, 25108, 1317.0, 1752.0, 1859.0, 2069.9299999999985, 4.68702711244312, 2.487484015982093, 0.8238914846091422], "isController": false}, {"data": ["GetJogosSeguidos", 7000, 0, 0.0, 1502.0032857142824, 248, 26352, 1462.0, 1867.0, 1964.9499999999998, 2226.9299999999985, 4.686967485167422, 14.519489661010056, 0.869652170099424], "isController": false}, {"data": ["GetPostsPopulares", 7000, 0, 0.0, 1757.555999999998, 357, 9814, 1733.0, 2122.0, 2248.0, 2714.9799999999996, 4.69060752748696, 27.651988614471595, 0.8428435400953131], "isController": false}, {"data": ["AcederFeed", 7000, 0, 0.0, 1899.5190000000057, 397, 18205, 1882.0, 2271.0, 2560.8999999999996, 2889.0, 4.711016172918522, 33.41950838737542, 1.527399774813427], "isController": true}, {"data": ["DislikePost", 7000, 0, 0.0, 1513.5209999999995, 198, 21803, 1504.0, 1857.0, 1962.0, 2194.99, 4.72786414009607, 0.9603474034570142, 0.8079845942546995], "isController": false}, {"data": ["SeguirJogos", 7000, 0, 0.0, 1994.0218571428652, 410, 30685, 1955.0, 2516.0, 2864.0, 2961.9699999999993, 4.697545197095575, 1.211085871126203, 1.0826373696431206], "isController": false}, {"data": ["RealizarLogin", 7000, 0, 0.0, 1352.6209999999978, 163, 26847, 1340.0, 1761.9000000000005, 1884.0, 2181.9699999999993, 4.686694474387214, 2.485278627124914, 1.2037115691053102], "isController": false}, {"data": ["CriarPublicacao", 7000, 0, 0.0, 1913.3001428571445, 338, 26483, 1874.0, 2425.0, 2775.0, 2872.99, 4.702866195394685, 1.207409720505303, 1.7819453943487673], "isController": false}, {"data": ["CarregarFeed", 7000, 0, 0.0, 40.633857142857146, 37, 150, 40.0, 42.0, 42.94999999999982, 55.98999999999978, 4.712211764103987, 5.57274262336907, 0.6856636258315371], "isController": false}, {"data": ["AcederListaJogos", 7000, 0, 0.0, 1934.7732857142853, 426, 10056, 1907.5, 2371.0, 2761.0, 2980.0, 4.693349925442784, 43.42238047273935, 1.5308387452127832], "isController": true}, {"data": ["Logout", 7000, 0, 0.0, 1414.259142857142, 167, 30790, 1405.0, 1776.0, 1900.9499999999998, 2187.99, 4.733996724074267, 0.9615930845775855, 0.910739604143194], "isController": false}, {"data": ["AcederCriarPublicacao", 7000, 0, 0.0, 41.831000000000074, 37, 208, 40.0, 45.0, 52.0, 83.0, 4.70383322088932, 5.562834014157194, 0.6844444823364343], "isController": false}, {"data": ["GetJogosPopulares", 7000, 0, 0.0, 1401.4972857142882, 202, 14615, 1375.0, 1802.0, 1905.9499999999998, 2131.959999999999, 4.687096156447234, 9.365113679658405, 0.8879850140144175], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 126000, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
