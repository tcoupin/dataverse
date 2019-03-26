/**
 * Functions for horizon identifier auto fill
 * Author: Thibault COUPIN <thibault.coupin@ird.fr>
 */

 HORIZON_URL="/hor/"
 DC_SUFFIX=".dc"

 $("form#datasetForm").on('change', function(e){
     var inputs = $('div:has(>label[for="metadata_publicationIDNumber"])').find('input')
    
     if (inputs.toArray().indexOf(e.target)>=0){
         var inputStr = $(e.target).val()
         if (inputStr.toLocaleLowerCase().indexOf('fdi:')==0){
             completeFDI(inputStr.toLocaleLowerCase(), e.target)

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
        
            var url = $(elem).parent().parent().parent().find('div:has(>label[for="metadata_publicationURL"])').find('input')
            var citation = $(elem).parent().parent().parent().find('div:has(>label[for="metadata_publicationCitation"])').find('textarea')
            var type = $(elem).parent().parent().parent().find('div:has(>label[for="metadata_publicationIDType"])').find('select')

            
            $(type).find('option').filter(function(){return $(this).text() == 'url'}).first().prop('selected',true)
            $(url).val(HORIZON_URL+fdi)
            $(citation).val(ids[0].textContent)
            
        }
    }
    pendingHorizon = $.ajax({
        type: "GET",
        url: url,
        dataType: "xml",
        success: onXMLResponse(element, fdi)
    })
 }
