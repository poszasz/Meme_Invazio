const icon = document.getElementsByName("icon-home")[0];
const iconHome = document.querySelector('.icon-home');

iconHome.addEventListener('click', () => {
window.location.href= "../html/home.html";
});

const profile = document.querySelector('.user-icon');
profile.addEventListener('click', () => {
    window.location.href= "../html/profile.html";
});

    
const kijelentkezes = document.querySelector('.icon-logout') ;
kijelentkezes.addEventListener('click', logout);
async function logout() {
    const respons = await fetch('http://127.0.0.1:3000/api/auth/logout', {
        method: `POST`,
        credentials: `include`
    });

    const data = await respons.json();
    console.log(data)
    if (respons.ok) {
        window.location.href = '../index.html'
    } else {
        alert ('Hiba a kijelentkezéskor!')
    }
}

const newMeme = document.querySelector('.newMeme');

const fileUpload = document.getElementById('fileUpload') ;
fileUpload.addEventListener('change', selectPicture)

function selectPicture() {
    const file = fileUpload.files[0];
    console.log(file)
    if (file) {
        meme = file;
        const reader = new FileReader();
        reader.onload = (event) => {
            newMeme.style.backgroundImage = `url('${event.target.result}')`
        }
        reader.readAsDataURL(file)
    }
}

const uploadButton = document.querySelector('.uploadButton')
uploadButton.addEventListener('click', uploadMeme);
async function uploadMeme(){
    if (meme) {
        const formData = new FormData;
        formData.append('meme',meme)
        console.log(formData)
        try {
            const respons = await fetch('htpp://127.0.0.1:3000/api/meme/uploadsMeme', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            })
        } catch (error) {
            console.log(error)
            alert('Nem várt hiba!')
        }
    }else {
        alert('Válassz ki egy képet!');
    }
}