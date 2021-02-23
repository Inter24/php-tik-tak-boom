tikTakBoom = {
    init(
        tasks,
        timerField,
        gameStatusField,
        textFieldQuestion,
        textFieldAnswer1,
        textFieldAnswer2,
        gameTimer,
        startTimerOutput,
        questionTimer,
        questionTimerOutput
    ) {
        
        this.countOfPlayers = playersNumber;
        this.tasks = JSON.parse(tasks);

        this.timerField = timerField;
        this.gameStatusField = gameStatusField;
        this.textFieldQuestion = textFieldQuestion;
        this.textFieldAnswer1 = textFieldAnswer1;
        this.textFieldAnswer2 = textFieldAnswer2;        

        this.timeToStart = 5;
        this.gameTimer = gameTimer;
        this.startTimerOutput = startTimerOutput;

        this.needRightAnswers = 15;  

        this.timeBeforeAnswer = 4 ;
        this.questionTimer = questionTimer;
        this.questionTimerOutput = questionTimerOutput;
        this.questionTimerOutput.style.display = 'none';

        this.status = 'stop';
    },

    run(playersNum, time) {

        this.gameStatusField.style.display = 'block';
        this.startTimerOutput.style.display = 'block';

        this.state = 1;
        this.countOfPlayers = playersNum;
        this.rightAnswers = 0;  
        if (time > 0) {
            this.boomTimer = time;
        } else {
            this.boomTimer = 30;
        }
        
        this.gameStartTimer();

       // this.turnOn(); 
       // this.timer();        
    },

    turnOn() {
        this.gameStatusField.innerText += ` Вопрос игроку №${this.state}`;

        const taskNumber = randomIntNumber(this.tasks.length - 1);
        this.printQuestion(this.tasks[taskNumber]);

        this.tasks.splice(taskNumber, 1);

        this.state = (this.state === this.countOfPlayers) ? 1 : this.state + 1;
    },

    turnOff(value) {
        if (this.currentTask[value].result) {
            this.gameStatusField.innerText = 'Верно!';
            this.rightAnswers += 1;
            this.boomTimer += 5;
        } else {
            this.gameStatusField.innerText = 'Неверно!';
            this.boomTimer -= 5;
        }
        if (this.rightAnswers < this.needRightAnswers) {
            if (this.tasks.length === 0) {
                this.finish('lose');
            } else {                
               //this.turnOn(); 
                this.status = 'stop';
                this.questionTimerF();              
            }
        } else {
            this.finish('won');
        }

        this.textFieldAnswer1.removeEventListener('click', answer1);
        this.textFieldAnswer2.removeEventListener('click', answer2);
    },

    printQuestion(task) {
        this.textFieldQuestion.innerText = task.question;
        this.textFieldAnswer1.innerText = task.answer1.value;
        this.textFieldAnswer2.innerText = task.answer2.value;

        this.textFieldAnswer1.addEventListener('click', answer1 = () => this.turnOff('answer1'));
        this.textFieldAnswer2.addEventListener('click', answer2 = () => this.turnOff('answer2'));

        this.currentTask = task;
    },

    finish(result = 'lose') {
        this.state = 0;
        if (result === 'lose') {
            this.gameStatusField.innerText = `Вы проиграли!`;
        }
        if (result === 'won') {
            this.gameStatusField.innerText = `Вы выиграли!`;
        }

        this.textFieldQuestion.innerText = ``;
        this.textFieldAnswer1.innerText = ``;
        this.textFieldAnswer2.innerText = ``;

        console.log(this);
    },

    timer() {        
        if (this.state) {           

          //  console.log(this.status);

                if (this.status == 'start') {
                    this.boomTimer -= 1;
                } else {  
                    this.boomTimer = this.boomTimer;
                }
                let sec = this.boomTimer % 60;
                let min = (this.boomTimer - sec) / 60;
                sec = (sec >= 10) ? sec : '0' + sec;
                min = (min >= 10) ? min : '0' + min;
                this.timerField.innerText = `${min}:${sec}`;

                if (this.boomTimer > 0) {
                    setTimeout(
                        () => {
                            this.timer(this.status)
                        },
                        1000,
                    )
                } else {
                    this.finish('lose');
                }          
            }         
    },

    gameStartTimer() {     

        this.gameStatusField.innerText = 'Ожидаем начала игры';

        if (this.state) {
            this.timeToStart -= 1;
            let sec = this.timeToStart % 60;
            let min = (this.timeToStart - sec) / 60;
            sec = (sec >= 10) ? sec : '0' + sec;
            min = (min >= 10) ? min : '0' + min;
            this.gameTimer.innerText = `${min}:${sec}`;

            if (this.timeToStart > 0) {
                setTimeout(
                    () => {
                        this.gameStartTimer()
                    },
                    1000,
                )
            } else {
                this.startTimerOutput.innerText = ''
                this.gameStatusField.innerText = 'Игра началась!';
                this.turnOn();                 
                this.status = 'start';
                this.timer();
            }
        }

    },

    questionTimerF() {    
        
        this.questionTimerOutput.style.display = 'block';
        

        if (this.state) {
            this.timeBeforeAnswer -= 1;
            let sec = this.timeBeforeAnswer % 60;
            let min = (this.timeBeforeAnswer - sec) / 60;
            sec = (sec >= 10) ? sec : '0' + sec;
            min = (min >= 10) ? min : '0' + min;
            this.questionTimer.innerText = `${min}:${sec}`;

            if (this.timeBeforeAnswer > 0) {
                setTimeout(
                    () => {
                        this.questionTimerF()
                    },
                    1000,
                )
            } else {         
                this.timeBeforeAnswer = 4 ;
                this.questionTimerOutput.style.display = 'none'; 
                this.turnOn(); 
                this.status = 'start';
            }
        }

    }

}
