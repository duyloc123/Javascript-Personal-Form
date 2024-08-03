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
// const saveData = document.getElementById('btn btn--save');

// saveData.addEventListener('click',() => {
//     window.localStorage.setItem('infomation',JSON.stringify(infomation));
// })

// const getData = JSON.parse(window.localStorage.getItem('infomation'));
// renderData(getData);

function saveData(dataSource) {
    window.localStorage.setItem('personal', JSON.stringify(dataSource))
}

function getDataStorage() {
    // const data = window.localStorage.getItem('personal');
    // const parsed = JSON.parse(data)
    // return parsed;
    return JSON.parse(window.localStorage.getItem('personal'));
}

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
            emailAddressElement.innerHTML = data.emailAddress;
    
            const addressElement = document.createElement('td');
            addressElement.setAttribute('class','px-6 py-4 text-lg');
            addressElement.innerHTML = data.address;
    
            const cityElement = document.createElement('td');
            cityElement.setAttribute('class','px-6 py-4 text-lg');
            cityElement.innerHTML = data.city;

            // Action
            const actionElement = document.createElement('td');
            actionElement.setAttribute('class','px-6 py-4 flex items-center');

            const editElement = document.createElement('div');
            editElement.setAttribute('class','font-medium text-blue-600 cursor-pointer mr-4 text-lg');
            editElement.textContent = "Edit";
            editElement.addEventListener('click',() =>{
                edit(data.id);
            })

            const deleteElement = document.createElement('div');
            deleteElement.setAttribute('class','font-medium text-red-600 cursor-pointer mr-4 text-lg');
            deleteElement.textContent = 'Delete';
            deleteElement.addEventListener('click',() => {
                del(data.id);
            });

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

submitElement.addEventListener('submit',(event)=>{
    event.preventDefault();

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

    const infomationUser = {
        id: Date.now(),
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        emailAddress: inputEmailAddress.value,
        address: inputAddress.value,
        city: inputCity.value,
        district: inputDistrict.value
    }
    firstNameLength.textContent = "";
    lastNameLength.textContent = "";
    emailAddressLength.textContent = "";
    infomation.push(infomationUser);
    renderData(infomation);

    saveData(infomation)

    const count = infomation.reduce((acc,curr) => {
        if(typeof curr === 'object'){
            return acc + 1;
        }
        return acc;
    },0)
    countData.textContent = count;
})

// Validation Email
function valiEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Todo Action edit,delete showing 2 entries
  
function del(id){
    infomation = infomation.filter((items) => items.id !== Number(id));
    renderData(infomation);

    const count = infomation.reduce((acc,curr) => {
        if(typeof curr === 'object'){
            return acc + 1;
        }
        return acc;
    },0)
    countData.textContent = count;
}

function edit(id){
    const index = infomation.findIndex(items => items.id === Number(id));
    if(index !== -1){
        const infomationUser = {
            id: Date.now(),
            firstName: inputFirstName.value,
            lastName: inputLastName.value,
            emailAddress: inputEmailAddress.value,
            address: inputAddress.value,
            city: inputCity.value,
            district: inputDistrict.value
        }
        infomation[index] = infomationUser;
        renderData(infomation);
    }
}

window.onload = function() {
    const dataSource = getDataStorage();
    if(!dataSource) return;

    renderData(dataSource)

    const count = dataSource.reduce((acc,curr) => {
        if(typeof curr === 'object'){
            return acc + 1;
        }
        return acc;
    },0)
    countData.textContent = count;


}