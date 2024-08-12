let infomation = [];

const inputFirstName = document.getElementById('firstName');
const inputLastName = document.getElementById('lastName');
const inputEmailAddress = document.getElementById('email');
const inputAddress = document.getElementById('address');
const inputCity = document.getElementById('city');
const inputDistrict = document.getElementById('district');
const infomationElement = document.getElementsByTagName('tbody')[0];
const countData = document.getElementById('countData');

const submitElement = document.getElementById('myForm');

// Local storage
// function saveData(dataSource) {
//     window.localStorage.setItem('personal', JSON.stringify(dataSource))
// }

// function getDataStorage() {
//     return JSON.parse(window.localStorage.getItem('personal'));
// }

// Render data
function renderData(dataSource){
    infomationElement.innerHTML = '';
        dataSource.forEach(data => {
            const trElement = document.createElement('tr');
            trElement.setAttribute('class','odd:bg-white  even:bg-gray-50 border-b');
    
            const firstNameElement = document.createElement('td');
            firstNameElement.setAttribute('class','px-6 py-4 text-lg');
            firstNameElement.innerHTML = data.firstName;
    
            const lastNameElement = document.createElement('td');
            lastNameElement.setAttribute('class','px-6 py-4 text-lg');
            lastNameElement.innerHTML = data.lastName;
    
            const emailAddressElement = document.createElement('td');
            emailAddressElement.setAttribute('class','px-6 py-4 text-lg');
            emailAddressElement.innerHTML = data.email
    
            const addressElement = document.createElement('td');
            addressElement.setAttribute('class','px-6 py-4 text-lg');
            addressElement.innerHTML = data.location[0].address;
    
            const cityElement = document.createElement('td');
            cityElement.setAttribute('class','px-6 py-4 text-lg');
            cityElement.innerHTML = data.location[0].city;

            // Action
            const actionElement = document.createElement('td');
            actionElement.setAttribute('class','px-6 py-4 flex items-center');

            const editElement = document.createElement('div');
            editElement.setAttribute('class','font-medium text-blue-600 cursor-pointer mr-4 text-lg');
            editElement.textContent = "Edit";
            editElement.addEventListener('click',() => editUser(data._id));

            const deleteElement = document.createElement('div');
            deleteElement.setAttribute('class','font-medium text-red-600 cursor-pointer mr-4 text-lg');
            deleteElement.textContent = 'Delete';
            deleteElement.addEventListener('click',() => delUser(data._id));

            // Apend action to td
            actionElement.appendChild(editElement);
            actionElement.appendChild(deleteElement);

            // Apend td to tr
            trElement.appendChild(firstNameElement);
            trElement.appendChild(lastNameElement);
            trElement.appendChild(emailAddressElement);
            trElement.appendChild(addressElement);
            trElement.appendChild(cityElement);
            trElement.appendChild(actionElement);
            
            // Apend tr to tbody
            infomationElement.appendChild(trElement);
        })
}

// Fetch API
async function fetchAPI() {
    const res = await fetch("https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/member",{
        method: "get"
    });
    const data = await res.json();
    infomation = data.data;
    renderData(infomation);
    countInfomationUser();
}
fetchAPI();

submitElement.addEventListener('submit',(even)=>{
    // even.preventDefault();
    const firstNameLength = document.getElementById('requiredFirstName');
    const lastNameLength = document.getElementById('requiredLastName');
    const emailAddressLength = document.getElementById('requiredEmail');

    const isValid = (
     inputFirstName.value.length >= 10 && inputLastName.value.length >= 10 && valiEmail
    );
    if(!isValid){
        firstNameLength.textContent = inputFirstName.value.length < 10 ? "This min field is 10." : "";
        lastNameLength.textContent = inputLastName.value.length < 10 ? "This min field is 10." : "";
        emailAddressLength.textContent = valiEmail ? "Email must end width @gmail.com" : "";
        return;
    }
    addInfo();
    firstNameLength.textContent = "";
    lastNameLength.textContent = "";
    emailAddressLength.textContent = "";
    // Count data
    countInfomationUser();
})

async function addInfo(){
    const infomationUser = {
        data:{
            "avatar": "https://cdn.fakercloud.com/avatars/ManikRathee_128.jpg",
            "firstName": inputFirstName.value,
            "lastName": inputLastName.value,
            "email": inputEmailAddress.value,
            "position": "Front End Engineer",
            "dateJoin": "2014-08-20",
            "location": [
                {
                    "address": inputAddress.value,
                    "district": inputDistrict.value,
                    "city": inputCity.value
                }
            ]
}
    }
    try{
        const res = await fetch("https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/member",{
            method: "post",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(infomationUser)
        });
        const data = await res.json();
        infomation.push({
            firstName: data.data.firstName,
            lastName: data.data.lastName,
            email: data.data.email,
            location: [
                {
                    address: data.data.location[0].address,
                    district: data.data.location[0].district,
                    city: data.data.location[0].city
                }
            ]
        })
        renderData(infomation);
    } catch (e){
        alert("Error: " + e);
    }
}

// Validation Email
function valiEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function delUser(id){
    try{
        const res = await fetch(`https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/member/${id}`,{
            method: 'delete',
        })
    
        const index = infomation.findIndex(item => item._id === id);
            infomation.splice(index,1);
            renderData(infomation);
            countInfomationUser();
    } catch(e){
        alert("Error: " + e);
    }
}

async function editUser(id){
    const firstNameLength = document.getElementById('requiredFirstName');
    const index = infomation.findIndex(items => items._id === id);
    const newFirstName = inputFirstName.value;
   if(newFirstName.length < 10){
        firstNameLength.textContent = 'This min field is 10.';
        return
   }
   const infomationIndex = {
        "data":{    
            ...infomation[index],
            "firstName": newFirstName,
        }
    }
    try{
        const res = await fetch(`https://tony-auth-express-vdee-6j0s-fhovok9bu.vercel.app/api/member/${id}`,{
            method: 'put',
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(infomationIndex)
        })
        infomation[index].firstName = newFirstName;
        renderData(infomation);
    } catch(e){
        alert("Error:" +e);
    }
}

// window.onload = function() {
//     const dataSource = getDataStorage();
//     if(!dataSource) return;

//     renderData(dataSource)

//     const count = dataSource.reduce((acc,curr) => {
//         if(typeof curr === 'object'){
//             return acc + 1;
//         }
//         return acc;
//     },0)
//     countData.textContent = count;
// }

function countInfomationUser(){
    const countUser = infomation.reduce((acc,curr) => {
        if(typeof curr === 'object'){
            return acc+1;
        }
        return acc;
    },0)
    countData.textContent = countUser;
}