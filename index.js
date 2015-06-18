//var port = normalizePort(process.env.PORT || '80');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var users = [];
var detalleUsers = [];

http.listen(port, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
    //io.set('heartbeat interval', 20);
    //socket.id = "q";
    console.log('conectadooo ' + socket.id);
    
    socket.on('chat message', function(msg, from, idDuelo){
        //socket.broadcast.to(idDuelo).emit('chat message', msg); //ANDA, manda solo al oponente
        //io.to(idDuelo).emit('chat message', msg); //ANDA, manda a todos
        //io.sockets.in(idDuelo).emit('chat message', msg); //ANDA, manda a todos
        
        var aa = users.indexOf(socket.id);
        var ee = users[aa];
        io.emit('chat message', socket.id + ' dice: ' + ee.nombre); //Manda a todos todos
        
        
        
    });
    
    socket.on('loguin', function(idUsuario, nombre){

        //socket.id = idUsuario;
        console.log('Conectado: ' + idUsuario + '-' + nombre);
        //users.push(socket.id);
        socket.user = idUsuario;
        
        //users.push(socket.id);
        
       
        
        //io.emit('persona logued', 'id usuario ' + idUsuario); //Manda a todos todos
        
        var singleUser = {};
        singleUser['id'] = socket.id;
        singleUser['idUsuario'] = idUsuario;
        singleUser['enDuelo'] = "false";
        singleUser['nombre'] = nombre;
        //users.push(singleUser);
        
        users[socket.id] = singleUser;
        
        //io.emit('all online users', users); //Manda a todos todos
  
    });
    
    
    
    socket.on('iniciar', function(idUsuario, idDuelo){
        socket.join(idDuelo);
        //socket.id = idUsuario;
        console.log(idUsuario + idDuelo);
        //users.push(socket.id);
        socket.user = idUsuario;
        
        //io.emit('persona logued', 'id usuario ' + idUsuario); //Manda a todos todos
        
        var singleUser = {};
        singleUser['id'] = socket.id;
        singleUser['idUsuario'] = idUsuario;
        singleUser['enDuelo'] = "false";
        singleUser['nombre'] = "pepe";
        users.push(singleUser);
        
        io.emit('all online users', users); //Manda a todos todos
        
        //socket.broadcast.to("q").emit('my message', msg);
        //io.emit('chat message', from + msg + ' ' + to);
        
        
        
        
        //EJEMPLO
        //var listOfObjects = [];
        //var a = ["car", "bike", "scooter"];
        //a.forEach(function(entry) {
        //    var singleObj = {}
        //    singleObj['type'] = 'vehicle';
        //    singleObj['value'] = entry;
        //    listOfObjects.push(singleObj);
        //});

        //console.log(listOfObjects);

        //$('#e').html(listOfObjects[2].value);
        
        
        
    });
    
    socket.on('disconnect', function(){
        
        //users.splice(users.indexOf(socket.user), 1);
        
        for (i in users){
            if (users[i].id == socket.id){
                console.log('user disconnected ' + users[i].nombre);
                users.splice(i, 1);
                break;
            }
        }
        //io.emit('remove user', socket.user);

    });
});

