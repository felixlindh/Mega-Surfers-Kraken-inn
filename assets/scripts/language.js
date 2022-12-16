let dict = {
    sv: {
        'Hej' : 'Hej',
        'Mat' : 'Mat',
        'Sök' : 'Sök'
    },
    en: {
        'Hej' : 'Hello',
        'Mat' : 'Food',
        'Sök' : 'Search'
    }
}
let lang = 'sv'; 

let imgSrc = "sv" ;
let Activelang;
let langSelection;
if(window.name){
    langSelection = window.name;
}
else{langSelection = "English";
}

function langChange(){
    langClass = document.getElementsByClassName(".top-flag");

    switch(langSelection){
        case "English":
            langSelection = "English";
            imgSrc = "sv";

            break; 
        case "Engelska":
        case "English" :
        default:
            langSelection = "Swedish";
            imgSrc = "en";
        break;
    }
}
Activelang="lang" + langSelection;
window.name = langSelection;



