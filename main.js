specialKeys = ['+', '-', '/', 'x']
lastKey = ''


function updateScreen(value){

    let screenSpan = document.querySelector(".screen > span")

    if(specialKeys.includes(value)){

        if(lastKey === ''){
            return
        }
        else if(specialKeys.includes(lastKey)){


            if(value === 'x'){
                temp = '*'
            }
            else{
                temp = value
            }

            screenSpan.innerHTML = screenSpan.innerHTML.slice(0, -1) + temp
            return

        }

    }

    lastKey = value

    if(value === 'x'){
        value = '*'
    }

    // change special buttons behavior

    if(value === 'reset'){

        screenSpan.innerHTML = 0
        return

    }

    if(value === 'del'){
        if(screenSpan.innerHTML.slice(0, -1) === ''){
            screenSpan.innerHTML = '0'
        }
        else{
            screenSpan.innerHTML = screenSpan.innerHTML.slice(0, -1)
        }
    
        return

    }

    if(value === '='){

        maxDigits = 16 - Math.round(eval(screenSpan.innerHTML)).toString().length - 1
        console.log((Math.round(eval(screenSpan.innerHTML) * (10 ** maxDigits)) / (10**maxDigits)).toString())
        screenSpan.innerHTML = (Math.round(eval(screenSpan.innerHTML) * (10 ** maxDigits)) / (10**maxDigits)).toString()
        return

    }

    if((screenSpan.innerHTML + value).length < 16){

        if(screenSpan.innerHTML === '0'){
            screenSpan.innerHTML = value
            return
        }
        else{
            screenSpan.innerHTML += value
            return
        }

        
    }

    

}

function setDefaultScheme(){
    let styleScheme = localStorage.getItem("styleScheme")

    let styleButtons = document.querySelectorAll(".styleButton")

    if (styleScheme === null){
        styleScheme = "th1"
    }

    document.body.className = styleScheme

    styleButtons.forEach(button => {
            
        if (button.value === styleScheme){
            button.classList.add('visible')
        }

    })

}

function setCurrentScheme(button){

    localStorage.setItem("styleScheme", button.value)

    document.body.className = button.value

    document.querySelector('.visible').classList.remove('visible')

    button.classList.add('visible')

    console.log(localStorage.getItem("styleScheme"))

}

setDefaultScheme()
// setScreenValue()

let keyButtons = document.querySelectorAll("input[type='button']")

keyButtons.forEach(key => {
    
    key.addEventListener("click", () => {
        updateScreen(key.value)
    })
})