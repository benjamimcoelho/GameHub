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

    var data = {"OkPercent": 99.99296296296296, "KoPercent": 0.007037037037037037};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.22866984126984127, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.001, 500, 1500, "GetJogosPorSeguir"], "isController": false}, {"data": [0.8696, 500, 1500, "AcederPaginaLogin"], "isController": false}, {"data": [0.002033333333333333, 500, 1500, "LikePost"], "isController": false}, {"data": [0.9857666666666667, 500, 1500, "CarregarLandingPage"], "isController": false}, {"data": [0.9547333333333333, 500, 1500, "CarregarPaginaSeguirJogos"], "isController": false}, {"data": [0.0014, 500, 1500, "GetPostsJogo"], "isController": false}, {"data": [0.0016, 500, 1500, "GetGrupo"], "isController": false}, {"data": [4.6666666666666666E-4, 500, 1500, "AcederLandingPage"], "isController": true}, {"data": [0.0031, 500, 1500, "GetPerfil"], "isController": false}, {"data": [0.0016666666666666668, 500, 1500, "GetJogosSeguidos"], "isController": false}, {"data": [0.0012333333333333332, 500, 1500, "GetPostsPopulares"], "isController": false}, {"data": [0.0012666666666666666, 500, 1500, "AcederFeed"], "isController": true}, {"data": [0.0031333333333333335, 500, 1500, "DislikePost"], "isController": false}, {"data": [0.0010666666666666667, 500, 1500, "SeguirJogos"], "isController": false}, {"data": [0.0041333333333333335, 500, 1500, "RealizarLogin"], "isController": false}, {"data": [0.0012, 500, 1500, "CriarPublicacao"], "isController": false}, {"data": [0.963, 500, 1500, "CarregarFeed"], "isController": false}, {"data": [9.0E-4, 500, 1500, "AcederListaJogos"], "isController": true}, {"data": [0.004933333333333333, 500, 1500, "Logout"], "isController": false}, {"data": [0.9977333333333334, 500, 1500, "AcederCriarPublicacao"], "isController": false}, {"data": [0.0021, 500, 1500, "GetJogosPopulares"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 270000, 19, 0.007037037037037037, 12411.156025925971, 38, 56342, 11061.0, 26217.0, 26761.0, 27191.99, 73.46003284479691, 136.16493819205473, 13.920017560093708], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetJogosPorSeguir", 15000, 0, 0.0, 23386.691800000066, 377, 36469, 26109.0, 28773.0, 29216.949999999997, 29595.989999999998, 4.085996608622815, 32.969303046025345, 0.7381927466750203], "isController": false}, {"data": ["AcederPaginaLogin", 15000, 0, 0.0, 418.603399999998, 38, 7195, 85.0, 1272.699999999999, 2221.949999999999, 4547.969999999999, 4.085236554260929, 4.831270964072251, 0.5944338345555453], "isController": false}, {"data": ["LikePost", 15000, 0, 0.0, 19840.849799999905, 200, 36740, 20656.5, 26396.9, 27084.0, 28319.93, 4.110099143811547, 0.8348638885867204, 0.770643589464665], "isController": false}, {"data": ["CarregarLandingPage", 15000, 0, 0.0, 84.1132666666665, 38, 5930, 51.0, 90.0, 127.0, 1006.9599999999991, 4.086351694310382, 4.832589747861204, 0.5945960961447724], "isController": false}, {"data": ["CarregarPaginaSeguirJogos", 15000, 0, 0.0, 181.96559999999974, 38, 3097, 85.0, 432.0, 862.8999999999978, 1453.8699999999972, 4.08638175141777, 4.832625293913008, 0.5946004696887185], "isController": false}, {"data": ["GetPostsJogo", 15000, 0, 0.0, 23622.175666666608, 416, 36914, 24011.5, 28038.0, 28530.899999999998, 29254.0, 4.0990897561287545, 24.27219770041406, 0.732552173214416], "isController": false}, {"data": ["GetGrupo", 15000, 0, 0.0, 14944.828600000013, 144, 50396, 14706.0, 18993.0, 23844.449999999946, 27158.909999999996, 4.086257072970472, 1.0415166953567316, 0.7222778615309136], "isController": false}, {"data": ["AcederLandingPage", 15000, 6, 0.04, 66650.4572666667, 1209, 761426, 62896.0, 84095.9, 99983.64999999995, 122401.93, 4.085027394193705, 53.05168881117465, 4.3001562131496485], "isController": true}, {"data": ["GetPerfil", 15000, 4, 0.02666666666666667, 9476.270400000012, 160, 56342, 8939.0, 11494.0, 13869.649999999992, 24896.94, 4.086232583455171, 2.1706615506694202, 0.7180915291581299], "isController": false}, {"data": ["GetJogosSeguidos", 15000, 2, 0.013333333333333334, 12335.897666666702, 249, 50655, 11797.0, 15425.9, 19097.949999999997, 27067.98, 4.08613462832928, 12.658856783637264, 0.7580684218476357], "isController": false}, {"data": ["GetPostsPopulares", 15000, 0, 0.0, 19208.75873333327, 402, 33325, 18579.0, 26854.9, 27516.949999999997, 28989.989999999998, 4.085977687293045, 24.196467695272958, 0.734199115685469], "isController": false}, {"data": ["AcederFeed", 15000, 0, 0.0, 23845.209133333214, 456, 580537, 24178.5, 28204.0, 28658.0, 29325.0, 4.099030388025148, 29.119429949295675, 1.3289825086175282], "isController": true}, {"data": ["DislikePost", 15000, 0, 0.0, 15735.099133333308, 198, 45684, 13616.0, 23086.9, 24443.49999999999, 27400.879999999997, 4.123243189158179, 0.8375337727977552, 0.7046558184596498], "isController": false}, {"data": ["SeguirJogos", 15000, 0, 0.0, 25768.12173333337, 413, 41229, 27282.0, 28848.0, 29171.0, 29564.989999999998, 4.087259168471646, 1.0537465043715961, 0.9419855114836997], "isController": false}, {"data": ["RealizarLogin", 15000, 13, 0.08666666666666667, 9842.82959999997, 167, 46583, 8925.5, 12856.9, 15968.899999999998, 26893.949999999997, 4.085626005063997, 2.174010273698129, 1.048426161111078], "isController": false}, {"data": ["CriarPublicacao", 15000, 0, 0.0, 25666.647799999995, 341, 38886, 26710.0, 28651.9, 28994.949999999997, 29452.96, 4.091005787409521, 1.0547124295665171, 1.5501076616356386], "isController": false}, {"data": ["CarregarFeed", 15000, 0, 0.0, 163.53733333333287, 38, 5933, 85.0, 375.0, 714.0, 1307.0, 4.09950650140736, 4.848146848832338, 0.5965102233493133], "isController": false}, {"data": ["AcederListaJogos", 15000, 0, 0.0, 23656.15299999996, 415, 670488, 26255.0, 29009.9, 29385.0, 29715.0, 4.08595097512582, 37.80105068654532, 1.332722290714867], "isController": true}, {"data": ["Logout", 15000, 0, 0.0, 12276.06180000006, 166, 55416, 11188.0, 19524.0, 21136.949999999997, 26345.94, 4.140592435965738, 0.8410578385555405, 0.7965788182473148], "isController": false}, {"data": ["AcederCriarPublicacao", 15000, 0, 0.0, 55.56259999999995, 38, 1864, 49.0, 56.0, 63.0, 94.0, 4.091347237004109, 4.838497562511694, 0.5953229866343869], "isController": false}, {"data": ["GetJogosPopulares", 15000, 0, 0.0, 10392.79353333328, 202, 50665, 9701.0, 12391.0, 16184.899999999998, 26804.94, 4.086185831559248, 8.16548872783074, 0.774140675119623], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 34.116.167.251:80 [/34.116.167.251] failed: Connection timed out: connect", 11, 57.89473684210526, 0.004074074074074074], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 8, 42.10526315789474, 0.002962962962962963], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 270000, 19, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 34.116.167.251:80 [/34.116.167.251] failed: Connection timed out: connect", 11, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 8, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GetPerfil", 15000, 4, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 34.116.167.251:80 [/34.116.167.251] failed: Connection timed out: connect", 4, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["GetJogosSeguidos", 15000, 2, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 34.116.167.251:80 [/34.116.167.251] failed: Connection timed out: connect", 1, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 1, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["RealizarLogin", 15000, 13, "Non HTTP response code: java.net.SocketTimeoutException/Non HTTP response message: Read timed out", 7, "Non HTTP response code: org.apache.http.conn.HttpHostConnectException/Non HTTP response message: Connect to 34.116.167.251:80 [/34.116.167.251] failed: Connection timed out: connect", 6, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
