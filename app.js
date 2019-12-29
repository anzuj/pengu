const avatar = document.querySelector("#pengu");
const heart = document.querySelector("#heart");
const message = document.querySelector("#message");

//googled code to see if images are touching
function isTouching(a, b) {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.top + aRect.height < bRect.top ||
        aRect.top > bRect.top + bRect.height ||
        aRect.left + aRect.width < bRect.left ||
        aRect.left > bRect.left + bRect.width
    );
}
window.addEventListener("keyup", function (e) {
    if (e.key === "ArrowDown") {
        moveHorizontal(50);
    } else if (e.key === "ArrowUp") {
        moveHorizontal(-50);
    } else if (e.key === "ArrowRight") {
        moveVertical(-50)
        avatar.style.transform = 'scale(1,1)'
    } else if (e.key === "ArrowLeft") {
        moveVertical(50)
        avatar.style.transform = 'scale(-1,1)'
    }
    //when pengu reaches heart
    if (isTouching(avatar, heart)) {
        //positioning message
        showMessage();
        //moving heart to a new location
        moveHeart();
    }

});

const moveHorizontal = (num) => {
    const currTop = extractPos(avatar.style.top);
    avatar.style.top = `${currTop + num}px`;
}

const moveVertical = (num) => {
    const currTop = extractPos(avatar.style.left);
    avatar.style.left = `${currTop - num}px`;    
}

//show Uh-oh message
const showMessage = () => {
    const currTop = extractPos(avatar.style.top);
    const currLeft = extractPos(avatar.style.left);
    message.style.display = "block";
    message.style.top = `${currTop - 30}px`;
    message.style.left = `${currLeft + 10}px`;
    setTimeout(function () {
        message.style.display = "none";
    }, 300);
}


const extractPos = (pos) => {
    if (!pos) return 100; //because css file attributes are not readible for JS, so it would run as NaN first time
    return parseInt(pos.slice(0, -2));
}

const moveHeart = () => {
    const x = Math.floor(Math.random() * window.innerHeight)
    const y = Math.floor(Math.random() * window.innerWidth)
    heart.style.top = `${x+30}px`;
    heart.style.left = `${y}px`;
}

moveHeart(); //move heart to random position as soon as page loads
