var Cat=function (name,pic) {
    this.name=name;
    this.pic=pic;
    this.cnt=0;
};

var cats=[
    new Cat('first cat','cat1.jpg'),
    new Cat('second cat','cat2.jpg'),
    new Cat('cute cat','cat3.jpg'),
    new Cat('lovely cat','cat4.jpg'),
    new Cat('small cat','cat5.jpg'),
];

$('#cat').css('display','none');
for(var i=0;i<cats.length;i++){
    (function (cat) {
        var $li=$('<li>'+cat.name+'</li>');
        $('#list').append($li);
        // var $fig=$('<figure></figure>');
        // var $name=$('<p></p>').text(cat.name);
        // var $pic=$('<img src="images/'+cat.pic+'" alt="a cute cat" width="300" height="300">');
        // var $cnt=$('<p></p>').text(cat.cnt);
        // $fig.append($name,$pic,$cnt);
        // $('#display').append($fig);
        // $($fig).css("display","none");
        var $pic=$('<img src="images/'+cat.pic+'" alt="a cute cat" id="pic" width="300" height="300">');
        $li.click(function () {
            $('#cat').css('display','block');
            $('#name').text(cat.name);
            $('#pic').remove();
            $('#name').after($pic);
            $('#counter').text(cat.cnt);
        });
        $pic.click(function () {
            $('#counter').text(++cat.cnt);
        });
    })(cats[i]);
}
