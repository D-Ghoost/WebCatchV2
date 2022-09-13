import emailjs from '@emailjs/browser'

// Funcion que trae los values del formulario y valida el envio del correo
const getInfo = async () => {

    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/
    let nameUser = document.getElementById("nameUser").value
    let emailUser = document.getElementById("emailUser").value
    let subjectUser = document.getElementById("subjectUser").value
    let msmUser = document.getElementById('msmUser').value

    if(!reg.test(emailUser)){
        const titl = document.createElement('h3') 
        const parr = document.createElement('p')
        titl.textContent = "Algo falla..."
        parr.textContent = "Porfavor revisa que los datos ingresados esten correctamente escritos"
        
        const dial = document.createElement("dialog")        
        dial.id = "popup"
        dial.appendChild(titl)
        dial.appendChild(parr)
    }

    const valSend = await sendEmail(nameUser, emailUser, subjectUser, msmUser)

    if (!valSend) {
        
        const titl = document.createElement('h3') 
        const parr = document.createElement('p')
        titl.textContent = "Algo falla..."
        parr.textContent = "Intenta realizar nuevamente la acción, si el problema persiste espera unos minutos."
        
        const dial = document.createElement("dialog")        
        dial.id = "popup"
        dial.appendChild(titl)
        dial.appendChild(parr)
    }

    const titl = document.createElement('h3') 
        const parr = document.createElement('p')
        titl.textContent = "Gracias por tu mensaje!!"
        parr.textContent = "Nos contactaremos muy pronto para ayudarte."
        
        const dial = document.createElement("dialog")        
        dial.id = "popup"
        dial.appendChild(titl)
        dial.appendChild(parr)

}

// Funcin que llama la libreria y envia el correo

async function sendEmail(nameUser, emailUser, subjectUser, msmUser){
    let params = {
        from_name: nameUser,
        from_email: emailUser,
        subject: subjectUser,
        message: msmUser
    }
    
    const servID = 'gmail'
    const tempID = 'mails_webC'
    const pubKey = 'iW2zQgorsoppySg6k'

    emailjs.send(servID, tempID, params, pubKey)
    .then( res => {
        console.log(res.status);
        return true
    }, err => {
        console.error(err)
        return false
    })

}


const btnCont = document.getElementById("contact-btn")
btnCont.addEventListener("click", getInfo)