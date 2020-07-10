
$(`<style type='text/css'>
div#metadata_topicClassification_topicClassVocab { position: absolute;left: -10000px; }
div#metadata_topicClassification_topicClassVocab+div { position: absolute;left: -10000px; }
div#metadata_topicClassification_topicClassVocabURI { position: absolute;left: -10000px; }
div#metadata_topicClassification_topicClassVocabURI+div { position: absolute;left: -10000px; } 
</style>`).appendTo('head');



NUMERISUD_NAME="NumeriSud"

$("form#datasetForm").on('change', function(e){
    $('div#metadata_topicClassification_topicClassValue').find("select").each(function(){
        var thematique = $(this).find('option:selected').text();
        if (NUMERISUD[thematique] !== undefined){
            //Assignation du nom du vocabulaire
            $(this).parent().parent().parent().parent().parent().find('div#metadata_topicClassification_topicClassVocab').find('input').val(NUMERISUD_NAME)
            // URL
            $(this).parent().parent().parent().parent().parent().find('div#metadata_topicClassification_topicClassVocabURI').find('input').val(NUMERISUD[thematique])
        } else {
            $(this).parent().parent().parent().parent().parent().find('div#metadata_topicClassification_topicClassVocab').find('input').val("")
            $(this).parent().parent().parent().parent().parent().find('div#metadata_topicClassification_topicClassVocabURI').find('input').val("")
        }
    });

   
   
})

