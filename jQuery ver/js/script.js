
/* ======= Model ======= */

var model={
    currentCat:null,
    showAdmin:false,
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
        adminView.init();
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
    },

    //show the admin area
    showAdmin:function (show) {
        model.showAdmin=true;
        adminView.render();
    },

    // save the modification of cat data and hide the admin area
    save:function (newName,newImg,newCount) {
        model.currentCat.name=newName;
        model.currentCat.imgSrc=newImg;
        model.currentCat.clickCount=newCount;
        catView.render();
        catListView.render();
        model.showAdmin=false;
        adminView.render();
    },

    // hide the admin area
    cancel:function () {
        model.showAdmin=false;
        adminView.render();
    },

    getAdmin:function () {
        return model.showAdmin;
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

var adminView={
    init:function () {
        // store pointers to our DOM elements for easy access later
        this.$adminForm=$('#admin-form');
        var $adminBtn=$('#admin-btn');
        var $newName=$('#new-name');
        var $newImg=$('#new-img');
        var $newCount=$('#new-count');
        var $cancel=$('#cancel');

        // on submit, save the data
        this.$adminForm.submit(function (e) {
            octopus.save($newName.val(),$newImg.val(),$newCount.val());
            e.preventDefault();
        });

        //on click admin,show the admin area and clear the input values
        $adminBtn.click(function () {
            octopus.showAdmin();
            $newName.val('');
            $newImg.val('');
            $newCount.val('');
        });

        $cancel.click(function () {
            octopus.cancel();
        });

        adminView.render();
    },
    render:function () {
        var show=octopus.getAdmin()?"block":"none";
        this.$adminForm.css("display",show);
    }
};

// make it go!
octopus.init();