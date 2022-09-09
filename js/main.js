import emailjs from '@emailjs/browser'

const getInfo = async () => {

    let nameUser = document.getElementById("nameUser").value
    let emailUser = document.getElementById("emailUser").value
    let subjectUser = document.getElementById("subjectUser").value
    let msmUser = document.getElementById('msmUser').value

    const valSend = await sendEmail(nameUser, emailUser, subjectUser, msmUser)

    if (!valSend) {
        
        const titl = document.createElement('h3') 
        const parr = document.createElement('p')
        titl.textContent = "Algo fallo..."
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
