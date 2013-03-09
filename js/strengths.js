/* 
 *  strengths
 *  Created on 09.mar.2013
 */

/*
 * 
 * @param {type} sParam The URL parameter to get the value of.
 * @returns The string value of the parameter, or undefined if the parameter is not defined.
 */
var getURLParameter = function(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] === sParam) {
            return decodeURIComponent(sParameterName[1]);
        }
    }
};

/*
 * 
 */
strengths = {
    'modig': {
        name: "Modig",
        header: "Den modige våger å møte livet slik livet er.",
        about: "Å gjøre det man mener er rett, på tross av frykt, smerte og motstand."
    },
    'lære': {
        name: "Liker å lære",
        header: "Læring er en positiv erfaring.",
        about: "Liker å utvikle nye ferdigheter, og lære nye ting."
    },
    'kreativitet': {
        name: "Kreativitet",
        header: "Kreativitet er skapende evne eller virksomhet.",
        about: "Evne til å tenke nytt og finne på nye ting og løsninger. oppfinnsomhet, idérikdom og det å lage eller finne på noe nytt."
    }
};

/* The strength shown on the current page. */
var strength;

/*
 * Finds the strength set in the current URL.
 * Currently no mapping between numbered strengths and named strengths.
 * 
 * This is an own function and not an on load event.
 * This way pages that require data about strengths,
 * but do not want to have their contents changed based on the strength.
 * 
 * TODO: Add mapping from numbers to named strengths based on local storage.
 */
var initstrengths = function() {
    strength = getURLParameter('strength');
    console.log(strength);
    main = $('div#main');
    
    if (strength) {
        // Set strength to an object from the strengths dictionary.
        strength = strengths[strength];
        console.log(strength);
        main.find('.ui-header').html(strength.name);
        main.find('.ui-content strong').html(strength.header);
        main.find('.ui-content div').html(strength.about);
        
    } else {
        main.find('.ui-header').html("ERROR!");
        main.find('.ui-content div').html("Something horrible happened!");
    }
};