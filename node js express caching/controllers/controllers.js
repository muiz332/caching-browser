import Mysql from '../model/func.js'

export const notif = async (req,res) =>{
    try{
        if(req.method === "GET"){
            const data = await Mysql.getAll();

            // check data kosong
            if(!data.length){
                return res.status(200).json({
                    status : "OK",
                    message : "semua data notif",
                    etag : "",
                    data
                })
            }



            const notifAkhir = data[0];
            const etag = new Date(notifAkhir.tanggal).getTime().toString();


            // check etag
            const reqEtag = req.headers["if-none-match"]
            if(reqEtag === etag){
                return res.status(204).json()
            }



            return res.status(200).json({
                status : "OK",
                message : "semua data notif",
                etag,
                data
            })
        }else if(req.method === "POST"){

            const data = await Mysql.add(req.body)
            

            return res.status(201).json({
                status : "Created",
                message : "berhasil menambahkan notif",
                data
            })
        }



    }catch(err){
        return res.status(500).json({
            status : "Internal Server Error",
            message : err.message,
            data : []
        })
    }
}
