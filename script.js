let from=document.querySelector(".form");
let name=document.querySelector(".name")
let lastname=document.querySelector(".lastName")
let phone=document.querySelector(".phone")
let address=document.querySelector(".addres")
let btn=document.querySelector(".button")
let content=document.querySelector(".content")
let option=document.querySelector(".option")
let editbtn=document.querySelector('.pst')
let result='';
let url="http://localhost:3000/users";
function render(posts){
    posts.forEach(post => {
        result= `
       <div class="result" data-id="${post.id}">
        <span class='nameval'>${post.firstName}</span>
        <span class='lastNameval'>${post.lastName}</span>
        <span class="phone-number">${post.phoneNumber}</span>
        <span class="addressing" >${post.address}</span>
        <span class="genderi">${post.gender}</span>
        <button class="edit-link" id="edit-post">edit</button>
        <button class="delet-link" id="delete-post">delete</button>
    </div>
   `
        content.innerHTML+= result;
    })

 }
 //get api
 fetch("  http://localhost:3000/users")
     .then(res=> res.json())
     .then(data => render(data))

content.addEventListener("click", (e)=> {
   e.preventDefault();
    let deletebtnpress= e.target.id=== "delete-post";
    let editbtn= e.target.id=== "edit-post";
    let id =e.target.parentElement.dataset.id;
    if(deletebtnpress){
     fetch(`${url}/${id}`,{
         method: "DELETE"
     })
         .then(res => res.json())
         .then(() => location.reload())

    }
   if(editbtn){
       let parent = e.target.parentElement;
       let nameContent=parent.querySelector(".nameval").textContent;
       let lastnameContent=parent.querySelector(".lastNameval").textContent;
       let phoneContent=parent.querySelector(".phone-number").textContent;
       let adressContent=parent.querySelector(".addressing").textContent;
       let genderContent=parent.querySelector(".genderi").textContent;

       name.value=nameContent;
       lastname.value=lastnameContent;
       phone.value=phoneContent;
       address.value=adressContent;
       option.value=genderContent;
   }
   btn.addEventListener('click', (e)=> {
       e.preventDefault();
       fetch(`${url}/${id}`,{
           method: 'PUT',
           headers:{
               "Content-Type":"application/json"
           },
           body: JSON.stringify({
               firstName:name.value,
               lastName:lastname.value,
               phoneNumber: phone.value,
               address: address.value,
               gender: option.value,
           })
       })
           .then(res => res.json())
           .then(() => location.reload())
   })

})

from.addEventListener("submit", (e)=> {
    e.preventDefault();
    fetch("  http://localhost:3000/users", {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName:name.value,
            lastName:lastname.value,
            phoneNumber: phone.value,
            address: address.value,
            gender: option.value,
        })
    })
        .then(res => res.json())
        .then(data => {
            let dataArr=[];
            dataArr.push(data)
            render(dataArr)
        })
    name.value="";
    lastname.value="";
    phone.value="";
    address.value="";
})


async function api(){
    let response= await fetch("http://localhost:3000/genders");
    let data=await response.json();
    console.log(data)
     data.map(item=>{
    let bla=`
     <option class="blaa" value=${item.id}>${item.value}</option>
    `
    option.innerHTML+=bla
     })
}
api();




