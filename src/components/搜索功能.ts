/*
*
* */
var
    data = [
        ['Tesla', 2017, 'black', 'black'],
        ['Nissan', 2018, 'blue', 'blue'],
        ['Chrysler', 2019, 'yellow', 'black'],
        ['Volvo', 2020, 'yellow', 'gray']
    ],
    example = document.getElementById('example1'),
    searchFiled = document.getElementById('search_field'),
    hot;

hot = new Handsontable(example, {
    data: data,
    colHeaders: true,
    search: true
});

Handsontable.dom.addEvent(searchFiled, 'keyup', function (event) {
    var search = hot.getPlugin('search');
    var queryResult = search.query(this.value);

    console.log(queryResult);
    hot.render();
});

/*
*
* */

var
    data = [
        ["Tesla", 2017, "black", "black"],
        ["Nissan", 2018, "blue", "blue"],
        ["Chrysler", 2019, "yellow", "black"],
        ["Volvo", 2020, "white", "gray"]
    ],
    example2 = document.getElementById("example2"),
    hot2, searchFiled2;

hot2 = new Handsontable(example2,{
    data: data,
    colHeaders: true,
    search: {
        searchResultClass: 'customClass'
    }
});
searchFiled2 = document.getElementById('search_field2');

Handsontable.dom.addEvent(searchFiled2, 'keyup', function (event) {
    var search = hot2.getPlugin('search');
    var queryResult = search.query(this.value);

    console.log(queryResult);
    hot2.render();
});

/*
*
*
* */