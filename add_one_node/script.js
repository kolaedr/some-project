
class Elem {
    constructor(tagname) {       
        this.tagname = tagname;
        this.elem = document.createElement(tagname);;
    }
    html(value) {
        this.elem.innerHTML = value;
        return this;
    }
    append(value) {
        this.elem.append(value);
        return this;
    }
    prepend(value) {
        this.elem.prepend(value);
        return this;
    }
    attr(value, val) {
        this.elem.setAttribute(value, val);
        return this;
    }
    get show(){
        return document.body.append(this.elem);
    }
}

let elem = new Elem('h1');

elem.html('value').append(11).prepend(22).attr('value', 'val').show;