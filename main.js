import Database from "./src/config/db.js";
import ConsultorioView from "./src/views/consultorioView.js";


( async () => {
    const db = new Database();
    
    if ( !await db.init() ) { 
        console.log("Erro ao conectar com o banco de dados");
        process.exit(1);
    }
    ConsultorioView.main();
}) ();