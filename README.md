
# xBl0g

*XBl0g*: Fast, Simple, minimal Nerd BLOG :-)

### System configuration

All the configuration are made in XML. Why this? Because XML is more human readable
maybe in the future I can made a new version with json format.

```XML
<xblog>
	<siteName></siteName>
	<subTitle></subTitle>
	<homepage></homepage>
	<theme>default</theme>
</xblog>
```

`<siteName>` TAG is for the web site name

`<subTitle>` TAG is for the subtitle of the web site

`<homepage>` TAG you can write here the content of your home page

`<theme>` TAG is for change the web site style


### Add new simple page (Markdown) 

For add new pages, you need to add new `<page>` object inside: 

    resources/page.xml


#### Page example:

```XML
<page>
	<tag>mytagpage</tag>
	<title>My New Page</title>
	<markup>MARKDOWN</markup>
	<content></content>
</page>

```

the `<tag>` is used also for connecto the page to the menu bar

### Menu entry Example

```XML
<menu>
  <id>mytagpage</id>
  <title>NewPage</title>
  <url></url>
</menu>
```

XBlog use "showdownjs" library for covert Markdown to HTML. 
For more information follow this [link] [showdownjs-wiki]

[showdownjs-wiki]: https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax
