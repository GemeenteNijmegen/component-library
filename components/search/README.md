## Search

Status: WIP

### Using the search in HTML

To make the search work properly we need to initialize it and connect to OpenIndex, so place underneath JavaScript just before the closing BODY element and after the jQuery script tag:
```javascript
<script type="text/javascript" src="//www.openindex.io/js/openindex.69694b9315763c81.js"></script>
<script type="text/javascript">
$(function() {
    openindex.preCallback = function(q) {
        if (q && q.length > 0) {
            var fld = $('label[for="' + openindex.store.inputField.replace('#', '') + '"]');
            if (fld.length) {
                fld.addClass('active');
            }
        }
    };

    //Geen result icons tonen (want die zijn nog niet gedefinieerd)
    openindex.result.icons=false;
    openindex.result.defaultIcon=false;

    //Trending pages vertaling
    openindex.trending.header = "Veel gezocht";

    //Titeltekst bij ontbrekende titels
    openindex.result.defaultTitle = "Geen titel";

    //Spellcheck vertaling
    openindex.spell.spellcheckFollow = "Niets gevonden voor %QUERY%, getoonde resultaten zijn voor %SUGGEST%.";
    openindex.spell.spellcheckSuggest = "Bedoelt u %SUGGEST%?";

    // Datum sinds.. vertalingen
    openindex.result.timeSinceFormat = "%AMOUNT% %UNIT% geleden";
    openindex.result.timeSinceMapping = {
        "now": "nu",
        "today": "vandaag",
        "yesterday": "gisteren",
        "seconds": "seconden",
        "minutes": "minuten",
        "hours": "uur",
        "days": "dagen",
        "weeks": "weken",
        "months": "maanden",
        "years": "jaren"
    };

    openindex.type.multiSelect = true;
    openindex.cat.multiSelect = false;

    openindex.suggest.development = false;
    openindex.suggest.rows = 8; /* MIN: 2 and MAX: 8, DEFAULT: 4*/
    openindex.result.showTimeSince = true;
    openindex.result.removeFromTitle = / \| Gemeente nijmegen/gi;
    openindex.trending.removeFromTitle = / \| Gemeente nijmegen/gi;
    openindex.spell.autoFollowSuggest = true;

    openindex.cat.header = "Categorie";
    openindex.date.header = "Periode";
    openindex.type.header = "Bestandstype";
    openindex.pager.rows = 5;
    openindex.pager.prevLabel = "<i class=\"mdi mdi-chevron-left\" aria-hidden=\"true\"></i>";
    openindex.pager.nextLabel = "<i class=\"mdi mdi-chevron-right\" aria-hidden=\"true\"></i>";
    openindex.pager.manyResults = "Zoekresultaten voor \"%QUERY%\"";
    openindex.pager.noResults = "Geen resultaten gevonden voor \"%QUERY%\"";
    openindex.pager.fewResults = "%TOTAL% resultaten gevonden";
    openindex.pager.oneResult = "Exact 1 resultaat gevonden";
    openindex.spell.spellcheckSuggest = "Bedoelde u %SUGGEST%?";

    openindex.type.mapping =
    {
        "text/html" : "Webpagina",
        "application/pdf" : "PDF bestand",
        "application/document" : "Document"
    };
});
</script>
```
