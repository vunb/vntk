var test = require("tape");
var vntk = require("../../lib/vntk")

test("utility functions", function (t) {
    t.plan(4);

    t.equal(vntk.util.clean_html(`<span style="color: #4b67a1;">This is a demo</span>`), "This is a demo");
    t.equal(vntk.util.clean_html(` <!--
 -->`), "");
    t.equal(vntk.util.clean_html(`a<script type="text/javascript">
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
    t.equal(vntk.util.clean_html(`<h2><span style="color: #4b67a1;">This is a demo</span> - <span style="color: #008000;">You can edit the text! <img src="/images/smiley.png" alt="laughing" /> &hearts;</span></h2>
<p>Type in the <strong>visual editor</strong> on the left or the <strong>source editor</strong> on the right and see them both change in real time.</p>
<p>Set up the cleaning preferences below and click the <strong style="box-shadow: 3px 3px 3px #aaa; border-radius: 5px; padding: 0 5px; background-color: #2b3a56; color: #fff;"> Clean HTML</strong> button to clean the HTML source code.</p>
<!--This is just a comment above the table...-->
<table class="demoTable" cellpadding="10">
<tbody>
<tr style="text-align: center;">
<td><img src="images/document-editors.png" alt="editors" /></td>
<td><img src="images/cleaning-arrow.png" alt="cleaning" /></td>
<td><img src="images/clean-html.png" alt="editors" width="86" height="122" /></td>
</tr>
<tr>
<td colspan="3"><strong>Convert almost any document to clean HTML in three simple steps:</strong>
<ol>
<li>Paste the content of the Document in the editor</li>
<li>Click the Clean HTML (optional)</li>
<li>Copy the generated HTML code</li>
</ol>
</td>
</tr>
</tbody>
</table>
<p><strong><span style="color: #366691; font-size: 20px; text-shadow: 4px 10px 4px #888;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HTML-Cleaner.com</span></strong></p>
<p>Please find below all the cleaning preferences, the Find And Replace tool, the Lorem-ipsum generator, the <a href="https://html-cleaner.com/case-converter/">Case Converter</a> and much more!</p>
<p>Don't forget to save this link into your bookmarks and share it with your friends.</p>`),
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