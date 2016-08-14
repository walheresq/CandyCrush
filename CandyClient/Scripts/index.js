$(document).ready(function () {

    var contToques = 0;
    var movimiento1 = -1;
    var movimiento2 = -1;
    var apiURL = "http://localhost:7659/api/";
    var partida = -1;

    $.post(apiURL + "partida", { id: '0' })
                .done(function (data) {
                    partida = data.id;
                    Paint(data);
                });


    $("body").on("click", "td", function () {

        if (movimiento1 == $(this).attr("numero") || movimiento2 == $(this).attr("numero")) {
            return;
        }

        if (contToques == 0) {
            movimiento1 = $(this).attr("numero");
            contToques++;
        }
        else {
            contToques++;
            movimiento2 = $(this).attr("numero");
        }

        if (movimiento2 > -1) {

            $.ajax({
                url: apiURL + "partida/" + partida,
                type: 'PUT',
                data: { 'usuario': 0, 'movimiento1': movimiento1, 'movimiento2': movimiento2 },
                success: function (data) {
                    Paint(data);
                    movimiento1 = -1;
                    movimiento2 = -1;
                    contToques = 0;
                }
            });
        }
    });

});


function Paint(data) {
    $("#container").html("");
    var table = "";
    var color = "red";
    table += "<table id='tableCandy'>";
    for (var i = 0; i < data.elementos.length; i++) {
        if (i == 0 || i == 9 || i == 18 || i == 27 || i == 36 || i == 45 || i == 54 || i == 63)
            table += "<tr>";

        if (data.elementos[i].color == 0)
            color = "rojo";

        if (data.elementos[i].color == 1)
            color = "azul";

        if (data.elementos[i].color == 2)
            color = "amarillo";

        if (data.elementos[i].color == 3)
            color = "naranja";

        if (data.elementos[i].color == 4)
            color = "verde";

        table += "<td id='" + data.elementos[i].id + "' numero='" + data.elementos[i].id + "' class='" + color + "'   ></td>";
        if (i == 8 || i == 17 || i == 26 || i == 35 || i == 44 || i == 53 || i == 62 || i == 71)
            table += "</tr>";
    }
    table += "</table>";
    $("#container").html(table);
}
