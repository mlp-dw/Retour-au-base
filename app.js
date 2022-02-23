const colors = ['blue', 'red', 'yellow', 'green', 'orange', 'emerald', 'lime', 'teal', 'cyan', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose']

let userInLobbyDiv = (userName, userColor) => `
<div class="user w-20 h-20 m-4 rounded-full border-4 text-xs border-white flex items-center justify-center text-white bg-${colors[userColor]}-900">
    <span>${userName}</span>
</div>
`

let userInRoomDiv = (userName, userColor) => `
<div class="user w-32 h-32 m-6 rounded-full border-4 text-xl border-white flex items-center justify-center text-white bg-${colors[userColor]}-900 bg-">
    <span>${userName}</span>
</div>
`
/////////////////////////////////////////
//MANIERE D'ECRIRE GET USERS --LISIBLE
// function getUsers(){
//     fetch("./update.php")
//     .then(function (response){
//         return response.json();
//    })
//    .then(function(value) {
//        console.log(value);
//    })

// }
// getUsers();

/////////////////////////////////////////
//AUTRE MANIERE D'ECRIRE GET USERS
// const getUsers = () => fetch("./update.php")
//     .then(r => r.json())
//     .then(users => users)

// getUsers();

/////////////////////////////////////////
//AUTRE MANIERE D'ECRIRE GET USERS
async function getUsers(){
    const response = await fetch("./update.php")
    const users = await response.json()
    return users
}




/////////////////////////////////////////
//AUTRE MANIERE D'ECRIRE UPDATE USERS
// const updateUsers = async () => {
//     const users = await getUsers()
// }

async function updateUsers(){
    let users = await getUsers();
    let lobby = document.querySelector(".lobby");
    let js = document.querySelector(".zone-js");
    let php = document.querySelector(".zone-php");

    let usersInLobby = users.filter(user => user.position == 0);
    let usersInPhp = users.filter(user => user.position == 1);
    let usersInJS = users.filter(user => user.position == 2);

    lobby.innerHTML = "";
    js.innerHTML = "";
    php.innerHTML = "";
    
    usersInLobby.forEach( userLobby => {
        lobby.innerHTML += userInLobbyDiv(userLobby.name, userLobby.color);  
        
    });

    usersInJS.forEach( userJs => {
        js.innerHTML += userInRoomDiv(userJs.name, userJs.color);   
    });

    usersInPhp.forEach( userPhp => {
        php.innerHTML += userInRoomDiv(userPhp.name, userPhp.color); 
    });
    
}

getUsers();
updateUsers()


function getRandomColor(max = 15){
    return Math.floor(Math.random() * max);
}


async function join(zone){
    let userInput = document.querySelector("#nickname").value;

    if(userInput){
        let data = new FormData();
        data.append('username', userInput);
        data.append('position', zone);
        data.append('color', getRandomColor());
        
        await fetch('./send_data.php', {
            method: 'POST',
            body: data
        })

        updateUsers();
    }else{
        console.log("no username");
    }
    
}

// async function joinLobby(){
//     let userInput = document.querySelector("#nickname").value;

//     if(userInput){
//         let data = new FormData();
//         data.append('username', userInput);
//         data.append('position', 0);
//         data.append('color', getRandomColor());
        
//         await fetch('./send_data.php', {
//             method: 'POST',
//             body: data
//         })

//         updateUsers();
//     }else{
//         console.log("no username");
//     }
    
// }

// async function joinPhp(){
//     let userInput = document.querySelector("#nickname").value;

//     if(userInput){
//         let dataPHP = new FormData();
//         dataPHP.append('username', userInput);
//         dataPHP.append('position', 1);
//         dataPHP.append('color', getRandomColor());
        
//         await fetch('./send_data.php', {
//             method: 'POST',
//             body: dataPHP
//         })

//         updateUsers();
//     }else{
//         console.log("no username php");
//     }
    
// }

// async function joinJs(){
//     let userInput = document.querySelector("#nickname").value;

//     if(userInput){
//         let dataJS = new FormData();
//         dataJS.append('username', userInput);
//         dataJS.append('position', 2);
//         dataJS.append('color', getRandomColor());
        
//         await fetch('./send_data.php', {
//             method: 'POST',
//             body: dataJS
//         })

//         updateUsers();
//     }else{
//         console.log("no username js");
//     }
    
// }


async function leave(){
    // envoi a send date position -1 et userName
    // et suppr
    let userInput = document.querySelector("#nickname").value;
    //let leave = document.querySelector(".leave-button");
    
    if(userInput){
        let data = new FormData();
        data.append('username', userInput);
        data.append('position', -1);
        data.append('color', getRandomColor());

            
        await fetch('./send_data.php', {
            method: 'POST',
            body: data
        })
    
        updateUsers()
    }else{
        console.log("not leave");
    }
        
    
}
//TOUTE LES SECONDES
setInterval(() => {
    updateUsers ()
}, 1000);