
$(`<style type='text/css'>
label[for='metadata_topicClassVocab'] { position: absolute;left: -10000px; }
label[for='metadata_topicClassVocab']+div { position: absolute;left: -10000px; }
label[for='metadata_topicClassVocabURI'] { position: absolute;left: -10000px; }
label[for='metadata_topicClassVocabURI']+div { position: absolute;left: -10000px; } 
</style>`).appendTo('head');



NUMERISUD_NAME="NumeriSud"

$("form#datasetForm").on('change', function(e){
    $('div:has(>label[for="metadata_topicClassValue"])').each(function(){
        var thematique = $(this).find('select option:selected').text();
        if (NUMERISUD[thematique] !== undefined){
            //Assignation du nom du vocabulaire
            $(this).parent().find('div:has(>label[for="metadata_topicClassVocab"])').find('input').val(NUMERISUD_NAME)
            // URL
            $(this).parent().find('div:has(>label[for="metadata_topicClassVocabURI"])').find('input').val(NUMERISUD[thematique])
        } else {
            $(this).parent().find('div:has(>label[for="metadata_topicClassVocab"])').find('input').val("")
            $(this).parent().find('div:has(>label[for="metadata_topicClassVocabURI"])').find('input').val("")
        }
    });

   
   
})

var NUMERISUD = {
"Generalities" : "https://numerisud.ird.fr#tnu:010",
"Fundamental sciences/Analysis and research techniques" : "https://numerisud.ird.fr#tnu:020",
"Environmental sciences" : "https://numerisud.ird.fr#tnu:021",
"Limnology/Oceanography: generalities" : "https://numerisud.ird.fr#tnu:030",
"Physical limnology/Physical oceanography" : "https://numerisud.ird.fr#tnu:032",
"Bilogical limnology/Biological oceanography" : "https://numerisud.ird.fr#tnu:034",
"Natural substances" : "https://numerisud.ird.fr#tnu:035",
"Ecology, aquatic systems" : "https://numerisud.ird.fr#tnu:036",
"Pollution" : "https://numerisud.ird.fr#tnu:038",
"Halieutic resources" : "https://numerisud.ird.fr#tnu:040",
"Health: generalities" : "https://numerisud.ird.fr#tnu:050",
"Medical entomology/Parasitology/Virology" : "https://numerisud.ird.fr#tnu:052",
"Nutrition" : "https://numerisud.ird.fr#tnu:054",
"Health: sociocultural, economic and political aspects" : "https://numerisud.ird.fr#tnu:056",
"Earth sciences: generalities" : "https://numerisud.ird.fr#tnu:060",
"Hydrology" : "https://numerisud.ird.fr#tnu:062",
"Geology and surficial geology" : "https://numerisud.ird.fr#tnu:064",
"Internal geophysics" : "https://numerisud.ird.fr#tnu:066",
"Soil science" : "https://numerisud.ird.fr#tnu:068",
"Plant and animal world: generalities" : "https://numerisud.ird.fr#tnu:070",
"Bioclimatology" : "https://numerisud.ird.fr#tnu:072",
"Soil biology" : "https://numerisud.ird.fr#tnu:074",
"Plant science" : "https://numerisud.ird.fr#tnu:076",
"Animal science" : "https://numerisud.ird.fr#tnu:080",
"Studies, transformation, preservation of the natural environment" : "https://numerisud.ird.fr#tnu:082",
"Biotechnologies" : "https://numerisud.ird.fr#tnu:084",
"General economy/Macroeconomics" : "https://numerisud.ird.fr#tnu:094",
"Economic development/Land development" : "https://numerisud.ird.fr#tnu:095",
"Economy: sectors of activity" : "https://numerisud.ird.fr#tnu:096",
"Economy and rural sociology" : "https://numerisud.ird.fr#tnu:098",
"Work" : "https://numerisud.ird.fr#tnu:100",
"Urbanization and urban societies" : "https://numerisud.ird.fr#tnu:102",
"Society, social development" : "https://numerisud.ird.fr#tnu:106",
"Demography" : "https://numerisud.ird.fr#tnu:108",
"Societies, cultural development" : "https://numerisud.ird.fr#tnu:112",
"Politics" : "https://numerisud.ird.fr#tnu:114",
"Scientific and technical development" : "https://numerisud.ird.fr#tnu:116",
"Engineering  sciences: generalities" : "https://numerisud.ird.fr#tnu:120",
"Computer science" : "https://numerisud.ird.fr#tnu:122",
"Documentation" : "https://numerisud.ird.fr#tnu:124",
"Remote sensing" : "https://numerisud.ird.fr#tnu:126",
"Cartography/Graphical methods" : "https://numerisud.ird.fr#tnu:128"
}