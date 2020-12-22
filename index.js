const yargs = require('yargs');
const db = require('./db')


const argv = yargs.command('nuevo', 'Comando para agregar un nuevo estudiante',{
        nombre: {
            describe: 'Nombre del nuevo estudiante',
            demand: true,
            alias: 'n'
        },
        rut: {
            describe:'Identificación única del estudiante',
            demand: true,
            alias: 'r'
    },
        curso: {
            describe:'Curso del estudiante',
            demand: true,
            alias: 'c'
        },
        nivel: {
            describe: 'Nivel del estudiante',
            demand: true,
            alias: 'l'
        }
    },
    (args) =>{
        const queryObject = {
            text:'INSERT INTO students (name, rut, course, level) VALUES ($1, $2, $3, $4) RETURNING  *',
            values: [args.nombre, args.rut, args.curso, args.nivel]
        }
        db.query(queryObject, (err, result) => {
             if(err)  console.log(err)
             console.log(result.rows[0]);
             db.pool.end()
         }

    )}
).command('consulta', 'muestra todos los estudiantes', ()=>{     //aqui se omitio el tercer argumento
    db.query('SELECT * FROM students',[], (err, result)=>{        //db.query el segundo argumento esta vacio se puede omitir tmb
        if(err)  console.log(err)
        console.log(result.rows);
        db.pool.end()
    })
}).command('editar', 'actualiza el estudiante', {
    nombre: {
        describe: 'Nombre del nuevo estudiate',
        demand: true,
        alias: 'n'
    },
    rut: {
        describe:'Identificación única del estudiante',
        demand: true,
        alias: 'r'
},
    curso: {
        describe:'Curso del estudiante',
        demand: true,
        alias: 'c'
    },
    nivel: {
        describe: 'Nivel del estudiante',
        demand: true,
        alias: 'l'
    }
},(args) =>{

    db.query(
        'UPDATE students set name=$1, course=$3, level=$4 where rut =$2  RETURNING *',
        [args.nombre, args.rut, args.curso, args.nivel],
        (err, result) => {
            if(err)  console.log(err)
            console.log(result.rows[0]);
            db.pool.end()
        }
)
}).command('consultarut', 'consulta 1 estudiante por rut toda su informacion', {
     rut: {
         describe: 'rut a buscar',
         demand: true,
         alias: 'r'
     }

}, (args)=>{     
    db.query('SELECT * FROM students where rut=$1', [args.rut] , (err, result)=>{ 
        if(err)  console.log(err)
        console.log(result.rows[0]);
        db.pool.end()
    })
    //eliminar
}).command('eliminar', 'eliminar 1 estudiante por rut', {
    rut: {
        describe: 'rut a eliminar',
        demand: true,
        alias: 'r'
    }
},(args)=>{     
    db.query('DELETE FROM students where rut=$1 RETURNING *', [args.rut] , (err, result)=>{ 
        if(err)  console.log(err)
        console.log(result.rows[0]);
        db.pool.end()
    })
}).help().argv

//para que corra en consola se debe ingresar:
// node index.js nuevo -n=rodrigo -r=147895897 -c=G -l=2
// node index.js consulta
// node index.js editar -n=rodrigo -r=147895897 -c=A -l=3
// node index.js eliminar -r=147895897
// es node ruta-archivo comando-creado y sus argumentos requeridos.