# style.lessの設定

関係なさそうなプロパティ、意味の分からないプロパティもそのままコピペしてきた

```less
/* Please visit the URL below for more information: */
/*   https://shd101wyy.github.io/markdown-preview-enhanced/#/customize-css */
:root {
  --CartoonSunrise-OceanBoatBlue: #007DC6;
  --CartoonSunrise-Aero: #79B9E7;
  --CartoonSunrise-VividTangero: #F47421;
  --CartoonSunrise-RipeMango: #FFC120;
  --CartoonSunrise-BrightGray: #E7F0F7;
  --CartoonSunrise-Apple: #76C143;
}
.markdown-preview.markdown-preview {
  /**
 * prism.js Github theme based on GitHub's theme.
 * @author Sam Clarke
 */
  background-color: black;
  color: white;
  /* Code blocks */
  /* Inline code */
  /* Please visit the URL below for more information: */
  /*   https://shd101wyy.github.io/markdown-preview-enhanced/#/customize-css */
}
.markdown-preview.markdown-preview code,
.markdown-preview.markdown-preview pre {
  color: #333;
  background: none;
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  line-height: 1.4;
  -moz-tab-size: 8;
  -o-tab-size: 8;
  tab-size: 8;
  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;
}
.markdown-preview.markdown-preview pre {
  padding: 0.8em;
  overflow: auto;
  /* border: 1px solid #ddd; */
  border-radius: 3px;
  /* background: #fff; */
  background: var(--CartoonSunrise-BrightGray);
}
.markdown-preview.markdown-preview :not(pre) > code {
  padding: 0.1em;
  border-radius: 0.3em;
  white-space: normal;
  background: var(--CartoonSunrise-BrightGray);
}
.markdown-preview.markdown-preview h1,
.markdown-preview.markdown-preview h2,
.markdown-preview.markdown-preview h3,
.markdown-preview.markdown-preview h4,
.markdown-preview.markdown-preview h5,
.markdown-preview.markdown-preview h6 {
  line-height: 1.2;
  margin-top: 1em;
  margin-bottom: 16px;
  color: var(--CartoonSunrise-VividTangero);
}
.markdown-preview.markdown-preview h1::before {
  content: "# ";
}
.markdown-preview.markdown-preview h1 {
  font-size: 2.25em;
  font-weight: 300;
  padding-bottom: 0.3em;
}
.markdown-preview.markdown-preview h2::before {
  content: "## ";
}
.markdown-preview.markdown-preview h2 {
  font-size: 1.75em;
  font-weight: 400;
  padding-bottom: 0.3em;
}
.markdown-preview.markdown-preview h3::before {
  content: "### ";
}
.markdown-preview.markdown-preview h3 {
  font-size: 1.5em;
  font-weight: 500;
}
.markdown-preview.markdown-preview h4::before {
  content: "#### ";
}
.markdown-preview.markdown-preview h4 {
  font-size: 1.25em;
  font-weight: 600;
}
.markdown-preview.markdown-preview h5::before {
  content: "##### ";
}
.markdown-preview.markdown-preview h5 {
  font-size: 1.1em;
  font-weight: 600;
}
.markdown-preview.markdown-preview h6::before {
  content: "###### ";
}
.markdown-preview.markdown-preview h6 {
  font-size: 1em;
  font-weight: 600;
}
.markdown-preview.markdown-preview h1,
.markdown-preview.markdown-preview h2,
.markdown-preview.markdown-preview h3,
.markdown-preview.markdown-preview h4,
.markdown-preview.markdown-preview h5 {
  font-weight: 600;
}
.markdown-preview.markdown-preview h5 {
  font-size: 1em;
}
.markdown-preview.markdown-preview h6 {
  color: #5c5c5c;
}
.markdown-preview.markdown-preview strong {
  color: var(--CartoonSunrise-Apple);
}
.markdown-preview.markdown-preview em {
  color: var(--CartoonSunrise-RipeMango);
}
.markdown-preview.markdown-preview blockquote em::before,
.markdown-preview.markdown-preview blockquote em::after {
  margin-left: 0.5rem;
  content: "";
}
.markdown-preview.markdown-preview blockquote em {
  color: #000;
  background-color: var(--CartoonSunrise-RipeMango);
}
.markdown-preview.markdown-preview del {
  color: #5c5c5c;
}
.markdown-preview.markdown-preview a:not([href]) {
  color: inherit;
  text-decoration: none;
}
.markdown-preview.markdown-preview a {
  color: var(--CartoonSunrise-Aero);
  text-decoration: none;
}
.markdown-preview.markdown-preview a:after {
  content: "↗";
}
.markdown-preview.markdown-preview a:hover {
  color: var(--CartoonSunrise-OceanBoatBlue);
  text-decoration: none;
}
.markdown-preview.markdown-preview img {
  max-width: 100%;
}
.markdown-preview.markdown-preview ul.no-list,
.markdown-preview.markdown-preview ol.no-list {
  padding: 0;
  list-style-type: none;
}
.markdown-preview.markdown-preview ul ul,
.markdown-preview.markdown-preview ul ol,
.markdown-preview.markdown-preview ol ol,
.markdown-preview.markdown-preview ol ul {
  margin-top: 0;
  margin-bottom: 0;
}
.markdown-preview.markdown-preview li {
  margin-bottom: 0;
}
.markdown-preview.markdown-preview li.task-list-item {
  list-style: none;
}
.markdown-preview.markdown-preview li > p {
  margin-top: 0;
  margin-bottom: 0;
}
.markdown-preview.markdown-preview .task-list-item-checkbox {
  margin: 0 0.2em 0.25em -1.8em;
  vertical-align: middle;
}
.markdown-preview.markdown-preview .task-list-item-checkbox:hover {
  cursor: pointer;
}
.markdown-preview.markdown-preview blockquote {
  margin: 16px 0;
  font-size: inherit;
  padding: 0 15px;
  color: #5c5c5c;
  background-color: var(--CartoonSunrise-BrightGray);
  border-left: 4px solid var(--CartoonSunrise-Apple);
}
.markdown-preview.markdown-preview blockquote p code {
  background-color: var(--CartoonSunrise-OceanBoatBlue);
  color: var(--CartoonSunrise-BrightGray);
}
.markdown-preview.markdown-preview blockquote p a {
  color: var(--CartoonSunrise-OceanBoatBlue);
}
.markdown-preview.markdown-preview blockquote p a:hover {
  color: var(--CartoonSunrise-Aero);
}
.markdown-preview.markdown-preview blockquote > :last-child {
  margin-bottom: 0;
}
.markdown-preview.markdown-preview hr {
  height: 4px;
  margin: 32px 0;
  background-color: var(--CartoonSunrise-Apple);
  border: 0 none;
}
.markdown-preview.markdown-preview table {
  margin: 10px 0 15px 0;
  border-collapse: collapse;
  border-spacing: 0;
  display: block;
  width: 100%;
  overflow: auto;
  word-break: normal;
  word-break: keep-all;
}
.markdown-preview.markdown-preview table th {
  font-weight: bold;
  color: var(--CartoonSunrise-Apple);
}
.markdown-preview.markdown-preview table td,
.markdown-preview.markdown-preview table th {
  border: 1px solid var(--CartoonSunrise-RipeMango);
  padding: 6px 13px;
}
.markdown-preview.markdown-preview dl {
  padding: 0;
}
.markdown-preview.markdown-preview dl dt {
  padding: 0;
  margin-top: 16px;
  font-size: 1em;
  font-style: italic;
  font-weight: bold;
}
.markdown-preview.markdown-preview dl dd {
  padding: 0 16px;
  margin-bottom: 16px;
}
.markdown-preview.markdown-preview code {
  font-family: Menlo, Monaco, Consolas, 'Courier New', monospace;
  font-size: 0.85em !important;
  color: var(--CartoonSunrise-OceanBoatBlue);
  background-color: #f0f0f0;
  border-radius: 3px;
  padding: 0.2em 0;
}
.markdown-preview.markdown-preview code::before,
.markdown-preview.markdown-preview code::after {
  letter-spacing: -0.2em;
  content: "\00a0";
}
.markdown-preview.markdown-preview pre > code {
  padding: 0;
  margin: 0;
  font-size: 0.85em !important;
  word-break: normal;
  white-space: pre;
  background: transparent;
  border: 0;
}
.markdown-preview.markdown-preview .highlight {
  margin-bottom: 16px;
}
.markdown-preview.markdown-preview .highlight pre,
.markdown-preview.markdown-preview pre {
  padding: 1em;
  overflow: auto;
  font-size: 0.85em !important;
  line-height: 1.45;
  border: #d6d6d6;
  border-radius: 3px;
}
.markdown-preview.markdown-preview .highlight pre {
  margin-bottom: 0;
  word-break: normal;
}
.markdown-preview.markdown-preview pre code,
.markdown-preview.markdown-preview pre tt {
  display: inline;
  max-width: initial;
  padding: 0;
  margin: 0;
  overflow: initial;
  line-height: inherit;
  word-wrap: normal;
  border: 0;
}
.markdown-preview.markdown-preview pre code:before,
.markdown-preview.markdown-preview pre tt:before,
.markdown-preview.markdown-preview pre code:after,
.markdown-preview.markdown-preview pre tt:after {
  content: normal;
}
.markdown-preview.markdown-preview p,
.markdown-preview.markdown-preview blockquote,
.markdown-preview.markdown-preview ul,
.markdown-preview.markdown-preview ol,
.markdown-preview.markdown-preview dl,
.markdown-preview.markdown-preview pre {
  margin-top: 0;
  margin-bottom: 16px;
}
.markdown-preview.markdown-preview kbd {
  color: #000;
  border: 1px solid #d6d6d6;
  border-bottom: 2px solid #c7c7c7;
  padding: 2px 4px;
  background-color: #f0f0f0;
  border-radius: 3px;
}

```