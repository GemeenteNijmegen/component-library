## Search

Status: WIP

### Using the search in HTML

To make the search work properly we need to initialize it and connect to OpenIndex, so place underneath JavaScript just before the closing BODY element and after the jQuery script tag:
```javascript
<script type="text/javascript" src="http://www.openindex.io/js/openindex.69694b9315763c81.js"></script>
<script type="text/javascript">
$(function() {
    openindex.suggest.development = true;
    openindex.spell.autoFollowSuggest = true;
    openindex.lang.header = "Taal";
    openindex.type.header = "Bestandstype";
    openindex.type.mapping =
    {
        "text/html" : "Webpagina",
        "application/pdf" : "PDF bestand"
    };
    openindex.lang.mapping = {
        "af":"Afrikaans",
        "ar":"العربية",
        "bg":"Български",
        "bn":"বাংলা",
        "cs":"Česky",
        "da":"Dansk",
        "de":"Deutsch",
        "el":"Ελληνικά",
        "en":"English",
        "es":"Español",
        "et":"Eesti",
        "fa":"فارسی",
        "fi":"Suomi",
        "fr":"Français",
        "fy":"Frysk",
        "gu":"ગુજરાતી",
        "he":"עברית",
        "hi":"हिन्दी",
        "hr":"Hrvatski",
        "hu":"Magyar",
        "id":"Bahasa Indonesia",
        "is":"Íslenska",
        "it":"Italiano",
        "ja":"日本語",
        "kn":"ಕನ್ನಡ",
        "ko":"한국어",
        "lt":"Lietuvių",
        "lv":"Latviešu",
        "mk":"Македонски",
        "ml":"മലയാളം",
        "mr":"मराठी",
        "ne":"नेपाली",
        "nl":"Nederlands",
        "no":"Norsk (bokmål)",
        "pa":"ਪੰਜਾਬੀ",
        "pl":"Polski",
        "pt":"Português",
        "ro":"Română",
        "ru":"Русский",
        "sk":"Slovenčina",
        "sl":"Slovenščina",
        "so":"Soomaaliga",
        "sq":"Shqip",
        "sv":"Svenska",
        "sw":"Kiswahili",
        "ta":"தமிழ்",
        "te":"తెలుగు",
        "th":"ไทย",
        "tl":"Tagalog",
        "tr":"Türkçe",
        "uk":"Українська",
        "ur":"اردو",
        "vi":"Tiếng Việt",
        "zh-cn":"中文",
        "zh-tw":"國語"
    };
});
</script>
```
