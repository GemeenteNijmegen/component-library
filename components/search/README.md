## Search

Status: WIP

### Using the search in HTML

To make the search work properly we need to initialize it and connect to OpenIndex, so place underneath JavaScript just before the closing BODY element and after the jQuery script tag:
```javascript
<script type="text/javascript" src="http://www.openindex.io/js/openindex.69694b9315763c81.js"></script>
<script type="text/javascript">
$(function() {
    openindex.suggest.development = false;
    openindex.result.showTimeSince = true;
    openindex.spell.autoFollowSuggest = true;

    openindex.cat.header = "Categorie";
    openindex.date.header = "Periode";
    openindex.type.header = "Bestandstype";
    openindex.pager.prevLabel = "<i class=\"mdi mdi-chevron-left\" aria-hidden=\"true\"></i>";
    openindex.pager.nextLabel = "<i class=\"mdi mdi-chevron-right\" aria-hidden=\"true\"></i>";
    openindex.pager.manyResults = "Toont %START% tot %END% van de %TOTAL% resultaten";
    openindex.pager.noResults = "Geen resultaten gevonden voor %QUERY%";
    openindex.pager.fewResults = "%TOTAL% resultaten gevonden";
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
