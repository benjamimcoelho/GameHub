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

    var data = {"OkPercent": 28.945802469135803, "KoPercent": 71.0541975308642};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.23738042328042328, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [7.333333333333333E-4, 500, 1500, "GetJogosPorSeguir"], "isController": false}, {"data": [0.9703777777777778, 500, 1500, "AcederPaginaLogin"], "isController": false}, {"data": [0.0015777777777777778, 500, 1500, "LikePost"], "isController": false}, {"data": [0.9999555555555556, 500, 1500, "CarregarLandingPage"], "isController": false}, {"data": [0.9969111111111111, 500, 1500, "CarregarPaginaSeguirJogos"], "isController": false}, {"data": [7.666666666666667E-4, 500, 1500, "GetPostsJogo"], "isController": false}, {"data": [0.0015333333333333334, 500, 1500, "GetGrupo"], "isController": false}, {"data": [0.0, 500, 1500, "AcederLandingPage"], "isController": true}, {"data": [0.002022222222222222, 500, 1500, "GetPerfil"], "isController": false}, {"data": [0.0015888888888888888, 500, 1500, "GetJogosSeguidos"], "isController": false}, {"data": [7.666666666666667E-4, 500, 1500, "GetPostsPopulares"], "isController": false}, {"data": [7.666666666666667E-4, 500, 1500, "AcederFeed"], "isController": true}, {"data": [0.0015777777777777778, 500, 1500, "DislikePost"], "isController": false}, {"data": [7.555555555555555E-4, 500, 1500, "SeguirJogos"], "isController": false}, {"data": [0.0016333333333333334, 500, 1500, "RealizarLogin"], "isController": false}, {"data": [7.666666666666667E-4, 500, 1500, "CriarPublicacao"], "isController": false}, {"data": [0.9998222222222222, 500, 1500, "CarregarFeed"], "isController": false}, {"data": [7.333333333333333E-4, 500, 1500, "AcederListaJogos"], "isController": true}, {"data": [0.0016, 500, 1500, "Logout"], "isController": false}, {"data": [0.9993555555555556, 500, 1500, "AcederCriarPublicacao"], "isController": false}, {"data": [0.0017444444444444445, 500, 1500, "GetJogosPopulares"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 810000, 575539, 71.0541975308642, 499.62921851849086, 32, 61171, 36.0, 42.0, 46.0, 699.0, 1851.1027773397598, 1051.9578598809467, 350.49634835697486], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetJogosPorSeguir", 45000, 44793, 99.54, 1153.1170222222243, 32, 60546, 35.0, 37.0, 42.0, 60057.0, 104.58913899896572, 35.80579894118023, 18.793360913876654], "isController": false}, {"data": ["AcederPaginaLogin", 45000, 0, 0.0, 154.61355555555386, 38, 8501, 41.0, 43.0, 44.95000000000073, 56.0, 104.34177728827314, 123.39637919540897, 15.386336299344967], "isController": false}, {"data": ["LikePost", 45000, 44911, 99.80222222222223, 68.38735555555562, 32, 60693, 35.0, 37.0, 38.0, 53.0, 131.67019250182145, 40.348901779156904, 24.55957692172646], "isController": false}, {"data": ["CarregarLandingPage", 45000, 0, 0.0, 43.09555555555566, 38, 3564, 41.0, 43.0, 45.0, 55.0, 104.6037262171806, 123.70616450098211, 15.424963533978778], "isController": false}, {"data": ["CarregarPaginaSeguirJogos", 45000, 0, 0.0, 51.96315555555538, 38, 5473, 41.0, 43.0, 45.0, 56.0, 104.76543020177822, 123.8973984124545, 15.44880855514503], "isController": false}, {"data": ["GetPostsJogo", 45000, 44901, 99.78, 81.92028888888812, 32, 60097, 35.0, 37.0, 39.0, 54.0, 118.17506191060188, 37.69184623668233, 21.00377076926713], "isController": false}, {"data": ["GetGrupo", 45000, 43434, 96.52, 1355.483911111105, 32, 56360, 35.0, 37.0, 38.0, 53.0, 104.56313522104648, 31.87496895781923, 18.380238613074575], "isController": false}, {"data": ["AcederLandingPage", 45000, 44098, 97.99555555555555, 6476.203933333325, 202, 224479, 217.0, 230.0, 237.0, 255.0, 104.13749852471878, 311.4459016181232, 109.32403409577411], "isController": true}, {"data": ["GetPerfil", 45000, 43450, 96.55555555555556, 803.2109777777916, 32, 31326, 35.0, 37.0, 38.0, 52.0, 104.55706143540581, 32.86683609025133, 18.277064450134414], "isController": false}, {"data": ["GetJogosSeguidos", 45000, 43444, 96.54222222222222, 1498.7406222222319, 32, 57071, 35.0, 37.0, 38.0, 52.0, 104.50048766894245, 42.12959611650063, 19.287687665459107], "isController": false}, {"data": ["GetPostsPopulares", 45000, 44082, 97.96, 1699.0630444444384, 32, 61171, 35.0, 37.0, 38.0, 53.0, 104.51456468522535, 43.97869682894101, 18.677895837301016], "isController": false}, {"data": ["AcederFeed", 45000, 44901, 99.78, 125.22495555555629, 70, 60152, 76.0, 80.0, 85.0, 100.0, 118.15861612628794, 177.42301114842954, 38.42462809575574], "isController": true}, {"data": ["DislikePost", 45000, 44924, 99.83111111111111, 60.073977777777706, 32, 60161, 35.0, 37.0, 38.0, 53.0, 154.31728319279028, 47.292969433175465, 26.22188210502491], "isController": false}, {"data": ["SeguirJogos", 45000, 44867, 99.70444444444445, 196.7731333333338, 32, 61127, 35.0, 37.0, 43.0, 92.0, 105.23632570876664, 32.25714909093354, 24.15091459136735], "isController": false}, {"data": ["RealizarLogin", 45000, 43467, 96.59333333333333, 510.4480000000001, 32, 36212, 35.0, 37.0, 38.0, 51.0, 104.37687008558903, 32.801375980707675, 26.705800744555006], "isController": false}, {"data": ["CriarPublicacao", 45000, 44891, 99.75777777777778, 108.71553333333522, 32, 60356, 35.0, 37.0, 38.0, 57.0, 110.67170345885964, 33.9237279632656, 41.82612230329949], "isController": false}, {"data": ["CarregarFeed", 45000, 0, 0.0, 43.159355555555514, 38, 3620, 41.0, 43.0, 44.0, 57.0, 118.37775129623637, 139.99556330052954, 17.456094185284854], "isController": false}, {"data": ["AcederListaJogos", 45000, 44793, 99.54, 1205.2318666666708, 70, 61901, 76.0, 81.0, 90.0, 60145.0, 104.57844429106272, 159.4784032984913, 34.212674646001965], "isController": true}, {"data": ["Logout", 45000, 44927, 99.83777777777777, 43.31162222222221, 32, 60100, 35.0, 37.0, 38.0, 52.0, 172.89471864266122, 52.98773630145539, 33.09312974019687], "isController": false}, {"data": ["AcederCriarPublicacao", 45000, 0, 0.0, 45.05882222222177, 38, 2306, 41.0, 43.0, 48.0, 89.0, 110.84617506798566, 131.0885918040338, 16.34548089381429], "isController": false}, {"data": ["GetJogosPopulares", 45000, 43448, 96.55111111111111, 1076.1900000000046, 32, 53017, 35.0, 37.0, 39.0, 55.0, 104.5310736038133, 38.15129664263613, 19.701657427281216], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["502/Bad Gateway", 575400, 99.97584872615062, 71.03703703703704], "isController": false}, {"data": ["504/Gateway Time-out", 139, 0.024151273849382926, 0.017160493827160495], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 810000, 575539, "502/Bad Gateway", 575400, "504/Gateway Time-out", 139, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["GetJogosPorSeguir", 45000, 44793, "502/Bad Gateway", 44779, "504/Gateway Time-out", 14, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["LikePost", 45000, 44911, "502/Bad Gateway", 44901, "504/Gateway Time-out", 10, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["GetPostsJogo", 45000, 44901, "502/Bad Gateway", 44901, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["GetGrupo", 45000, 43434, "502/Bad Gateway", 43434, null, null, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["GetPerfil", 45000, 43450, "502/Bad Gateway", 43450, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["GetJogosSeguidos", 45000, 43444, "502/Bad Gateway", 43444, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["GetPostsPopulares", 45000, 44082, "502/Bad Gateway", 44072, "504/Gateway Time-out", 10, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["DislikePost", 45000, 44924, "502/Bad Gateway", 44924, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["SeguirJogos", 45000, 44867, "502/Bad Gateway", 44791, "504/Gateway Time-out", 76, null, null, null, null, null, null], "isController": false}, {"data": ["RealizarLogin", 45000, 43467, "502/Bad Gateway", 43467, null, null, null, null, null, null, null, null], "isController": false}, {"data": ["CriarPublicacao", 45000, 44891, "502/Bad Gateway", 44866, "504/Gateway Time-out", 25, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Logout", 45000, 44927, "502/Bad Gateway", 44923, "504/Gateway Time-out", 4, null, null, null, null, null, null], "isController": false}, {"data": [], "isController": false}, {"data": ["GetJogosPopulares", 45000, 43448, "502/Bad Gateway", 43448, null, null, null, null, null, null, null, null], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
