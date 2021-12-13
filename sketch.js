"use strict";

let sketch = function(p){
    let url ="http://localhost:3030/messages"
    let data;
    let img;
    let size;
    let font;
    let snowflakes = [];
    
    p.preload = function(){
        data = p.loadJSON(url);
        font = p.loadFont('NotoSansKR-Regular.otf');
    }
    p.setup = function(){
        img = p.loadImage('tree.png');
        // var canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        var canvas = p.createCanvas(650, 1000);
        canvas.parent('sketch')
        p.image(img,-500,-500);
        // data = JSON.Parse(data);
        // data.forEach(addUserMessage)
        

        
        p.textFont(font);
        p.textSize(10);
        
        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                console.log(element);
                p.text(element.nickname,p.width,10*element.id,p.width,30)
            }
        }
    }

    p.draw = function(){
        p.background(200,200,0);
        let t = p.frameCount / 60; // 시간 업데이트

  // 매 프라임마다 무작위 개수의 눈송이 생성
  for (let i = 0; i < p.random(5); i++) {
    snowflakes.push(new snowflake()); // 눈송이 객체 추가
  }
  p.fill(240);
  // for 반복문을 사용하여 눈송이 반복
  for (let flake of snowflakes) {
    flake.update(t); // 눈송이 위치 업데이트
    flake.display(); // 눈송이 그리기
  }
        p.image(img,-200,0);
        // p.translate(-p.width/2,-p.height/2,0)
        // p.textAlign(CENTER);
        
        p.fill(0);
        // p.textAlign(500, 500);
        let time = p.millis();
        // p.rotateZ(time / 1234);
        // p.rotateY(time / 1000);

        p.fill(255,0,255,90);
        p.noStroke();
        p.rect(20,0,25,25);
        p.fill(0);
        p.text("다녀간 사람",20,0,p.width,30)
        p.fill(255,0,255,90);
        p.noStroke();
        p.rect(440,0,500,35);
        p.fill(0);
        p.textSize(15);
        p.text("남겨주신 말",450,0,230,150)

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                // console.log(element);
                p.fill(255,0,255,50);
                p.noStroke();
                p.rect(20,35*(element.id+1),25,25);
                p.fill(0);
                p.text(element.nickname,20,35*(element.id+1),p.width,30)
                p.fill(255,0,255,50);
                p.noStroke();
                p.rect(440,35*(element.id+1),500,35);
                p.fill(0);
                p.textSize(15);
                p.text(element.text,450,35*(element.id+1),230,150)
                // p.ellipse(300,300,50,50);
            }
        }
        // snowflake 클래스

        
        if(size>0){
            size = Object.keys(data).length;
            p.text(data[0].text,100,0);
        }
        
        // if (p.mouseIsPressed) {
        //     p.fill(0);
        //   } else {
        //     p.fill(255);
        //   }
        //   p.ellipse(p.mouseX, p.mouseY, 80, 80);
    }
    function snowflake() {
        // 좌표값 초기화
        this.posX = 0;
        this.posY = p.random(-50, 0);
        this.initialangle = p.random(0, 2 * p.PI);
        this.size = p.random(2, 5);
      
        // 방사형 눈송이의 반지름
        // 눈송이를 화면에 고루 퍼뜨리기 위해 선택
        this.radius = p.sqrt(p.random(p.pow(p.width / 2, 2)));
      
        this.update = function(time) {
          // 원형을 따라다니는 x 위치
          let w = 0.6; // 각속도
          let angle = w * time + this.initialangle;
          this.posX = p.width / 2 + this.radius * p.sin(angle);
      
          // 크기가 다른 눈송이가 미묘하게 다른 y 속도로 떨어집니다.
          this.posY += p.pow(this.size, 0.5);
      
          // 화면 하단을 지나친 눈송이는 삭제
          if (this.posY > p.height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
          }
        };
      
        this.display = function() {
          p.ellipse(this.posX, this.posY, this.size);
        };
      }
}


  let myp5 = new p5(sketch);
  setInterval(myp5.preload,10000);
  setInterval(myp5.draw,100);