import {TemplateParser} from '../src/TemplateParser'

var template = `

[first]
<h1>First</h1>

[second]
<div>Second</div>

[third]

<div><p>Third</p></div>

<span>extra</span>

[another]
<div><p>Third [anything]</p></div>
<span>extra</span>
[last]

<input type="text">

`

describe('START TAG recognition Tests', () => {
    it('should not return empty string if there is a template tag matching [template_name]', () => {
        let res = TemplateParser.load(template, 'first') 
        expect(res).not.toBe('')
    });
    it('should return empty string when there is no [template_name] match', () => {
        let res = TemplateParser.load('template', 'first') 
        expect(res).toMatch('')
    });    
})

describe('END TAG recognition Tests', () => {
    it('should not return more than one template', () => {
        let res = TemplateParser.load(template, 'first') 
        expect(res).not.toMatch(/second/gmi)
    });
    it('EOF should be recognized as closing tag', () => {
        let res = TemplateParser.load(template, 'last') 
        expect(res.trim()).toBe('<input type="text">')
    });
})

describe('Whole Template recognition test', () => {
    it('should return the correct template', () => {
        let res = TemplateParser.load(template, 'first')
        expect(res.trim()).toBe('<h1>First</h1>')
    });
})
describe('Pattern similar to [tamplate_name] inside a template', () => {
    it('should not recognize [anything] as endtag when parsing [template_name]', () => {
        let res = TemplateParser.load(template, 'another') 
        expect(res.replace(/\r?\n?/g, ''))
        .toBe('<div><p>Third [anything]</p></div><span>extra</span>')
    });
    it('should not match [anything] as template tag if is inside a template', () => {
        let res = TemplateParser.load(template, '[anything]') 
        expect(res.trim()).toBe('') 
    });  
})


describe('Object test [ load() called without "template_name" property', () => {
    it('should return an object', () => {
        let res = TemplateParser.load(template) 
        expect(res).toBeInstanceOf(Object)
    });
    it('Object should have all the keys', () => {
        let res = TemplateParser.load(template)
        expect(res).toHaveProperty('first','second','third','another','last')
    });
    it('should ignore [anything] if is inside a template (with other char before or after) ', () => {
        let res = TemplateParser.load(template) 
        expect(res).not.toHaveProperty('anything') 
    }); 
    it('should return empty object if there aren\'t any [template_name] key', () => {
        let res = TemplateParser.load('template') 
        expect(res).toEqual({})
    });
});

