
//******************ALFA VERSION************************
const startArea = document.querySelector('.start-window');
const youLose = document.querySelector('.you-lose');
const youWin = document.querySelector('.you-win');
const counter = document.querySelector('.counter');
const timer = document.querySelector('.timer');
const play = document.querySelector('.play');
const game = document.querySelector('.game');
const infoBlock = document.querySelector('.time-line');
const infoBlockBal = document.querySelector('.bal-line');
let count;
let indicator = 100;
let indicator2 = 0;
let bal = 200;

Math.rand = function (min, max) {
    return this.round(this.random() * (max - min) + min);
};

function Birds(x, y, time, imgUrl, sizeImg, cost, locationPice) {
    this.x = x;
    this.y = y;
    this.time = time;
    this.imgUrl = imgUrl;
    this.sizeImg = sizeImg;
    this.locationPice = locationPice;
    this.cost = cost;
    this.img = document.createElement('img');
    let inretval;
    this.show = function () {
        this.img.setAttribute('src', this.imgUrl);
        this.img.setAttribute('data-cost', this.cost);
        this.img.setAttribute('class', 'bird');
        this.img.style.cssText = `position: absolute; 
        left:  ${this.x}%;
        top:  ${this.y}%;
        width: ${this.sizeImg}px;
        transition-property: left, top;
        transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);`;
        this.locationPice.append(this.img);
        return this;
    };
    this.size = function () {
    }
    this.move = function () {
        inretval = setInterval(() => {
            this.x = Math.rand(0, this.locationPice.getBoundingClientRect().width - this.sizeImg);
            this.y = Math.rand(100, this.locationPice.getBoundingClientRect().height - this.sizeImg);
            console.log(this.locationPice.getBoundingClientRect().width)
            this.img.style.left = this.x + 'px';
            this.img.style.top = this.y + 'px';
        }, this.time);
        return this;
    };
    this.stop = function () {
        clearInterval(inretval);
    };
}

let bird1, bird2, bird3, bird4, timeInt;

function gameStart(sec) {
    if (bird1 != undefined || bird2 != undefined || bird3 != undefined || bird4 != undefined) {
        bird1.show();
        bird2.show().move();
        bird3.show().move();
        bird4.show().move();
    } else {
        bird1 = new Birds(20, 50, 1500, 'images/bird_10_points.png', 100, 10, game).show().move();
        bird2 = new Birds(40, 50, 1000, 'images/bird_20_points.png', 80, 20, game).show().move();
        bird3 = new Birds(60, 50, 700, 'images/bird_50_points.png', 50, 50, game).show().move();
        bird4 = new Birds(80, 50, 2000, 'images/pig_minus_100_points.png', 100, '-100', game).show().move();
    }
    let indicator1 = 100 / sec;
    indicator = 100;
    timeInt = setInterval(() => {
        if (sec < 0) {
            bird1.stop();
            bird2.stop();
            bird3.stop();
            bird4.stop();
            stopGame(youLose)
            clearInterval(timeInt);
            return;
        } else {
            console.log(indicator1)
            indicator -= indicator1;
            infoBlock.style.width = `${indicator}%`;
            let curentDisplayMin = Math.floor(sec / 60) < 10 ? '0' + Math.floor(sec / 60) : Math.floor(sec / 60);
            let curentDisplaySec = (sec % 60) == 0 ? '00' : Math.floor(sec % 60) < 10 ? '0' + Math.floor(sec % 60) : Math.floor(sec % 60);
            timer.innerHTML = curentDisplayMin + ':' + curentDisplaySec;
        }
        sec -= 1;
    }, 1000);

}

play.addEventListener('click', (e) => {
    game.style.animation = 'divout 0.7s 1 linear';
    game.style.top = 0;
    startArea.style.opacity = 0;
    play.style.display = 'none';
    gameStart(120);
    count = 0;
    indicator2 = 0;
});

game.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.classList.contains('bird')) {
        let cost = +e.target.getAttribute('data-cost');
        if (cost < 0) {
            count -= count;
            if (count <= 0) {
                infoBlockBal.style.width = `0%`;
                indicator2 = 0;
            } else {
                indicator2 -= (100 * count) / bal;
                infoBlockBal.style.width = `${indicator2}%`;
            }
        } else {
            count += cost;
            indicator2 += (100 * count) / bal;
            infoBlockBal.style.width = `${indicator2}%`;
        }
        counter.innerHTML = count;
        bangEffect(e.target);
        if (count >= bal) {
            count = 0;
            bird1.stop();
            bird2.stop();
            bird3.stop();
            bird4.stop();
            stopGame(youWin);
            indicator2 = 0;
            counter.innerHTML = count;
        }
    }
});

function bangEffect(elem) {
    let back = elem.getAttribute('src');
    elem.setAttribute('src', 'images/bang.png');
    elem.style.transform = 'scale(1.7)';
    setTimeout(() => {
        elem.style.display = 'none';
    }, 150);
    setTimeout(() => {
        elem.style.top = `${Math.rand(10, 90)}%`;
        elem.style.left = `${Math.rand(10, 90)}%`;
        elem.style.transform = 'scale(1)';
        elem.setAttribute('src', back);
        elem.style.display = 'block';
    }, 200);
}

function stopGame(elem) {
    game.style.top = '-100vh';
    game.style.animation = 'none';
    elem.style.animation = 'divlose 0.7s 1 linear';
    elem.style.top = '0vh';
    infoBlockBal.style.width = `0%`;
    clearInterval(timeInt);
    setTimeout(() => {
        play.style.display = 'block';
        elem.style.animation = 'divlose 0.2s 1 linear';
        youLose.style.top = '-100vh';
        youWin.style.top = '-100vh';
        infoBlock.style.width = `100%`;
        elem.style.animation = 'none';
        counter.innerHTML = 0;
        startArea.style.opacity = 1;
    }, 2000);

}


