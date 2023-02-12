import mysqlConn from "./conn.js";

class Mysql{
    static async getAll(){
        const data = await mysqlConn.select("*").from("notif").orderBy("tanggal","desc").limit(5);
        return data;
    }
    static async add(body){
        const data = await mysqlConn("notif").insert(body);
        return data;
    }
}

export default Mysql;