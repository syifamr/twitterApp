function signUp() {
    username = document.getElementById('username').value;
    fullName = document.getElementById('fullName').value;
    email = document.getElementById('email').value;
    password = document.getElementById('password').value;
    bio = document.getElementById('bio').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", 'http://localhost:5000/signup');
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "username": username,
        "fullname": fullName,
        "email": email,
        "password": password,
        "bio": bio
    }))
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Data Berhasil disubmit, code: " + this.status);
            window.location = "index.html";
        } else if (this.readyState == 4) {
            alert("Data gagal diinput, code: " + this.status);
        }
    }
}

function signIn() {
    username = document.getElementById('username').value;
    password = document.getElementById('password').value;

    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("POST", 'http://localhost:5000/login');
    xmlRequest.setRequestHeader("Content-Type", "application/json");
    xmlRequest.send(JSON.stringify({
        "username": username,
        "password": password
    }));
    xmlRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // console.log(this.response);
            document.cookie = "username=" + this.response
            window.location = '/index.html';
        } else if (this.readyState == 4) {
            alert("Sign in gagal, code: " + this.status);
        }
    }
}

function addTweet() {
    tweet = document.getElementById('tweet-box').value;
    // username = getCookie("username")

    // var data = JSON.stringify({
    //     'username' : username,
    //     'fullname' : fullname,
    //     'email' : email,
    //     'password' : password,
    //     'tweet' : tweet
    // })
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/addTweet");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", getCookie("username"))
    xmlHttp.send(JSON.stringify({
        "username": getCookie("username"),
        "tweet": tweet
    }));
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 201) {
            masukanTweet = JSON.parse(this.response);
            console.log(masukanTweet);
            document.getElementById('feed').insertAdjacentHTML("afterbegin", `<div class="tweet">
            <img src="${masukanTweet.photoprofile}" alt="foto orang" />
            <h4>${masukanTweet.fullname}</h4>
            <p>${masukanTweet.content}</p>
            <span>${masukanTweet.date}</span>
        </div>`);
            alert("berhasil" + this.status);
        } else if (this.readyState == 4) {
            alert("Tweet gagal ditambahkan dengan error code " + this.status);
        }
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function allTweet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:5000/getTweet');
    xmlHttp.setRequestHeader("Authorization", getCookie("username"));
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            JSON.parse(this.response).forEach(function (data) {
                document.getElementById('feed').insertAdjacentHTML("afterbegin", `<div class="tweet" id="tweet${data.id}">
            <img src="${data.photoprofile}" alt="foto orang" />
            <h4>${data.fullname}</h4>
            <p>${data.content}</p>
            <span>${data.date}</span>
                <button type="submit" onclick="deleteTweet('${data.id}')" class="deletebtn btn-outline-primary" id="del">Delete</button>
        
                </div>`);
            });
        } else if (this.readyState == 4) {
            alert("Error dengan status: " + this.status + " " + this.statusText);
        }
    }
    xmlHttp.send();
}

function mytweet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", 'http://localhost:5000/mytweet');
    xmlHttp.setRequestHeader("Authorization", getCookie("username"));
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            datas = JSON.parse(this.response);
            datas.forEach( data => {document.getElementById('feed').insertAdjacentHTML("afterbegin", `<div class="tweet" id="tweet${data.id}">
            <img src="${data.photoprofile}" alt="foto orang" />
            <h4>${data.fullname}</h4>
            <p>${data.content}</p>
            <span>${data.date}</span>
                <button type="submit" onclick="deleteTweet('${data.id}')" class="deletebtn btn-outline-primary" id="del">Delete</button>
        
                </div>`);
        })
       
        } else if (this.readyState == 4) {
            alert("Error dengan status: " + this.status + " " + this.statusText);
        }
    }
    xmlHttp.send();
}

function deleteTweet(id) {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('DELETE', 'http://localhost:5000/deletetweet');
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", getCookie('username'))
    xmlHttp.send(JSON.stringify({
        "id": id
    }))
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location = "/index.html"
        } else if (this.readyState == 4) {
            alert("Masa errror " + this.status)
        }
    }
}

