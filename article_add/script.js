const articleForm = document.forms.articleForm;
const addAr = document.querySelector('.add-article');
const textarticleElem = document.querySelector('#textarticle');
const input = document.querySelector('input');

addAr.addEventListener('click', (e) => {
    e.preventDefault();
    let article = new Article(articleForm.elements.header.value,
        articleForm.elements.textarticle.value,
        articleForm.elements.setimage.value,
        articleForm.elements.position[0].checked ? articleForm.elements.position[0].value : articleForm.elements.position[1].value,
        articleForm.elements.color.value,
        articleForm.elements.bgcolor.value);
    article.publish();

});

class Article {
    constructor(header, text, image, position, colorText, bgColor) {       //для инициализации свойств обьекла при создании обьекта в классе
        this.header = header;
        this.text = text;
        this.image = image;
        this.position = position;
        this.colorText = colorText;
        this.bgColor = bgColor;
        this.div = document.createElement('div');
        this.divText = document.createElement('div');
        this.headerElem = document.createElement('h2');
        this.textElem = document.createElement('p');
        this.imageElem = document.createElement('img');
        this.div.classList.add('article');
    }
    setHeader(value) {

        this.headerElem.innerHTML = value;
        this.div.append(this.headerElem);
        document.body.append(this.div);
        return this;
    }
    setText(value) {
        this.textElem.innerHTML = value;
        this.divText.append(this.textElem);
        this.div.append(this.divText);
        document.body.append(this.div);
        return this;
    }
    setImage(value) {
        this.imageElem.setAttribute('src', value);
        this.divText.prepend(this.imageElem);
        this.div.append(this.divText);
        document.body.append(this.div);
        return this;
    }
    setImagePosition(value) {
        this.imageElem.style.float = value;
        return this;
    }
    setBgcolor(value) {
        this.div.style.background = value;
        return this;
    }
    setTextcolor(value) {
        this.div.style.color = value;
        return this;
    }
    publish() {
        this.setHeader(this.header);
        this.setText(this.text);
        this.setImage(this.image);
        this.setImagePosition(this.position);
        this.setTextcolor(this.colorText);
        this.setBgcolor(this.bgColor)
    }
}


