const auto=[{brand: "Ford",        model: "Focus ST",           color: "белый",          fuel: 13.8, price: 2,   seats: 4, year: 2008},
            {brand: "Audi",        model: "A3 Cabriolet",       color: "белый",          fuel: 10,   price: 3,   seats: 4, year: 2008},
            {brand: "Ferrari",     model: "F458 Spider",        color: "красный",        fuel: 13.3, price: 16,  seats: 2},
            {brand: "Lamborghini",                              color: "желтый",                     price: 38,  seats: 2, year: 2005},
            {brand: "Volkswagen",                               color: "черный",         fuel: 9.6,  price: 3,   seats: 5, year: 2010},
            {brand: "Bugatti",     model: "Veyron EB 16.4",     color: "черный/красный", fuel: 40,   price: 150,           year: 2005},
            {brand: "Kia",         model: "Rio Hatchback",      color: "оранжевый",                  price: 1,   seats: 5, year: 2005},
            {brand: "Lamborghini",                              color: "желтый",                     price: 38,  seats: 2, year: 2005},
            {brand: "FIAT",        model: "Doblo Combi",                                 fuel: 4.8,  price: 2,   seats: 5},
            {brand: "Volkswagen",                               color: "черный",         fuel: 9.6,  price: 3,   seats: 5, year: 2010},
            {},
            {brand: "Audi",        model: "A3 Cabriolet",       color: "белый",          fuel: 10,   price: 3,   seats: 4, year: 2008},
            {brand: "Toyota",                                                            fuel: 6.6,  price: 5,   seats: 7, year: 2017},
            {brand: "Bugatti",     model: "Veyron EB 16.4",     color: "черный/красный", fuel: 40,   price: 150, seats: 2, year: 2005},
            {brand: "Kia",         model: "Rio Hatchback",      color: "оранжевый",                  price: 1,   seats: 5},
            {brand: "Ferrari",     model: "F458 Spider",        color: "красный",        fuel: 13.3, price: 16,  seats: 2, year: 2012},
            {brand: "FIAT",        model: "Doblo Combi",                                 fuel: 4.8,  price: 2,   seats: 5, year: 2013},
            {brand: "BMW",         model: "M1 Coupe",                                    fuel: 13.6,             seats: 4}];

const headers ={brand: "Марка",
                model: "Модель",
                color: "Цвет",
                fuel:  "Расход топлива, л/100км",
                price: "Цена, BTC",
                seats: "Количество мест",
                year:  "Год выпуска"};


var unique = findUnique(auto);

//принимает массив объектов, возвращает массив уникальных объектов
function findUnique(array) {
    let result = [];
    for(let i=0; i<array.length; i++) {
        if (!hasElement(array[i])) {  //если нет элемента, то заносим его в массив
            result.push(array[i]);
        }
    }
    return result;

    //проверяет наличие объекта object в массиве result
    function hasElement(object) {
        for(let i=0; i<result.length; i++){
            if(equals(result[i], object))
                return true;
        }
        return false;

        //сравнивает два объекта
        function equals(firstObject, secondObject) {

            if(Object.keys(firstObject).length!==Object.keys(secondObject).length)
                return false;

            for(let key in firstObject){
                if(firstObject[key]!==secondObject[key]) {
                    return false;
                }
            }
            return true;
        }
    }
}

printTable(unique);

//выводит массив в виде таблицы
function printTable(array) {
    document.getElementsByTagName('thead')[0].innerHTML="";
    document.getElementsByTagName('tbody')[0].innerHTML="";

    let tr = document.createElement('tr');
    tr.setAttribute('class', 'darkgrey');
    for(let key in headers){
        tr.insertAdjacentHTML("beforeend", "<th>"+headers[key]+"</th>");
    }
    document.getElementsByTagName('thead')[0].appendChild(tr);

    for (let i = 0; i < array.length; i++) {
        let tr = document.createElement('tr');
        if(i%2!==0) tr.setAttribute('class', 'grey');
        for (let key2 in headers) {
            let value = array[i][key2];
            if(value===undefined) value='-';
            tr.insertAdjacentHTML("beforeend", "<td>" + value + "</td>");
        }
        document.getElementsByTagName('tbody')[0].appendChild(tr);
    }
}

//выводит отфильтрованный массив на страницу
function find() {
    let filtered = filter(unique, createQuery());

    //принимает массив объектов, возвращает массив объектов, содержащих все свойства object
    function filter(array, object) {
        return array.filter(function (item) {
           return contains(object, item);
        });

        //проверяет, содержит ли 2-й объект все свойства 1-го объекта
        function contains(firstObject, secondObject) {
            for(let key in firstObject){
                if(firstObject[key]!==secondObject[key]) {
                    return false;
                }
            }
            return true;
        }
    }

    //создает объект для фильтрации массива
    function createQuery() {
        let object={};
        for(let key in headers){
            let value = document.getElementsByName(key)[0].value;
            if(value){
                if(!isNaN(value)){
                    object[key]=+value;
                }
                else{
                    object[key] = value;
                }
            }
        }
        return object;
    }

    printTable(filtered);
}
