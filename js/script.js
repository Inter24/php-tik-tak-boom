window.onload = function()
{

    const onePlayer = document.getElementById('onePlayer');
    const twoPlayer = document.getElementById('twoPlayer');
    const threePlayer = document.getElementById('threePlayer');
    const fourPlayer = document.getElementById('fourPlayer');
    const fivePlayer = document.getElementById('fivePlayer');
    const playersNumberTxt = document.getElementById('playersNumber');

    const startGame = document.getElementById('startGame');
    const stopGame = document.getElementById('stopGame');

    let timePlay = document.getElementById('timePlay');

    stopGame.style.display = 'none';
    document.getElementById('gameStatusField').style.display = 'none';
    document.getElementById('startTimerOutput').style.display = 'none';

    let playersNumber;   

    tikTakBoom.init(
        tasks,
        document.getElementById('timerField'),
        document.getElementById('gameStatusField'),
        document.getElementById('questionField'),
        document.getElementById('answer1'),
        document.getElementById('answer2'),
        document.getElementById('gameTimer'),
        document.getElementById('startTimerOutput'),
        document.getElementById('questionTimer'),
        document.getElementById('questionTimerOutput'),
    )     

    onePlayer.addEventListener('click', () => { 
        playersNumber = 1;
        playersNumberTxt.innerHTML = `Число игроков: ${playersNumber}`;
    });
    twoPlayer.addEventListener('click', () => { 
        playersNumber = 2; 
        playersNumberTxt.innerHTML = `Число игроков: ${playersNumber}`; 
    });
    threePlayer.addEventListener('click', () => { 
        playersNumber = 3; 
        playersNumberTxt.innerHTML = `Число игроков: ${playersNumber}`; 
    });
    fourPlayer.addEventListener('click', () => { 
        playersNumber = 4; 
        playersNumberTxt.innerHTML = `Число игроков: ${playersNumber}`; 
    });
    fivePlayer.addEventListener('click', () => { 
        playersNumber = 5; 
        playersNumberTxt.innerHTML = `Число игроков: ${playersNumber}`; 
    });

    startGame.addEventListener('click', () => { 
        if (!playersNumber > 0) {
            playersNumber = 2;
        }
        playersNumberTxt.innerHTML = `Число игроков: ${playersNumber}`;         
        tikTakBoom.run(playersNumber, parseInt(timePlay.value));
        startGame.style.display = 'none';
        stopGame.style.display = 'block';
    });

    stopGame.addEventListener('click', () => { 
        tikTakBoom.finish('lose');
    });  
    
    
    
}



