
Small Javascript library that parse a string containing multiple small HTML templates an extract the needed one.

It allows you to manage many small templates in one file instead of having many template files a few lines of code each

##EXAMPLES

### template.html
```` html
[first]
<h1>First</h1>

[aname]
<div data-list="['a','b','c']">Second</div>

[third]
<div><p>Third</p></div>
<span>extra</span>

...

[another_name]
<div><p>Third [myname]</p></div>
<span>extra</span>
````

### index.js


###### Extract single template
```` javascript
import {TemplateLoader} from '../src/TemplateLoader'
let template_file = 'my template file as string'

// Extract the template marked wit 'aname'
let mytemplate = TemplateLoader.load(template_file, 'aname') 
````
Now mytemplate varible contains a string:
```` javascript
 mytemplate == "<div data-list="['a','b','c']">Second</div>" //? true
````


###### Extract all the templates at once
```javascript
import {TemplateLoader} from '../src/TemplateLoader'
let template_file = 'my template file as string'
// Extract all the templates
let allmytemplate = TemplateLoader.load(template_file)
````
Now allmytemplates contains an Object:
```` javascript
allmytemplate == { 
     first: "<h1>First</h1>", 
     aname : "<div data-list="['a','b','c']">Second</div>",
     third : "<div><p>Third</p></div><span>extra</span>"
     ...
     another_name : "<div><p>Third [myname]</p></div><span>extra</span>"
 }

````