function getProfile() {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'http://localhost:5000/profile');
    xmlHttp.setRequestHeader("Authorization", getCookie('username'))

    xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.response);
        document.getElementById('aselole').insertAdjacentHTML("afterbegin", `<img src="${data.photoprofile}" class="imageprofile" />
        <div class="card-text">
        <p>${data.fullname}<br>
            ${data.username}
        </p>
    </div>`);
        }
    else if (this.readyState == 4) {
        alert("Masa errror " + this.status);
        }
    }
    xmlHttp.send();  
}

function suggestion(){
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'http://localhost:5000/suggestion');
    xmlHttp.setRequestHeader("Authorization", getCookie('username'))
    xmlHttp.send();

    xmlHttp.onreadystatechange = function () {

        // console.log(this.response)
    if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.response);
        // console.log(data)
        data.forEach(recommendation => {
            // console.log(recommendation)
            document.getElementById('boxwhotofollow').insertAdjacentHTML("afterbegin", `
                <div class="row bg-white rounded ml-1">
                    <div class="col">
                        <div class='people border-bottom'>
                            <img src="${recommendation.photoprofile}" class="imagepeople" />
                            <p class="font-weight-bold">${recommendation.fullname}</p>
                            <button type="button" onclick="followbtn('${recommendation.id}')" class="btn btn-outline-primary followbutton" id="del">Follow</button>
                        </div>
                    </div>
                </div>`);

        }) 
        }
    else if (this.readyState == 4) {
        alert("Suggest error " + this.status);
        }
    }
    
}

function followbtn(id){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', 'http://localhost:5000/followbtn');
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", getCookie('username'))
    xmlHttp.send(JSON.stringify({
        "id": id
    }))
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            window.location = "/index.html"
        } else if (this.readyState == 4) {
            alert("follow gagal " + this.status)
        }
    }
}

function counting(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('GET', 'http://localhost:5000/counting');
    xmlHttp.setRequestHeader("Authorization", getCookie('username'))
    xmlHttp.send();

    xmlHttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status == 200){
            data = JSON.parse(this.response);
            document.getElementById('countingprofile').insertAdjacentHTML("afterbegin", `
        <div class="col-sm">
        <a>Tweet</a>
        <a>${data["tweet"]}</a>
    </div>
    <div class="col-sm">
        <a>Following</a>
        <a>${data["following"]}</a>
    </div>
    <div class="col-sm">
        <a>Followers</a>
        <a>${data["followers"]}</a>
    </div>`);
        }
        else if (this.readyState == 4) {
            alert("counting error " + this.status);
        }
    }

}

function haspusCookie(){ 
    document.cookie = 'username=; expires=Sat 25 Aug 2018 00:00:00 UTC;'
}

function editdataprofile(){
    
    new_username = document.getElementById('new_username').value;
    new_fullname = document.getElementById('new_fullname').value;
    new_email = document.getElementById('new_email').value;
    new_bio = document.getElementById('new_bio').value;
    new_photoprofile = document.getElementById('new_photoprofile').value;



    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('PUT', 'http://localhost:5000/editdataprofile');
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", getCookie('username'));
    xmlHttp.send(JSON.stringify({
        'new_username': new_username,
        'new_fullname': new_fullname,
        'new_email': new_email,
        'new_bio': new_bio,
        'new_photoprofile': new_photoprofile
    }))

    xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        alert('Data berhasil di edit')
        }
    else if (this.readyState == 4) {
        alert("Masa errror " + this.status);
        }
    }
}

function editpassword(){
    
    current_password = document.getElementById('current_password').value;
    new_password = document.getElementById('new_password').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('PUT', 'http://localhost:5000/editpassword');
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.setRequestHeader("Authorization", getCookie('username'));
    xmlHttp.send(JSON.stringify({
        'current_password': current_password,
        'new_password': new_password
    }))

    xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        alert('Password berhasil di edit')
        }
    else if (this.readyState == 4) {
        alert("Masa errror " + this.status);
        }
    }
}

// function addToLocalStorage(){
//     localStorage.setItem('username', '@syifa')
//     localStorage.setItem('fullname', 'Syifa HAHA')
//     localStorage.setItem('email', 'syifa@haha.co.id')
//     localStorage.setItem('password', '123')
// }