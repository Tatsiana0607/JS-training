// var auto=[  {brand: "Ford",        model: "Focus ST",           color: "белый",          fuel: 13.8, price: 1.56, seats: 4, year: 2008},
//             {brand: "Audi",        model: "A3 Cabriolet",       color: "белый",          fuel: 10,   price: 2.6,  seats: 4, year: 2008},
//             {brand: "Lamborghini", model: "Murcielago LP640-4", color: "желтый",         fuel: 32.3, price: 37.3, seats: 2, year: 2005},
//             {brand: "Volkswagen",  model: "Passat Highline",    color: "черный",         fuel: 9.6,  price: 2.5,  seats: 5, year: 2010},
//             {brand: "Bugatti",     model: "Veyron EB 16.4",     color: "черный/красный", fuel: 40,   price: 150,  seats: 2, year: 2005},
//             {brand: "Kia",         model: "Rio Hatchback",      color: "оранжевый",      fuel: 7.9,  price: 0.87, seats: 5, year: 2005},
//             {brand: "FIAT",        model: "Doblo Combi",        color: "синий",          fuel: 4.8,  price: 1.4,  seats: 5, year: 2013},
//             {brand: "Toyota",      model: "Land Cruiser Prado", color: "металлик",       fuel: 6.6,  price: 5.45, seats: 7, year: 2017},
//             {brand: "Ferrari",     model: "F458 Spider",        color: "красный",        fuel: 13.3, price: 16,   seats: 2, year: 2012},
//             {brand: "BMW",         model: "M1 Coupe",           color: "бордовый",       fuel: 13.6, price: 2.84, seats: 4, year: 2011}];

var input =[{},{a:1, b:1, c:2},
    {a:1},
    {b:2},{},
    {a:1}];

var unique = findUnique(input);
var filtered = filter(input, {});

alert("Массив уникальных объектов:\n"+print(unique));
alert("Отфильтрованный массив:\n"+print(filtered));

//принимает массив объектов, возвращает массив уникальных объектов
function findUnique(array) {
    let result = [];
    for(let i=0; i<array.length; i++) {
        if (!hasElement(result, array[i])) {  //если нет элемента, то заносим его в массив
            result.push(array[i]);
        }
    }
    return result;
}

//проверяет наличие объекта object в массиве array
function hasElement(array, object) {
    for(let i=0; i<array.length; i++){
        if(equals(array[i], object))
            return true;
    }
    return false;
}

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


//принимает массив объектов, возвращает массив объектов, содержащих все свойства object
function filter(array, object) {
    let result=[];
    for(let i=0; i<array.length; i++){
        if(contains(object, array[i])){
            result.push(array[i]);
        }
    }
    return result;
}

//проверяет, содержит ли 2-й объект все свойства 1-го объекта
function contains(firstObject, secondObject) {
    for(let key in firstObject){
        if(firstObject[key]!==secondObject[key]) {
            return false;
        }
    }
    return true;
}

//перевод массива объектов в строку для вывода
function print(array) {
    let str='';
    for(let i=0; i<array.length; i++){
        let object=array[i];
        str+='{ ';
        for(let key in object){
            str+=key +":"+object[key]+" ";
        }
        str+='}\n';
    }
    return str;
}