var NUMERISUD = {
"Animal science" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+du+monde+v%C3%A9g%C3%A9tal+et+animal_Zoologie",
"Bilogical limnology and biological oceanography" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Oc%C3%A9anographie+/+Hydrobiologie_Eaux+continentales+et+oc%C3%A9ans+%3A+biologie",
"Bioclimatology" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+du+monde+v%C3%A9g%C3%A9tal+et+animal_Biotechnologies",
"Biotechnologies" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+du+monde+v%C3%A9g%C3%A9tal+et+animal_Biotechnologies",
"Cartography, graphical methods" :"https://numerisud.ird.fr/documents-et-films/(thematique)/G%C3%A9n%C3%A9ralit%C3%A9s+/+Sciences+fondamentales+et+techniques_Cartographie",
"Computer science" :"https://numerisud.ird.fr/documents-et-films/(thematique)/G%C3%A9n%C3%A9ralit%C3%A9s+/+Sciences+fondamentales+et+techniques_Informatique",
"Demography" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_D%C3%A9mographie",
"Documentation" :"https://numerisud.ird.fr/documents-et-films/(thematique)/G%C3%A9n%C3%A9ralit%C3%A9s+/+Sciences+fondamentales+et+techniques_Sciences+de+l%27information+et+communication",
"Earth sciences, generalities" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+de+la+Terre_Sciences+de+la+Terre+%3A+g%C3%A9n%C3%A9ralit%C3%A9s",
"Ecology, aquatic systems" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Oc%C3%A9anographie+/+Hydrobiologie_Ecosyst%C3%A8mes+aquatiques",
"Economic development and land development" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_D%C3%A9veloppement+%C3%A9conomique+et+am%C3%A9nagement+du+territoire",
"Economy and rural sociology" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Economie+et+sociologie+rurales",
"Economy and sectors of activity" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Economie+%3A+secteurs+d%27activit%C3%A9",
"Engineering  sciences, generalities" :"https://numerisud.ird.fr/documents-et-films/(thematique)/G%C3%A9n%C3%A9ralit%C3%A9s+/+Sciences+fondamentales+et+techniques_Sciences+de+l%27ing%C3%A9nieur+%3A+g%C3%A9n%C3%A9ralit%C3%A9s",
"Environmental sciences" :"https://numerisud.ird.fr/documents-et-films/(thematique)/G%C3%A9n%C3%A9ralit%C3%A9s+/+Sciences+fondamentales+et+techniques_G%C3%A9ographie%2C+environnement+et+climatologie",
"Fundamental sciences, analysis and research techniques" :"https://numerisud.ird.fr/documents-et-films/(thematique)/G%C3%A9n%C3%A9ralit%C3%A9s+/+Sciences+fondamentales+et+techniques_Biologie%2C+math%C3%A9matiques%2C+physique+et+chimie",
"General economy, macroeconomics" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Economie+g%C3%A9n%C3%A9rale+et+macro%C3%A9conomie",
"Generalities" :"https://numerisud.ird.fr/documents-et-films/(thematique)/G%C3%A9n%C3%A9ralit%C3%A9s+/+Sciences+fondamentales+et+techniques_G%C3%A9n%C3%A9ralit%C3%A9s+et+atlas",
"Geology, surficial geology" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+de+la+Terre_G%C3%A9ologie+et+sols",
"Fishery resources" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Oc%C3%A9anographie+/+Hydrobiologie_P%C3%AAche+et+aquaculture",
"Health  generalities" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sant%C3%A9_Sant%C3%A9+%3A+g%C3%A9n%C3%A9ralit%C3%A9s",
"Health in sociocultural, economic and political aspects" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sant%C3%A9_Sant%C3%A9+%3A+aspects+sociaux+et+politiques",
"Hydrology" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+de+la+Terre_Hydrologie",
"Internal geophysics" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+de+la+Terre_G%C3%A9ophysique+et+sismologie",
"Limnology and oceanography: generalities" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Oc%C3%A9anographie+/+Hydrobiologie_Eaux+continentales+et+oc%C3%A9ans+%3A+g%C3%A9n%C3%A9ralit%C3%A9s",
"Medical entomology, parasitology and virology" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sant%C3%A9_Maladies+infectieuses",
"Natural substances" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Oc%C3%A9anographie+/+Hydrobiologie_Substances+naturelles+aquatiques",
"Nutrition" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sant%C3%A9_Nutrition%2C+alimentation",
"Physical limnology and physical oceanography" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Oc%C3%A9anographie+/+Hydrobiologie_Eaux+continentales+et+oc%C3%A9ans+%3A+%C3%A9tudes+physiques",
"Plant and animal world, generalities" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+du+monde+v%C3%A9g%C3%A9tal+et+animal_Monde+v%C3%A9g%C3%A9tal+et+animal+%3A+g%C3%A9n%C3%A9ralit%C3%A9s",
"Plant science" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+du+monde+v%C3%A9g%C3%A9tal+et+animal_Sciences+de+la+plante",
"Politics" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Politique",
"Pollution" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Oc%C3%A9anographie+/+Hydrobiologie_Pollution+de+l%27eau",
"Remote sensing" :"https://numerisud.ird.fr/documents-et-films/(thematique)/G%C3%A9n%C3%A9ralit%C3%A9s+/+Sciences+fondamentales+et+techniques_T%C3%A9l%C3%A9d%C3%A9tection",
"Scientific and technical development" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Sociologie+de+la+science+et+technologies",
"Societies, cultural development" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Soci%C3%A9t%C3%A9s%2C+d%C3%A9veloppement+culturel",
"Society, social development" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Soci%C3%A9t%C3%A9%2C+d%C3%A9veloppement+social",
"Soil biology" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+du+monde+v%C3%A9g%C3%A9tal+et+animal_Biologie+du+sol",
"Soil science" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+de+la+Terre_Sciences+du+sol",
"Studies, transformation, preservation of the natural environment" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+du+monde+v%C3%A9g%C3%A9tal+et+animal_Ecosyst%C3%A8mes+et+milieux+naturels",
"Urbanization and urban societies" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Urbanisation+et+soci%C3%A9t%C3%A9s+urbaines",
"Work" :"https://numerisud.ird.fr/documents-et-films/(thematique)/Sciences+humaines+et+sociales_Travail"
}

console.log("Numerisud plugin loaded")