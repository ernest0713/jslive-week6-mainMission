let data = [];
let isEmpty = false;
//地址篩選
const serch = document.querySelector('#serch');
const serchTotal = document.querySelector('#serchTotal');
//套票資訊卡片
const showList = document.querySelector('#showList');
//新增套票按紐
const addTicket = document.querySelector('#add');
//form data 元素綁定
const ticketName = document.querySelector('#ticketName');
const imgUrl = document.querySelector('#imgUrl');
const area = document.querySelector('#location');
const description = document.querySelector('#description');
const manySet = document.querySelector('#manySet');
const money = document.querySelector('#money');
const star = document.querySelector('#star');
const inputGroup = [
    ticketName,
    imgUrl,
    area,
    description,
    manySet,
    money,
    star
];

//form data reset
function reset() {
    inputGroup.forEach(function (item) {
        // console.log(item);
        item.value = "";
    })
    isEmpty = false;
}

//新增套票
function addTicketData(e) {
    // console.log(data);
    e.preventDefault();

    //空值判斷，若空顯示紅框，秀出未填寫項目
    inputGroup.forEach(item => {
        let str = item.value.trim();
        if(str === ""){
            console.log(`${item.labels[0].textContent} 未填寫`);
            isEmpty = true;
            item.classList.add("empty");
        }
    })
    //若有空值中斷執行
    if (isEmpty === true) return;

    //資料寫入
    let newData = {};
    newData.id = data.length;
    newData.name = ticketName.value;
    newData.imgUrl = imgUrl.value;
    newData.area = area.value;
    newData.description = description.value;
    newData.group = parseInt(manySet.value, 10);
    newData.price = parseInt(money.value, 10);
    newData.rate = parseInt(star.value, 10);
    // console.log(newData);
    data.push(newData);
    // console.log(data);

    render(data);
    reset();
    console.log(`新增套票"${newData.name}"成功！`)
    return true;
}


function render(data) {
    let list = ``;
    data.forEach(function(item){
        list += `
        <li class="col-lg-4 col-sm-12 col-md-6 mb-4">
            <div class="card">
                <div class="position-relative">
                <img src="${item.imgUrl}" class="card-img-top" alt="#">
                <div class="card-location">${item.area}</div>
                <div class="card-score">${item.rate}</div>
            </div>
            
            <div class="card-body pt-4">
                <h5 class="card-title customTextPrimaryColor h5 mb-3">${item.name}</h5>
                <p class="card-text mb-4 customTextSecColor">${item.description}</p>
                <div class="d-flex justify-content-between">
                    <div class="d-flex align-items-center customTextPrimaryColor">
                        <span class="material-icons h6 mb-0">
                        error
                        </span>
                        <p class="h6 mb-0">剩下最後${item.group}組</p>
                    </div>
                        <div class="d-flex align-items-center customTextPrimaryColor">
                            <span>TWD</span>
                            <p class="h2 mb-0">$${item.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </li>`;
    });
    serchTotal.textContent = `本次搜尋共 ${data.length} 筆資料`;
    showList.innerHTML = list;
}

function areaFilter(e){
    let str = e.target.value;
    if(str === "全部" ){
        render(data);
    } else {
        let newData = data.filter( item => item.area === str);
        render(newData);
    }
}


function init(){
    //取得套票資訊
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
        .then((res) => {
            //新增進套票
            res.data.data.forEach((item) => {
                data.push(item);
            });
            //card list render
            render(data);
            // console.log(data);
        });

    //點擊新增套票按鈕新增套票資訊
    addTicket.addEventListener('click', addTicketData);
        
    //選擇地區執行areaFilter分類
    serch.addEventListener('change', areaFilter);
    
    inputGroup.forEach(item => {
        item.addEventListener('change', (e) => {
            e.target.classList.remove('empty');
        })
    })
}

init();

