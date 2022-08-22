var arrPhone = [];

// return;
var fetchPhone = () => {
  axios({
    url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
    method: "GET",
  })
    .then((res) => {
      arrPhone = mapData(res.data);
      console.log(res);
      createPhone(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
fetchPhone();

var createPhone = (data) => {
  if (!data) {
    data = arrPhone;
  }
  var count = "";
  for (var i = 0; i < data.length; i++) {
    count += ` <div style="margin-right: 10px;
    border: 1px solid grey; width:350px" class="col-3 my-3 mx-4 text-center rounded-2">
      <img class="w-50 py-2 my-2 text-center" src="${data[i].img}"/>
      <p>Mã máy : ${data[i].id}</p>
      <p>Tên máy :  ${data[i].name}</p>
      <p>Giới thiệu : Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, id.
      </p>
      <p>Loại máy : ${data[i].type}</p>
      <p>Camera trước : ${data[i].backCamera}</p>
      <p>Camera sau : ${data[i].frontCamera}</p>
      <div class="text-center d-flex mx-4" style="padding-left: 40px; margin: 0 10px;">
      <button onclick="addCart('${data[i].id}')" class="d-block p-2 w-25 my-2" style="border:none; color:white; margin-right: 5px; background:#46B452">Carl</button>
      <button onclick="addCart()" class="d-block p-1 w-25 my-2 bg-danger " style="border:none; margin-right: 5px;color:white;">Update</button>
      <button onclick="addCart()" class="d-block p-1 w-25 my-2  bg-warning" style="border:none; margin-right: 5px; color:white;">Delete</button>
      </div>
      </div>`;
  }

  //console.log(count);
  document.querySelector("#listPhones").innerHTML = count;
};

var checkType = () => {
  var arrShow = [];
  var tam = document.querySelector("#select").value;
  for (let i = 0; i < arrPhone.length; i++) {
    if (arrPhone[i].type === tam) {
      arrShow.push(arrPhone[i]);
    }
  }
  console.log(arrShow);
  createPhone(arrShow);
};
var mapData = function (data) {
  for (var i = 0; i < data.length; i++) {
    var mappedPhone = new Phones(
      data[i].id,
      data[i].name,
      data[i].price,
      data[i].screen,
      data[i].backCamera,
      data[i].frontCamera,
      data[i].img,
      data[i].desc,
      data[i].type,
      data[i].image,
      data[i].quantity
    );

    arrPhone.push(mappedPhone);
  }
  return arrPhone;
};

var addCar = [];

var addCart = (id) => {
  axios({
    url: " https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products/",
    method: "GET",
    params: {
      id: id,
    },
  })
    .then((res) => {
      if (findById(id) === false) {
        res.data[0].quantity = 1;
        addCar.push(res.data[0]);
      }
      console.log(addCar);
      renderPhone();
    })
    .catch((err) => {
      console.log(err);
    });
};
var renderPhone = () => {
  var count = "";
  for (let i = 0; i < addCar.length; i++) {
    count += `<tr>
        <td class="text-center px-3"> <img class="w-25 py-2 my-2 text-center" src="${
          addCar[i].img
        }"/> </td>
        <td  class="px-3 text-center"> ${addCar[i].name}</td>
        <td  class="px-3 text-center"> ${addCar[i].price}</td>
        <td  class="px-3 text-center" > ${addCar[i].quantity}
          <button class="w-25 h-25 ml-2 bg-success" style="border:none;" onclick="addQuan(${
            addCar[i].id
          })">+</button>
          <button class="w-25 h-25 ml-2 bg-success" style="border:none;" onclick="deleQuan(${
            addCar[i].id
          })">-</button>
        </td>
       <td  class="px-3 text-center">${
         addCar[i].quantity * addCar[i].price
       } $</td>
        <td  class="px-3 text-center">
        <button class="w-25 h-25 ml-2 bg-success" styl="border:none;" onclick="deleted(${
          addCar[i].id
        })"> x</button>
        </td>
        </tr>`;
  }
  totalPhones();
  document.querySelector("#showPhone").innerHTML = count;
  localStorage.setItem("list_product", JSON.stringify(addCar));
};
var findById = (id) => {
  if (addCar.length === 0) {
    return false;
  }
  for (let i = 0; i < addCar.length; i++) {
    if (addCar[i].id === id) {
      addCar[i].quantity++;
      return;
    }
  }
  return false;
};

var addQuan = (id) => {
  for (let i = 0; i < addCar.length; i++) {
    if (+addCar[i].id === id) {
      addCar[i].quantity++;
    }
  }
  renderPhone();
};

var deleQuan = (id) => {
  for (let i = 0; i < addCar.length; i++) {
    if (+addCar[i].id === id) {
      if (addCar[i].quantity > 1) {
        addCar[i].quantity--;
      } else {
        deleted(id);
      }
    }
  }

  renderPhone();
};

var deleted = (id) => {
  for (let i = 0; i < addCar.length; i++) {
    if (addCar[i].id == id) {
      addCar.splice(i, 1);
    }
  }
  renderPhone();
};

var delePhones = () => {
  addCar = [];
  renderPhone();
};

var totalPhones = () => {
  var total = 0;
  for (var i = 0; i < addCar.length; i++) {
    if (addCar[i].quantity != 0) {
      total += addCar[i].quantity * addCar[i].price;
    }
  }
  document.querySelector("#total").innerHTML = total;
};
addCar = JSON.parse(localStorage.getItem("list_product"));
renderPhone();
