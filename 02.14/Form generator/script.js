var formDef1=
    [
        {label:'Название сайта:',kind:'longtext',name:'sitename'},
        {label:'URL сайта:',kind:'longtext',name:'siteurl'},
        {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
        {label:'E-mail для связи:',kind:'shorttext',name:'email'},
        {label:'Рубрика каталога:',kind:'combo',name:'division',
            variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
        {label:'Размещение:',kind:'radio',name:'payment',
            variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
        {label:'Разрешить отзывы:',kind:'check',name:'votes'},
        {label:'Описание сайта:',kind:'memo',name:'description'},
        {label:'Опубликовать:',kind:'submit'},
    ];

var formDef2=
    [
        {label:'Фамилия:',kind:'longtext',name:'lastname'},
        {label:'Имя:',kind:'longtext',name:'firstname'},
        {label:'Отчество:',kind:'longtext',name:'secondname'},
        {label:'Возраст:',kind:'number',name:'age'},
        {label:'Зарегистрироваться:',kind:'submit'},
    ];

function createForm(arr){
    let hr = document.createElement('hr');
    let form = document.createElement('form');
    form.setAttribute('method','POST');
    form.setAttribute('action','http://fe.it-academy.by/TestForm.php');
    form.setAttribute('target','_blank');
    let table = document.createElement('table');
    document.body.appendChild(hr);
    document.body.appendChild(form);
    form.appendChild(table);

    for(let i=0; i<arr.length; i++){
        let tr = document.createElement('tr');

        if(arr[i].kind!=='submit' && arr[i].kind!=='memo'){
            let label = document.createElement('label');
            let text = document.createTextNode(arr[i].label);
            label.appendChild(text);
            let td1 = document.createElement('td');
            td1.appendChild(label);
            tr.appendChild(td1);
        }

        let td2 = document.createElement('td');
        switch(arr[i].kind){
            case 'longtext':
                td2.appendChild(createLongText(arr[i]));
                break;
            case 'shorttext':
                td2.appendChild(createShortText(arr[i]));
                break;
            case 'number':
                td2.appendChild(createNumber(arr[i]));
                break;
            case 'combo':
                td2.appendChild(createCombo(arr[i]));
                break;
            case 'radio':
                td2.appendChild(createRadio(arr[i]));
                break;
            case 'check':
                td2.appendChild(createCheck(arr[i]));
                break;
            case 'memo':
                td2.setAttribute('colspan','2');
                td2.appendChild(createMemo(arr[i]));
                break;
            case 'submit':
                td2.appendChild(createSubmit(arr[i]));
                break;
        }
        tr.appendChild(td2);
        table.appendChild(tr);
    }

    function createLongText(item){
        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('name',item.name);
        input.setAttribute('size','60');
        return input;
    }

    function createShortText(item){
        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('name',item.name);
        input.setAttribute('size','25');
        return input;
    }

    function createNumber(item){
        let input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('name',item.name);
        input.setAttribute('size','7');
        return input;
    }

    function createCombo(item){
        let select = document.createElement('select');
        select.setAttribute('name',item.name);
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
        let label = document.createElement('label');
        let text = document.createTextNode(item.label);
        label.appendChild(text);
        let textarea = document.createElement('textarea');
        textarea.setAttribute('name',item.name);
        textarea.setAttribute('cols','87');
        textarea.setAttribute('rows','3');
        let input = document.createElement('span');
        let br = document.createElement('br');
        input.appendChild(label);
        input.appendChild(br);
        input.appendChild(textarea);
        return input;
    }

    function createSubmit(item){
        let input = document.createElement('input');
        input.setAttribute('type','submit');
        let value = item.label.replace(':','');
        input.setAttribute('value', value);
        return input;
    }
}

createForm(formDef1);
createForm(formDef2);