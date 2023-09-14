const deletePassword = (website) => {
  let data = localStorage.getItem("passwords");
  let arr = JSON.parse(data);
  arrUpdated = arr.filter((e) => {
    return e.website != website;
  });
  localStorage.setItem("passwords", JSON.stringify(arrUpdated));
  alert(`The password of ${website} has been deleted successfully.`);
  showPasswords();
};

const copyText = (txt) => {
  navigator.clipboard
    .writeText(txt)
    .then(() => {
      alert("Copied..");
    })
    .catch((err) => {
      alert(err);
    });
};

const maskedPassword = (pass) => {
  let str = "";
  for (let index = 0; index < pass.length; index++) {
    str += "*";
  }
  return str;
};

const showPasswords = () => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("passwords");
  if (data === null || JSON.parse(data).length === 0) {
    tb.innerHTML = "No data to show...";
  } else {
    tb.innerHTML = `
    <tr>
    <th>Website</th>
    <th>Username</th>
    <th>Password</th>
    <th>Delete</th>
  </tr>
    
    `;
    let arr = JSON.parse(data);
    let str = "";
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      str += `
    <tr>
        <td>${element.website} <img onClick="copyText('${
        element.website
      }')" src="./copy.svg" /></td>
        <td>${element.username} <img onClick="copyText('${
        element.username
      }')" src="./copy.svg" /></td>
        <td>${maskedPassword(element.password)} <img onClick="copyText('${
        element.password
      }')" src="./copy.svg" /></td>
        <td><button class="delete-btn" onClick=deletePassword('${
          element.website
        }')>Delete</buttton></td>
    </tr>`;
    }

    tb.innerHTML = tb.innerHTML + str;
  }
  website.value = "";
  username.value = "";
  password.value = "";
};
showPasswords();
document.querySelector(".btn").addEventListener("click", (e) => {
  e.preventDefault();
  let passwords = localStorage.getItem("passwords");
  if (passwords === null) {
    let json = [];
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password Saved Successfully");
    localStorage.setItem("passwords", JSON.stringify(json));
  } else {
    let json = JSON.parse(localStorage.getItem("passwords"));
    json.push({
      website: website.value,
      username: username.value,
      password: password.value,
    });
    alert("Password Updated Successfully");
    localStorage.setItem("passwords", JSON.stringify(json));
  }
  showPasswords();
});

// let arr = [1, 1, 2, 2, 2, 3, 4, 4];
// let newArr = [];

// for(let i=0; i<arr.length; i++){
//     if(!newArr.includes(arr[i])){
//         newArr.push(arr[i]);
//     }
// }


// console.log(newArr);