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

var asyncFor = function(params) {
    var defaults = {
      total: 0,
      limit: 100,
      pause: 10,
      context: this
    },
      options = $.extend(defaults, params),
      def = $.Deferred(),
      step = 0,
      done = 0;
 
    this.loop = function() {
      if (done < options.total) {
        step = 0;
        for (; step < options.limit; step += 1, done += 1) {
          def.notifyWith(options.context, [done]);
        }
        setTimeout.apply(this, [this.loop, options.pause]);
      } else {
        def.resolveWith(options.context);
      }
    };
 
    setTimeout.apply(this, [this.loop, options.pause]);
    return def;
};

/*
asyncFor({
  total: 10,
  context: this
}).progress(function(step) {
  console.log(step);
}).done(function() {
  console.log('complete!')
});
*/

/*
 * A dictionary of objects with data about strengths.
 */
var strengths = {
    'modig': {
        name: "Modig",
        header: "Den modige våger å møte livet slik livet er.",
        about: "Å gjøre det man mener er rett, på tross av frykt, smerte og motstand.",
        challenges: ["Gjør noe som utfordrer komfortsonen din", "Tørr å si ifra om du mener noe er urettferdig"],
        sliders: [
            {
                text: "Familien",
                range: [1, 10]
            },
            {
                text: "Dama",
                range: [1, 10]
            },
            {
                text: "Kamp mot drager",
                range: [1, 10]
            }
        ]
    },
    'lære': {
        name: "Liker å lære",
        header: "Læring er en positiv erfaring.",
        about: "Liker å utvikle nye ferdigheter, og lære nye ting.",
        challenges: ["Meld deg på et kurs i noe du ikke kan", "Eksperimenter med matlaging, lær deg en ny oppskrift!", "Fordyp deg i et tema du er nysgjerring på"],
        sliders: [
            {
                text: "Utdanning",
                range: [1, 10]
            },
            {
                text: "Jobb",
                range: [1, 10]
            },
            {
                text: "Kamp mot drager",
                range: [1, 10]
            }
        ]
    },
    'kreativitet': {
        name: "Kreativitet",
        header: "Kreativitet er skapende evne eller virksomhet.",
        about: "Evne til å tenke nytt og finne på nye ting og løsninger. oppfinnsomhet, idérikdom og det å lage eller finne på noe nytt.",
        challenges: ["Kom med nye ideer på arbeidsplassen", "Har du en ide, realiser den!", "Dyrk hobbyene dine"],
        sliders: [
            {
                text: "Løgner",
                range: [1, 5]
            },
            {
                text: "App-utvikling",
                range: [1, 5]
            },
            {
                text: "Kamp mot drager",
                range: [1, 5]
            }
        ]
    }
};

/* The strength shown on the current page. */
var strength;

/*
 * Finds the strength set in the current URL.
 * 
 * Updates the html of several elements based on the strength.
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

    theme = String.fromCharCode(99 + strength);
    strength = categoryList[strength];
    categoryData = category.get(strength);
    console.log(categoryData);
    
    cat = strengths[strength];
    main.find('#about-header').html(cat.header);
    main.find('#about').html(cat.about);
    var $tips = $('#tips');
    var tipsStr = "";
    for (var i = 0; i < cat.challenges.length; i++) {
        tipsStr += "<p>" + cat.challenges[i] + "</p>";
    }
    $tips.html(tipsStr);

    $('div[data-role="header"]').each(function() {
        $(this).find('h1').html(cat.name);
        $(this)[0].dataset['theme'] = theme;
    });
    
    $('.ui-bar-a').removeClass('ui-bar-a').addClass('ui-bar-' + theme);

    $('#whenthen').submit(function() {
        category.addWhenThen($('#when').val(), $('#then').val());
        return false;
    });

    $('#wheni').submit(function() {
        category.addStrategy($('#v1').val());
        category.addStrategy($('#v2').val());
        category.addStrategy($('#v3').val());
        return false;
    });
    
    if (categoryData.whenthen.length !== 0) {
        $('#when').val(categoryData.whenthen[categoryData.whenthen.length - 1].when);
        $('#then').val(categoryData.whenthen[categoryData.whenthen.length - 1].then);
    } else {
        $('#when').val('');
        $('#then').val('');
    }
    
    $('.strength-name').html(cat.name);
    $('.st')
    
    console.log(categoryData);
    if (cat.sliders.length > 0) {
        for (i in cat.sliders) {
            value = Math.floor((cat.sliders[i].range[1] - cat.sliders[i].range[0]) / 2 + cat.sliders[i].range[0]);
            if (i in categoryData.relation) {
                value = categoryData.relation[i];
            }
            
            $('<label for="slider' + i + '">' + cat.sliders[i].text + '</label>'
              + '<input type="range" min="' + cat.sliders[i].range[0]
              + '" max="' + cat.sliders[i].range[1] + '" value="'
              + value +'">').appendTo($('#sliders'));
        }
    }
};

function fillText() {
    var categories = category.list();

    for (var i = 0; i < categories.length; ++i) {
        var strategies = category.getStrategies(categories[i])

        for (var j = 0; j < strategies.length; ++j) {
            $('#strat' + j + '-' + i).text(strategies[j])
        }
    }
}