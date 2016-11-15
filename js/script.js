// var Cat=function (name,pic) {
//     this.name=name;
//     this.pic=pic;
//     this.cnt=0;
// };

// var cats=[
//     new Cat('first cat','cat1.jpg'),
//     new Cat('second cat','cat2.jpg'),
//     new Cat('cute cat','cat3.jpg'),
//     new Cat('lovely cat','cat4.jpg'),
//     new Cat('small cat','cat5.jpg'),
// ];

// $('#cat').css('display','none');
// for(var i=0;i<cats.length;i++){
//     (function (cat) {
//         var $li=$('<li>'+cat.name+'</li>');
//         $('#list').append($li);
//         // var $fig=$('<figure></figure>');
//         // var $name=$('<p></p>').text(cat.name);
//         // var $pic=$('<img src="images/'+cat.pic+'" alt="a cute cat" width="300" height="300">');
//         // var $cnt=$('<p></p>').text(cat.cnt);
//         // $fig.append($name,$pic,$cnt);
//         // $('#display').append($fig);
//         // $($fig).css("display","none");
//         var $pic=$('<img src="images/'+cat.pic+'" alt="a cute cat" id="pic" width="300" height="300">');
//         $li.click(function () {
//             $('#cat').css('display','block');
//             $('#name').text(cat.name);
//             $('#pic').remove();
//             $('#name').after($pic);
//             $('#counter').text(cat.cnt);
//         });
//         $pic.click(function () {
//             $('#counter').text(++cat.cnt);
//         });
//     })(cats[i]);
// }

/* ======= Model ======= */

var model={
    currentCat:null,
    cats:[
        {
            clickCount:0,
            name:'gluneko',
            imgSrc:'images/cat1.jpg',
            imgAttribution :''
        },
        {
            clickCount:0,
            name:'katy',
            imgSrc:'images/cat2.jpg',
            imgAttribution :''
        },
        {
            clickCount:0,
            name:'henry',
            imgSrc:'images/cat3.jpg',
            imgAttribution :''
        },
        {
            clickCount:0,
            name:'meow',
            imgSrc:'images/cat4.jpg',
            imgAttribution :''
        },
        {
            clickCount:0,
            name:'sunshine',
            imgSrc:'images/cat5.jpg',
            imgAttribution :''
        },
    ]
};

/* ======= Octopus ======= */

var octopus={

    init:function(){
        // set our current cat to the first one in the list
        model.currentCat=model.cats[0];

        // tell our views to initialize
        catListView.init();
        catView.init();
    },

    getCurrentCat:function(){
        return model.currentCat;
    },

    getCats:function(){
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat:function(cat){
        model.currentCat=cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }
};

/* ======= View ======= */

var catView={
    init:function () {
        // store pointers to our DOM elements for easy access later
        this.$cat=$('#cat');
        this.$catName=$('#cat-name');
        this.$catImage=$('#cat-img');
        this.$catCount=$('#cat-count');

        // on click, increment the current cat's counter
        this.$catImage.click(function () {
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render:function () {
        // update the DOM elements with values from the current cat
        var currentCat=octopus.getCurrentCat();
        this.$catName.text(currentCat.name);
        this.$catImage.attr('src',currentCat.imgSrc);
        this.$catCount.text(currentCat.clickCount);
    }
};

var catListView={

    init:function(){
        // store the DOM element for easy access later
        this.$catList=$('#cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render:function () {
        var cat,$li;
        // get the cats we'll be rendering from the octopus
        var cats=octopus.getCats();

        // empty the cat list
        this.$catList.empty();

        // loop over the cats
        cats.forEach( function(cat) {
            // make a new cat list item and set its text
            $li=$('<li>'+cat.name+'</li>');

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            $li.click((function (catCopy) {
                return function () {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                }
            })(cat));

            // finally, add the element to the list
            this.$catList.append($li);
        },this);
    }
};

// make it go!
octopus.init();