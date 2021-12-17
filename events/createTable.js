const {createPool, createConnection} = require('mysql')

const con = createConnection({
    host: 'localhost',
    user: 'harambowski',
    password: 'jebacdisa',
    database: 'node_test'
})

module.exports = {
    name: 'ready',
    once: true,
    execute() {

        const addTable = () => {

            const hoursLeft = () => {
                let day = new Date();
                return (-day + day.setHours(23, 59, 59, 0));
            }

            let dateString = Date.now().toString().slice(0, 8);
            let tableName = 'msg_'+dateString;

            const createTable = () => {
                con.query(`CREATE TABLE ${tableName} (
                ID INT AUTO_INCREMENT PRIMARY KEY, 
                nickname VARCHAR(255), msgCount BIGINT(255), user_id BIGINT(64))`);

            }

            const insertDefault = () => {
                con.query(`INSERT INTO ${tableName} (ID, nickname, msgCount, user_id) VALUES (NULL, 'test-obj', 1111, 832441018393034775)`)
            }

            setTimeout( () => {
                createTable();
                insertDefault();
                let dayToMs = 24*60*60*1000;
                setInterval( () => {
                    createTable();
                }, dayToMs )
            },  hoursLeft());
           
        }

        addTable();
    }
}