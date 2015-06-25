var joke = {
    y: 0,        // 手指向上滑动距离
    status: 'change',    // 切换动画是否加载完
    count: 8,    // 笑话数组计数
    data: '',     // 返回的JSON数据
    color: ['#47DEEA','#4781EA','#9C47EA','#E647EA','#EA47B6','#EA4772','#26D01A', '#FF873D'],
    init: function () {
        this.html = document.querySelector('html');
        this.bindTouch(this.html);
        this.box = document.querySelector('.box');
        this.author = document.querySelector('#author');
        this.content = document.querySelector('#content');
        this.btn = document.querySelector('#btn');
        this.bindClick(this.btn);
        this.getData('show');   // 页面载入时显示第一个
    },
    bindTouch: function (node) {
        var that = this;
        node.addEventListener('touchstart', function (e) {
            that.y = e.touches[0].clientY;
        }, false);
        node.addEventListener('touchend', function (e) {
            that.y -= e.changedTouches[0].clientY;
            if (that.y < 50 || that.status === 'load') {
                return;
            }
            that.changeJoke();
        }, false);
    },
    bindClick: function (node) {
        var that = this;
        node.addEventListener('click', function (e) {
            if (status === 'load') {
                return;
            }
            that.changeJoke();
        }, false);
    },
    changeJoke: function () {
        var that = this;
        this.status = 'load';
        this.box.className = 'box hide';
        setTimeout(function () {
            that.showJoke();
        }, 500);
    },
    showJoke: function () {
        this.author.innerHTML = this.data[this.count].author;
        this.content.innerHTML = this.data[this.count].content;
        this.box.className = 'box show';
        this.author.style.backgroundColor = this.color[Math.floor(Math.random()*8)];
        this.status = 'change';
        if (++this.count == this.data.length) {
            this.count = 8;
            this.getData();
        }
    },
    formatArray: function (arr) {
        arr.sort(function (a, b) {
            return a.picUrl ? 1 : -1;
        });
        for (var i in arr) {
            if (arr[i].picUrl) {
                break;
            }
        }
        return arr.slice(0, i);
    },
    getData: function () {
        var that = this;
        var arg = arguments[0];
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                that.data = that.formatArray(JSON.parse(xhr.responseText).detail);
                if (arg) {
                    that.showJoke();
                }
            }
        };
        xhr.open('post', '/getData', true);
        xhr.send('r=' + Math.random());
    }
};
window.onload = function () {
    joke.init();
};