
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
"Animal science" :"https://numerisud.ird.fr#tnu:080",
"Bilogical limnology and biological oceanography" :"https://numerisud.ird.fr#tnu:034",
"Bioclimatology" :"https://numerisud.ird.fr#tnu:072",
"Biotechnologies" :"https://numerisud.ird.fr#tnu:084",
"Cartography, graphical methods" :"https://numerisud.ird.fr#tnu:128",
"Computer science" :"https://numerisud.ird.fr#tnu:122",
"Demography" :"https://numerisud.ird.fr#tnu:108",
"Documentation" :"https://numerisud.ird.fr#tnu:124",
"Earth sciences, generalities" :"https://numerisud.ird.fr#tnu:060",
"Ecology, aquatic systems" :"https://numerisud.ird.fr#tnu:036",
"Economic development and land development" :"https://numerisud.ird.fr#tnu:095",
"Economy and rural sociology" :"https://numerisud.ird.fr#tnu:098",
"Economy and sectors of activity" :"https://numerisud.ird.fr#tnu:096",
"Engineering  sciences, generalities" :"https://numerisud.ird.fr#tnu:120",
"Environmental sciences" :"https://numerisud.ird.fr#tnu:021",
"Fundamental sciences, analysis and research techniques" :"https://numerisud.ird.fr#tnu:020",
"General economy, macroeconomics" :"https://numerisud.ird.fr#tnu:094",
"Generalities" :"https://numerisud.ird.fr#tnu:010",
"Geology, surficial geology" :"https://numerisud.ird.fr#tnu:064",
"Halieutic resources" :"https://numerisud.ird.fr#tnu:040",
"Health  generalities" :"https://numerisud.ird.fr#tnu:050",
"Health in sociocultural, economic and political aspects" :"https://numerisud.ird.fr#tnu:056",
"Hydrology" :"https://numerisud.ird.fr#tnu:062",
"Internal geophysics" :"https://numerisud.ird.fr#tnu:066",
"Limnology and oceanography: generalities" :"https://numerisud.ird.fr#tnu:030",
"Medical entomology, parasitology and virology" :"https://numerisud.ird.fr#tnu:052",
"Natural substances" :"https://numerisud.ird.fr#tnu:035",
"Nutrition" :"https://numerisud.ird.fr#tnu:054",
"Physical limnology and physical oceanography" :"https://numerisud.ird.fr#tnu:032",
"Plant and animal world, generalities" :"https://numerisud.ird.fr#tnu:070",
"Plant science" :"https://numerisud.ird.fr#tnu:076",
"Politics" :"https://numerisud.ird.fr#tnu:114",
"Pollution" :"https://numerisud.ird.fr#tnu:038",
"Remote sensing" :"https://numerisud.ird.fr#tnu:126",
"Scientific and technical development" :"https://numerisud.ird.fr#tnu:116",
"Societies, cultural development" :"https://numerisud.ird.fr#tnu:112",
"Society, social development" :"https://numerisud.ird.fr#tnu:106",
"Soil biology" :"https://numerisud.ird.fr#tnu:074",
"Soil science" :"https://numerisud.ird.fr#tnu:068",
"Studies, transformation, preservation of the natural environment" :"https://numerisud.ird.fr#tnu:082",
"Urbanization and urban societies" :"https://numerisud.ird.fr#tnu:102",
"Work" :"https://numerisud.ird.fr#tnu:100"
}