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
 * A dictionary of objects with data about strengths.
 */
var strengths = {
    'modig': {
        name: "Modig",
        header: "Den modige våger å møte livet slik livet er.",
        about: "Å gjøre det man mener er rett, på tross av frykt, smerte og motstand.",
        sliders: [
            {
                text: "Mot er viktig for familien"
            }
        ]
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
    main = $('div#main');

    if (strength === undefined || isNaN(strength = parseInt(strength))) {
        strength = 0;
    }
    // Set strength to an object from the strengths dictionary.
    categoryList = category.list();

    if (categoryList.length === 0) {
        mustReload = true;
        $.mobile.changePage('profil.html', {transition: "slideleft"});
    }

    if (strength < 0) {
        strength = 0;
    } else if (strength >= categoryList.length) {
        strength = categoryList.length - 1;
    }

    $('[data-role="page"]').each(function() {
        if (strength === 0) {
            $(this)[0].dataset['left'] = 'profil.html';
        } else {
            $(this)[0].dataset['left'] = 'strength.html?strength=' + (strength - 1);
        }

        if (strength === categoryList.length - 1) {
            $(this)[0].dataset['right'] = 'tekst.html';
        } else {
            $(this)[0].dataset['right'] = 'strength.html?strength=' + (strength + 1);
        }
    });

    theme = 'ui-bar-' + String.fromCharCode(99 + strength);
    strength = categoryList[strength];
    categoryData = category.get(strength);
    
    console.log(categoryData);
    
    strength = strengths[strength];
    console.log(strength);
    main.find('#about-header').html(strength.header);
    main.find('#about').html(strength.about);

    $('div[data-role="header"] h1').each(function() {
        $(this).html(strength.name);
    });
    
    $('.ui-bar-a').removeClass('ui-bar-a').addClass(theme);
    
    $('#when').val(categoryData.whenthen[categoryData.whenthen.length - 1].when);
    $('#then').val(categoryData.whenthen[categoryData.whenthen.length - 1].then);
};