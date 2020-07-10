/**
 * Functions for horizon identifier auto fill
 * Author: Thibault COUPIN <thibault.coupin@ird.fr>
 */

 HORIZON_URL="/hor/"
 HORIZON_URL_DISPLAY="http://www.documentation.ird.fr"+HORIZON_URL
 DC_SUFFIX=".dc"

 $("form#datasetForm").on('change', function(e){
     var inputs = $('div#metadata_publication_publicationIDNumber').find('input')

     var type = $(e.target).parent().parent().find('div#metadata_publication_publicationIDType').find('select option:selected').text();
    
     if (inputs.toArray().indexOf(e.target)>=0){
         var inputStr = $(e.target).val().trim().toLocaleLowerCase()
         if (inputStr.indexOf('fdi:')==0){
             completeFDI(inputStr, e.target)
         } else if (inputStr.indexOf('doi:')==0 || inputStr.indexOf('http://doi.org')==0 || inputStr.indexOf('https://doi.org')==0){
            completeDOI(inputStr, e.target)
        } else if (type == "doi" && inputStr.indexOf('10.')==0 ) {
            completeDOI(inputStr, e.target)
        }
     }
 })
var pendingHorizon;
 function completeFDI(fdi, element) {
    console.log("Autocomplete FDI")
    var url = HORIZON_URL + fdi + DC_SUFFIX
    if (pendingHorizon != undefined){
        pendingHorizon.abort()
    }
    function onXMLResponse(input_element,input_fdi){
        return function(xml){
            var elem = input_element
            var fdi = input_fdi
            var ids= $(xml).find("dc\\:identifier").filter(function(){return $(this).text().indexOf('http') != 0 && $(this).text().indexOf('oai:ird.fr') != 0 })
            if (ids.length == 0) {
                return
            }
        
            var url = $(elem).parent().parent().find('div#metadata_publication_publicationURL').find('input')
            var citation = $(elem).parent().parent().find('div#metadata_publication_publicationCitation').find('textarea')
            var type = $(elem).parent().parent().find('div#metadata_publication_publicationIDType').find('select')
            var type_label = $(elem).parent().parent().find('div#metadata_publication_publicationIDType').find('label');
            var id = $(elem).parent().parent().find('div#metadata_publication_publicationIDNumber').find('input')

            console.log(type)
            
            $(type).find('option').filter(function(){return $(this).text() == 'url'}).first().prop('selected',true)
            $(type_label).empty().append("url");
            $(url).val(HORIZON_URL_DISPLAY+fdi)
            $(citation).val(ids[0].textContent)
            $(id).val(fdi)
            
        }
    }
    function onError(){
        alert("Ce numéro FDI est inconnu.\nUnkown FDI identifier.")
    }
    pendingHorizon = $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: onXMLResponse(element, fdi),
        error: onError
    })
 }

 var pendingDOI;
 function completeDOI(doi, element) {
    console.log("Autocomplete DOI")
    doi = doi.replace('doi:','');
    doi = doi.replace('http://doi.org/','');
    doi = doi.replace('https://doi.org/','');
    var url = "https://citation.crosscite.org/format?style=harvard-cite-them-right&lang=fr-FR&doi="+encodeURIComponent("https://doi.org/"+doi)

    var url_field = $(element).parent().parent().find('div#metadata_publication_publicationURL').find('input')
    var type = $(element).parent().parent().find('div#metadata_publication_publicationIDType').find('select')
    var type_label = $(element).parent().parent().find('div#metadata_publication_publicationIDType').find('label');
    var id = $(element).parent().parent().find('div#metadata_publication_publicationIDNumber').find('input');
    var citation = $(element).parent().parent().find('div#metadata_publication_publicationCitation').find('textarea')

    $(url_field).val("https://doi.org/"+doi)
    $(type).find('option').filter(function(){return $(this).text() == 'doi'}).first().prop('selected',true)
    $(type_label).empty().append("doi");
    $(id).val(doi)
    $(citation).val("...")


    if (pendingDOI != undefined){
        pendingDOI.abort()
    }
    function onResponse(input_element,doi){
        return function(data){
            var elem = input_element
            
            var citation = $(elem).parent().parent().find('div#metadata_publication_publicationCitation').find('textarea')
            $(citation).val(data)

        }
    }
    function onError(){
        alert("Ce numéro DOI est inconnu.\nUnkown DOI identifier.")
    }
    pendingDOI = $.ajax({
        type: "GET",
        url: url,
        dataType: "text",
        success: onResponse(element, doi),
        error: onError
    })
 }

 console.log("Horizon/Doi plugin loaded")