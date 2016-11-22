var initialCats=[
        {
            clickCount:0,
            name:'Tabby',
            imgSrc:'img/434164568_fea0ad4013_z.jpg',
            imgAttribution :'https://www.flickr.com/photos',
            nicknames:['gluneko','katy','terry']
        },
        {
            clickCount:0,
            name:'Tiger',
            imgSrc:'img/4154543904_6e2428c421_z.jpg',
            imgAttribution :'https://www.flickr.com/photos',
            nicknames:['roar']
        },
        {
            clickCount:0,
            name:'Scaredy',
            imgSrc:'img/22252709_010df3379e_z.jpg',
            imgAttribution :'https://www.flickr.com/photos',
            nicknames:['small']
        },
        {
            clickCount:0,
            name:'Shadow',
            imgSrc:'img/1413379559_412a540d29_z.jpg',
            imgAttribution :'https://www.flickr.com/photos',
            nicknames:['west']
        },
        {
            clickCount:0,
            name:'Sleepy',
            imgSrc:'img/9648464288_2516b35537_z.jpg',
            imgAttribution :'https://www.flickr.com/photos',
            nicknames:['dream']
        },
    ];


var Cat=function (data) {
    this.clickCount=ko.observable(data.clickCount);
    this.name=data.name;
    this.imgSrc=data.imgSrc;
    this.imgAttribution=data.imgAttribution;
    this.nicknames=data.nicknames;

    this.level=ko.computed(function () {
        var title;
        var clicks=this.clickCount();
        if(clicks<10){
            title='Newborn';
        }else if(clicks<20){
            title='Infant';
        }else if(clicks<30){
            title='Teen';
        }else if(clicks<40){
            title='Adult';
        }else{
            title='Ninja';
        }
        return title;
    },this);

};

var ViewModel=function () {
    var self=this;

    this.catlist=ko.observableArray([]);

    initialCats.forEach( function(catItem) {
        self.catlist.push(new Cat(catItem));
    });

    this.currentCat=ko.observable(this.catlist()[0]);
    this.incrementCounter=function(){
        this.clickCount(this.clickCount()+1);
        //self.currentCat().clickCount(self.currentCat().clickCount()+1);
    };

    this.setCat=function (clickedCat) {
        self.currentCat(ko.observable(clickedCat));
    }
};

ko.applyBindings(new ViewModel());