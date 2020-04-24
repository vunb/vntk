var test = require("tape");
var vntk = require("../../index");
var util = vntk.util();

test("utility functions", function (t) {
    t.plan(4);

    t.equal(util.clean_html(`<span style="color: #4b67a1;">This is a demo</span>`), "This is a demo");
    t.equal(util.clean_html(` <!--
 -->`), "");
    t.equal(util.clean_html(`a<script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-xxxxxxxx-1']);
      _gaq.push(['_trackPageview']);

      var _track = function(action) {
        _gaq.push(['_trackEvent', 'Engagement', action]);
      };

      (function() {
        var ga = document.createElement('script');
        ga.type = 'text/javascript';
        ga.async = true;

        ga.src = ('https:' == document.location.protocol ?
            'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(ga, s);
      })();
    </script>bc`), `abc`);

    // long text from file.
    const dataFile = require('path').join(__dirname, 'data/junk-sample.html');
    const data = require('fs').readFileSync(dataFile, 'utf-8');
    t.equal(util.clean_html(data),
        `This is a demo - You can edit the text! &hearts;
 Type in the visual editor on the left or the source editor on the right and see them both change in real time.
 Set up the cleaning preferences below and click the Clean HTML button to clean the HTML source code.
 Convert almost any document to clean HTML in three simple steps:
 Paste the content of the Document in the editor
 Click the Clean HTML (optional)
 Copy the generated HTML code
 HTML-Cleaner.com
 Please find below all the cleaning preferences, the Find And Replace tool, the Lorem-ipsum generator, the Case Converter and much more!
 Don't forget to save this link into your bookmarks and share it with your friends.`);
});
