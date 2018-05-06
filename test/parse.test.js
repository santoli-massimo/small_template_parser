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
    <div><p>Third [myname]</p></div>
    <span>extra</span>
    [last]

    <input type="text">

`

describe('Parser test', () => {
    it('should not return more than one template', () => {
        let res = TemplateParser.load(template, 'first') 
        expect(res).not.toMatch(/second/gmi)
    });
    it('last template shoud be parsed correctly', () => {
        let res = TemplateParser.load(template, 'last') 
        expect(res.trim()).toBe('<input type="text">')
    });
});

describe('General Test', () => {
    it('should return empty string when there is no [template_name] match', () => {
        let res = TemplateParser.load('template', 'first') 
        expect(res).toMatch('')
    });
    it('should return the correct template', () => {
        let res = TemplateParser.load(template, 'first') 
        expect(res.trim()).toBe('<h1>First</h1>')
    });
});

describe('Object test [ load() called without "template_name" property', () => {
    it('should return an object', () => {
        let res = TemplateParser.load(template) 
        expect(res).toBeInstanceOf(Object)
    });
    it('Object should have all the keys', () => {
        let res = TemplateParser.load(template)
        expect(res).toHaveProperty('first','second','third','another','last')
    });
    it('should return empty object if there aren\'t any [template_name] key', () => {
        let res = TemplateParser.load('template') 
        expect(res).toEqual({})
    });
});

