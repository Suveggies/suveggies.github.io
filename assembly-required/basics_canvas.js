var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    var box_side = 100;
    var x1 = canvas.width/3 - 50;
    var x2 = (2*canvas.width)/3 - 50;
    var y = canvas.height/3 + 100;
    var radius = 40;
    
    
    
    function drawNumbers() {
        ctx.font = "50px Arial";
        ctx.fillText("8", x1 + 35, y + 70);
    }

    function drawApple() {
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(x2, y + 50, radius, 0, Math.PI * 2);
        ctx.fill();
    
        ctx.beginPath();
        ctx.fillStyle = "green";
        ctx.fillRect(x2 - radius * 0.1, (y - radius * 1.2) + 50, radius * 0.2, radius * 0.6);

        ctx.font = "40px Arial";
        ctx.fillStyle = "#002436";
        ctx.fillText("10", x2 - 25, y + 65);
    }

    function drawBox1() {
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "#00486b";
        ctx.rect(x1, y, box_side, box_side);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }

    function drawBox2() {
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "#00486b";
        ctx.rect(x2, y, box_side, box_side);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
        ctx.stroke()
    }

    function drawBorder() {
        ctx.beginPath();
        ctx.lineWidth = "6";
        ctx.strokeStyle = "black";
        ctx.rect(0, 0, canvas.width, canvas.height);
        ctx.closePath();
        ctx.stroke();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBox1();
        drawApple();
        drawBorder();
        drawNumbers();
    }

    draw();