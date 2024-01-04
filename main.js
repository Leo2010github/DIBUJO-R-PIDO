var Objetos = ["rain", "smiley_face", "animal_migration", "line"];
var Tiempo1 = 20;
var Pu1 = 0;
ObjetoReconocido0 = "";
ObjetoReconocido1 = "";
ObjetoReconocido2 = "";
ObjetoAzarF();
function ObjetoAzarF(){
    Azar = Math.floor(Math.random() * Objetos.length);
    ObjetoAzar = Objetos[Azar];
    document.getElementById("Tqd").innerHTML = "Tienes que dibujar: " + ObjetoAzar;
}
function preload(){
    modelo = ml5.imageClassifier('DoodleNet');
}
function setup(){
    canvas = createCanvas(650, 650);
    background("white");
    canvas.mouseReleased(comparar);
}
function draw(){
    stroke("black");
    strokeWeight(1);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    Tiempo();
}
function comparar(){
    modelo.classify(canvas, To);
}
function Tiempo(){
        if (Tiempo1 > 0) {
            Tiempo1 = Tiempo1 - 10;
            document.getElementById("Ti").innerHTML = "Tiempo: " + Tiempo1; 
        }
        else{
            ObjetoAzarF();
            Tiempo1 = 10000;
            background("white");
        }
    }
function Borrar(){
    background("white");
}
function To(error, resultados){
    if (error) {
        console.error(error);
    }
    else {
        console.log(resultados);
        ObjetoReconocido0 = resultados[0].label;
        ObjetoReconocido1 = resultados[1].label;
        ObjetoReconocido2 = resultados[2].label;
    }
    if (ObjetoReconocido0 == ObjetoAzar||ObjetoReconocido1 == ObjetoAzar||ObjetoReconocido2 == ObjetoAzar) {
        Pu1 ++;
        document.getElementById("Pu").innerHTML = "Puntuacion: " + Pu1;
        ObjetoAzarF();
        Tiempo1 = 10000;
        background("white");
  }
}