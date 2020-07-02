
const userRoutes = (app, sqlite3) => {
    // variables
    const dataPath = '/home/tiendat/WebTools/CRUD-Sqlite3/public/database/students';
    const db = new sqlite3.Database(dataPath);
    // helper methods
    const readData = (callback, returnJson = false) => {
        db.all("SELECT * FROM Student", (err, data)=>{
            if(err){
                throw err;
            }
            callback(returnJson ? JSON.parse(data) : data);
        })
    };
    app.post('/', (req, res)=>{
        const sql_create = `CREATE TABLE IF NOT EXISTS Students (
            id INTEGET PRIMARY KEY AUTOINCREMENT,
            name VARCHAR(100) NOT NULL,
            class VARCHAR(100) NOT NULL,
            major VARCHAR(100) NOT NULL
        );`;
        db.run(sql_create,err => {
            if(err){
                throw err;
            }
            console.log("Create Table");
            const sql_insert = `INSERT INTO Student(id, name, class, major) VALUES
            (1, 'a', 'a', 'a'),
            (2, 'b', 'b', 'b'),
            (3, 'c', 'c', 'c');`;
            db.run(sql_insert, err =>{
                if(err){
                    throw err;
                }
                console.log('Create 3 student');
            })
        });

    })
    // READ
    app.get('/users', (req, res) => {
        readData(data => {
            res.render('about',{
                listStudents:data
            });
        });
    });
    // GET FORM ADD
    app.get('/add', (req, res)=>{
        res.render('addUser');
    })
    // CREATE
    app.post('/add', (req, res) => {
        const sql = "INSERT INTO Student (id,name,class,major) VALUES (?,?,?,?)";
        const student = [req.body.id,req.body.name,req.body.class,req.body.major];
        db.run(sql, student, err => {
            if(err){
                throw err;
            }
            res.redirect("/users");
        })
    });

    app.get('/edit/:id', (req, res) => {
        const id = req.params.id;
        readData(data => {
            data.forEach(element => {
                if(element.id == id){
                    res.render('aboutDetail',{
                        element:element
                    })
                }
            });
        })
    });

    // UPDATE
    app.put('/edit/:id', (req, res) => {
        const id = req.params.id;
        const {name} = req.body;
        const {classSt} = req.body;
        const {major} = req.body;

        const student = [name,classSt,major,id];
        const sql = "UPDATE Student SET name = ?, class = ?, major = ? WHERE (id = ?)";
        db.run(sql, student, err => {
            if(err){
                throw err;
            }
            res.json("success update");
        })
    });

    // DELETE
    app.delete('/edit/:id',(req, res) => {
        const id = req.params.id;
        const sql = "DELETE FROM Student WHERE id = ?";
        db.run(sql,id,err => {
            if(err){
                throw err;
            }
            res.json("success delete");
        })
        console.log(id);
    });
};

module.exports = userRoutes;