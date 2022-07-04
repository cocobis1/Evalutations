        // ====== TOGGLE ======
let mybuttons = document.getElementsByTagName("button")
for(let i=0;i<3;i++){ // Boucle afiichage modules (sans toggle) + css
    document.getElementById(mybuttons[i].id).addEventListener("click", function(){
        let madiv = document.getElementById("module"+(i+1))

        if(madiv.style.display === "none"){
            madiv.style.display = "flex"
            displayCss()
        } else {
            madiv.style.display = "none" // div masquée
            displayCss() //affichage style
            console.log(madiv)
        }
    })
}

document.getElementById("cardinfo").addEventListener("click", function(){
    document.getElementById("cardinfo").style.display = 'none'
})


function displayCss(){
    // ========= CSS PART =============
    let module1 = document.getElementById("module1")
    let module2 = document.getElementById("module2")
    let module3 = document.getElementById("module3")
    let module2_3 = document.getElementById("modules2_3")
    let usr = document.getElementsByClassName('users')
    let myToggle = document.getElementById("toggle")


    if(module1.style.display === 'none'){  
        // applique ce style si module1 masqué
        module2_3.style.width = "1500px"
        module3.style.width = "1500px"
        module2.style.width = "1500px"

        for(i=0;i<usr.length;i++){ // style appliqué aux 3div users (module2)
            usr[i].style.justifyContent = "center"
            usr[i].childNodes[5].childNodes[1].style.width = "140px"
            usr[i].childNodes[5].childNodes[1].style.height = "140px"
            usr[i].childNodes[3].style.marginLeft = "20px"
            //console.log(document.getElementById("module1"))
        } 
    }

    else if((module1.style.display === '' || module1.style.display === 'flex') && module2.style.display === 'none'){
        module3.style.width = "1150px"
        module2_3.style.width = "1500px"
        module1.setAttribute("style", "position: relative; left:50%")
        myToggle.setAttribute('style', "position: relative; bottom: 450px")
        if(module3.style.display === 'flex'){
            module1.setAttribute("style", "position: relative; left:0%")
        }

    }

    else if((module1.style.display === '' || module1.style.display === 'flex') && module2.style.display === 'flex'){
        module1.setAttribute("style", "position: relative; left:0%")
        myToggle.setAttribute('style', "position: relative; bottom: 0px")

    }

    else if((module1.style.display === '' || module1.style.display === 'flex') && module3.style.display === 'flex'){
        module1.setAttribute("style", "position: relative; left:0%")
        console.log('opp')

    } else {
        module2_3.style.width = "1500px"
        module2.style.width = "98%"
        module3.style.width = "98%"
        myToggle.setAttribute('style', "position: relative; bottom: 0px")
        for(i=0;i<usr.length;i++){ // style appliqué aux 3div users (module2)
            usr[i].style.justifyContent = ""
            usr[i].childNodes[5].childNodes[1].style.width = "100px"
            usr[i].childNodes[5].childNodes[1].style.height = "100px"
            usr[i].childNodes[3].style.marginLeft = "0px"
        }
    }   
}



        // toggle affichage page
document.getElementById('toggle').addEventListener("click", function(){
    let myPage = document.getElementById("page")
    if(myPage.classList[0] === undefined){
        myPage.classList.toggle("slow")
        if(module2.style.display === 'flex'){
            myToggle.setAttribute('style', "position: relative; bottom: 0px")
        }
        return
        }
    else if(myPage.classList[0] === "slow"){
        myPage.classList.toggle("slow")
        return
    }
    })
   

        // ===== TOGGLE END =====


        // ===== REQUETES SERVEUR =======
        // ===== MODULE1 ==========
document.addEventListener("DOMContentLoaded", function(){
    let links = document.getElementsByClassName("links")
    // BOUCLE : associe chaque chemin a une url (au moment du survol)
    for(let i=0; i<3; i++){
        document.getElementById(links[i].id).addEventListener("mouseover", function(e){
            $.ajax({ // requete avec Jquery
                type: 'GET',
                url: 'http://localhost:8080/image'+i, //url associé a l'index de i
            })
            .done(function(data_img){
                //console.log(data_img.data)
                myimg = data_img.data[Math.floor(Math.random()*5)].url // random sur 5 images aleatoires
                document.getElementById("img_module1").src = myimg // affiche l'image random dans module1
            })
        })
    }
    // BOUCLE : Source nulle en quittant le survol de chaque lien
    for(i=0; i<3; i++){
        document.getElementById(links[i].id).addEventListener("mouseout", function(){
            document.getElementById("img_module1").src = "beweb.png"
        })
    }  
})

        //====== MODULE 2 ==========
        
