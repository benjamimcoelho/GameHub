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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.24489285714285713, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.0035714285714285713, 500, 1500, "GetJogosPorSeguir"], "isController": false}, {"data": [1.0, 500, 1500, "AcederPaginaLogin"], "isController": false}, {"data": [0.0057857142857142855, 500, 1500, "LikePost"], "isController": false}, {"data": [1.0, 500, 1500, "CarregarLandingPage"], "isController": false}, {"data": [1.0, 500, 1500, "CarregarPaginaSeguirJogos"], "isController": false}, {"data": [0.0031785714285714286, 500, 1500, "GetPostsJogo"], "isController": false}, {"data": [0.00425, 500, 1500, "GetGrupo"], "isController": false}, {"data": [3.571428571428572E-5, 500, 1500, "AcederLandingPage"], "isController": true}, {"data": [0.036, 500, 1500, "GetPerfil"], "isController": false}, {"data": [0.005035714285714286, 500, 1500, "GetJogosSeguidos"], "isController": false}, {"data": [0.0032142857142857142, 500, 1500, "GetPostsPopulares"], "isController": false}, {"data": [0.0030357142857142857, 500, 1500, "AcederFeed"], "isController": true}, {"data": [0.007142857142857143, 500, 1500, "DislikePost"], "isController": false}, {"data": [0.0032142857142857142, 500, 1500, "SeguirJogos"], "isController": false}, {"data": [0.037142857142857144, 500, 1500, "RealizarLogin"], "isController": false}, {"data": [0.003285714285714286, 500, 1500, "CriarPublicacao"], "isController": false}, {"data": [1.0, 500, 1500, "CarregarFeed"], "isController": false}, {"data": [0.0034285714285714284, 500, 1500, "AcederListaJogos"], "isController": true}, {"data": [0.011785714285714287, 500, 1500, "Logout"], "isController": false}, {"data": [1.0, 500, 1500, "AcederCriarPublicacao"], "isController": false}, {"data": [0.012642857142857143, 500, 1500, "GetJogosPopulares"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 252000, 0, 0.0, 2385.876003968293, 37, 53440, 3012.0, 3715.0, 3816.0, 3972.9900000000016, 83.45025752020936, 154.6540571592456, 15.814439535486725], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["GetJogosPorSeguir", 14000, 0, 0.0, 3949.681642857119, 377, 35971, 3825.5, 5267.9, 5549.0, 5815.98, 4.650495344189804, 37.525052272917144, 0.8401773815186658], "isController": false}, {"data": ["AcederPaginaLogin", 14000, 0, 0.0, 61.05928571428573, 38, 431, 52.0, 85.0, 87.0, 149.0, 4.641982152904903, 5.489687878093591, 0.675444668733233], "isController": false}, {"data": ["LikePost", 14000, 0, 0.0, 3401.6229285714253, 198, 13503, 3359.0, 4417.9, 4805.949999999999, 5291.99, 4.676966906784374, 0.9500089029405762, 0.8769312950220702], "isController": false}, {"data": ["CarregarLandingPage", 14000, 0, 0.0, 41.96650000000016, 37, 415, 40.0, 42.0, 46.0, 85.0, 4.642062189707155, 5.489782530991568, 0.6754563147132483], "isController": false}, {"data": ["CarregarPaginaSeguirJogos", 14000, 0, 0.0, 56.361357142856974, 38, 366, 51.0, 83.0, 85.0, 123.98999999999978, 4.651017542973741, 5.500373285684766, 0.6767593885772338], "isController": false}, {"data": ["GetPostsJogo", 14000, 0, 0.0, 3913.886857142858, 360, 24078, 3845.5, 5192.0, 5401.0, 5666.0, 4.668109112382393, 27.635492166558635, 0.8342421558261504], "isController": false}, {"data": ["GetGrupo", 14000, 0, 0.0, 3026.5700000000074, 142, 35040, 2935.5, 3887.8999999999996, 4180.0, 4963.959999999999, 4.64488371035965, 1.183901023831903, 0.8210194839600553], "isController": false}, {"data": ["AcederLandingPage", 14000, 0, 0.0, 14753.582714285682, 1213, 54343, 14873.0, 18286.0, 19250.899999999998, 21987.779999999995, 4.640260490966075, 60.24821487469888, 4.884961727794365], "isController": true}, {"data": ["GetPerfil", 14000, 0, 0.0, 2542.9181428571333, 159, 28833, 2652.0, 3576.0, 3766.949999999999, 4100.99, 4.6418821107831585, 2.4633661472262434, 0.8159558397861021], "isController": false}, {"data": ["GetJogosSeguidos", 14000, 0, 0.0, 2890.5585714285726, 245, 34378, 2867.0, 3800.8999999999996, 4029.0, 4824.939999999999, 4.642762629475043, 14.382760136788223, 0.8614500972658771], "isController": false}, {"data": ["GetPostsPopulares", 14000, 0, 0.0, 3575.101000000009, 365, 34719, 3475.0, 4612.9, 5066.949999999999, 5552.99, 4.647194919952067, 27.50977570645661, 0.835042837178887], "isController": false}, {"data": ["AcederFeed", 14000, 0, 0.0, 3956.8583571428726, 403, 24119, 3886.0, 5239.0, 5446.949999999999, 5713.99, 4.6680421830966194, 33.15560285878822, 1.513466801550857], "isController": true}, {"data": ["DislikePost", 14000, 0, 0.0, 3062.41507142858, 198, 28782, 3043.0, 3870.0, 4107.0, 4877.98, 4.684941060095077, 0.9516286528318127, 0.8006491069498424], "isController": false}, {"data": ["SeguirJogos", 14000, 0, 0.0, 4193.996857142878, 406, 26899, 4003.0, 5583.9, 5717.0, 5931.99, 4.653998482796495, 1.1998589838459712, 1.0726012128320046], "isController": false}, {"data": ["RealizarLogin", 14000, 0, 0.0, 2580.121357142851, 160, 13030, 2690.0, 3571.0, 3754.0, 4082.99, 4.641708201666306, 2.4614279876479173, 1.192157477576405], "isController": false}, {"data": ["CriarPublicacao", 14000, 0, 0.0, 4107.506000000017, 338, 53440, 3939.0, 5440.0, 5593.0, 5813.0, 4.659894286969604, 1.2005033153899665, 1.7656630696720765], "isController": false}, {"data": ["CarregarFeed", 14000, 0, 0.0, 42.78257142857111, 37, 291, 41.0, 51.0, 54.0, 58.0, 4.668669525893274, 5.521248824078863, 0.6793278899981425], "isController": false}, {"data": ["AcederListaJogos", 14000, 0, 0.0, 4006.2262142857167, 420, 36015, 3881.0, 5327.0, 5608.949999999999, 5872.99, 4.650416561063457, 43.0240791225403, 1.5168350892531197], "isController": true}, {"data": ["Logout", 14000, 0, 0.0, 2768.796571428565, 166, 32649, 2820.0, 3664.0, 3848.0, 4220.0, 4.691627689852579, 0.952986874501305, 0.9025885301767168], "isController": false}, {"data": ["AcederCriarPublicacao", 14000, 0, 0.0, 54.47771428571451, 38, 385, 50.0, 82.0, 85.0, 96.0, 4.660375160200396, 5.511439764651054, 0.6781209949900967], "isController": false}, {"data": ["GetJogosPopulares", 14000, 0, 0.0, 2675.9456428571366, 200, 33884, 2730.0, 3675.0, 3865.0, 4200.99, 4.642193025038663, 9.275461097220454, 0.879477975446778], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 252000, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
