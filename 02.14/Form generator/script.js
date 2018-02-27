var formDef1=
    [
        {label:'Разработчики:',kind:'longtext',name:'developers', validation:'required'},
        {label:'Название сайта:',kind:'longtext',name:'sitename', validation:'required'},
        {label:'URL сайта:',kind:'longtext',name:'siteurl', validation:'url required'},
        {label:'Дата запуска сайта:',kind:'date',name:'date', validation:'date required'},
        {label:'Посетителей в сутки:',kind:'number',name:'visitors', validation:'number required'},
        {label:'E-mail для связи:',kind:'shorttext',name:'email', validation:'email required'},
        {label:'Рубрика каталога:',kind:'combo',name:'division', validation:'combo',
            variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
        {label:'Размещение:',kind:'radio',name:'payment', validation:'radio',
            variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
        {label:'Разрешить отзывы:',kind:'check',name:'votes'},
        {label:'Описание сайта:',kind:'memo',name:'description', validation:'required'},
        {label:'Опубликовать:',kind:'submit'},
    ];

var formDef2=
    [
        {label:'Фамилия:',kind:'longtext',name:'lastname', validation:'required'},
        {label:'Имя:',kind:'longtext',name:'firstname', validation:'required'},
        {label:'Отчество:',kind:'longtext',name:'secondname', validation:'required'},
        {label:'Возраст:',kind:'number',name:'age', validation:'number required'},
        {label:'Зарегистрироваться:',kind:'submit'},
    ];

//соответствие функций валидации и выводимых сообщений атрибутам
const map = {   required: {func: validateRequired, message: 'Заполните это поле!'},
                url:      {func: validateURL, message: 'Неверный формат URL!'},
                email:    {func: validateEmail, message: 'Неверный формат E-mail!'},
                date:     {func: validateDate, message: 'Некорректная дата!'},
                number:   {func: validateNumber, message: 'Некорректное число!'},
                combo:    {func: validateCombo, message: 'Выберите один из вариантов!'},
                radio:    {func: validateRadio, message: 'Выберите один из вариантов!'}};

//создание формы
function createForm(arr){
    let hr = document.createElement('hr');
    let form = document.createElement('form');
    form.setAttribute('method','POST');
    form.setAttribute('action','http://fe.it-academy.by/TestForm.php');
    form.setAttribute('target','_blank');
    document.body.appendChild(hr);
    document.body.appendChild(form);

    for(let i=0; i<arr.length; i++){
        let div = document.createElement('div');

        if(arr[i].kind!=='submit'){
            div.appendChild(createLabel(arr[i]));
        }

        switch(arr[i].kind){
            case 'longtext':
                div.appendChild(createInput(arr[i], 60));
                div.appendChild(createErrorSpan(arr[i]));
                break;
            case 'shorttext':
                div.appendChild(createInput(arr[i], 25));
                div.appendChild(createErrorSpan(arr[i]));
                break;
            case 'number':
                div.appendChild(createNumber(arr[i]));
                div.appendChild(createErrorSpan(arr[i]));
                break;
            case 'date':
                div.appendChild(createDate(arr[i], 7));
                div.appendChild(createErrorSpan(arr[i]));
                break;
            case 'combo':
                div.appendChild(createCombo(arr[i]));
                div.appendChild(createErrorSpan(arr[i]));
                break;
            case 'radio':
                div.appendChild(createRadio(arr[i]));
                div.appendChild(createErrorSpan(arr[i]));
                break;
            case 'check':
                div.appendChild(createCheck(arr[i]));
                div.appendChild(createErrorSpan(arr[i]));
                break;
            case 'memo':
                div.appendChild(document.createElement('br'));
                div.appendChild(createMemo(arr[i]));
                div.appendChild(createErrorSpan(arr[i]));
                break;
            case 'submit':
                div.appendChild(createSubmit(arr[i]));
                div.appendChild(createErrorSpan(arr[i]));
                break;
        }
        form.appendChild(div);
    }

    //навешиваем обработчики
    let elements = form.querySelectorAll('[data-validation]');
    for (let i = 0; i < elements.length; i++) {
        let attr = elements[i].getAttribute('data-validation').split(" ");
        elements[i].addEventListener("change", function (event) {
            let isValid = true;
            let value;

            for (let j = 0; j < attr.length; j++) {
                if(attr[j] === "radio"){
                    value = form[elements[i].firstChild.name].value;
                } else value = event.currentTarget.value;

                if (!map[attr[j]].func(value)) {
                    elements[i].nextSibling.innerText = map[attr[j]].message;
                    isValid = false;
                }
            }
            if (isValid) {
                elements[i].nextSibling.innerText = "";
            }
        });
    }

    //создание элементов формы
    function createLabel(item) {
        let label = document.createElement('label');
        let text = document.createTextNode(item.label);
        label.appendChild(text);
        return label;
    }

    function createInput(item, size){
        let input = document.createElement('input');
        input.setAttribute('data-validation',item.validation);
        input.setAttribute('type','text');
        input.setAttribute('name',item.name);
        input.setAttribute('size',size.toString());
        return input;
    }

    function createDate(item, size){
        let input = document.createElement('input');
        input.setAttribute('data-validation',item.validation);
        input.setAttribute('type','date');
        input.setAttribute('name',item.name);
        input.setAttribute('size',size.toString());
        return input;
    }

    function createNumber(item){
        let input = document.createElement('input');
        input.setAttribute('data-validation',item.validation);
        input.setAttribute('type','number');
        input.setAttribute('name',item.name);
        return input;
    }

    function createCombo(item){
        let select = document.createElement('select');
        select.setAttribute('data-validation',item.validation);
        select.setAttribute('name',item.name);
        let option = document.createElement('option');
        let text = document.createTextNode("Выберите вариант");
        option.appendChild(text);
        option.setAttribute('selected','');
        option.setAttribute('value','0');
        select.appendChild(option);
        for(let i=0; i<item.variants.length; i++){
            let option = document.createElement('option');
            let text = document.createTextNode(item.variants[i].text);
            option.appendChild(text);
            option.setAttribute('value',(i+1).toString());
            select.appendChild(option);
        }
        return select;
    }

    function createRadio(item){
        let input = document.createElement('span');
        input.setAttribute('data-validation',item.validation);
        for(let i=0; i<item.variants.length; i++){
            let radio = document.createElement('input');
            radio.setAttribute('id',`radio${i+1}`);
            radio.setAttribute('type','radio');
            radio.setAttribute('name',item.name);
            radio.setAttribute('value',(i+1).toString());
            let label = document.createElement('label');
            label.setAttribute('for',`radio${i+1}`);
            let text = document.createTextNode(item.variants[i].text);
            label.appendChild(text);
            input.appendChild(radio);
            input.appendChild(label);
        }
        return input;
    }

    function createCheck(item){
        let input = document.createElement('input');
        input.setAttribute('type','checkbox');
        input.setAttribute('name',item.name);
        input.setAttribute('checked','');
        return input;
    }

    function createMemo(item){
        let textarea = document.createElement('textarea');
        textarea.setAttribute('data-validation',item.validation);
        textarea.setAttribute('name',item.name);
        textarea.setAttribute('cols','87');
        textarea.setAttribute('rows','3');
        return textarea;
    }

    function createSubmit(item){
        let input = document.createElement('input');
        input.setAttribute('type','submit');
        let value = item.label.replace(':','');
        input.setAttribute('value', value);
        input.addEventListener("click", validateForm);
        return input;
    }

    function createErrorSpan(item) {
        let span = document.createElement('span');
        span.setAttribute('class','error');
        span.setAttribute('id',item.name);
        return span;
    }
}

createForm(formDef1);
createForm(formDef2);

function validateRequired(value) {
    return value.length!==0;
}

function validateURL(value) {
    return value.match(/^http(s)?:\/\/(www\.)?[\w]+\.[a-zA-Z]{2,}$/);
}

function validateEmail(value) {
    return value.match(/^\w+@\w+$/);
}

function validateDate(value) {
    let date = new Date(value);
    return date < new Date() && date > new Date(1990,1);
}

function validateNumber(value) {
    return value >= 0;
}

function validateCombo(value) {
    return value!=='0';
}

function validateRadio(value) {
    return value.length !== 0;
}

function validateForm(event) {
    let btn = event.currentTarget;
    let parent = btn.parentNode;
    while(parent.tagName!=='FORM'){
        parent=parent.parentNode;
    }

    let elements = parent.querySelectorAll('[data-validation]');
    let change = new Event("change");
    for(let i=elements.length-1; i>=0; i--){
        elements[i].dispatchEvent(change);
        if(elements[i].nextSibling.innerText !== ''){
            event.preventDefault();
            elements[i].focus();
        }
    }
}