window.addEventListener('DOMContentLoaded', function(){ // au chargement de la page...
    $.ajax({ // methode avec Jquery
        type: 'GET',
        url: 'http://localhost:8080/users',
    })
    .done(function(data_users){
        let myUsers = data_users.data
            // creations des variables contenant toutes les class
        let mylinks = document.getElementsByClassName("card_link")        
        let user_title = document.getElementsByClassName("user_title")
        let username = document.getElementsByClassName("username")
        let website = document.getElementsByClassName("website")
        let ip = document.getElementsByClassName("ip")
        let my_images = document.getElementsByClassName("random_image")


            // on envoie les données users dans le DOM
        for(let i=0; i<3; i++){ // boucle sur chaque user du module2
            user_title[i].innerText = myUsers[i].firstname + " " + myUsers[i].lastname
            username[i].innerText = "Username : " + myUsers[i].username + "\n"
            website[i].innerText = myUsers[i].website
            ip[i].innerText = "IP : " + myUsers[i].ip
            my_images[i].src = myUsers[i].image
            // au clic du lien, envoi les données de carte de credit avec le nom user
            document.getElementById(mylinks[i].id).addEventListener("click", function(){
                document.getElementById('cardinfo').style.display = "flex" // affiche la div carte de credit
                cardinfo.innerText = "\n" + myUsers[i].firstname + " " + myUsers[i].lastname + "\n\n"
                // import data cards in for loop
                fetch("/cards") // methode sans Jquery 
                .then(
                    response => response.json()
                )
                .then(
                    result => 
                    cardinfo.innerHTML += `
                    <legend>Card Information</legend>
                    \nCard : ${result.data[i].type} <br><br>
                    \nNumber : ${result.data[i].number}<br><br>
                    \nExpiration : ${result.data[i].expiration}
                    `   
                )
            })
        }
    })
// ======== MODULE 3 LET'S GOOOOOOO =======
//s'active au chargement de a page (cf. l.45)
    fetch("/company")
        .then(
            response => response.json()
        )
        .then(
            result => {
                let companyData = result.data[0]
                let contact = companyData.contact
                let address = companyData.addresses
                let companies = result.data
                
                function module3(){
                    //Renseignements module Company
                    legend_company.innerText = companyData.name
                    company_attribute0.innerText = "Website : " + companyData.website
                    company_attribute1.innerText = "Email : " + companyData.email
                    company_attribute2.innerText = "Country : " + companyData.country
                    company_attribute3.innerText = "Phone : " + companyData.phone

                    //div "contact"
                    document.getElementById("contact").innerHTML = `
                    <legend>Contact</legend>
                    ${contact.firstname} ${contact.lastname}
                    \n<a href="mailto:${contact.email}">${contact.email}</a>
                    \nBirthday : ${contact.birthday} <br>
                    \n<img src="${contact.image}" style="width:200px">
                    `
                    // gestion erreur si 1 seule adresse
                    if(address[1] === undefined){ 
                        document.getElementById("address2").innerHTML = `<legend>Adress2</legend>
                        No Adress.`
                        document.getElementById("address1").innerHTML = `
                        <legend>Adress1</legend>
                        ${address[0].street} - ${address[0].streetName}
                        \n${address[0].city}
                        \n${address[0].zipcode}
                        \n${address[0].country} - ${address[0].county_code}
                        `
                    } else {
                        for(i=0;i<2;i++){ // boucle addresse 1 et 2 (module 3)
                            document.getElementById("address"+(i+1)).innerHTML = `
                            <legend>Adress ${i+1}</legend>
                            ${address[i].street} - ${address[i].streetName} <br><br><br>
                            ${address[i].city} <br>
                            ${address[i].zipcode}<br><br>
                            ${address[i].country} - ${address[i].county_code}
                            `
                        }
                    }
                } // fin fonction 
                module3() // appel function
                let myNumber = 0
// gestion des boutons (navigation dans le tableau companyData avec la clé myNumber incrémenté ou décrémenté)
                document.getElementById('fleche_droite').addEventListener('click', function(){ 
                    if(myNumber <= companies.length - 2) {
// -2 car je compte l'incrémentation (+1) et indexation du tablea commence a 0 par rapport a array.length (+1)
                        myNumber++
                        companyData = result.data[myNumber]
                        contact = companyData.contact
                        address = companyData.addresses
                        console.log(myNumber)
                        module3()
                    } else {
                        myNumber = 0
                        companyData = result.data[myNumber]
                        contact = companyData.contact
                        address = companyData.addresses
                        console.log(myNumber)
                        module3()
                    }
                })
                
                // meme chose inversé pour decrementer
                document.getElementById('fleche_gauche').addEventListener('click', function(){
                    if(myNumber >= 1){
                        myNumber--
                        console.log(myNumber)

                        companyData = result.data[myNumber]
                        contact = companyData.contact
                        address = companyData.addresses
                        module3() 
                    } else {
                        myNumber = companies.length - 2 
                        // meme chose inversé mais pour la décrémentation
                        companyData = result.data[myNumber]
                        contact = companyData.contact
                        address = companyData.addresses
                        console.log(myNumber)
                        module3()
                    }
                })
                
            }
        )
})







