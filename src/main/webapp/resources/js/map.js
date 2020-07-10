/*
 * Functions for geospatial metadata preview
 * Author: Thibault COUPIN <thibault.coupin@gmail.com
 */
LEAFLET_VERION = "1.3.4"


// Load Leaflet css
var Lcss = document.createElement('link');
Lcss.rel = "stylesheet"
Lcss.href = "https://unpkg.com/leaflet@" + LEAFLET_VERION + "/dist/leaflet.css"
document.head.appendChild(Lcss)

// Load Leaflet JS
var Ljs = document.createElement("script")
Ljs.type = "text/javascript"
Ljs.src = "https://unpkg.com/leaflet@" + LEAFLET_VERION + "/dist/leaflet.js"
document.body.appendChild(Ljs)


var DvMapStorage = {
    layers: {},
    currentBbox: {},
    style: {
        color: '#FF6666',
        weight: 5,
        opacity: 0.8,
    },
    initProcess: 0
}

// Public Members
function DvMapCountry(country) {
    console.log("Country:",country)
    if (!DvMapStorage.layers.hasOwnProperty(country)){
        DvMapStorage.layers[country] = undefined
    }

    if (DvMapStorage.loaded == true) {
        DvMapInit()
    } 
}

function DvMapBBox(dir, val) {
    console.log(dir,val)
    DvMapStorage.currentBbox[dir] = val
    if (DvMapStorage.currentBbox.east !== undefined && DvMapStorage.currentBbox.west !== undefined && DvMapStorage.currentBbox.north !== undefined && DvMapStorage.currentBbox.south !== undefined) {
        var id = DvMapStorage.currentBbox.south +';'+DvMapStorage.currentBbox.west +';'+DvMapStorage.currentBbox.north +';'+DvMapStorage.currentBbox.east;
        if (!DvMapStorage.layers.hasOwnProperty(id)){
            DvMapStorage.layers[id] = undefined
        }
        DvMapStorage.currentBbox = {}
        if (DvMapStorage.loaded == true) {
            DvMapInit()
        } 
    }
    
   
}

function DvMapBBoxEast(val) {
    DvMapBBox("east", val)
}

function DvMapBBoxWest(val) {
    DvMapBBox("west", val)
}

function DvMapBBoxNorth(val) {
    DvMapBBox("north", val)
}

function DvMapBBoxSouth(val) {
    DvMapBBox("south", val)
}



// Private Members

// Create map if needed, and add registered layers
function DvMapInit() {
    if ($("script.dvmap").parent().parent().parent().parent().parent().find("div.dvmap").length != 0) {
        return
    }
    DvMapStorage.initProcess++
    if (DvMapStorage.initProcess != 1){
        return
    }

    console.log("Create map")
    // Create div
    var map_div = document.createElement('div');
    map_div.className = "dvmap"
    map_div.style.minHeight = "250px";
    $("script.dvmap").parent().parent().parent().parent().parent().append(map_div)

    // Create map and base layers
    DvMapStorage.map = L.map(map_div).setView([0, 0], 0);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com">Carto.com</a>'
    }).addTo(DvMapStorage.map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com">Carto.com</a>',
        pane: 'shadowPane'
    }).addTo(DvMapStorage.map);

    DvMapStorage.layer = L.featureGroup().addTo(DvMapStorage.map)
    DvMapStorage.layer.on('layeradd', function () {
        DvMapStorage.map.invalidateSize()
        DvMapStorage.map.fitBounds(DvMapStorage.layer.getBounds(), { maxZoom: 3 })
    })

    $("script.dvmap").parent().parent().parent().parent().parent().parent().on('shown.bs.collapse',function(){
        DvMapStorage.map.invalidateSize()
        DvMapStorage.map.fitBounds(DvMapStorage.layer.getBounds(), { maxZoom: 3 })
    })

    // Load mapping between country name and ISO3 (name of country geoJson)
    if (DvMapStorage.mapping === undefined) {
        GetAsync('/resources/map-data/map.json', function (mapstr) {
            DvMapStorage.mapping = JSON.parse(mapstr)
            DvMapAddLayers()
        })
    } else {
        DvMapAddLayers()
    }
}

// Add registered layers
function DvMapAddLayers() {
    for (var key in DvMapStorage.layers){
        if (DvMapStorage.layers[key] != undefined){
            DvMapStorage.layers[key].addTo(DvMapStorage.layer)
        } else {
            if (key.split(';').length == 4){
                // Bbox
                var bbox = key.split(';')
                DvMapStorage.layers[key] = L.rectangle([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], DvMapStorage.style).addTo(DvMapStorage.layer);
            } else {
                // Country
                if (DvMapStorage.mapping[key] === undefined) {
                    continue;
                }
                var locKey = key
                GetAsync('/resources/map-data/' + DvMapStorage.mapping[key] + '.json', function (border) {
                    DvMapStorage.layers[locKey] = L.geoJson(JSON.parse(border), DvMapStorage.style).bindTooltip(locKey).addTo(DvMapStorage.layer)
                })
            }
        }
    }
    DvMapStorage.initProcess--
    if (DvMapStorage.initProcess != 0){
        DvMapInit()
    }
}


window.addEventListener('load', function () {
    DvMapStorage.loaded = true;
    DvMapInit();
})


// Open popup to draw bounding box on map
function DvMapOpenPopup(btn){
    DvMapStorage.lastBtnPressed = btn;
    var bbox="";
    if (btn !== undefined){
        var west = $(btn).parent().find('div#metadata_geographicBoundingBox_westLongitude').find('input').val();
        var east = $(btn).parent().find('div#metadata_geographicBoundingBox_eastLongitude').find('input').val();
        var north = $(btn).parent().find('div#metadata_geographicBoundingBox_northLongitude').find('input').val(); // yes, longitude... to be coherent with geospatial.tsv
        var south = $(btn).parent().find('div#metadata_geographicBoundingBox_southLongitude').find('input').val();// yes, longitude... to be coherent with geospatial.tsv
        if (west != '' && east != '' && north != '' && south != ''){
            bbox=`?bbox=${south};${west};${north};${east}`
        }
    }
    
    window.open('/popupBBoxMap.html'+bbox ,'','height=400,with=400',true)
}

// Callback whith the drawed bounding box
function DvMapPopupCallback(bbox){
    if (DvMapStorage.lastBtnPressed === undefined){
        return
    }
    $(DvMapStorage.lastBtnPressed).parent().find('div#metadata_geographicBoundingBox_westLongitude').find('input').val(bbox.west);
    $(DvMapStorage.lastBtnPressed).parent().find('div#metadata_geographicBoundingBox_eastLongitude').find('input').val(bbox.east);
    $(DvMapStorage.lastBtnPressed).parent().find('div#metadata_geographicBoundingBox_northLongitude').find('input').val(bbox.north);// yes, longitude... to be coherent with geospatial.tsv
    $(DvMapStorage.lastBtnPressed).parent().find('div#metadata_geographicBoundingBox_southLongitude').find('input').val(bbox.south);// yes, longitude... to be coherent with geospatial.tsv
}

var GetAsync = function (url, callback) {
    const req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onreadystatechange = function (event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                callback(this.responseText);
            } else {
                console.log("Error: %d (%s)", this.status, this.statusText);
            }
        }
    };

    req.send(null);
}